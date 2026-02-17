import { Link } from 'react-router-dom';
import { ArrowRight, Copy, Filter, Library, Search, Star, TerminalSquare } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgrammaticSubnav } from '@/components/ProgrammaticSubnav';
import { Button } from '@/components/ui/button';

const scripts = [
  {
    title: 'Inventory-Aware Pausing',
    platform: 'Google Ads',
    language: 'Python',
    rating: '4.9/5',
    installs: '847 installs',
    setup: '15 min setup',
    desc: 'Pause/resume campaigns based on live stock levels from your ERP.',
  },
  {
    title: 'Performance Budget Shifter',
    platform: 'All Platforms',
    language: 'Python',
    rating: '5.0/5',
    installs: '1,203 installs',
    setup: '20 min setup',
    desc: 'Move budget to high-ROI campaigns automatically each day.',
  },
  {
    title: 'Negative Keyword Miner',
    platform: 'Google Ads',
    language: 'Python',
    rating: '4.8/5',
    installs: '692 installs',
    setup: '10 min setup',
    desc: 'Find high-spend no-conversion terms and add negatives in bulk.',
  },
  {
    title: 'Geo-CPA Governor',
    platform: 'Meta Ads',
    language: 'Node.js',
    rating: '4.7/5',
    installs: '411 installs',
    setup: '18 min setup',
    desc: 'Scale in profitable regions and trim budget in underperforming cities.',
  },
  {
    title: 'Creative Fatigue Detector',
    platform: 'Meta Ads',
    language: 'Python',
    rating: '4.8/5',
    installs: '578 installs',
    setup: '12 min setup',
    desc: 'Detect ad fatigue from CTR decay and rotate fresh creatives.',
  },
  {
    title: 'Lead Quality Bid Scaler',
    platform: 'LinkedIn',
    language: 'Python',
    rating: '4.6/5',
    installs: '207 installs',
    setup: '25 min setup',
    desc: 'Raise bids for audiences producing SQLs, not just cheap clicks.',
  },
];

export default function ProgrammaticAutomationScripts() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgrammaticSubnav />

      <main>
        <section className="pt-28 pb-14">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-muted/30 p-8">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Script Library</p>
              <h1 className="mt-3 text-4xl font-display font-bold md:text-5xl">Custom Automation Scripts</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Copy, customize, deploy. Production-ready scripts engineered for real campaign operations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" className="gap-2">Browse All Scripts <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="heroOutline" asChild>
                  <Link to="/solutions/programmatic-advertising/predictive-bidding">Next: Predictive Bidding</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container-lg grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2"><Search className="h-4 w-4" />Search scripts...</span>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Categories</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="rounded-md bg-gold/15 px-3 py-2 text-gold">All Scripts (24)</li>
                  <li className="rounded-md px-3 py-2 text-muted-foreground">Budget Management (6)</li>
                  <li className="rounded-md px-3 py-2 text-muted-foreground">Bid Optimization (8)</li>
                  <li className="rounded-md px-3 py-2 text-muted-foreground">Keyword Management (4)</li>
                  <li className="rounded-md px-3 py-2 text-muted-foreground">Creative Testing (3)</li>
                  <li className="rounded-md px-3 py-2 text-muted-foreground">Reporting (3)</li>
                </ul>
              </div>

              <div className="mt-5">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Platform Filter</h3>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>Google Ads (18)</li>
                  <li>Meta Ads (12)</li>
                  <li>LinkedIn (8)</li>
                  <li>All Platforms (4)</li>
                </ul>
              </div>
            </aside>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {scripts.map((script) => (
                <article key={script.title} className="rounded-xl border border-border/60 bg-card p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold text-foreground">{script.title}</h2>
                    <TerminalSquare className="h-4 w-4 text-teal" />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-teal/15 px-2 py-1 text-teal">{script.platform}</span>
                    <span className="rounded-full bg-gold/15 px-2 py-1 text-gold">{script.language}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{script.desc}</p>
                  <div className="mt-4 grid gap-1 text-xs text-muted-foreground">
                    <p className="inline-flex items-center gap-2"><Star className="h-3.5 w-3.5 text-gold" />{script.rating}</p>
                    <p>{script.installs}</p>
                    <p>{script.setup}</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="hero">View Code</Button>
                    <Button size="sm" variant="outline" className="gap-1"><Copy className="h-3.5 w-3.5" />Copy</Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/40">
          <div className="container-lg grid gap-6 md:grid-cols-3">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Library className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Template Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">Production patterns with retries, logging, and idempotent updates.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Filter className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold">Composable Logic</h3>
              <p className="mt-2 text-sm text-muted-foreground">Mix inventory, CRM, and attribution rules into one optimization pipeline.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <ArrowRight className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Fast Deployment</h3>
              <p className="mt-2 text-sm text-muted-foreground">Most scripts can be configured and shipped in under 30 minutes.</p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
