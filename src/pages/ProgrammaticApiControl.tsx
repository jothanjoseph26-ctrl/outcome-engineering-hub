import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Cloud,
  Code2,
  Database,
  Play,
  RefreshCw,
  Shield,
  Terminal,
  Workflow,
  X,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgrammaticSubnav } from '@/components/ProgrammaticSubnav';
import { Button } from '@/components/ui/button';

const workflowSteps = [
  {
    step: '01',
    title: 'Authentication',
    desc: 'Secure OAuth2 connection to Google Ads, Meta, and LinkedIn APIs.',
    snippet: 'client = GoogleAdsClient.load_from_storage()',
  },
  {
    step: '02',
    title: 'Data Fetching',
    desc: 'Pull campaign status, metrics, and settings programmatically.',
    snippet: "campaigns = client.get_campaigns(status='ACTIVE', include_metrics=True)",
  },
  {
    step: '03',
    title: 'Decision Logic',
    desc: 'Apply business rules from inventory, margin, and lead quality signals.',
    snippet: 'if inventory < 5: action = "pause"',
  },
  {
    step: '04',
    title: 'Execution',
    desc: 'Push updates back to ad platforms in bulk through API calls.',
    snippet: 'client.update_bid(campaign_id, new_bid=current_bid * 1.2)',
  },
  {
    step: '05',
    title: 'Monitoring',
    desc: 'Track change impact and keep improving with feedback loops.',
    snippet: 'log(f"{campaign.name}: {action}")',
  },
];

const useCases = [
  {
    icon: '??',
    title: 'Inventory-Aware Campaigns',
    desc: 'Pause out-of-stock products and scale spend when inventory is strong.',
    impact: 'Zero wasted spend on out-of-stock items',
  },
  {
    icon: '??',
    title: 'Performance Budget Shifts',
    desc: 'Move budget to high-ROI campaigns every day automatically.',
    impact: '+35% ROI through smarter allocation',
  },
  {
    icon: '???',
    title: 'Weather Triggered Bidding',
    desc: 'Increase/decrease bids based on local weather forecasts.',
    impact: '+28% conversion in favorable conditions',
  },
  {
    icon: '??',
    title: 'Currency-Safe International Bids',
    desc: 'Keep CPA targets stable across changing exchange rates.',
    impact: 'Consistent profitability across regions',
  },
  {
    icon: '??',
    title: 'Automated Negative Keywords',
    desc: 'Scan search terms hourly and auto-block wasteful queries.',
    impact: '-22% wasted spend',
  },
  {
    icon: '?',
    title: 'Dayparting at Scale',
    desc: 'Adjust bids by hour/day across hundreds of campaigns.',
    impact: '+18% efficiency through timing optimization',
  },
];

const platforms = [
  {
    name: 'Google Ads API',
    limit: '15,000 operations/day',
    features: ['Campaign status', 'Budget updates', 'Bid modifiers', 'Negative keywords'],
  },
  {
    name: 'Meta Marketing API',
    limit: '200 calls/hour/user',
    features: ['Campaign CRUD', 'Ad set targeting', 'Creative sync', 'Insights reporting'],
  },
  {
    name: 'LinkedIn API',
    limit: '100 calls/day',
    features: ['Campaign changes', 'Lead gen forms', 'Budget and bids', 'Analytics pulls'],
  },
  {
    name: 'TikTok Marketing API',
    limit: '10 QPS per app',
    features: ['Ad group setup', 'Creative upload', 'Targeting rules', 'Performance data'],
  },
  {
    name: 'Microsoft Ads API',
    limit: 'Varies by service',
    features: ['Keyword ops', 'Bid strategies', 'Budgeting', 'Reporting'],
  },
  {
    name: 'X Ads API',
    limit: 'Varies by endpoint',
    features: ['Campaign setup', 'Audience targeting', 'Bid controls', 'Analytics'],
  },
];

const demoSeed = [
  '[00:00:00] Ready to execute. Click "Run Code" to start.',
  '[00:00:01] Found 14 campaigns with CPA > $50',
  '[00:00:01] - Search / Finance / Lagos: $62.13',
  '[00:00:01] - Search / B2B / Abuja: $71.48',
  '[00:00:02] Completed analysis in 1.6s',
];

