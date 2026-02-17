import { useState } from 'react';
import { ScannerWizard } from '@/components/scanner/ScannerWizard';
import { ScannerProgress } from '@/components/scanner/ScannerProgress';
import { ScannerResults } from '@/components/scanner/ScannerResults';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export type ScanStatus = 'wizard' | 'scanning' | 'results';

const Scanner = () => {
  const [status, setStatus] = useState<ScanStatus>('wizard');
  const [scanId, setScanId] = useState<string | null>(null);

  const handleScanStart = (id: string) => {
    setScanId(id);
    setStatus('scanning');
  };

  const handleScanComplete = () => {
    setStatus('results');
  };

  const handleRestart = () => {
    setScanId(null);
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
          {status === 'scanning' && scanId && (
            <ScannerProgress 
              scanId={scanId} 
              onComplete={handleScanComplete} 
            />
          )}
          {status === 'results' && scanId && (
            <ScannerResults 
              scanId={scanId} 
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
