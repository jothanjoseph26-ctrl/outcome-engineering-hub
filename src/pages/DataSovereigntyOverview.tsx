import { Link } from 'react-router-dom';
import { ArrowRight, Database, Eye, ShieldCheck, Workflow } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DataSovereigntySubnav } from '@/components/DataSovereigntySubnav';
import { Button } from '@/components/ui/button';
import { dataSovereigntyPages } from '@/data/dataSovereigntyPages';

export default function DataSovereigntyOverview() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DataSovereigntySubnav />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Data Sovereignty</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold">Own the Data Layer. Own the Decision Layer.</h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              When vendor platforms are your only source of truth, strategy becomes opinion-driven.
              We build sovereign data infrastructure so growth decisions run on systems you control.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" className="gap-2">Book Data Strategy Session <ArrowRight className="h-4 w-4" /></Button>
              <Button variant="heroOutline">Request Data Stack Audit</Button>
            </div>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Database className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Warehouse Authority</h2>
              <p className="mt-2 text-sm text-muted-foreground">Unified truth in your BigQuery stack, not fragmented platform panels.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Eye className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">Decision Visibility</h2>
              <p className="mt-2 text-sm text-muted-foreground">Dashboards designed for decisions, ownership, and operating rhythm.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <Workflow className="h-5 w-5 text-teal" />
              <h2 className="mt-3 font-semibold">Predictive Intelligence</h2>
              <p className="mt-2 text-sm text-muted-foreground">Score leads and opportunities by expected value, not volume.</p>
            </article>
            <article className="rounded-xl border border-border/60 bg-card p-5">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h2 className="mt-3 font-semibold">Automated Governance</h2>
              <p className="mt-2 text-sm text-muted-foreground">Always-on audit systems catch leakage before it compounds.</p>
            </article>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">System Pages</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {dataSovereigntyPages.map((page) => (
                <article key={page.slug} className="rounded-xl border border-border/60 bg-card p-6">
                  <p className="text-xs font-mono uppercase tracking-[0.16em] text-teal">{page.strapline}</p>
                  <h3 className="mt-2 text-xl font-display font-semibold">{page.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground">{page.thesis}</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to={`/solutions/data-sovereignty/${page.slug}`}>Open System Page</Link>
                  </Button>
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
