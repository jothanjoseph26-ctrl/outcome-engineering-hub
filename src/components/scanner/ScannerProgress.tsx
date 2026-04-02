import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  AlertTriangle,
  Brain,
  CheckCircle,
  Code,
  Loader2,
  RotateCcw,
  Search,
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { fetchScannerStatus, type ScannerStatusRecord } from '@/lib/scanner-client';

interface ScannerProgressProps {
  scanId: string;
  publicToken: string;
  onComplete: () => void;
  onRestart: () => void;
}

type ScanPhase = 'queued' | 'fetching' | 'analyzing' | 'generating' | 'complete' | 'failed';

const phases: { id: ScanPhase; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'queued', label: 'Queued', icon: <Loader2 className="w-5 h-5" />, description: 'Preparing your scan job...' },
  { id: 'fetching', label: 'Fetching Website', icon: <Search className="w-5 h-5" />, description: 'Downloading your website content...' },
  { id: 'analyzing', label: 'Analyzing Site', icon: <Code className="w-5 h-5" />, description: 'Reviewing tracking, forms, and revenue systems...' },
  { id: 'generating', label: 'Generating Report', icon: <Brain className="w-5 h-5" />, description: 'AI is crafting your insights...' },
  { id: 'complete', label: 'Complete', icon: <CheckCircle className="w-5 h-5" />, description: 'Your report is ready!' },
  { id: 'failed', label: 'Failed', icon: <AlertTriangle className="w-5 h-5" />, description: 'The scan stopped before it could finish.' },
];

const getCurrentPhase = (scan: ScannerStatusRecord | null): ScanPhase => {
  if (!scan) {
    return 'queued';
  }

  if (scan.status === 'failed') {
    return 'failed';
  }

  if (scan.status === 'completed' || scan.current_step === 'finished') {
    return 'complete';
  }

  if (scan.current_step === 'generating_summary') {
    return 'generating';
  }

  if (scan.status === 'analyzing' || scan.current_step === 'analyzing') {
    return 'analyzing';
  }

  if (scan.status === 'running' || scan.current_step === 'fetching') {
    return 'fetching';
  }

  return 'queued';
};

const formatStepLabel = (value: string | null) => {
  if (!value) {
    return 'Preparing Scan';
  }

  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

export const ScannerProgress = ({ scanId, publicToken, onComplete, onRestart }: ScannerProgressProps) => {
  const [scan, setScan] = useState<ScannerStatusRecord | null>(null);
  const [pollError, setPollError] = useState<string | null>(null);
  const [isRetrying, setIsRetrying] = useState(false);
  const completionTriggeredRef = useRef(false);

  useEffect(() => {
    let active = true;

    const pollScan = async () => {
      try {
        const nextScan = await fetchScannerStatus(scanId, publicToken);

        if (!active) {
          return;
        }

        setScan(nextScan);
        setPollError(null);

        if (nextScan.status === 'completed' && !completionTriggeredRef.current) {
          completionTriggeredRef.current = true;
          window.setTimeout(onComplete, 1000);
        }
      } catch (error) {
        console.error('Error polling scan status:', error);

        if (!active) {
          return;
        }

        setPollError(error instanceof Error ? error.message : 'Unable to load scan progress.');
      }
    };

    void pollScan();

    const pollInterval = window.setInterval(() => {
      void pollScan();
    }, 2000);

    return () => {
      active = false;
      window.clearInterval(pollInterval);
    };
  }, [scanId, publicToken, onComplete]);

  const currentPhase = getCurrentPhase(scan);
  const progress = scan?.progress ?? 0;
  const currentPhaseIndex = phases.findIndex((phase) => phase.id === currentPhase);
  const currentPhaseData = phases[currentPhaseIndex];
  const statusLabel = formatStepLabel(scan?.status ?? null);
  const stepLabel = formatStepLabel(scan?.current_step ?? null);

  const handleRetry = async () => {
    setIsRetrying(true);
    setPollError(null);

    try {
      const { error } = await supabase.functions.invoke('start-scan', {
        body: { scanId, forceRestart: true },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error retrying scan:', error);
      setPollError(error instanceof Error ? error.message : 'Retry failed. Please try again.');
    } finally {
      setIsRetrying(false);
    }
  };

  if (currentPhase === 'failed') {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Scan Failed
          </h1>
          <p className="text-lg text-muted-foreground">
            The scan stopped before your report could be generated.
          </p>
        </div>

        <Card className="glass-card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {statusLabel} / {stepLabel}
            </p>
            <h2 className="text-xl font-semibold text-foreground">We hit a technical problem</h2>
            <p className="text-muted-foreground">
              {scan?.error_message || 'The scan failed without a recorded error message.'}
            </p>
            {pollError && <p className="text-sm text-red-500">{pollError}</p>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button variant="gold" onClick={handleRetry} disabled={isRetrying} className="gap-2">
              <RotateCcw className="w-4 h-4" />
              {isRetrying ? 'Retrying...' : 'Retry Scan'}
            </Button>
            <Button variant="ghost" onClick={onRestart}>
              Start Over
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Scanning Your Website
        </h1>
        <p className="text-lg text-muted-foreground">
          Our systems are analyzing your revenue infrastructure
        </p>
      </div>

      <Card className="glass-card p-8 mb-8">
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: currentPhase !== 'complete' ? [0, 360] : 0,
            }}
            transition={{
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              currentPhase === 'complete' ? 'bg-green-500/20' : 'bg-gold/20'
            }`}
          >
            {currentPhase === 'complete' ? (
              <CheckCircle className="w-10 h-10 text-green-500" />
            ) : (
              <Loader2 className="w-10 h-10 text-gold animate-spin" />
            )}
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {currentPhaseData?.label}
          </h2>
          <p className="text-muted-foreground">
            {currentPhaseData?.description}
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            Status: <span className="text-foreground">{statusLabel}</span>
            {' / '}
            Step: <span className="text-foreground">{stepLabel}</span>
          </p>
          {pollError && <p className="text-sm text-red-500 mt-2">{pollError}</p>}
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="space-y-3">
          {phases
            .filter((phase) => phase.id !== 'complete' && phase.id !== 'failed')
            .map((phase, index) => {
              const isActive = index === currentPhaseIndex;
              const isComplete = index < currentPhaseIndex;

              return (
                <div
                  key={phase.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gold/10 border border-gold/30'
                      : isComplete
                        ? 'bg-green-500/10 border border-green-500/30'
                        : 'bg-muted/50 border border-transparent'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      isActive ? 'text-gold' : isComplete ? 'text-green-500' : 'text-muted-foreground'
                    }`}
                  >
                    {isComplete ? <CheckCircle className="w-5 h-5" /> : phase.icon}
                  </div>
                  <span
                    className={`font-medium ${
                      isActive ? 'text-foreground' : isComplete ? 'text-green-500' : 'text-muted-foreground'
                    }`}
                  >
                    {phase.label}
                  </span>
                  {isActive && <Loader2 className="w-4 h-4 ml-auto text-gold animate-spin" />}
                </div>
              );
            })}
        </div>
      </Card>

      <Card className="glass-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Did you know?</span> The average business loses 23% of
          potential revenue due to poor tracking alone.
        </p>
      </Card>
    </div>
  );
};
