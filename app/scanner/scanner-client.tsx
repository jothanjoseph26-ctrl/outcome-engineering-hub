'use client';

import { useCallback, useState } from 'react';
import { ScannerWizard } from '@/components/scanner/ScannerWizard';
import { ScannerProgress } from '@/components/scanner/ScannerProgress';
import { ScannerResults } from '@/components/scanner/ScannerResults';

type ScannerPhase = 'wizard' | 'progress' | 'results';

export function ScannerClient() {
  const [phase, setPhase] = useState<ScannerPhase>('wizard');
  const [scanId, setScanId] = useState<string | null>(null);
  const [publicToken, setPublicToken] = useState<string | null>(null);

  const handleScanStart = useCallback((id: string, token: string) => {
    setScanId(id);
    setPublicToken(token);
    setPhase('progress');
  }, []);

  const handleProgressComplete = useCallback(() => {
    setPhase('results');
  }, []);

  const handleRestart = useCallback(() => {
    setScanId(null);
    setPublicToken(null);
    setPhase('wizard');
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        {phase === 'wizard' && <ScannerWizard onScanStart={handleScanStart} />}
        {phase === 'progress' && scanId && publicToken && (
          <ScannerProgress
            scanId={scanId}
            publicToken={publicToken}
            onComplete={handleProgressComplete}
            onRestart={handleRestart}
          />
        )}
        {phase === 'results' && scanId && publicToken && (
          <ScannerResults scanId={scanId} publicToken={publicToken} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
}
