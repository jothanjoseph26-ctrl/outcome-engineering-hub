import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ServerTrackingSubnav } from '@/components/ServerTrackingSubnav';
import { Button } from '@/components/ui/button';
import { serverTrackingBySlug, serverTrackingPages } from '@/data/serverTrackingPages';

export default function ServerSideTrackingDetail() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? serverTrackingBySlug[slug] : undefined;

  if (!page) {
    return <Navigate to="/solutions/server-side-tracking" replace />;
  }

  const index = serverTrackingPages.findIndex((item) => item.slug === page.slug);
  const next = serverTrackingPages[index + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ServerTrackingSubnav />

      <main>
        <section className="pt-28 pb-14">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Server-Side Tracking</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">{page.title}</h1>
            <p className="mt-3 text-sm font-mono uppercase tracking-[0.16em] text-teal">{page.strapline}</p>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{page.thesis}</p>
            <p className="mt-3 max-w-3xl text-muted-foreground">{page.story}</p>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-6 lg:grid-cols-2">
            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">Architecture Layer</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {page.architecture.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-teal mt-0.5" />{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">Business Outcomes</h2>
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
            <h2 className="text-2xl font-display font-semibold">Implementation Blueprint</h2>
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
              <h2 className="text-2xl md:text-3xl font-display font-bold">Infrastructure Signal</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                This page is designed to qualify serious operators: teams that understand data architecture is
                revenue architecture. Outcome Labs does not sell reports. We engineer decision-ready data systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero">Book Data Infrastructure Briefing</Button>
                {next ? (
                  <Button variant="heroOutline" asChild>
                    <Link to={`/solutions/server-side-tracking/${next.slug}`}>
                      Next: {next.navLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="heroOutline" asChild>
                    <Link to="/solutions/server-side-tracking">Back to Overview</Link>
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
