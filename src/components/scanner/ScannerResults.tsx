import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  CheckCircle,
  MessageCircle,
  Phone,
  RotateCcw,
  TrendingDown,
  XCircle,
} from 'lucide-react';
import { fetchScannerResults, fetchScannerStatus, type ScannerStatusRecord } from '@/lib/scanner-client';

interface ScannerResultsProps {
  scanId: string;
  publicToken: string;
  onRestart: () => void;
}

interface Finding {
  id?: string;
  category?: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  evidence: string;
  whyItMatters: string;
  fix: string[];
  estimatedImpact: string;
}

interface Recommendation {
  priority: 'critical' | 'measurement' | 'conversion' | 'crm';
  timeframe: string;
  title: string;
  description: string;
  relatedFindingId?: string;
}

interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
}

interface ScanResult {
  score: number;
  maturity_level: string;
  findings: Finding[];
  recommendations: Recommendation[];
  category_scores: Record<string, CategoryScore>;
  ai_summary: string;
  estimated_revenue_loss: string;
}

const priorityCopy: Record<Recommendation['priority'], { label: string; className: string }> = {
  critical: { label: 'Critical', className: 'bg-red-500/15 text-red-500 border-red-500/30' },
  measurement: { label: 'Measurement', className: 'bg-blue-500/15 text-blue-500 border-blue-500/30' },
  conversion: { label: 'Conversion', className: 'bg-gold/15 text-gold border-gold/30' },
  crm: { label: 'CRM', className: 'bg-green-500/15 text-green-500 border-green-500/30' },
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs Work';
  return 'Critical';
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'high':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'medium':
      return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    case 'low':
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    default:
      return null;
  }
};

const getSeverityBg = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-500/10 border-red-500/30';
    case 'medium':
      return 'bg-yellow-500/10 border-yellow-500/30';
    case 'low':
      return 'bg-green-500/10 border-green-500/30';
    default:
      return 'bg-muted';
  }
};

const normalizeRecommendations = (value: unknown): Recommendation[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item) => {
    if (typeof item === 'string') {
      return [{
        priority: 'measurement' as const,
        timeframe: 'Backlog',
        title: item,
        description: item,
      }];
    }

    if (
      item &&
      typeof item === 'object' &&
      'title' in item &&
      'description' in item &&
      'priority' in item &&
      'timeframe' in item
    ) {
      const candidate = item as Recommendation;
      return [candidate];
    }

    return [];
  });
};

