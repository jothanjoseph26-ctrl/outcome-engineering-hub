'use client';

import { useState } from 'react';

export function ScannerClient() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    if (!url) return;
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            Free SEO Scanner
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Enter your website URL to get an instant analysis of your SEO performance 
            and discover opportunities to grow your organic traffic.
          </p>

          <div className="glass-card p-8 rounded-xl mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="url"
                placeholder="https://yourwebsite.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg bg-background border border-border 
                  text-foreground placeholder:text-muted-foreground focus:outline-none 
                  focus:ring-2 focus:ring-gold"
              />
              <button
                onClick={handleScan}
                disabled={!url || scanning}
                className="px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg 
                  hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {scanning ? 'Scanning...' : 'Scan Now'}
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-gold">Technical SEO</h3>
              <p className="text-muted-foreground text-sm">
                Site speed, mobile optimization, crawlability, and indexability checks.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-teal">Content Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Keyword targeting, content depth, and semantic relevance scoring.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-bold mb-3 text-gold">Competitor Insights</h3>
              <p className="text-muted-foreground text-sm">
                Benchmark against competitors and identify gaps in your strategy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}