import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const caseStudies: Record<
  string,
  {
    title: string;
    industry: string;
    result: string;
    description: string;
    challenge: string;
    solution: string;
    outcome: string;
    metrics: { label: string; value: string }[];
    tags: string[];
  }
> = {
  'ecommerce-conversion-4x': {
    title: 'E-Commerce Brand: 4× Conversion Rate in 90 Days',
    industry: 'E-Commerce',
    result: '4× Conversion Rate',
    description:
      'How we rebuilt the checkout funnel and implemented server-side tracking to take a DTC brand from 1.2% to 4.8% conversion.',
    challenge:
      'A growing DTC brand was spending heavily on paid acquisition but converting poorly. Their tracking was broken — iOS changes had wiped out 60% of conversion signal — and their checkout had five unnecessary steps.',
    solution:
      'We deployed server-side tracking via a first-party data layer, rebuilt the checkout to three steps, implemented dynamic remarketing with accurate signal, and A/B tested three checkout variants simultaneously.',
    outcome:
      'Within 90 days, conversion rate went from 1.2% to 4.8%. ROAS on paid improved from 1.8× to 4.1× due to better signal. Revenue per session increased 3.2×.',
    metrics: [
      { label: 'Conversion Rate', value: '1.2% → 4.8%' },
      { label: 'ROAS', value: '1.8× → 4.1×' },
      { label: 'Revenue per Session', value: '+220%' },
      { label: 'Time to Result', value: '90 days' },
    ],
    tags: ['Conversion Engineering', 'Server-Side Tracking', 'E-Commerce'],
  },
  'b2b-saas-organic-growth-217': {
    title: 'B2B SaaS: 217% Organic Traffic Growth in 6 Months',
    industry: 'B2B SaaS',
    result: '217% Organic Growth',
    description:
      'How a programmatic content engine targeting 3,400 long-tail keywords drove 217% organic traffic growth for a B2B SaaS company.',
    challenge:
      'A Series A SaaS company had zero organic presence. They were entirely dependent on paid ads and partnerships. CAC was rising and they needed a compounding acquisition channel.',
    solution:
      'We built a topic cluster architecture across their five core use cases, deployed a programmatic content engine for 3,400 long-tail keywords, and established a technical SEO foundation with schema markup and internal linking at scale.',
    outcome:
      'Organic sessions up 217% over 6 months. 94 page-1 rankings achieved. Inbound demo requests from organic grew from 0 to 34 per month. CAC on the organic channel is zero.',
    metrics: [
      { label: 'Organic Session Growth', value: '+217%' },
      { label: 'Keywords Ranking', value: '3,400+' },
      { label: 'Page-1 Rankings', value: '94' },
      { label: 'Organic Demos/Month', value: '34' },
    ],
    tags: ['SEO Engineering', 'Programmatic Content', 'B2B SaaS'],
  },
  'whatsapp-lead-qualification': {
    title: 'Professional Services: 68% Lead Qualification via WhatsApp',
    industry: 'Professional Services',
    result: '68% Qualification Rate',
    description:
      'How replacing email intake with a WhatsApp qualification flow took lead-to-meeting rate from 18% to 68%.',
    challenge:
      'A consulting firm was losing leads in a slow email intake process. Prospects would fill a form, wait 24–48 hours for a response, and go cold. Lead-to-meeting conversion was 18%.',
    solution:
      'We built an automated WhatsApp qualification flow triggered immediately on form submit. The bot qualifies budget, timeline, and fit in under 3 minutes, then routes qualified leads directly to calendar booking.',
    outcome:
      'Lead-to-meeting rate increased from 18% to 68%. Average response time dropped from 26 hours to 4 minutes. Revenue per qualified lead increased 2.1×.',
    metrics: [
      { label: 'Lead-to-Meeting Rate', value: '18% → 68%' },
      { label: 'Avg Response Time', value: '26h → 4min' },
      { label: 'Revenue per Lead', value: '+110%' },
      { label: 'Implementation Time', value: '2 weeks' },
    ],
    tags: ['WhatsApp Automation', 'Lead Qualification', 'Professional Services'],
  },
};

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return {};
  return {
    title: `${study.title} | Outcome Labs`,
    description: study.description,
    alternates: { canonical: `https://outcomelabs.com/case-studies/${slug}` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-3xl">
          <div className="mb-8">
            <Link href="/case-studies" className="text-gold hover:underline inline-block">
              ← All Case Studies
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-gold/10 text-gold border border-gold/20"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-gold">{study.title}</h1>
          <p className="text-xl text-muted-foreground mb-12">{study.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {study.metrics.map((m) => (
              <div key={m.label} className="glass p-4 rounded-xl text-center">
                <div className="text-xl font-bold text-gold mb-1">{m.value}</div>
                <div className="text-xs text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </div>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold mb-4">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
          </section>

          <section className="mb-16">
            <h2 className="text-xl font-bold mb-4">The Outcome</h2>
            <p className="text-muted-foreground leading-relaxed">{study.outcome}</p>
          </section>

          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-3">Want results like this?</h2>
            <p className="text-muted-foreground mb-6">
              Start with a free audit. We will show you exactly what is holding your revenue
              infrastructure back.
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
