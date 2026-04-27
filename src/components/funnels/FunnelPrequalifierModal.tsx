'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Briefcase, Compass, Vote } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { conversionFunnels, type FunnelId } from '@/data/conversionFunnels';

interface FunnelPrequalifierModalProps {
  funnelId: FunnelId | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const icons = {
  'drive-revenue': Briefcase,
  'own-your-market': Compass,
  'win-elections': Vote,
};

export const FunnelPrequalifierModal = ({
  funnelId,
  open,
  onOpenChange,
}: FunnelPrequalifierModalProps) => {
  const router = useRouter();
  const funnel = funnelId ? conversionFunnels[funnelId] : null;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const Icon = funnel ? icons[funnel.id] : Briefcase;

  const activeStep = useMemo(() => {
    if (!funnel) return null;
    return funnel.prequalifier[stepIndex] ?? null;
  }, [funnel, stepIndex]);

  const reset = (nextOpen: boolean) => {
    if (!nextOpen) {
      setStepIndex(0);
      setAnswers({});
    }
    onOpenChange(nextOpen);
  };

  const canContinue = activeStep ? Boolean(answers[activeStep.id]) : false;

  const handleContinue = () => {
    if (!funnel || !activeStep) return;

    if (stepIndex < funnel.prequalifier.length - 1) {
      setStepIndex((current) => current + 1);
      return;
    }

    const params = new URLSearchParams(answers);
    router.push(`${funnel.route}?${params.toString()}`);
    reset(false);
  };

  if (!funnel || !activeStep) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="overflow-hidden border-border/60 bg-card/95 p-0 sm:max-w-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--gold)/0.18),transparent_35%),radial-gradient(circle_at_bottom_left,hsl(var(--teal)/0.16),transparent_35%)]" />
        <div className="relative border-b border-border/50 px-6 py-5">
          <DialogHeader className="space-y-0">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                  Intent Router
                </p>
                <DialogTitle className="mt-1 text-2xl font-display">{funnel.buttonLabel}</DialogTitle>
              </div>
            </div>
            <DialogDescription className="max-w-xl text-sm leading-6 text-muted-foreground">
              Two quick qualifiers, then we route you into the full {funnel.destinationLabel.toLowerCase()} with context prefilled.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex gap-2">
            {funnel.prequalifier.map((step, index) => (
              <div
                key={step.id}
                className={cn(
                  'h-1.5 flex-1 rounded-full transition-colors',
                  index <= stepIndex ? 'bg-gold' : 'bg-muted',
                )}
              />
            ))}
          </div>
        </div>

        <div className="relative px-6 py-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Step {stepIndex + 1} of {funnel.prequalifier.length}
          </p>
          <h3 className="mt-2 text-2xl font-display text-foreground">{activeStep.prompt}</h3>

          <div className="mt-6 grid gap-3">
            {activeStep.options.map((option) => {
              const selected = answers[activeStep.id] === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setAnswers((current) => ({ ...current, [activeStep.id]: option.value }))}
                  className={cn(
                    'rounded-2xl border px-4 py-4 text-left transition-all',
                    selected
                      ? 'border-gold bg-gold/10 text-foreground shadow-[0_0_36px_-18px_hsl(var(--gold))]'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:border-gold/40 hover:text-foreground',
                  )}
                >
                  <span className="text-base font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-5">
            <Button
              variant="ghost"
              onClick={() => setStepIndex((current) => Math.max(0, current - 1))}
              disabled={stepIndex === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button variant="gold" onClick={handleContinue} disabled={!canContinue} className="gap-2">
              {stepIndex === funnel.prequalifier.length - 1 ? 'Continue to Diagnostic' : 'Continue'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
