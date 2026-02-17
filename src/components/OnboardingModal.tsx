import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Target,
  Flag,
  Zap,
  Clock,
  Calendar,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  Phone,
  Search,
  Download,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface OnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Outcome = 'revenue' | 'market' | 'electoral' | null;
type Urgency = 'week' | 'month' | 'quarter' | null;
type Budget = 'starter' | 'growth' | 'scale' | 'enterprise' | null;

const outcomes = [
  {
    id: 'revenue' as Outcome,
    title: 'Revenue Growth',
    description: 'Increase sales, conversions, and customer lifetime value',
    icon: TrendingUp,
    color: 'gold',
  },
  {
    id: 'market' as Outcome,
    title: 'Market Dominance',
    description: 'Capture market share and outpace competitors',
    icon: Target,
    color: 'teal',
  },
  {
    id: 'electoral' as Outcome,
    title: 'Electoral Victory',
    description: 'Win campaigns with data-driven voter engagement',
    icon: Flag,
    color: 'accent',
  },
];

const urgencies = [
  {
    id: 'week' as Urgency,
    title: 'This Week',
    description: 'Immediate implementation needed',
    icon: Zap,
    intent: 'high',
  },
  {
    id: 'month' as Urgency,
    title: 'This Month',
    description: 'Planning for near-term execution',
    icon: Clock,
    intent: 'medium',
  },
  {
    id: 'quarter' as Urgency,
    title: 'This Quarter',
    description: 'Strategic planning phase',
    icon: Calendar,
    intent: 'low',
  },
];

const budgets = [
  {
    id: 'starter' as Budget,
    title: '₦500K - ₦2M',
    description: 'Starter systems',
    range: 'starter',
  },
  {
    id: 'growth' as Budget,
    title: '₦2M - ₦10M',
    description: 'Growth systems',
    range: 'growth',
  },
  {
    id: 'scale' as Budget,
    title: '₦10M - ₦50M',
    description: 'Scale systems',
    range: 'scale',
  },
  {
    id: 'enterprise' as Budget,
    title: '₦50M+',
    description: 'Enterprise deployment',
    range: 'enterprise',
  },
];

export const OnboardingModal = ({ open, onOpenChange }: OnboardingModalProps) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [urgency, setUrgency] = useState<Urgency>(null);
  const [budget, setBudget] = useState<Budget>(null);

  const resetAndClose = () => {
    setStep(1);
    setOutcome(null);
    setUrgency(null);
    setBudget(null);
    onOpenChange(false);
  };

  const getIntent = (): 'high' | 'medium' | 'low' => {
    // High intent: urgent + high budget
    if (urgency === 'week' && (budget === 'scale' || budget === 'enterprise')) {
      return 'high';
    }
    if (urgency === 'week' && budget === 'growth') {
      return 'high';
    }
    // Medium intent: moderate urgency or moderate budget
    if (urgency === 'month' || budget === 'growth' || budget === 'scale') {
      return 'medium';
    }
    // Low intent: planning phase or starter budget
    return 'low';
  };

  const handleComplete = () => {
    const intent = getIntent();
    resetAndClose();

    if (intent === 'high') {
      // Route to book a call - open calendly or contact form
      window.open('https://calendly.com', '_blank');
    } else if (intent === 'medium') {
      // Route to scanner
      navigate('/scanner');
    } else {
      // Route to toolkit download
      // For now, we'll show a toast or navigate to resources
      navigate('/scanner');
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const canProceed = () => {
    if (step === 1) return outcome !== null;
    if (step === 2) return urgency !== null;
    if (step === 3) return budget !== null;
    return false;
  };

  const getRecommendation = () => {
    const intent = getIntent();
    if (intent === 'high') {
      return {
        title: 'Book a Strategy Call',
        description: 'Get a personalized revenue system blueprint from our team',
        icon: Phone,
        action: 'Book Call',
        color: 'gold',
      };
    }
    if (intent === 'medium') {
      return {
        title: 'Get Your Free Audit',
        description: 'Our AI will scan your systems and reveal revenue leaks',
        icon: Search,
        action: 'Start Audit',
        color: 'teal',
      };
    }
    return {
      title: 'Download the Toolkit',
      description: 'Get our revenue systems playbook to start planning',
      icon: Download,
      action: 'Get Toolkit',
      color: 'accent',
    };
  };

  return (
    <Dialog open={open} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[600px] bg-surface-elevated border-border/50 p-0 overflow-hidden">
        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold-glow"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="p-6 pt-4">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Sparkles className="w-4 h-4 text-gold" />
              Step {step} of 3
            </div>
            <DialogTitle className="text-2xl font-display">
              {step === 1 && 'What outcome are you looking for?'}
              {step === 2 && 'How soon do you need results?'}
              {step === 3 && "What's your investment range?"}
            </DialogTitle>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {/* Step 1: Outcome Selection */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                {outcomes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setOutcome(item.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4 group ${
                      outcome === item.id
                        ? item.color === 'gold'
                          ? 'border-gold bg-gold/10'
                          : item.color === 'teal'
                          ? 'border-teal bg-teal/10'
                          : 'border-accent bg-accent/10'
                        : 'border-border/50 hover:border-border bg-background hover:bg-muted/50'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        outcome === item.id
                          ? item.color === 'gold'
                            ? 'bg-gold/20 text-gold'
                            : item.color === 'teal'
                            ? 'bg-teal/20 text-teal'
                            : 'bg-accent/20 text-accent'
                          : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    {outcome === item.id && (
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          item.color === 'gold'
                            ? 'text-gold'
                            : item.color === 'teal'
                            ? 'text-teal'
                            : 'text-accent'
                        }`}
                      />
                    )}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 2: Urgency Selection */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                {urgencies.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setUrgency(item.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left flex items-center gap-4 group ${
                      urgency === item.id
                        ? 'border-gold bg-gold/10'
                        : 'border-border/50 hover:border-border bg-background hover:bg-muted/50'
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        urgency === item.id
                          ? 'bg-gold/20 text-gold'
                          : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    {urgency === item.id && <CheckCircle2 className="w-5 h-5 text-gold" />}
                  </button>
                ))}
              </motion.div>
            )}

            {/* Step 3: Budget Selection */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-3"
              >
                <div className="grid grid-cols-2 gap-3">
                  {budgets.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setBudget(item.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                        budget === item.id
                          ? 'border-gold bg-gold/10'
                          : 'border-border/50 hover:border-border bg-background hover:bg-muted/50'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                          budget === item.id
                            ? 'bg-gold/20 text-gold'
                            : 'bg-muted text-muted-foreground group-hover:bg-muted/80'
                        }`}
                      >
                        <DollarSign className="w-5 h-5" />
                      </div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </button>
                  ))}
                </div>

                {/* Show recommendation preview */}
                {budget && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-xl bg-gradient-to-br from-gold/10 to-transparent border border-gold/20"
                  >
                    <div className="flex items-center gap-2 text-sm text-gold mb-2">
                      <Sparkles className="w-4 h-4" />
                      Recommended for you
                    </div>
                    <div className="flex items-center gap-3">
                      {(() => {
                        const rec = getRecommendation();
                        return (
                          <>
                            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                              <rec.icon className="w-5 h-5 text-gold" />
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{rec.title}</div>
                              <div className="text-sm text-muted-foreground">{rec.description}</div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
            {step > 1 ? (
              <Button variant="ghost" onClick={prevStep} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <Button
                variant="hero"
                onClick={nextStep}
                disabled={!canProceed()}
                className="gap-2"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleComplete}
                disabled={!canProceed()}
                className="gap-2"
              >
                {getRecommendation().action}
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
