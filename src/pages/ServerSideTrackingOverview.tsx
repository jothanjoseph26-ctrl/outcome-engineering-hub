import { Link } from 'react-router-dom';
import { ArrowRight, Database, GitBranch, ShieldCheck, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServerTrackingSubnav } from '@/components/ServerTrackingSubnav';
import { Button } from '@/components/ui/button';
import { serverTrackingPages } from '@/data/serverTrackingPages';

export default function ServerSideTrackingOverview() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServerTrackingSubnav />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Server-Side Tracking</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold">
              Measurement Infrastructure for a Cookie-Less World
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              Your growth system is only as strong as its data layer. We build first-party, server-side pipelines
              that preserve signal quality, improve attribution confidence, and give you control over every event.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" className="gap-2">Book Tracking Architecture Call <ArrowRight className="h-4 w-4" /></Button>
              <Button variant="heroOutline" className="gap-2">Request Measurement Audit</Button>
            </div>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <ShieldCheck className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Signal Recovery</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Recover high-value conversion events lost in browser-only setups.
              </p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Database className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">First-Party Control</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Route data through infrastructure you control before vendors receive it.
              </p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <GitBranch className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Reliable Attribution</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Build multi-touch models from clean event streams, not broken last-click logic.
              </p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Target className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">Better Media Decisions</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Feed ad platforms high-quality conversion signals for stronger optimization.
              </p>
            </article>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Core Systems</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {serverTrackingPages.map((page) => (
                <article key={page.slug} className="rounded-xl border border-border/60 bg-card p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">{page.strapline}</p>
                  <h3 className="mt-2 text-xl font-display font-semibold">{page.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{page.thesis}</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to={`/solutions/server-side-tracking/${page.slug}`}>Open System Page</Link>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 pb-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-muted/30 p-8 md:p-10">
              <h2 className="text-3xl font-display font-bold">Story We Tell the Market</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Agencies report dashboards. Infrastructure firms control the data plane. Outcome Labs is the latter.
                We build measurement systems that survive browser changes, platform policy shifts, and scale pressure.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
