import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Sparkles, 
  Target, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2,
  Loader2,
  Zap,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AIRecommendation {
  id: string;
  type: 'quick_win' | 'system' | 'strategy';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  metrics: string;
}

interface ScannerResultsProps {
  answers: {
    goal: string;
    website: string;
    businessType: string;
    budget: string;
    channels: string[];
    problem: string;
  };
  scanId: string;
}

export function AIRecommendations({ answers, scanId }: ScannerResultsProps) {
  const [isGenerating, setIsGenerating] = useState(true);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [selectedRec, setSelectedRec] = useState<string | null>(null);

  useEffect(() => {
    // Simulate AI generating recommendations based on answers
    const generateRecommendations = async () => {
      setIsGenerating(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      const recs: AIRecommendation[] = [];

      // Generate recommendations based on answers
      if (answers.problem === 'low_conversion') {
        recs.push({
          id: '1',
          type: 'quick_win',
          title: 'Implement Exit Intent Popups',
          description: 'Add exit-intent triggered popups with lead capture forms. Our clients see 15-25% increase in leads within 2 weeks.',
          impact: 'high',
          effort: 'low',
          metrics: '+20% leads'
        });
        recs.push({
          id: '2',
          type: 'system',
          title: 'WhatsApp Revenue Engine',
          description: 'Connect your website forms to WhatsApp for instant lead notification and automated follow-up sequences.',
          impact: 'high',
          effort: 'medium',
          metrics: '3x response rate'
        });
      }

      if (answers.problem === 'high_cac') {
        recs.push({
          id: '3',
          type: 'system',
          title: 'Server-Side Tracking Setup',
          description: 'Implement server-side tracking to get accurate attribution and optimize your ad spend toward high-value channels.',
          impact: 'high',
          effort: 'medium',
          metrics: '40% CAC reduction'
        });
        recs.push({
          id: '4',
          type: 'strategy',
          title: 'Retargeting Funnel Optimization',
          description: 'Build a comprehensive retargeting funnel that nurtures cold audiences into buyers over 7-14 days.',
          impact: 'medium',
          effort: 'medium',
          metrics: '2.5x ROAS'
        });
      }

      if (answers.problem === 'no_followup') {
        recs.push({
          id: '5',
          type: 'system',
          title: 'Automated Lead Nurture Sequence',
          description: 'Set up WhatsApp and email automation to follow up with leads within 5 minutes of capture.',
          impact: 'high',
          effort: 'low',
          metrics: '50% more conversions'
        });
      }

      if (answers.budget && parseInt(answers.budget.split('-')[0] || '0') > 1000000) {
        recs.push({
          id: '6',
          type: 'system',
          title: 'Programmatic Ad Suite',
          description: 'Full-stack programmatic advertising with AI-optimized bidding and dynamic creative optimization.',
          impact: 'high',
          effort: 'high',
          metrics: '4x ROAS'
        });
      }

      // Always add some core recommendations
      recs.push({
        id: '7',
        type: 'quick_win',
        title: 'Google Analytics 4 Audit',
        description: 'Complete audit of your GA4 setup to ensure all events and conversions are tracking correctly.',
        impact: 'medium',
        effort: 'low',
        metrics: '100% data accuracy'
      });

      setRecommendations(recs);
      setIsGenerating(false);
    };

    generateRecommendations();
  }, [answers, scanId]);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-gold bg-gold/10 border-gold/20';
      case 'low': return 'text-muted-foreground bg-muted/50';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'text-teal';
      case 'medium': return 'text-gold';
      case 'high': return 'text-destructive';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quick_win': return Zap;
      case 'system': return Brain;
      case 'strategy': return Target;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Brain className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI Analysis Complete</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your Personalized <span className="text-gradient-gold">Revenue Roadmap</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Based on your answers, our AI has generated custom recommendations to help you achieve your goals.
        </p>
      </motion.div>

      {/* AI Analysis Status */}
      <Card className="glass-card p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-gold" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold flex items-center gap-2">
              {isGenerating ? 'AI is analyzing your data...' : 'Analysis Complete!'}
              {isGenerating && <Loader2 className="h-4 w-4 animate-spin text-gold" />}
            </h3>
            <p className="text-sm text-muted-foreground">
              Processing {answers.businessType} business data for {answers.goal} goal
            </p>
          </div>
          <Badge variant={isGenerating ? 'secondary' : 'default'} className={isGenerating ? '' : 'bg-success/20 text-success'}>
            {isGenerating ? 'Processing' : 'Ready'}
          </Badge>
        </div>
        <Progress value={isGenerating ? 60 : 100} className="h-2" />
      </Card>

      {/* Recommendations */}
      {!isGenerating && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-gold" />
              Recommended Actions
            </h3>
            <Badge variant="outline">{recommendations.length} recommendations</Badge>
          </div>

          {recommendations.map((rec, index) => {
            const Icon = getTypeIcon(rec.type);
            return (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`glass-card p-6 cursor-pointer transition-all ${
                    selectedRec === rec.id ? 'border-gold/50 ring-1 ring-gold/20' : ''
                  }`}
                  onClick={() => setSelectedRec(selectedRec === rec.id ? null : rec.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.type === 'quick_win' ? 'bg-success/20' : 
                      rec.type === 'system' ? 'bg-gold/20' : 'bg-primary/20'
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        rec.type === 'quick_win' ? 'text-success' : 
                        rec.type === 'system' ? 'text-gold' : 'text-primary'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <Badge className={getImpactColor(rec.impact)}>
                          {rec.impact} impact
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{rec.description}</p>
                      
                      <AnimatePresence>
                        {selectedRec === rec.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Effort</p>
                                  <p className={`font-medium text-sm capitalize ${getEffortColor(rec.effort)}`}>{rec.effort}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Expected Impact</p>
                                  <p className="font-medium text-sm text-gold">{rec.metrics}</p>
                                </div>
                              </div>
                              <Button variant="gold" size="sm" className="gap-2">
                                Implement <ArrowRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {!selectedRec && (
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-muted-foreground">Effort: <span className={getEffortColor(rec.effort)}>{rec.effort}</span></span>
                          <span className="text-muted-foreground">Expected: <span className="text-gold">{rec.metrics}</span></span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button variant="gold" size="lg" className="flex-1 gap-2">
              Book Strategy Call <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" className="flex-1 gap-2">
              <MessageSquare className="w-4 h-4" />
              Discuss with Expert
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
