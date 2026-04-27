import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Engineering System | Outcome Labs',
  description:
    'Our SEO Engineering System combines programmatic content, technical infrastructure, and authority building into one compounding revenue channel. Built for B2B SaaS, professional services, and high-growth brands.',
  alternates: { canonical: 'https://outcomelabs.com/solutions/seo-engineering' },
};

const layers = [
  {
    step: '01',
    title: 'Technical Foundation',
    color: 'text-gold',
    borderColor: 'border-gold/30',
    items: [
      'Site architecture optimised for crawl efficiency',
      'Core Web Vitals — LCP under 2.5s, CLS near zero',
      'Schema markup for rich results (FAQs, How-To, Organisation)',
      'XML sitemap + robots.txt instrumentation',
      'Canonical and hreflang configuration',
    ],
  },
  {
    step: '02',
    title: 'Keyword Architecture',
    color: 'text-teal',
    borderColor: 'border-teal/30',
    items: [
      'Keyword cluster mapping across all funnel stages',
      'Competitor gap analysis — keywords they own that you should',
      'Programmatic keyword patterns for long-tail scale',
      'Search intent classification per cluster',
      'Prioritisation by volume × intent × competition index',
    ],
  },
  {
    step: '03',
    title: 'Content Engine',
    color: 'text-gold',
    borderColor: 'border-gold/30',
    items: [
      'Pillar pages per cluster — 3,000–6,000 word authority pieces',
      'Programmatic content for long-tail keyword targets',
      'Internal linking architecture mapped to crawl paths',
      'Content refresh cadence for existing pages losing rank',
      'CTA integration — every content piece drives conversion',
    ],
  },
  {
    step: '04',
    title: 'Authority System',
    color: 'text-teal',
    borderColor: 'border-teal/30',
    items: [
      'Digital PR for authoritative backlink acquisition',
      'HARO and expert commentary pipeline',
      'Link velocity monitoring against Google guidelines',
      'Competitor backlink gap analysis',
      'Internal authority distribution via link equity mapping',
    ],
  },
];

const metrics = [
  { value: '217%', label: 'Avg Organic Growth (6 months)' },
  { value: '3,400+', label: 'Keywords Ranking (per client avg)' },
  { value: '94/100', label: 'Technical SEO Score' },
  { value: '< 90 days', label: 'Time to First Ranking Results' },
];

export default function SeoEngineeringPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "SEO Engineering System",
    provider: {
      "@type": "Organization",
      name: "Outcome Labs",
      url: "https://outcomelabs.com",
    },
    description: "Full-stack SEO infrastructure build combining technical foundation, keyword architecture, content engine, and authority system for compounding organic traffic.",
    serviceType: "SEO Services",
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-4xl">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Solution
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            SEO Engineering System
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            Not an SEO agency. An SEO infrastructure build. We design and operate the full stack
            of organic search — from crawl architecture to content engine to authority
            acquisition — as one integrated system.
          </p>
          <p className="text-base text-muted-foreground mb-16 max-w-3xl">
            The result is a compounding acquisition channel that generates qualified inbound
            traffic around the clock, at zero marginal cost per visitor.
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {metrics.map((m) => (
              <div key={m.label} className="glass p-5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold mb-1">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          {/* System layers */}
          <h2 className="text-2xl font-bold mb-8">How the System Works</h2>
          <div className="space-y-6 mb-20">
            {layers.map((layer) => (
              <div
                key={layer.step}
                className={`glass-card p-8 rounded-xl border ${layer.borderColor}`}
              >
                <div className="flex items-start gap-6">
                  <span className={`text-3xl font-mono font-bold ${layer.color} shrink-0`}>
                    {layer.step}
                  </span>
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${layer.color}`}>{layer.title}</h3>
                    <ul className="space-y-2">
                      {layer.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground">
                          <span className="text-gold mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Who This Is For</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'B2B SaaS companies spending $50k+/month on paid and needing a CAC-free channel',
                'Professional services firms wanting to own high-intent "best [service] in [city]" queries',
                'E-commerce brands seeking organic traffic as a hedge against rising CPAs',
                'Scale-ups that have traction but zero search presence to match',
              ].map((item) => (
                <div key={item} className="glass p-5 rounded-xl flex items-start gap-3">
                  <span className="text-gold mt-0.5 shrink-0">→</span>
                  <span className="text-muted-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">Start with a Free SEO Audit</h2>
            <p className="text-muted-foreground mb-6">
              We will scan your site, map your keyword gaps, and show you exactly what it would
              take to build a system that ranks — before you spend anything.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Free SEO Audit
              </Link>
              <Link
                href="/case-studies/b2b-saas-organic-growth-217"
                className="inline-flex items-center justify-center px-8 py-4 glass border border-gold/30 text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                See Client Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
