import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Code, 
  BarChart3, 
  Brain, 
  CheckCircle,
  Loader2
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface ScannerProgressProps {
  scanId: string;
  onComplete: () => void;
}

type ScanPhase = 'fetching' | 'analyzing_static' | 'analyzing_dynamic' | 'scoring' | 'generating' | 'complete';

const phases: { id: ScanPhase; label: string; icon: React.ReactNode; description: string }[] = [
  { id: 'fetching', label: 'Fetching Website', icon: <Search className="w-5 h-5" />, description: 'Downloading your website content...' },
  { id: 'analyzing_static', label: 'Static Analysis', icon: <Code className="w-5 h-5" />, description: 'Detecting tracking codes and scripts...' },
  { id: 'analyzing_dynamic', label: 'Deep Analysis', icon: <BarChart3 className="w-5 h-5" />, description: 'Analyzing conversion elements...' },
  { id: 'scoring', label: 'Calculating Score', icon: <BarChart3 className="w-5 h-5" />, description: 'Evaluating your revenue systems...' },
  { id: 'generating', label: 'Generating Report', icon: <Brain className="w-5 h-5" />, description: 'AI is crafting your insights...' },
  { id: 'complete', label: 'Complete', icon: <CheckCircle className="w-5 h-5" />, description: 'Your report is ready!' },
];

export const ScannerProgress = ({ scanId, onComplete }: ScannerProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState<ScanPhase>('fetching');
  const [status, setStatus] = useState<string>('pending');

  useEffect(() => {
    // Poll for scan status
    const pollInterval = setInterval(async () => {
      const { data, error } = await supabase
        .from('scans')
        .select('status, progress')
        .eq('id', scanId)
        .single();

      if (error) {
        console.error('Error polling scan status:', error);
        return;
      }

      if (data) {
        setProgress(data.progress);
        setStatus(data.status);

        // Determine phase based on progress
        if (data.progress < 20) {
          setCurrentPhase('fetching');
        } else if (data.progress < 40) {
          setCurrentPhase('analyzing_static');
        } else if (data.progress < 60) {
          setCurrentPhase('analyzing_dynamic');
        } else if (data.progress < 80) {
          setCurrentPhase('scoring');
        } else if (data.progress < 100) {
          setCurrentPhase('generating');
        } else {
          setCurrentPhase('complete');
        }

        if (data.status === 'completed') {
          clearInterval(pollInterval);
          setTimeout(onComplete, 1000);
        }

        if (data.status === 'failed') {
          clearInterval(pollInterval);
          // Handle error state
        }
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [scanId, onComplete]);

  const currentPhaseIndex = phases.findIndex(p => p.id === currentPhase);
  const currentPhaseData = phases[currentPhaseIndex];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Scanning Your Website
        </h1>
        <p className="text-lg text-muted-foreground">
          Our systems are analyzing your revenue infrastructure
        </p>
      </div>

      {/* Main Progress Card */}
      <Card className="glass-card p-8 mb-8">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: currentPhase !== 'complete' ? [0, 360] : 0
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 3, repeat: Infinity, ease: 'linear' }
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

        {/* Current Phase */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {currentPhaseData?.label}
          </h2>
          <p className="text-muted-foreground">
            {currentPhaseData?.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Phase Steps */}
        <div className="space-y-3">
          {phases.slice(0, -1).map((phase, index) => {
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
                <div className={`flex-shrink-0 ${
                  isActive ? 'text-gold' : isComplete ? 'text-green-500' : 'text-muted-foreground'
                }`}>
                  {isComplete ? <CheckCircle className="w-5 h-5" /> : phase.icon}
                </div>
                <span className={`font-medium ${
                  isActive ? 'text-foreground' : isComplete ? 'text-green-500' : 'text-muted-foreground'
                }`}>
                  {phase.label}
                </span>
                {isActive && (
                  <Loader2 className="w-4 h-4 ml-auto text-gold animate-spin" />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Fun Facts */}
      <Card className="glass-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          💡 <span className="text-foreground font-medium">Did you know?</span> The average business loses 23% of potential revenue due to poor tracking alone.
        </p>
      </Card>
    </div>
  );
};
