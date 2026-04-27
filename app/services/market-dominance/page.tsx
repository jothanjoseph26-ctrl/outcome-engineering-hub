import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Market Dominance Services | Outcome Labs',
  description:
    'Position your brand as the category leader. We engineer thought leadership systems, content authority, and strategic positioning that makes competitors irrelevant.',
  alternates: { canonical: 'https://outcomelabs.com/services/market-dominance' },
};

export default function MarketDominancePage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-4xl">
          <div className="mb-8">
            <Link href="/services" className="text-gold hover:underline mb-4 inline-block">
              ← Back to Services
            </Link>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            Market Dominance
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            We engineer category leadership — positioning your brand so thoroughly across the
            search and content landscape that competitors become background noise.
          </p>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What We Build</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Thought Leadership Engine',
                  color: 'text-gold',
                  body: 'Systematic content production that establishes your team as the definitive authority in your category.',
                },
                {
                  title: 'Competitive Displacement System',
                  color: 'text-teal',
                  body: 'Programmatic content that captures keywords your competitors own today — and takes them.',
                },
                {
                  title: 'Brand Search Architecture',
                  color: 'text-gold',
                  body: 'Own every branded search query. Control the narrative when prospects search your company name.',
                },
                {
                  title: 'Authority Link System',
                  color: 'text-teal',
                  body: 'Engineered link acquisition that signals domain authority to search engines at scale.',
                },
              ].map((item) => (
                <div key={item.title} className="glass p-6 rounded-xl">
                  <h3 className={`text-lg font-bold mb-3 ${item.color}`}>{item.title}</h3>
                  <p className="text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Problems We Solve</h2>
            <ul className="space-y-4">
              {[
                'Competitors outranking you for your own category keywords',
                'Prospects unaware of your brand during research phase',
                'Sales team losing deals to better-known alternatives',
                'No consistent content operation to build long-term authority',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-gold mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">The System Explained</h2>
            <div className="glass p-8 rounded-xl space-y-4 text-muted-foreground">
              <p>
                Market dominance is not a campaign. It is an infrastructure problem. Most brands
                produce content sporadically and call it strategy. We build a content system with
                defined keyword clusters, publishing cadence, distribution pipelines, and authority
                measurement — then run it continuously.
              </p>
              <p>
                The output is compounding: each piece of content adds to a topical authority
                profile that makes every subsequent piece rank faster and higher.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Ready to Own Your Category?</h2>
            <p className="text-muted-foreground mb-8">
              We will audit your current search presence and map the gap between where you are
              and category leadership. Free, no obligation.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Start with a Free SEO Audit
              </Link>
              <Link
                href="/case-studies"
                className="inline-flex items-center justify-center px-8 py-4 glass border border-gold/30 text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                View Case Studies
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
