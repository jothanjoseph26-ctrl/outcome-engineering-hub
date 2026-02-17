import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScanAnswers {
  goal: string;
  businessType: string;
  budget: string;
  channels: string[];
  problem: string;
}

interface Finding {
  title: string;
  severity: 'high' | 'medium' | 'low';
  evidence: string;
  whyItMatters: string;
  fix: string[];
  estimatedImpact: string;
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scanId } = await req.json();

    if (!scanId) {
      return new Response(
        JSON.stringify({ error: 'scanId is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get scan data
    const { data: scan, error: scanError } = await supabase
      .from('scans')
      .select('*')
      .eq('id', scanId)
      .single();

    if (scanError || !scan) {
      return new Response(
        JSON.stringify({ error: 'Scan not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update status to running
    await supabase
      .from('scans')
      .update({ status: 'running', progress: 10 })
      .eq('id', scanId);

    // Perform static analysis
    const staticResults = await performStaticAnalysis(scan.website, supabase, scanId);
    
    // Update progress
    await supabase
      .from('scans')
      .update({ progress: 50 })
      .eq('id', scanId);

    // Calculate scores
    const answers = scan.answers as ScanAnswers;
    const { score, findings, categoryScores, maturityLevel } = calculateScore(staticResults, answers);

    // Update progress
    await supabase
      .from('scans')
      .update({ status: 'analyzing', progress: 70 })
      .eq('id', scanId);

    // Generate AI summary
    const aiSummary = await generateAISummary(findings, answers, score);

    // Calculate estimated revenue loss
    const estimatedLoss = calculateRevenueLoss(findings, answers.budget);

    // Generate recommendations
    const recommendations = generateRecommendations(findings, answers);

    // Save results
    await supabase
      .from('scan_results')
      .insert({
        scan_id: scanId,
        score,
        maturity_level: maturityLevel,
        findings,
        recommendations,
        category_scores: categoryScores,
        ai_summary: aiSummary,
        estimated_revenue_loss: estimatedLoss,
      });

    // Mark scan as completed
    await supabase
      .from('scans')
      .update({ 
        status: 'completed', 
        progress: 100,
        completed_at: new Date().toISOString()
      })
      .eq('id', scanId);

    return new Response(
      JSON.stringify({ success: true, scanId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in start-scan:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

async function performStaticAnalysis(website: string, supabase: any, scanId: string) {
  const results = {
    hasGoogleAnalytics: false,
    hasGoogleTagManager: false,
    hasMetaPixel: false,
    hasForms: false,
    hasWhatsAppLink: false,
    hasCTAs: false,
    hasSSL: false,
    hasViewport: false,
    hasStructuredData: false,
    pageTitle: '',
    metaDescription: '',
    loadTime: 0,
    scripts: [] as string[],
    forms: 0,
    ctas: 0,
    images: 0,
    imagesWithAlt: 0,
  };

  try {
    // Update progress
    await supabase.from('scans').update({ progress: 20 }).eq('id', scanId);

    const response = await fetch(website, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OutcomeLabsBot/1.0)',
      },
    });

    const startTime = Date.now();
    const html = await response.text();
    results.loadTime = Date.now() - startTime;

    // Check SSL
    results.hasSSL = website.startsWith('https://');

    // Update progress
    await supabase.from('scans').update({ progress: 30 }).eq('id', scanId);

    // Parse HTML for various elements
    const lowerHtml = html.toLowerCase();

    // Google Analytics
    results.hasGoogleAnalytics = lowerHtml.includes('google-analytics.com') || 
                                  lowerHtml.includes('gtag') ||
                                  lowerHtml.includes('ga.js') ||
                                  lowerHtml.includes('analytics.js');

    // Google Tag Manager
    results.hasGoogleTagManager = lowerHtml.includes('googletagmanager.com') ||
                                   lowerHtml.includes('gtm.js');

    // Meta Pixel
    results.hasMetaPixel = lowerHtml.includes('connect.facebook.net') ||
                           lowerHtml.includes('fbq(') ||
                           lowerHtml.includes('facebook.com/tr');

    // Forms
    const formMatches = html.match(/<form/gi);
    results.forms = formMatches ? formMatches.length : 0;
    results.hasForms = results.forms > 0;

    // WhatsApp
    results.hasWhatsAppLink = lowerHtml.includes('wa.me') ||
                               lowerHtml.includes('whatsapp.com') ||
                               lowerHtml.includes('api.whatsapp');

    // CTAs
    const ctaKeywords = ['buy', 'shop', 'get started', 'sign up', 'subscribe', 'book', 'contact', 'order', 'add to cart'];
    results.ctas = ctaKeywords.reduce((count, keyword) => {
      const regex = new RegExp(keyword, 'gi');
      const matches = html.match(regex);
      return count + (matches ? matches.length : 0);
    }, 0);
    results.hasCTAs = results.ctas > 0;

    // Viewport meta
    results.hasViewport = lowerHtml.includes('viewport');

    // Structured data
    results.hasStructuredData = lowerHtml.includes('application/ld+json') ||
                                 lowerHtml.includes('itemtype=');

    // Title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    results.pageTitle = titleMatch ? titleMatch[1].trim() : '';

    // Meta description
    const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i);
    results.metaDescription = descMatch ? descMatch[1].trim() : '';

    // Images
    const imgMatches = html.match(/<img/gi);
    results.images = imgMatches ? imgMatches.length : 0;
    const imgWithAltMatches = html.match(/<img[^>]*alt=["'][^"']+["']/gi);
    results.imagesWithAlt = imgWithAltMatches ? imgWithAltMatches.length : 0;

    // Update progress
    await supabase.from('scans').update({ progress: 40 }).eq('id', scanId);

  } catch (error) {
    console.error('Static analysis error:', error);
  }

  return results;
}

function calculateScore(staticResults: any, answers: ScanAnswers) {
  const findings: Finding[] = [];
  const categoryScores: Record<string, CategoryScore> = {};

  // Initialize category scores
  categoryScores.tracking = { name: 'Tracking & Attribution', score: 0, maxScore: 25 };
  categoryScores.performance = { name: 'Performance', score: 0, maxScore: 25 };
  categoryScores.leadCapture = { name: 'Lead Capture', score: 0, maxScore: 20 };
  categoryScores.funnelClarity = { name: 'Funnel Clarity', score: 0, maxScore: 15 };
  categoryScores.followUp = { name: 'Follow-up System', score: 0, maxScore: 15 };

  // TRACKING ANALYSIS (25 points)
  if (staticResults.hasGoogleAnalytics) {
    categoryScores.tracking.score += 8;
  } else {
    findings.push({
      title: 'Missing Google Analytics',
      severity: 'high',
      evidence: 'No Google Analytics tracking code detected',
      whyItMatters: 'You cannot measure website performance or user behavior without analytics',
      fix: ['Install Google Analytics 4', 'Set up conversion goals', 'Link with Google Ads'],
      estimatedImpact: '₦100K-₦500K/month in unmeasured opportunity cost'
    });
  }

  if (staticResults.hasGoogleTagManager) {
    categoryScores.tracking.score += 7;
  } else {
    findings.push({
      title: 'Missing Google Tag Manager',
      severity: 'medium',
      evidence: 'No GTM container detected',
      whyItMatters: 'GTM simplifies tracking management and enables advanced event tracking',
      fix: ['Install GTM container', 'Migrate existing tags to GTM', 'Set up event tracking'],
      estimatedImpact: '15-20% faster tracking implementation'
    });
  }

  if (staticResults.hasMetaPixel) {
    categoryScores.tracking.score += 10;
  } else {
    const budgetNum = parseBudget(answers.budget);
    if (budgetNum > 200000) {
      findings.push({
        title: 'Missing Meta Pixel',
        severity: 'high',
        evidence: 'No Facebook/Meta Pixel detected despite significant ad spend',
        whyItMatters: 'Ad spend cannot be optimized without proper conversion tracking',
        fix: ['Install Meta Pixel', 'Set up standard events', 'Configure Conversions API'],
        estimatedImpact: '₦' + Math.round(budgetNum * 0.2).toLocaleString() + '/month in wasted ad spend'
      });
    } else {
      findings.push({
        title: 'Missing Meta Pixel',
        severity: 'medium',
        evidence: 'No Facebook/Meta Pixel detected',
        whyItMatters: 'You cannot track or optimize social media advertising',
        fix: ['Install Meta Pixel', 'Set up standard events'],
        estimatedImpact: 'Future social ads will underperform'
      });
    }
  }

  // PERFORMANCE ANALYSIS (25 points)
  if (staticResults.hasSSL) {
    categoryScores.performance.score += 10;
  } else {
    findings.push({
      title: 'No SSL Certificate',
      severity: 'high',
      evidence: 'Website does not use HTTPS',
      whyItMatters: 'Browsers show security warnings, damaging trust and SEO',
      fix: ['Install SSL certificate', 'Redirect HTTP to HTTPS'],
      estimatedImpact: 'Up to 30% visitor drop-off'
    });
  }

  if (staticResults.hasViewport) {
    categoryScores.performance.score += 5;
  } else {
    findings.push({
      title: 'Not Mobile Optimized',
      severity: 'medium',
      evidence: 'No viewport meta tag detected',
      whyItMatters: 'Mobile users will have poor experience',
      fix: ['Add viewport meta tag', 'Implement responsive design'],
      estimatedImpact: '40-60% of traffic may bounce'
    });
  }

  if (staticResults.loadTime < 3000) {
    categoryScores.performance.score += 10;
  } else if (staticResults.loadTime < 5000) {
    categoryScores.performance.score += 5;
    findings.push({
      title: 'Slow Page Load',
      severity: 'medium',
      evidence: `Page took ${(staticResults.loadTime / 1000).toFixed(1)}s to load`,
      whyItMatters: 'Every second delay reduces conversions by 7%',
      fix: ['Optimize images', 'Enable caching', 'Minify CSS/JS'],
      estimatedImpact: '10-20% conversion improvement possible'
    });
  } else {
    findings.push({
      title: 'Very Slow Page Load',
      severity: 'high',
      evidence: `Page took ${(staticResults.loadTime / 1000).toFixed(1)}s to load`,
      whyItMatters: 'Users abandon slow sites, directly losing sales',
      fix: ['Audit performance', 'Optimize images', 'Consider CDN', 'Upgrade hosting'],
      estimatedImpact: '30-50% potential conversion improvement'
    });
  }

  // LEAD CAPTURE ANALYSIS (20 points)
  if (staticResults.hasForms) {
    categoryScores.leadCapture.score += 10;
    if (staticResults.forms < 2) {
      findings.push({
        title: 'Limited Lead Capture Forms',
        severity: 'low',
        evidence: `Only ${staticResults.forms} form(s) found`,
        whyItMatters: 'More strategic forms increase lead capture',
        fix: ['Add newsletter signup', 'Add lead magnet forms', 'Add popup forms'],
        estimatedImpact: '20-40% more leads captured'
      });
    }
  } else {
    findings.push({
      title: 'No Lead Capture Forms',
      severity: 'high',
      evidence: 'No contact forms detected on the page',
      whyItMatters: 'Visitors have no way to convert or contact you',
      fix: ['Add contact form', 'Add lead capture popup', 'Add newsletter signup'],
      estimatedImpact: 'Critical - losing 100% of potential leads'
    });
  }

  if (staticResults.hasWhatsAppLink) {
    categoryScores.leadCapture.score += 10;
  } else if (answers.channels.includes('whatsapp')) {
    findings.push({
      title: 'WhatsApp Link Missing',
      severity: 'medium',
      evidence: 'No WhatsApp link found despite using WhatsApp for leads',
      whyItMatters: 'Visitors cannot easily reach you via preferred channel',
      fix: ['Add WhatsApp click-to-chat button', 'Add WhatsApp Business link'],
      estimatedImpact: '15-30% more WhatsApp inquiries'
    });
  }

  // FUNNEL CLARITY (15 points)
  if (staticResults.hasCTAs) {
    if (staticResults.ctas >= 5) {
      categoryScores.funnelClarity.score += 15;
    } else {
      categoryScores.funnelClarity.score += 8;
      findings.push({
        title: 'Weak Call-to-Actions',
        severity: 'low',
        evidence: `Only ${staticResults.ctas} CTA elements found`,
        whyItMatters: 'Users need clear direction on next steps',
        fix: ['Add prominent CTAs above fold', 'Use action-oriented language', 'Add urgency elements'],
        estimatedImpact: '10-25% conversion improvement'
      });
    }
  } else {
    findings.push({
      title: 'No Clear Call-to-Actions',
      severity: 'high',
      evidence: 'No clear CTA elements detected',
      whyItMatters: 'Visitors don\'t know what action to take',
      fix: ['Add primary CTA button', 'Make CTAs visually prominent', 'Use compelling copy'],
      estimatedImpact: '50%+ conversion improvement possible'
    });
  }

  // FOLLOW-UP ANALYSIS (15 points)
  if (answers.channels.length > 2) {
    categoryScores.followUp.score += 10;
  } else if (answers.channels.length > 0) {
    categoryScores.followUp.score += 5;
    findings.push({
      title: 'Limited Lead Channels',
      severity: 'medium',
      evidence: `Only ${answers.channels.length} lead channel(s) in use`,
      whyItMatters: 'Diversified channels increase lead capture',
      fix: ['Add email capture', 'Implement live chat', 'Set up SMS follow-up'],
      estimatedImpact: '25-40% more leads captured'
    });
  } else {
    findings.push({
      title: 'No Clear Follow-up System',
      severity: 'high',
      evidence: 'No lead channels identified',
      whyItMatters: 'Leads go cold without systematic follow-up',
      fix: ['Implement CRM', 'Set up email automation', 'Create follow-up sequences'],
      estimatedImpact: '60%+ of leads currently lost'
    });
  }

  if (answers.channels.includes('none')) {
    categoryScores.followUp.score = 0;
    findings.push({
      title: 'No Lead Management System',
      severity: 'high',
      evidence: 'User indicated no clear lead management system',
      whyItMatters: 'Leads are being lost due to lack of process',
      fix: ['Implement CRM system', 'Set up lead notifications', 'Create follow-up workflow'],
      estimatedImpact: '₦500K-₦2M/month in lost opportunities'
    });
  } else {
    categoryScores.followUp.score += 5;
  }

  // Calculate total score
  const totalScore = Object.values(categoryScores).reduce((sum, cat) => sum + cat.score, 0);

  // Determine maturity level
  let maturityLevel = '';
  if (totalScore >= 80) {
    maturityLevel = 'Revenue Optimized';
  } else if (totalScore >= 60) {
    maturityLevel = 'Growing Systems';
  } else if (totalScore >= 40) {
    maturityLevel = 'Capture Without Control';
  } else {
    maturityLevel = 'Revenue Blind';
  }

  // Sort findings by severity
  findings.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return { score: totalScore, findings, categoryScores, maturityLevel };
}

function parseBudget(budget: string): number {
  const budgetMap: Record<string, number> = {
    '0-100000': 50000,
    '100000-500000': 300000,
    '500000-1000000': 750000,
    '1000000-5000000': 3000000,
    '5000000+': 7500000,
  };
  return budgetMap[budget] || 0;
}

async function generateAISummary(findings: Finding[], answers: ScanAnswers, score: number): Promise<string> {
  try {
    const apiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!apiKey) {
      return generateFallbackSummary(findings, answers, score);
    }

    const highPriority = findings.filter(f => f.severity === 'high');
    const mediumPriority = findings.filter(f => f.severity === 'medium');

    const prompt = `You are a revenue systems strategist analyzing a business diagnostic report. 

Business Context:
- Business Type: ${answers.businessType}
- Primary Goal: ${answers.goal}
- Monthly Marketing Budget: ${answers.budget}
- Main Challenge: ${answers.problem}
- Overall Score: ${score}/100

Key Findings:
${findings.map(f => `- [${f.severity.toUpperCase()}] ${f.title}: ${f.evidence}`).join('\n')}

Write a 3-4 paragraph professional executive summary that:
1. Opens with the overall health of their revenue systems
2. Highlights the 2-3 most critical issues and their business impact
3. Provides a clear action priority order
4. Ends with an encouraging but urgent call to action

Use Nigerian Naira (₦) for any monetary references. Be direct, use "you/your" language, and focus on business outcomes not technical jargon.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: 'You are a revenue systems strategist helping Nigerian businesses optimize their digital revenue infrastructure.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      console.error('AI API error:', await response.text());
      return generateFallbackSummary(findings, answers, score);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateFallbackSummary(findings, answers, score);

  } catch (error) {
    console.error('AI summary error:', error);
    return generateFallbackSummary(findings, answers, score);
  }
}

function generateFallbackSummary(findings: Finding[], answers: ScanAnswers, score: number): string {
  const highPriority = findings.filter(f => f.severity === 'high');
  
  let summary = `Your revenue systems score is ${score}/100. `;
  
  if (score < 40) {
    summary += 'This indicates significant gaps in your digital infrastructure that are likely causing substantial revenue loss.\n\n';
  } else if (score < 60) {
    summary += 'This suggests room for improvement in your revenue capture and optimization systems.\n\n';
  } else if (score < 80) {
    summary += 'You have a solid foundation but there are optimization opportunities to unlock more revenue.\n\n';
  } else {
    summary += 'Excellent! Your systems are well-optimized for revenue capture and conversion.\n\n';
  }

  if (highPriority.length > 0) {
    summary += `We identified ${highPriority.length} critical issue(s) requiring immediate attention:\n`;
    highPriority.slice(0, 3).forEach(f => {
      summary += `• ${f.title}: ${f.whyItMatters}\n`;
    });
    summary += '\n';
  }

  summary += 'Addressing these issues systematically can significantly improve your revenue capture and reduce wasted marketing spend.';

  return summary;
}

function calculateRevenueLoss(findings: Finding[], budget: string): string {
  const budgetNum = parseBudget(budget);
  const highPriority = findings.filter(f => f.severity === 'high').length;
  const mediumPriority = findings.filter(f => f.severity === 'medium').length;

  // Estimate loss based on issues and budget
  const baseMultiplier = 0.15 + (highPriority * 0.08) + (mediumPriority * 0.03);
  const estimatedLoss = Math.round(budgetNum * baseMultiplier);

  if (estimatedLoss > 1000000) {
    return `₦${(estimatedLoss / 1000000).toFixed(1)}M - ₦${((estimatedLoss * 1.5) / 1000000).toFixed(1)}M/month`;
  } else {
    return `₦${(estimatedLoss / 1000).toFixed(0)}K - ₦${((estimatedLoss * 1.5) / 1000).toFixed(0)}K/month`;
  }
}

function generateRecommendations(findings: Finding[], answers: ScanAnswers): string[] {
  const recommendations: string[] = [];

  // Week 1 priorities
  const highPriority = findings.filter(f => f.severity === 'high');
  if (highPriority.length > 0) {
    recommendations.push(`Week 1: ${highPriority[0].fix[0]}`);
    if (highPriority.length > 1) {
      recommendations.push(`Week 1: ${highPriority[1].fix[0]}`);
    }
  }

  // Week 2 priorities
  const mediumPriority = findings.filter(f => f.severity === 'medium');
  if (mediumPriority.length > 0) {
    recommendations.push(`Week 2: ${mediumPriority[0].fix[0]}`);
  }

  // Week 3-4 priorities
  recommendations.push('Week 3: Set up proper analytics dashboard for tracking');
  recommendations.push('Week 4: Implement lead follow-up automation');

  // Business-specific recommendations
  if (answers.problem === 'low_conversion') {
    recommendations.push('Priority: A/B test your main conversion pages');
  } else if (answers.problem === 'high_cac') {
    recommendations.push('Priority: Audit and optimize ad targeting');
  } else if (answers.problem === 'no_tracking') {
    recommendations.push('Priority: Implement comprehensive tracking infrastructure');
  }

  return recommendations;
}
