import { SCORING_RULE_VERSION } from './analysis.ts';
import type { EvidenceData, ScanAnswers } from './analysis.ts';

export const SCORING_VERSION = SCORING_RULE_VERSION;

export type Severity = 'high' | 'medium' | 'low';

export interface Finding {
  id: string;
  category: string;
  title: string;
  severity: Severity;
  evidence: string;
  whyItMatters: string;
  fix: string[];
  estimatedImpact: string;
  ruleVersion: string;
}

export interface CategoryScore {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
}

export interface ScoreResult {
  score: number;
  maxScore: number;
  maturityLevel: string;
  findings: Finding[];
  categoryScores: CategoryScore[];
  ruleVersion: string;
}

function generateId(category: string, title: string): string {
  const hash = Array.from(category + title).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return `find_${Math.abs(hash).toString(36)}_${Date.now().toString(36)}`;
}

export function parseBudget(budget: string): number {
  const budgetMap: Record<string, number> = {
    '0-100000': 50000,
    '100000-500000': 300000,
    '500000-1000000': 750000,
    '1000000-5000000': 3000000,
    '5000000+': 7500000,
  };
  return budgetMap[budget] || 0;
}

function createFinding(params: Omit<Finding, 'id' | 'ruleVersion'>): Finding {
  return {
    ...params,
    id: generateId(params.category, params.title),
    ruleVersion: SCORING_VERSION,
  };
}

