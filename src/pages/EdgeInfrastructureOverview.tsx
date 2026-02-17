import { Link } from 'react-router-dom';
import { ArrowRight, Network, Server, Shield, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EdgeInfraSubnav } from '@/components/EdgeInfraSubnav';
import { Button } from '@/components/ui/button';
import { edgePillars } from '@/data/edgeInfrastructurePages';

export default function EdgeInfrastructureOverview() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EdgeInfraSubnav />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Edge SEO and Infrastructure</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold">Not Rankings. Not Traffic. Infrastructure.</h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              Most agencies optimize pages. Outcome Labs optimizes the layer between your code and the internet.
              That is where leverage compounds.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" className="gap-2">Start Infrastructure Audit <ArrowRight className="h-4 w-4" /></Button>
              <Button variant="heroOutline" className="gap-2">Request Technical Walkthrough</Button>
            </div>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Network className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Network-Layer Control</h2>
              <p className="mt-2 text-sm text-muted-foreground">Deploy logic where crawlers and users actually experience your site.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Server className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">Render Engineering</h2>
              <p className="mt-2 text-sm text-muted-foreground">Make JavaScript-heavy systems crawlable and index-efficient.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Zap className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Performance Dominance</h2>
              <p className="mt-2 text-sm text-muted-foreground">Engineer sub-second delivery under real mobile network constraints.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Shield className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">Instrumentation First</h2>
              <p className="mt-2 text-sm text-muted-foreground">No guessing. We measure crawl behavior, render output, and latency impact.</p>
            </article>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Infrastructure Pillars</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {edgePillars.map((pillar) => (
                <article key={pillar.slug} className="rounded-xl border border-border/60 bg-card p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">{pillar.strapline}</p>
                  <h3 className="mt-2 text-xl font-display font-semibold">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{pillar.description}</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to={`/solutions/edge-seo-infrastructure/${pillar.slug}`}>Open System Page</Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 pb-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-muted/30 p-8 md:p-10">
              <h2 className="text-3xl font-display font-bold">Positioning Thesis</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Outcome Labs is not selling SEO tasks. We are building and operating revenue infrastructure.
                This framing filters out low-intent buyers and attracts operators who understand systems.
              </p>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Start with SMEs, prove technical dominance publicly, then move into mid-market and enterprise accounts.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
