import type { Finding } from './scoring.ts';
import { parseBudget } from './scoring.ts';

export interface SummaryResult {
  aiSummary: string;
  isFallback: boolean;
  estimatedRevenueLoss: string;
}

function cleanCurrencyText(text: string): string {
  return text
    .replace(/['\u2018\u2019]/g, "'")
    .replace(/[""\u201C\u201D\u201E]/g, '"')
    .replace(/\uFFFD/g, '')
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, (char) => {
      if (char === '₦') return '₦';
      if (char === '\u2013' || char === '\u2014') return '-';
      return '';
    });
}

export function generateAISummary(
  findings: Finding[],
  answers: { goal: string; businessType: string; budget: string; problem: string },
  score: number
): Promise<SummaryResult> {
  return generateSummary(findings, answers, score);
}

async function generateSummary(
  findings: Finding[],
  answers: { goal: string; businessType: string; budget: string; problem: string },
  score: number
): Promise<SummaryResult> {
  const apiKey = Deno.env.get('LOVABLE_API_KEY');
  
  if (!apiKey) {
    return generateFallbackSummary(findings, answers, score);
  }

  try {
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
    const summary = data.choices?.[0]?.message?.content;
    
    if (!summary) {
      return generateFallbackSummary(findings, answers, score);
    }

    const cleanedSummary = cleanCurrencyText(summary);
    const estimatedLoss = calculateRevenueLoss(findings, answers.budget);

    return {
      aiSummary: cleanedSummary,
      isFallback: false,
      estimatedRevenueLoss: estimatedLoss,
    };

  } catch (error) {
    console.error('AI summary error:', error);
    return generateFallbackSummary(findings, answers, score);
  }
}

export function generateFallbackSummary(
  findings: Finding[],
  answers: { budget: string },
  score: number
): SummaryResult {
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

  const cleanedSummary = cleanCurrencyText(summary);
  const estimatedLoss = calculateRevenueLoss(findings, answers.budget);

  return {
    aiSummary: cleanedSummary,
    isFallback: true,
    estimatedRevenueLoss: estimatedLoss,
  };
}

export function calculateRevenueLoss(findings: Finding[], budget: string): string {
  const budgetNum = parseBudget(budget);
  const highPriority = findings.filter(f => f.severity === 'high').length;
  const mediumPriority = findings.filter(f => f.severity === 'medium').length;

  const baseMultiplier = 0.15 + (highPriority * 0.08) + (mediumPriority * 0.03);
  const estimatedLoss = Math.round(budgetNum * baseMultiplier);

  let formattedLoss: string;
  if (estimatedLoss > 1000000) {
    formattedLoss = `${(estimatedLoss / 1000000).toFixed(1)}M - ${((estimatedLoss * 1.5) / 1000000).toFixed(1)}M/month`;
  } else {
    formattedLoss = `${(estimatedLoss / 1000).toFixed(0)}K - ${((estimatedLoss * 1.5) / 1000).toFixed(0)}K/month`;
  }

  return cleanCurrencyText(formattedLoss);
}