export function calculateScore(evidence: EvidenceData, answers: ScanAnswers): ScoreResult {
  const findings: Finding[] = [];
  const categoryScores: CategoryScore[] = [];

  const categoryConfigs = [
    { id: 'tracking', name: 'Tracking & Attribution', maxScore: 25, weight: 0.25 },
    { id: 'performance', name: 'Performance', maxScore: 25, weight: 0.25 },
    { id: 'lead_capture', name: 'Lead Capture', maxScore: 20, weight: 0.20 },
    { id: 'funnel_clarity', name: 'Funnel Clarity', maxScore: 15, weight: 0.15 },
    { id: 'follow_up', name: 'Follow-up System', maxScore: 15, weight: 0.15 },
  ];

  for (const config of categoryConfigs) {
    categoryScores.push({
      id: config.id,
      name: config.name,
      score: 0,
      maxScore: config.maxScore,
      weight: config.weight,
    });
  }

  const trackingCategory = categoryScores.find(c => c.id === 'tracking')!;
  const performanceCategory = categoryScores.find(c => c.id === 'performance')!;
  const leadCaptureCategory = categoryScores.find(c => c.id === 'lead_capture')!;
  const funnelClarityCategory = categoryScores.find(c => c.id === 'funnel_clarity')!;
  const followUpCategory = categoryScores.find(c => c.id === 'follow_up')!;

  if (evidence.httpStatus === 0 || !evidence.finalUrl) {
    findings.push(createFinding({
      category: 'technical',
      title: 'Technical Analysis Failure',
      severity: 'high',
      evidence: 'Could not fetch or analyze the website',
      whyItMatters: 'Cannot provide accurate recommendations without analysis',
      fix: [
        'Verify website is accessible',
        'Check for blocking by firewall/CDN',
        'Ensure website allows bot access',
      ],
      estimatedImpact: 'Analysis unavailable - cannot quantify impact',
    }));
    return {
      score: 0,
      maxScore: 100,
      maturityLevel: 'Analysis Failed',
      findings,
      categoryScores,
      ruleVersion: SCORING_VERSION,
    };
  }

  if (evidence.httpStatus >= 400) {
    findings.push(createFinding({
      category: 'technical',
      title: 'Website Returns Error',
      severity: 'high',
      evidence: `HTTP ${evidence.httpStatus} - Final URL: ${evidence.finalUrl}`,
      whyItMatters: 'Website may be down or blocking access',
      fix: [
        'Verify website is working in browser',
        'Check for 404/500 errors',
        'Review server configuration',
      ],
      estimatedImpact: 'Potential customers cannot access your site',
    }));
  }

  if (evidence.redirectInfo) {
    findings.push(createFinding({
      category: 'technical',
      title: 'URL Redirect Detected',
      severity: 'low',
      evidence: evidence.redirectInfo,
      whyItMatters: 'Redirects can impact SEO and user experience',
      fix: [
        'Review redirect chain',
        'Consider updating links to final URL',
      ],
      estimatedImpact: 'Minor SEO and performance impact',
    }));
  }

  if (evidence.hasAnalytics) {
    trackingCategory.score += 8;
    if (evidence.analyticsType.includes('google-analytics')) {
      trackingCategory.score += 3;
    }
    if (evidence.analyticsType.includes('google-tag-manager')) {
      trackingCategory.score += 4;
    }
  } else {
    findings.push(createFinding({
      category: 'tracking',
      title: 'Missing Analytics Platform',
      severity: 'high',
      evidence: 'No analytics tracking code detected',
      whyItMatters: 'You cannot measure website performance or user behavior without analytics',
      fix: [
        'Install Google Analytics 4',
        'Set up conversion goals',
        'Link with Google Ads',
      ],
      estimatedImpact: '100K-500K/month in unmeasured opportunity cost',
    }));
  }

  if (evidence.analyticsType.includes('google-tag-manager')) {
    trackingCategory.score += 7;
  } else {
    findings.push(createFinding({
      category: 'tracking',
      title: 'Missing Google Tag Manager',
      severity: 'medium',
      evidence: 'No GTM container detected',
      whyItMatters: 'GTM simplifies tracking management and enables advanced event tracking',
      fix: [
        'Install GTM container',
        'Migrate existing tags to GTM',
        'Set up event tracking',
      ],
      estimatedImpact: '15-20% faster tracking implementation',
    }));
  }

  const budgetNum = parseBudget(answers.budget);
  if (evidence.analyticsType.includes('meta-pixel')) {
    trackingCategory.score += 10;
  } else {
    if (budgetNum > 200000) {
      findings.push(createFinding({
        category: 'tracking',
        title: 'Missing Meta Pixel',
        severity: 'high',
        evidence: 'No Facebook/Meta Pixel detected despite significant ad spend',
        whyItMatters: 'Ad spend cannot be optimized without proper conversion tracking',
        fix: [
          'Install Meta Pixel',
          'Set up standard events',
          'Configure Conversions API',
        ],
        estimatedImpact: `${Math.round(budgetNum * 0.2).toLocaleString()}/month in wasted ad spend`,
      }));
    } else {
      findings.push(createFinding({
        category: 'tracking',
        title: 'Missing Meta Pixel',
        severity: 'medium',
        evidence: 'No Facebook/Meta Pixel detected',
        whyItMatters: 'You cannot track or optimize social media advertising',
        fix: [
          'Install Meta Pixel',
          'Set up standard events',
        ],
        estimatedImpact: 'Future social ads will underperform',
      }));
    }
  }

  if (evidence.hasSSL) {
    performanceCategory.score += 10;
  } else {
    findings.push(createFinding({
      category: 'performance',
      title: 'No SSL Certificate',
      severity: 'high',
      evidence: 'Website does not use HTTPS',
      whyItMatters: 'Browsers show security warnings, damaging trust and SEO',
      fix: [
        'Install SSL certificate',
        'Redirect HTTP to HTTPS',
      ],
      estimatedImpact: 'Up to 30% visitor drop-off',
    }));
  }

  if (evidence.hasViewport) {
    performanceCategory.score += 5;
  } else {
    findings.push(createFinding({
      category: 'performance',
      title: 'Not Mobile Optimized',
      severity: 'medium',
      evidence: 'No viewport meta tag detected',
      whyItMatters: 'Mobile users will have poor experience',
      fix: [
        'Add viewport meta tag',
        'Implement responsive design',
      ],
      estimatedImpact: '40-60% of traffic may bounce',
    }));
  }

  if (evidence.loadTimeMs < 3000) {
    performanceCategory.score += 10;
  } else if (evidence.loadTimeMs < 5000) {
    performanceCategory.score += 5;
    findings.push(createFinding({
      category: 'performance',
      title: 'Slow Page Load',
      severity: 'medium',
      evidence: `Page took ${(evidence.loadTimeMs / 1000).toFixed(1)}s to load`,
      whyItMatters: 'Every second delay reduces conversions by 7%',
      fix: [
        'Optimize images',
        'Enable caching',
        'Minify CSS/JS',
      ],
      estimatedImpact: '10-20% conversion improvement possible',
    }));
  } else {
    findings.push(createFinding({
      category: 'performance',
      title: 'Very Slow Page Load',
      severity: 'high',
      evidence: `Page took ${(evidence.loadTimeMs / 1000).toFixed(1)}s to load`,
      whyItMatters: 'Users abandon slow sites, directly losing sales',
      fix: [
        'Audit performance',
        'Optimize images',
        'Consider CDN',
        'Upgrade hosting',
      ],
      estimatedImpact: '30-50% potential conversion improvement',
    }));
  }

  if (evidence.hasForms) {
    leadCaptureCategory.score += 10;
    if (evidence.formsCount < 2) {
      findings.push(createFinding({
        category: 'lead_capture',
        title: 'Limited Lead Capture Forms',
        severity: 'low',
        evidence: `Only ${evidence.formsCount} form(s) found`,
        whyItMatters: 'More strategic forms increase lead capture',
        fix: [
          'Add newsletter signup',
          'Add lead magnet forms',
          'Add popup forms',
        ],
        estimatedImpact: '20-40% more leads captured',
      }));
    }
  } else {
    findings.push(createFinding({
      category: 'lead_capture',
      title: 'No Lead Capture Forms',
      severity: 'high',
      evidence: 'No contact forms detected on the page',
      whyItMatters: 'Visitors have no way to convert or contact you',
      fix: [
        'Add contact form',
        'Add lead capture popup',
        'Add newsletter signup',
      ],
      estimatedImpact: 'Critical - losing 100% of potential leads',
    }));
  }

  if (evidence.hasWhatsApp) {
    leadCaptureCategory.score += 10;
  } else if (answers.channels.includes('whatsapp')) {
    findings.push(createFinding({
      category: 'lead_capture',
      title: 'WhatsApp Link Missing',
      severity: 'medium',
      evidence: 'No WhatsApp link found despite using WhatsApp for leads',
      whyItMatters: 'Visitors cannot easily reach you via preferred channel',
      fix: [
        'Add WhatsApp click-to-chat button',
        'Add WhatsApp Business link',
      ],
      estimatedImpact: '15-30% more WhatsApp inquiries',
    }));
  }

  if (evidence.hasCTAs) {
    if (evidence.ctasCount >= 5) {
      funnelClarityCategory.score += 15;
    } else {
      funnelClarityCategory.score += 8;
      findings.push(createFinding({
        category: 'funnel_clarity',
        title: 'Weak Call-to-Actions',
        severity: 'low',
        evidence: `Only ${evidence.ctasCount} CTA elements found`,
        whyItMatters: 'Users need clear direction on next steps',
        fix: [
          'Add prominent CTAs above fold',
          'Use action-oriented language',
          'Add urgency elements',
        ],
        estimatedImpact: '10-25% conversion improvement',
      }));
    }
  } else {
    findings.push(createFinding({
      category: 'funnel_clarity',
      title: 'No Clear Call-to-Actions',
      severity: 'high',
      evidence: 'No clear CTA elements detected',
      whyItMatters: 'Visitors don\'t know what action to take',
      fix: [
        'Add primary CTA button',
        'Make CTAs visually prominent',
        'Use compelling copy',
      ],
      estimatedImpact: '50%+ conversion improvement possible',
    }));
  }

  if (answers.channels.length > 2) {
    followUpCategory.score += 10;
  } else if (answers.channels.length > 0) {
    followUpCategory.score += 5;
    findings.push(createFinding({
      category: 'follow_up',
      title: 'Limited Lead Channels',
      severity: 'medium',
      evidence: `Only ${answers.channels.length} lead channel(s) in use`,
      whyItMatters: 'Diversified channels increase lead capture',
      fix: [
        'Add email capture',
        'Implement live chat',
        'Set up SMS follow-up',
      ],
      estimatedImpact: '25-40% more leads captured',
    }));
  } else {
    findings.push(createFinding({
      category: 'follow_up',
      title: 'No Clear Follow-up System',
      severity: 'high',
      evidence: 'No lead channels identified',
      whyItMatters: 'Leads go cold without systematic follow-up',
      fix: [
        'Implement CRM',
        'Set up email automation',
        'Create follow-up sequences',
      ],
      estimatedImpact: '60%+ of leads currently lost',
    }));
  }

  if (answers.channels.includes('none')) {
    followUpCategory.score = 0;
    findings.push(createFinding({
      category: 'follow_up',
      title: 'No Lead Management System',
      severity: 'high',
      evidence: 'User indicated no clear lead management system',
      whyItMatters: 'Leads are being lost due to lack of process',
      fix: [
        'Implement CRM system',
        'Set up lead notifications',
        'Create follow-up workflow',
      ],
      estimatedImpact: '500K-2M/month in lost opportunities',
    }));
  } else {
    followUpCategory.score += 5;
  }

  const totalScore = categoryScores.reduce((sum, cat) => sum + cat.score, 0);

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

  findings.sort((a, b) => {
    const severityOrder = { high: 0, medium: 1, low: 2 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return {
    score: totalScore,
    maxScore: 100,
    maturityLevel,
    findings,
    categoryScores,
    ruleVersion: SCORING_VERSION,
  };
}