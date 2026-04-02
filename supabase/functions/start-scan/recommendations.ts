import type { Finding, Severity } from './scoring.ts';

export type RecommendationPriority = 'critical' | 'measurement' | 'conversion' | 'crm';

export interface Recommendation {
  priority: RecommendationPriority;
  timeframe: string;
  title: string;
  description: string;
  relatedFindingId?: string;
}

export interface RecommendationsResult {
  recommendations: Recommendation[];
  critical: Recommendation[];
  measurement: Recommendation[];
  conversion: Recommendation[];
  crm: Recommendation[];
}

function classifyByPriority(finding: Finding): RecommendationPriority {
  const categoryLower = (finding.category || '').toLowerCase();
  
  if (categoryLower === 'technical') {
    if (finding.title.toLowerCase().includes('failure') || 
        finding.title.toLowerCase().includes('error') ||
        finding.title.toLowerCase().includes('redirect')) {
      return 'measurement';
    }
    return 'critical';
  }
  
  if (categoryLower === 'tracking' || categoryLower === 'performance') {
    return 'measurement';
  }
  
  if (categoryLower === 'lead_capture' || categoryLower === 'funnel_clarity') {
    return 'conversion';
  }
  
  if (categoryLower === 'follow_up') {
    return 'crm';
  }
  
  if (finding.severity === 'high') {
    return 'critical';
  }
  
  return 'measurement';
}

function timeframeForPriority(priority: RecommendationPriority, index: number): string {
  switch (priority) {
    case 'critical':
      return index === 0 ? 'Week 1' : 'Week 2';
    case 'measurement':
      return index < 2 ? 'Week 2' : 'Week 3';
    case 'conversion':
      return index < 2 ? 'Week 3' : 'Week 4';
    case 'crm':
      return 'Week 4+';
    default:
      return 'Week 1';
  }
}

export function generateRecommendations(
  findings: Finding[],
  answers: { problem: string; channels: string[] }
): RecommendationsResult {
  const recommendations: Recommendation[] = [];

  const highSeverity = findings.filter(f => f.severity === 'high');
  const mediumSeverity = findings.filter(f => f.severity === 'medium');
  const lowSeverity = findings.filter(f => f.severity === 'low');

  const criticalFindings = [...highSeverity];
  const measurementFindings = mediumSeverity.filter(f => {
    const cat = (f.category || '').toLowerCase();
    return cat === 'tracking' || cat === 'performance';
  });
  const conversionFindings = [...mediumSeverity.filter(f => {
    const cat = (f.category || '').toLowerCase();
    return cat === 'lead_capture' || cat === 'funnel_clarity';
  }), ...lowSeverity.filter(f => {
    const cat = (f.category || '').toLowerCase();
    return cat === 'lead_capture' || cat === 'funnel_clarity';
  })];
  const crmFindings = mediumSeverity.filter(f => {
    const cat = (f.category || '').toLowerCase();
    return cat === 'follow_up';
  });

  const addRecommendations = (findingList: Finding[], priority: RecommendationPriority) => {
    const priorityFindings = findingList.filter(f => classifyByPriority(f) === priority);
    priorityFindings.forEach((finding, idx) => {
      recommendations.push({
        priority,
        timeframe: timeframeForPriority(priority, idx),
        title: finding.title,
        description: finding.fix[0] || 'Review and implement fix',
        relatedFindingId: finding.id,
      });
    });
  };

  addRecommendations(criticalFindings, 'critical');
  addRecommendations(measurementFindings, 'measurement');
  addRecommendations(conversionFindings, 'conversion');
  addRecommendations(crmFindings, 'crm');

  if (answers.problem === 'low_conversion' && !recommendations.some(r => r.title.toLowerCase().includes('a/b'))) {
    recommendations.push({
      priority: 'conversion',
      timeframe: 'Week 3',
      title: 'A/B Test Main Conversion Pages',
      description: 'Run A/B tests on primary conversion pages to improve conversion rates',
    });
  } else if (answers.problem === 'high_cac' && !recommendations.some(r => r.title.toLowerCase().includes('targeting'))) {
    recommendations.push({
      priority: 'measurement',
      timeframe: 'Week 2',
      title: 'Audit and Optimize Ad Targeting',
      description: 'Review audience targeting to reduce customer acquisition cost',
    });
  } else if (answers.problem === 'no_tracking' && !recommendations.some(r => r.title.toLowerCase().includes('tracking'))) {
    recommendations.push({
      priority: 'measurement',
      timeframe: 'Week 1',
      title: 'Implement Comprehensive Tracking',
      description: 'Set up analytics infrastructure for full funnel visibility',
    });
  }

  if (!recommendations.some(r => r.title.toLowerCase().includes('analytics dashboard'))) {
    recommendations.push({
      priority: 'measurement',
      timeframe: 'Week 3',
      title: 'Set Up Analytics Dashboard',
      description: 'Create tracking dashboard for ongoing performance monitoring',
    });
  }

  if (!recommendations.some(r => r.title.toLowerCase().includes('lead follow'))) {
    recommendations.push({
      priority: 'crm',
      timeframe: 'Week 4',
      title: 'Implement Lead Follow-up Automation',
      description: 'Set up automated follow-up sequences for captured leads',
    });
  }

  const result: RecommendationsResult = {
    recommendations,
    critical: recommendations.filter(r => r.priority === 'critical'),
    measurement: recommendations.filter(r => r.priority === 'measurement'),
    conversion: recommendations.filter(r => r.priority === 'conversion'),
    crm: recommendations.filter(r => r.priority === 'crm'),
  };

  return result;
}