export const ScannerResults = ({ scanId, publicToken, onRestart }: ScannerResultsProps) => {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scan, setScan] = useState<ScannerStatusRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  useEffect(() => {
    const loadResults = async () => {
      try {
        const [scanData, resultData] = await Promise.all([
          fetchScannerStatus(scanId, publicToken),
          fetchScannerResults(scanId, publicToken),
        ]);

        setScan(scanData);
        setResult({
          score: resultData.score,
          maturity_level: resultData.maturity_level,
          findings: (resultData.findings as Finding[]) || [],
          recommendations: normalizeRecommendations(resultData.recommendations),
          category_scores: (resultData.category_scores as Record<string, CategoryScore>) || {},
          ai_summary: resultData.ai_summary || '',
          estimated_revenue_loss: resultData.estimated_revenue_loss || '',
        });
        setLoadError(null);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoadError(error instanceof Error ? error.message : 'Unable to load scan results.');

        try {
          const scanData = await fetchScannerStatus(scanId, publicToken);
          setScan(scanData);
        } catch (scanError) {
          console.error('Error fetching scan fallback state:', scanError);
        }
      } finally {
        setLoading(false);
      }
    };

    void loadResults();
  }, [scanId, publicToken]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    if (scan?.status === 'failed') {
      return (
        <div className="text-center py-20">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-foreground mb-2">This scan failed before results were generated.</p>
          <p className="text-muted-foreground">
            {scan.error_message || 'No failure reason was recorded.'}
          </p>
          <Button onClick={onRestart} className="mt-4">
            Start New Scan
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">
          {loadError || 'No results found. Please try again.'}
        </p>
        <Button onClick={onRestart} className="mt-4">
          Start New Scan
        </Button>
      </div>
    );
  }

  const highPriorityFindings = result.findings.filter((finding) => finding.severity === 'high');
  const categoryScoresArray = Object.values(result.category_scores);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Your Revenue Diagnostic Report
        </h1>
        <p className="text-lg text-muted-foreground">
          Here&apos;s what we found about your revenue systems
        </p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="glass-card p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center">
                <svg className="w-40 h-40">
                  <circle className="text-muted" strokeWidth="12" stroke="currentColor" fill="transparent" r="58" cx="80" cy="80" />
                  <circle
                    className={getScoreColor(result.score)}
                    strokeWidth="12"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * result.score) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="80"
                    cy="80"
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                  <span className="text-sm text-muted-foreground">out of 100</span>
                </div>
              </div>
              <p className={`font-semibold text-lg mt-2 ${getScoreColor(result.score)}`}>{getScoreLabel(result.score)}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Maturity Level</h3>
              <p className="text-2xl font-bold text-foreground mb-4">{result.maturity_level}</p>

              <h3 className="text-sm font-medium text-muted-foreground mb-2">Estimated Revenue Loss</h3>
              <p className="text-xl font-bold text-red-500 flex items-center gap-2">
                <TrendingDown className="w-5 h-5" />
                {result.estimated_revenue_loss || 'Calculating...'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Critical Issues</span>
                <span className="text-xl font-bold text-red-500">{highPriorityFindings.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Findings</span>
                <span className="text-xl font-bold text-foreground">{result.findings.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Recommendations</span>
                <span className="text-xl font-bold text-gold">{result.recommendations.length}</span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {result.ai_summary && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <Card className="glass-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">Executive Summary</h2>
            <p className="text-muted-foreground whitespace-pre-line">{result.ai_summary}</p>
          </Card>
        </motion.div>
      )}

      {result.recommendations.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
          <Card className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Recommended Action Plan</h2>
                <p className="text-sm text-muted-foreground">Prioritized fixes based on the latest scan findings.</p>
              </div>
            </div>
            <div className="grid gap-4">
              {result.recommendations.map((recommendation, index) => (
                <div key={`${recommendation.title}-${index}`} className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${priorityCopy[recommendation.priority].className}`}>
                      {priorityCopy[recommendation.priority].label}
                    </span>
                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                      {recommendation.timeframe}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground">{recommendation.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{recommendation.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {categoryScoresArray.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Card className="glass-card p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Category Breakdown</h2>
            <div className="space-y-4">
              {categoryScoresArray.map((category, index) => (
                <div key={`${category.name}-${index}`}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-foreground font-medium">{category.name}</span>
                    <span className="text-muted-foreground">{category.score} / {category.maxScore}</span>
                  </div>
                  <Progress value={(category.score / category.maxScore) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Card className="glass-card p-6 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Detailed Findings</h2>
          <div className="space-y-4">
            {result.findings.map((finding, index) => (
              <div
                key={`${finding.title}-${index}`}
                className={`p-4 rounded-xl border ${getSeverityBg(finding.severity)} cursor-pointer transition-all`}
                onClick={() => setExpandedFinding(expandedFinding === index ? null : index)}
              >
                <div className="flex items-start gap-3">
                  {getSeverityIcon(finding.severity)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-semibold text-foreground">{finding.title}</h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded ${
                          finding.severity === 'high'
                            ? 'bg-red-500/20 text-red-500'
                            : finding.severity === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-500'
                              : 'bg-green-500/20 text-green-500'
                        }`}
                      >
                        {finding.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{finding.evidence}</p>

                    {expandedFinding === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-border/50"
                      >
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium text-foreground">Why It Matters</p>
                            <p className="text-sm text-muted-foreground">{finding.whyItMatters}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">How to Fix</p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground">
                              {finding.fix.map((step, stepIndex) => (
                                <li key={`${finding.title}-${stepIndex}`}>{step}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">Estimated Impact</p>
                            <p className="text-sm text-gold">{finding.estimatedImpact}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Card className="glass-card p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to Fix These Issues?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team can implement these fixes and optimize your revenue systems. Book a free strategy call to discuss your results.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button variant="gold" size="lg" className="gap-2">
              <Phone className="w-4 h-4" />
              Book Strategy Call
            </Button>
            <Button variant="heroOutline" size="lg" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="ghost" onClick={onRestart} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              Scan Another Website
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
