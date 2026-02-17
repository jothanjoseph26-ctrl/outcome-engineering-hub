import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DataSovereigntySubnav } from '@/components/DataSovereigntySubnav';
import { Button } from '@/components/ui/button';
import { dataSovereigntyBySlug, dataSovereigntyPages } from '@/data/dataSovereigntyPages';

export default function DataSovereigntyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? dataSovereigntyBySlug[slug] : undefined;

  if (!page) {
    return <Navigate to="/solutions/data-sovereignty" replace />;
  }

  const index = dataSovereigntyPages.findIndex((item) => item.slug === page.slug);
  const next = dataSovereigntyPages[index + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <DataSovereigntySubnav />

      <main>
        <section className="pt-28 pb-14">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Data Sovereignty</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">{page.title}</h1>
            <p className="mt-3 text-sm font-mono uppercase tracking-[0.16em] text-teal">{page.strapline}</p>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{page.thesis}</p>
            <p className="mt-3 max-w-3xl text-muted-foreground">{page.story}</p>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-6 lg:grid-cols-2">
            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">Architecture</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {page.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-teal mt-0.5" />{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">Outcomes</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {page.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Implementation Flow</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {page.implementation.map((item, idx) => (
                <article key={item} className="rounded-xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
                  <span className="text-xs font-mono text-gold">STEP 0{idx + 1}</span>
                  <p className="mt-2">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 pb-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-card to-muted/30 p-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold">Sovereignty Signal</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Teams that own data architecture move faster and make better bets. This stack positions Outcome Labs as
                the operator that builds durable decision infrastructure, not reporting theater.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero">Book Data Infrastructure Briefing</Button>
                {next ? (
                  <Button variant="heroOutline" asChild>
                    <Link to={`/solutions/data-sovereignty/${next.slug}`}>
                      Next: {next.navLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="heroOutline" asChild>
                    <Link to="/solutions/data-sovereignty">Back to Overview</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