export default function ProgrammaticApiControl() {
  const [output, setOutput] = useState([demoSeed[0]]);
  const [running, setRunning] = useState(false);

  const status = useMemo(() => (running ? 'RUNNING' : 'READY'), [running]);

  const runDemo = () => {
    if (running) return;
    setRunning(true);
    setOutput([]);

    demoSeed.forEach((line, index) => {
      window.setTimeout(() => {
        setOutput((current) => [...current, line]);
        if (index === demoSeed.length - 1) setRunning(false);
      }, index * 420);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgrammaticSubnav />

      <main>
        <section className="pt-28 pb-14">
          <div className="container-lg">
            <div className="grid gap-8 lg:grid-cols-2">
              <article className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-destructive">Manual Approach</p>
                <h1 className="mt-3 text-3xl font-display font-bold text-foreground md:text-4xl">
                  API Campaign Control
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Clicking through ad dashboards is slow, error-prone, and hard to scale.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive" />2 hours to update 50 campaigns</li>
                  <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive" />copy-paste edits create hidden errors</li>
                  <li className="flex items-center gap-2"><X className="h-4 w-4 text-destructive" />UI work cannot react to live external data</li>
                </ul>
              </article>

              <article className="rounded-2xl border border-gold/35 bg-card/70 p-6 shadow-2xl">
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  <span>update_campaigns.py</span>
                  <span className="text-teal">running</span>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-xl border border-border/60 bg-muted/30 p-4 text-xs text-foreground">
{`# update 500 campaigns in seconds
for campaign in client.get_campaigns():
    product = campaign.product_id
    if stock[product] < 5:
        client.pause(campaign.id)
    elif stock[product] > 100:
        client.update_budget(campaign.id, "+20%")

# ? updated 500 campaigns in 28s`}
                </pre>
                <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" />Bulk operations across 1000s of campaigns</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" />Integrates with inventory, CRM, weather, FX data</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-teal" />Lower error rates with deterministic logic</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/40">
          <div className="container-lg">
            <div className="mb-10 flex items-center gap-3">
              <Workflow className="h-5 w-5 text-gold" />
              <h2 className="text-2xl font-display font-semibold">How API Campaign Control Works</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {workflowSteps.map((step) => (
                <article key={step.step} className="rounded-xl border border-border/60 bg-card p-4">
                  <p className="text-xs font-mono text-gold">STEP {step.step}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                  <pre className="mt-3 overflow-x-auto rounded-md bg-muted/40 p-2 text-[11px] text-teal">{step.snippet}</pre>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">What You Can Automate</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {useCases.map((useCase) => (
                <article key={useCase.title} className="rounded-xl border border-border/60 bg-card/70 p-5">
                  <p className="text-xl">{useCase.icon}</p>
                  <h3 className="mt-2 font-semibold text-foreground">{useCase.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{useCase.desc}</p>
                  <p className="mt-3 text-sm text-teal">Impact: {useCase.impact}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/30">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Platforms We Control via API</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {platforms.map((platform) => (
                <article key={platform.name} className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold text-foreground">{platform.name}</h3>
                  <p className="mt-2 text-xs font-mono text-gold">Rate limit: {platform.limit}</p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    {platform.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-teal" />{feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-2xl border border-border/60 bg-card p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-semibold">Sandbox Demo</h2>
                  <span className={`text-xs font-mono ${running ? 'text-teal' : 'text-muted-foreground'}`}>{status}</span>
                </div>
                <pre className="mt-4 overflow-x-auto rounded-lg bg-muted/30 p-4 text-xs text-foreground">{`# Fetch campaigns with CPA > $50
campaigns = client.get_campaigns()
high_cpa = [c for c in campaigns if c.cpa > 50]
for campaign in high_cpa:
    print(campaign.name, campaign.cpa)`}</pre>
                <div className="mt-4 flex gap-3">
                  <Button variant="hero" onClick={runDemo} className="gap-2">
                    <Play className="h-4 w-4" />
                    Run Code
                  </Button>
                  <Button variant="outline" onClick={() => setOutput([demoSeed[0]])} className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
              </article>

              <article className="rounded-2xl border border-border/60 bg-card p-6">
                <h3 className="font-semibold text-foreground">Console Output</h3>
                <div className="mt-3 max-h-64 overflow-auto rounded-lg bg-muted/35 p-4 text-xs font-mono text-muted-foreground">
                  {output.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Sandbox only. No real campaigns are modified.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/30">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Technical Requirements</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-border/60 bg-card p-5">
                <Shield className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-semibold">API Access</h3>
                <p className="mt-2 text-sm text-muted-foreground">Developer accounts, credentials, and OAuth setup.</p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-5">
                <Code2 className="h-5 w-5 text-teal" />
                <h3 className="mt-3 font-semibold">Execution Environment</h3>
                <p className="mt-2 text-sm text-muted-foreground">Python or Node runtime on cloud/server infrastructure.</p>
              </article>
              <article className="rounded-xl border border-border/60 bg-card p-5">
                <Database className="h-5 w-5 text-gold" />
                <h3 className="mt-3 font-semibold">Business Data</h3>
                <p className="mt-2 text-sm text-muted-foreground">Inventory, margin, CRM, and analytics feeds.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-card to-muted/30 p-8">
              <h2 className="text-3xl font-display font-bold">Ready to Control Campaigns via Code?</h2>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <article className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold">Documentation Access</h3>
                  <p className="mt-1 text-2xl font-mono text-teal">Free</p>
                  <p className="mt-2 text-sm text-muted-foreground">Guides, templates, and best-practice playbooks.</p>
                </article>
                <article className="rounded-xl border border-gold/35 bg-gold/10 p-5">
                  <h3 className="font-semibold">Implementation Service</h3>
                  <p className="mt-1 text-2xl font-mono text-gold">$5,000 one-time</p>
                  <p className="mt-2 text-sm text-muted-foreground">We build it and transfer full code ownership.</p>
                </article>
                <article className="rounded-xl border border-border/60 bg-card p-5">
                  <h3 className="font-semibold">Managed Service</h3>
                  <p className="mt-1 text-2xl font-mono text-teal">$3,000/mo</p>
                  <p className="mt-2 text-sm text-muted-foreground">Build, operate, and optimize continuously.</p>
                </article>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" className="gap-2">Start Implementation <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="heroOutline" asChild>
                  <Link to="/solutions/programmatic-advertising/automation-scripts">See Script Library</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
