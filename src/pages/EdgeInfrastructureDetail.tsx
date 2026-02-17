import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EdgeInfraSubnav } from '@/components/EdgeInfraSubnav';
import { Button } from '@/components/ui/button';
import { edgePillars, edgePillarsBySlug } from '@/data/edgeInfrastructurePages';

export default function EdgeInfrastructureDetail() {
  const { slug } = useParams<{ slug: string }>();
  const pillar = slug ? edgePillarsBySlug[slug] : undefined;

  if (!pillar) {
    return <Navigate to="/solutions/edge-seo-infrastructure" replace />;
  }

  const index = edgePillars.findIndex((item) => item.slug === pillar.slug);
  const next = edgePillars[index + 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <EdgeInfraSubnav />

      <main>
        <section className="pt-28 pb-14">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Edge SEO and Infrastructure</p>
            <h1 className="mt-3 text-4xl md:text-5xl font-display font-bold">{pillar.title}</h1>
            <p className="mt-3 text-sm font-mono uppercase tracking-[0.16em] text-teal">{pillar.strapline}</p>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">{pillar.thesis}</p>
            <p className="mt-3 max-w-3xl text-muted-foreground">{pillar.description}</p>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg grid gap-6 lg:grid-cols-[1fr_1fr]">
            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">What We Deploy</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {pillar.capabilities.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-teal mt-0.5" />{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-border/60 bg-card p-6">
              <h2 className="text-xl font-display font-semibold">Why This Matters</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {pillar.whyItMatters.map((item) => (
                  <li key={item} className="flex items-start gap-2"><Check className="h-4 w-4 text-gold mt-0.5" />{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold">Use Cases We Engineer</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {pillar.engineeredUseCases.map((item) => (
                <article key={item} className="rounded-xl border border-border/60 bg-card p-5 text-sm text-muted-foreground">
                  <span className="inline-flex items-start gap-2"><Check className="h-4 w-4 text-teal mt-0.5" />{item}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-18 pb-20">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/25 bg-gradient-to-br from-card to-muted/30 p-8">
              <h2 className="text-2xl md:text-3xl font-display font-bold">Infrastructure Positioning Signal</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                This system page exists to signal engineering maturity, systems-level thinking, and network-layer competence.
                We are not an activity vendor. We are infrastructure operators.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" className="gap-2">Book Infrastructure Briefing</Button>
                {next ? (
                  <Button variant="heroOutline" asChild>
                    <Link to={`/solutions/edge-seo-infrastructure/${next.slug}`}>
                      Next: {next.navLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="heroOutline" asChild>
                    <Link to="/solutions/edge-seo-infrastructure">Back to Overview</Link>
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
