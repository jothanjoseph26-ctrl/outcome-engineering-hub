import { Link } from 'react-router-dom';
import { ArrowRight, BadgePercent, Layers, Palette, Sparkles, Target, WandSparkles } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProgrammaticSubnav } from '@/components/ProgrammaticSubnav';
import { Button } from '@/components/ui/button';

const variants = [
  { name: 'Value Angle', ctr: '+22%', cvr: '+9%' },
  { name: 'Urgency Angle', ctr: '+18%', cvr: '+12%' },
  { name: 'Social Proof Angle', ctr: '+25%', cvr: '+16%' },
  { name: 'Offer-Led Angle', ctr: '+31%', cvr: '+14%' },
];

const signals = [
  'Audience segment and funnel stage',
  'Geography and time-of-day context',
  'Inventory level and price change events',
  'Device, placement, and historical response',
  'Creative fatigue and frequency caps',
];

const workflow = [
  'Template creative components (headline, image, CTA)',
  'Generate variation set with guardrails and brand rules',
  'Auto-assemble by audience and context',
  'Run multivariate testing continuously',
  'Promote winners and archive losers automatically',
];

export default function ProgrammaticDynamicCreative() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ProgrammaticSubnav />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Creative Engine</p>
              <h1 className="mt-3 text-4xl font-display font-bold md:text-5xl">Dynamic Creative Optimization</h1>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Build one creative system that auto-generates, tests, and promotes top-performing variants at scale.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" className="gap-2">Launch Creative Audit <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="heroOutline" asChild>
                  <Link to="/solutions/programmatic-advertising/api-control">Back to API Control</Link>
                </Button>
              </div>
            </div>

            <article className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Live Variant Leaderboard</h2>
                <Sparkles className="h-5 w-5 text-teal" />
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {variants.map((variant) => (
                  <div key={variant.name} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2 text-muted-foreground">
                    <span>{variant.name}</span>
                    <span className="font-mono text-foreground">CTR {variant.ctr} | CVR {variant.cvr}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {workflow.map((item, idx) => (
              <article key={item} className="rounded-xl border border-border/60 bg-card p-4">
                <p className="text-xs font-mono text-gold">0{idx + 1}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Palette className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Brand-Safe Templates</h3>
              <p className="mt-2 text-sm text-muted-foreground">Lock fonts, tone, color, and compliance language.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Layers className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold">Modular Creative</h3>
              <p className="mt-2 text-sm text-muted-foreground">Swap headlines, offers, images, and CTAs programmatically.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Target className="h-5 w-5 text-gold" />
              <h3 className="mt-3 font-semibold">Audience Matching</h3>
              <p className="mt-2 text-sm text-muted-foreground">Serve best-fit creative per segment and intent level.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <BadgePercent className="h-5 w-5 text-teal" />
              <h3 className="mt-3 font-semibold">Performance Lift</h3>
              <p className="mt-2 text-sm text-muted-foreground">Automatic winner promotion shortens learning cycles.</p>
            </article>
          </div>
        </section>

        <section className="py-16 border-y border-border/60 bg-card/40">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Personalization Signals</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {signals.map((signal) => (
                <article key={signal} className="rounded-lg border border-border/60 bg-card p-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2"><WandSparkles className="h-4 w-4 text-teal" />{signal}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-card to-muted/30 p-8 text-center">
              <h2 className="text-3xl font-display font-bold">Ready to Treat Creative as a System?</h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
                We combine API automation, predictive bidding, and dynamic creative into one operating layer.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="hero" className="gap-2">Book Strategy Session <ArrowRight className="h-4 w-4" /></Button>
                <Button variant="outline" asChild>
                  <Link to="/solutions/programmatic-advertising/api-control">Explore API Campaign Control</Link>
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
