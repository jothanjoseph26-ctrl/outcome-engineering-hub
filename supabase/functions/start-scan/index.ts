import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { fetchWebsite, classifyFetchResult, normalizeUrl, validateUrl } from './analysis.ts';
import { calculateScore, SCORING_VERSION } from './scoring.ts';
import { generateRecommendations } from './recommendations.ts';
import { generateAISummary, generateFallbackSummary, calculateRevenueLoss } from './summary.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-public-token',
};

const MAX_RETRY_COUNT = 5;
const MAX_WEBSITE_LENGTH = 2048;

interface ScanAnswers {
  goal: string;
  businessType: string;
  budget: string;
  channels: string[];
  problem: string;
}

interface ScanRecord {
  id: string;
  website: string;
  status: string;
  progress: number;
  current_step: string;
  retry_count: number;
  error_message: string | null;
  created_at: string;
  started_at: string | null;
  completed_at: string | null;
  public_token: string | null;
  answers: unknown;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  let scanId: string | null = null;

  try {
    const { scanId: requestedScanId, forceRestart } = await req.json();

    if (!requestedScanId) {
      return new Response(
        JSON.stringify({ error: 'scanId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    scanId = requestedScanId;

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await logEvent(supabase, scanId!, 'scan_started', { requestId, forceRestart }, 'Starting scan orchestration');

    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .select('*')
      .eq('id', scanId)
      .single();

    if (scanError || !scan) {
      await logEvent(supabase, scanId!, 'scan_failed', { requestId, error: 'Scan not found' }, 'Scan record not found');
      return new Response(
        JSON.stringify({ error: 'Scan not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const scanRecord = scan as unknown as ScanRecord;
    const website = scanRecord.website ?? '';
    const answers = scanRecord.answers as unknown as ScanAnswers;

    if (!forceRestart && scanRecord.status === 'completed') {
      await logEvent(supabase, scanId!, 'scan_retried', { requestId, denied: true }, 'Attempted to restart completed scan');
      return new Response(
        JSON.stringify({ 
          error: 'Scan already completed', 
          scanId, 
          status: scanRecord.status,
          publicToken: scanRecord.public_token 
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (scanRecord.status === 'failed') {
      if (scanRecord.retry_count >= MAX_RETRY_COUNT) {
        await logEvent(supabase, scanId!, 'scan_retried', { requestId, denied: true, reason: 'max_retries' }, 'Max retries exceeded');
        return new Response(
          JSON.stringify({ 
            error: 'Max retries exceeded', 
            scanId, 
            retryCount: scanRecord.retry_count 
          }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (!forceRestart) {
        return new Response(
          JSON.stringify({ 
            error: 'Scan failed, use forceRestart to retry', 
            scanId, 
            retryCount: scanRecord.retry_count 
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    if (['running', 'queued', 'analyzing'].includes(scanRecord.status)) {
      await logEvent(supabase, scanId!, 'scan_progress', { requestId, currentStatus: scanRecord.status }, 'Scan already in progress');
      return new Response(
        JSON.stringify({ 
          error: 'Scan already in progress', 
          scanId, 
          status: scanRecord.status,
          currentStep: scanRecord.current_step,
          progress: scanRecord.progress
        }),
        { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const normalizedWebsite = normalizeUrl(website);
    const urlValidation = validateUrl(normalizedWebsite);
    if (!urlValidation.valid) {
      await logEvent(supabase, scanId!, 'scan_failed', { requestId, error: urlValidation.error }, 'Invalid website URL');
      await updateScanStatus(supabase, scanId!, 'failed', 0, 'pending', urlValidation.error!);
      return new Response(
        JSON.stringify({ error: urlValidation.error, scanId }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let publicToken = scanRecord.public_token;
    if (!publicToken) {
      const { data: updatedScan, error: tokenError } = await supabase
        .from('scans')
        .update({ public_token: crypto.randomUUID() })
        .eq('id', scanId)
        .select('public_token')
        .single();
      if (tokenError) {
        console.error('Failed to generate public token:', tokenError);
        await logEvent(supabase, scanId!, 'scan_failed', { requestId, error: 'Failed to generate access token' }, 'Token generation failed');
        await updateScanStatus(supabase, scanId!, 'failed', 0, 'error', 'Failed to generate access token');
        return new Response(
          JSON.stringify({ error: 'Failed to generate access token', scanId }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      publicToken = updatedScan?.public_token || null;
    }

    const newRetryCount = scanRecord.status === 'failed' ? scanRecord.retry_count + 1 : 0;
    await updateScanStatus(supabase, scanId!, 'queued', 5, 'initializing', null, newRetryCount).catch(err => { throw new Error(`Failed to queue scan: ${err.message}`); });
    await logEvent(supabase, scanId!, 'scan_created', { requestId, publicToken }, 'Scan queued for processing');

    await updateScanStatus(supabase, scanId!, 'running', 10, 'fetching', null, newRetryCount, new Date().toISOString()).catch(err => { throw new Error(`Failed to start scan: ${err.message}`); });
    await logEvent(supabase, scanId!, 'status_changed', { from: 'queued', to: 'running' }, 'Starting scan execution');

    const fetchResult = await fetchWebsite(normalizedWebsite);
    const { failed, evidence } = classifyFetchResult(fetchResult);

    await updateScanStatus(supabase, scanId!, 'running', 50, 'analyzing', null, newRetryCount).catch(err => { throw new Error(`Failed to update status: ${err.message}`); });
    await logEvent(supabase, scanId!, 'analysis_started', { website: normalizedWebsite }, 'Starting analysis phase');

    const scoreResult = calculateScore(evidence, answers);

    await updateScanStatus(supabase, scanId!, 'analyzing', 70, 'generating_summary', null, newRetryCount).catch(err => { throw new Error(`Failed to update status: ${err.message}`); });

    let summaryResult;
    if (scoreResult.maturityLevel !== 'Analysis Failed') {
      summaryResult = await generateAISummary(scoreResult.findings, answers, scoreResult.score);
    } else {
      summaryResult = generateFallbackSummary(scoreResult.findings, answers, scoreResult.score);
    }

    const recommendationsResult = generateRecommendations(scoreResult.findings, {
      problem: answers.problem,
      channels: answers.channels,
    });

    const { error: resultsError } = await supabase
      .from('scan_results')
      .insert({
        scan_id: scanId,
        score: scoreResult.score,
        maturity_level: scoreResult.maturityLevel,
        rule_version: scoreResult.ruleVersion,
        findings: scoreResult.findings,
        recommendations: recommendationsResult.recommendations,
        category_scores: scoreResult.categoryScores,
        ai_summary: summaryResult.aiSummary,
        estimated_revenue_loss: summaryResult.estimatedRevenueLoss,
      });

    if (resultsError) {
      throw new Error(`Failed to save scan results: ${resultsError.message}`);
    }

    const completedAt = new Date().toISOString();
    await updateScanStatus(supabase, scanId!, 'completed', 100, 'finished', null, newRetryCount, null, completedAt);
    await logEvent(supabase, scanId!, 'scan_completed', { score: scoreResult.score, findingsCount: scoreResult.findings.length }, 'Scan completed successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        scanId,
        publicToken,
        status: 'completed',
        score: scoreResult.score,
        maturityLevel: scoreResult.maturityLevel,
        ruleVersion: scoreResult.ruleVersion,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in start-scan:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (scanId) {
      try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseKey = Deno.env.get('SERVICE_ROLE_KEY')!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        await updateScanStatus(supabase, scanId!, 'failed', 0, 'error', errorMessage);
        await logEvent(supabase, scanId!, 'scan_failed', { requestId, error: errorMessage }, 'Scan failed with exception');
      } catch (dbError) {
        console.error('Failed to persist failure state:', dbError);
      }
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        requestId,
        scanId: scanId || null
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function updateScanStatus(
  supabase: any,
  scanId: string,
  status: string,
  progress: number,
  currentStep: string,
  errorMessage: string | null = null,
  retryCount?: number,
  startedAt?: string | null,
  completedAt?: string | null
) {
  const updateData: Record<string, any> = {
    status,
    progress,
    current_step: currentStep,
    error_message: errorMessage,
    last_heartbeat_at: new Date().toISOString(),
  };

  if (retryCount !== undefined) {
    updateData.retry_count = retryCount;
  }

  if (startedAt !== undefined) {
    updateData.started_at = startedAt;
  }

  if (completedAt !== undefined) {
    updateData.completed_at = completedAt;
  }

  const { error } = await supabase
    .from('scans')
    .update(updateData)
    .eq('id', scanId);

  if (error) {
    console.error(`Failed to update scan status to ${status}:`, error);
    throw new Error(`Failed to update scan status: ${error.message}`);
  }
}

async function logEvent(
  supabase: any,
  scanId: string,
  eventType: string,
  eventData: Record<string, any>,
  description: string
) {
  try {
    await supabase
      .from('scan_events')
      .insert({
        scan_id: scanId,
        event_type: eventType,
        event_data: { ...eventData, description },
      });
  } catch (error) {
    console.error('Failed to log event:', error);
  }
}