import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ChartColumnIncreasing, Gauge, LineChart, ShieldCheck, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgrammaticSubnav } from '@/components/ProgrammaticSubnav';
import { Button } from '@/components/ui/button';

const pipeline = [
  { title: 'Data Ingestion', desc: 'Campaign metrics, CRM outcomes, margin signals, seasonality.' },
  { title: 'Feature Engineering', desc: 'Lag windows, segment variance, conversion quality, bid elasticity.' },
  { title: 'Model Inference', desc: 'Predict conversion probability and expected value by auction context.' },
  { title: 'Bid Decisioning', desc: 'Set bid multipliers with floor/ceiling safety constraints.' },
  { title: 'Online Learning', desc: 'Re-train from recent outcomes and drift checks.' },
];

const useCases = [
  'Lead-quality weighted bids for B2B pipelines',
  'Margin-aware bidding for ecommerce SKUs',
  'Geo-time bid optimization for multi-region campaigns',
  'Budget pacing to hit monthly target spend precisely',
];

export default function ProgrammaticPredictiveBidding() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgrammaticSubnav />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-teal">Machine Learning Layer</p>
              <h1 className="mt-3 text-4xl font-display font-bold md:text-5xl">Predictive Bidding</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                We forecast likely outcome value per auction and set bids based on expected profit, not guesswork.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" className="gap-2">Request Model Audit <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="heroOutline" asChild>
                  <Link to="/solutions/programmatic-advertising/dynamic-creative">Next: Dynamic Creative</Link>
                </Button>
              </div>
            </div>

            <article className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Live Forecast Snapshot</h2>
                <LineChart className="h-5 w-5 text-gold" />
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <div className="rounded-lg bg-muted/30 p-3 text-muted-foreground">Predicted CVR: <span className="text-foreground">4.82%</span></div>
                <div className="rounded-lg bg-muted/30 p-3 text-muted-foreground">Expected CPA: <span className="text-foreground">$37.40</span></div>
                <div className="rounded-lg bg-muted/30 p-3 text-muted-foreground">Recommended Bid Multiplier: <span className="text-teal">1.17x</span></div>
                <div className="rounded-lg bg-muted/30 p-3 text-muted-foreground">Confidence Score: <span className="text-gold">0.89</span></div>
              </div>
            </article>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/30">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Model Pipeline</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {pipeline.map((item) => (
                <article key={item.title} className="rounded-xl border border-border/60 bg-card p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Brain className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold">Outcome Prediction</h3>
              <p className="mt-2 text-sm text-muted-foreground">Bid based on expected value and win-rate probability.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Gauge className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Safety Controls</h3>
              <p className="mt-2 text-sm text-muted-foreground">Bid ceilings, pacing controls, and CPA guardrails.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <ChartColumnIncreasing className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold">Lift Measurement</h3>
              <p className="mt-2 text-sm text-muted-foreground">Holdout tests to verify incremental impact.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Governance</h3>
              <p className="mt-2 text-sm text-muted-foreground">Monitoring for drift, bias, and alert-based rollback.</p>
            </article>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/40">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Common Use Cases</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {useCases.map((useCase) => (
                <article key={useCase} className="rounded-lg border border-border/60 bg-card p-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><Target className="h-4 w-4 text-teal" />{useCase}</span>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
