import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Engineering Services | Outcome Labs',
  description: 'Our SEO engineering service builds programmatic content systems that capture high-intent traffic and convert visitors into qualified leads automatically.',
};

export default function RevenueGrowthPage() {
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
            SEO Engineering
          </h1>
          <p className="text-xl text-muted-foreground mb-12">
            Build programmatic content systems that capture high-intent traffic and convert visitors 
            into qualified leads—on autopilot.
          </p>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What We Build</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-gold">Programmatic Content Engine</h3>
                <p className="text-muted-foreground">
                  Automated content generation that targets thousands of search queries simultaneously.
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-gold">Topic Clusters</h3>
                <p className="text-muted-foreground">
                  Comprehensive pillar pages with supporting content that establishes authority.
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-gold">Technical SEO Foundation</h3>
                <p className="text-muted-foreground">
                  Site architecture, schema markup, and performance optimization for maximum indexability.
                </p>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-lg font-bold mb-3 text-gold">Lead Capture Systems</h3>
                <p className="text-muted-foreground">
                  Optimized landing pages and conversion funnels that turn traffic into leads.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Who This Is For</h2>
            <ul className="space-y-4">
              {[
                'B2B SaaS companies looking to reduce customer acquisition costs',
                'Professional services firms wanting to own high-intent keywords',
                'E-commerce brands seeking organic traffic alternatives to paid ads',
                'Tech startups needing to establish SEO presence quickly'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Get Started</h2>
            <p className="text-muted-foreground mb-8">
              Ready to build an SEO system that generates leads while you sleep? 
              Let&apos;s discuss your revenue goals.
            </p>
            <Link href="/scanner" className="inline-flex items-center justify-center px-8 py-4 
              bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity">
              Start with a Free SEO Audit
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}