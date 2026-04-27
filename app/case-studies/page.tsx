import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | Outcome Labs',
  description:
    'Real results from real revenue engineering engagements. See how we have built SEO systems, conversion funnels, and automation that generated measurable ROI.',
  alternates: { canonical: 'https://outcomelabs.com/case-studies' },
};

const caseStudies = [
  {
    slug: 'ecommerce-conversion-4x',
    industry: 'E-Commerce',
    result: '4× Conversion Rate',
    summary:
      'Rebuilt the checkout funnel and implemented server-side tracking. Conversion rate increased from 1.2% to 4.8% in 90 days.',
    tags: ['Conversion Engineering', 'Server-Side Tracking'],
  },
  {
    slug: 'b2b-saas-organic-growth-217',
    industry: 'B2B SaaS',
    result: '217% Organic Growth',
    summary:
      'Deployed a programmatic content engine targeting 3,400 long-tail keywords. Organic sessions up 217% in 6 months.',
    tags: ['SEO Engineering', 'Programmatic Content'],
  },
  {
    slug: 'whatsapp-lead-qualification',
    industry: 'Professional Services',
    result: '68% Qualification Rate',
    summary:
      'Replaced inbound email intake with a WhatsApp qualification flow. Lead-to-meeting rate increased from 18% to 68%.',
    tags: ['WhatsApp Automation', 'Lead Qualification'],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">Case Studies</h1>
          <p className="text-xl text-muted-foreground mb-16 max-w-2xl">
            Every engagement is a system build, not a campaign. These are the measurable outcomes.
          </p>

          <div className="space-y-8">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                href={`/case-studies/${study.slug}`}
                className="block glass-card p-8 rounded-xl hover:border-gold/30 border border-border/50 transition-colors group"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                    {study.industry}
                  </span>
                  <span className="text-2xl font-bold text-gold">{study.result}</span>
                </div>
                <p className="text-muted-foreground mb-6">{study.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold border border-gold/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 text-gold font-medium group-hover:underline">
                  Read case study →
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 glass-card p-8 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-4">Want results like these?</h2>
            <p className="text-muted-foreground mb-6">
              Start with a free audit of your current revenue infrastructure.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
