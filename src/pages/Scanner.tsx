import { useState } from 'react';
import { ScannerWizard } from '@/components/scanner/ScannerWizard';
import { ScannerProgress } from '@/components/scanner/ScannerProgress';
import { ScannerResults } from '@/components/scanner/ScannerResults';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { clearPersistedScannerToken } from '@/lib/scanner-client';

export type ScanStatus = 'wizard' | 'scanning' | 'results';

const Scanner = () => {
  const [status, setStatus] = useState<ScanStatus>('wizard');
  const [scanSession, setScanSession] = useState<{ scanId: string; publicToken: string } | null>(null);

  const handleScanStart = (scanId: string, publicToken: string) => {
    setScanSession({ scanId, publicToken });
    setStatus('scanning');
  };

  const handleScanComplete = () => {
    setStatus('results');
  };

  const handleRestart = () => {
    if (scanSession) {
      clearPersistedScannerToken(scanSession.scanId);
    }
    setScanSession(null);
    setStatus('wizard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {status === 'wizard' && (
            <ScannerWizard onScanStart={handleScanStart} />
          )}
          {status === 'scanning' && scanSession && (
            <ScannerProgress 
              scanId={scanSession.scanId}
              publicToken={scanSession.publicToken}
              onComplete={handleScanComplete} 
              onRestart={handleRestart}
            />
          )}
          {status === 'results' && scanSession && (
            <ScannerResults 
              scanId={scanSession.scanId}
              publicToken={scanSession.publicToken}
              onRestart={handleRestart} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Scanner;
