import { Link } from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revenue Growth Services | Outcome Labs',
  description: 'Comprehensive revenue growth engineering services. We build SEO systems, conversion funnels, and automation that drives qualified leads on autopilot.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            Revenue Growth Engineering
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            We engineer revenue systems that generate qualified leads on autopilot. 
            Stop chasing prospects and start scaling with predictable, data-driven systems.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Link href="/services/revenue-growth" className="hover-card glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-gold">SEO Engineering</h2>
              <p className="text-muted-foreground mb-4">
                Build scalable content systems that capture organic traffic and convert visitors into leads.
              </p>
              <span className="text-gold font-medium">Learn more →</span>
            </Link>

            <Link href="/services/market-dominance" className="hover-card glass-card p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-4 text-teal">Market Dominance</h2>
              <p className="text-muted-foreground mb-4">
                Position your brand as the category leader with strategic content and thought leadership.
              </p>
              <span className="text-teal font-medium">Learn more →</span>
            </Link>
          </div>

          <h2 className="text-3xl font-bold mb-8">Why Revenue Engineering?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-gold">Predictable</h3>
              <p className="text-muted-foreground">
                Systems that work 24/7 to generate leads without ongoing ad spend.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-teal">Scalable</h3>
              <p className="text-muted-foreground">
                Content and systems that compound in value over time.
              </p>
            </div>
            <div className="glass p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3 text-gold">Measurable</h3>
              <p className="text-muted-foreground">
                Full visibility into traffic, conversions, and revenue attribution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}