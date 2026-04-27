import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conversion Engineering System | Outcome Labs',
  description:
    'We rebuild your acquisition funnel from first touch to closed deal — server-side tracking, landing page architecture, checkout optimisation, and A/B testing infrastructure. Most clients see 2–4× conversion improvement within 90 days.',
  alternates: { canonical: 'https://outcomelabs.com/solutions/conversion-engineering' },
};

const phases = [
  {
    step: '01',
    title: 'Measurement Rebuild',
    color: 'text-gold',
    description:
      'Before optimising anything, we fix your measurement layer. We deploy server-side tracking via first-party data infrastructure, deduplicate events, and validate conversion signal across all paid channels.',
    outcomes: [
      'Server-side event tracking via Conversions API (Meta, Google, TikTok)',
      'First-party data layer with consent-compliant cookie handling',
      'Attribution model validation and cross-channel de-duplication',
      'Conversion signal completeness: target 90%+ match rate',
    ],
  },
  {
    step: '02',
    title: 'Funnel Diagnosis',
    color: 'text-teal',
    description:
      'We map your entire acquisition funnel and identify every point where revenue is leaking. Every drop-off rate, every friction point, every conversion gap gets quantified.',
    outcomes: [
      'Full funnel visualisation: ad click → landing → lead → qualified → closed',
      'Heatmap and session recording analysis',
      'Page speed audit — every 100ms of LCP costs 1% in conversion',
      'Mobile conversion gap analysis (usually 30–50% worse than desktop)',
    ],
  },
  {
    step: '03',
    title: 'Landing Page Architecture',
    color: 'text-gold',
    description:
      'We rebuild landing pages around conversion engineering principles: message match, friction removal, social proof architecture, and CTA hierarchy.',
    outcomes: [
      'Dedicated landing pages per campaign and keyword intent',
      'Above-the-fold optimisation for immediate message match',
      'Social proof placement mapped to conversion psychology',
      'Form optimisation — progressive disclosure for complex forms',
    ],
  },
  {
    step: '04',
    title: 'A/B Testing Infrastructure',
    color: 'text-teal',
    description:
      'We build a systematic testing programme — not random experiments, but a structured hypothesis pipeline that compounds conversion gains over time.',
    outcomes: [
      'Testing cadence: two experiments live at all times minimum',
      'Statistical significance thresholds enforced before calling winners',
      'Winner implementation pipeline — validated changes ship within 48h',
      'Test library: documented results that compound into institutional knowledge',
    ],
  },
];

const results = [
  { value: '4×', label: 'Conversion rate improvement (e-commerce client)' },
  { value: '+220%', label: 'Revenue per session (same client, 90 days)' },
  { value: '26h → 4min', label: 'Lead response time (B2B client)' },
  { value: '68%', label: 'Lead-to-meeting rate (professional services)' },
];

export default function ConversionEngineeringPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-4xl">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">
              Solution
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            Conversion Engineering System
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            Most businesses optimise their ads while their funnel leaks. We fix the funnel first.
            Conversion engineering is the discipline of systematically removing the gap between
            traffic and revenue.
          </p>
          <p className="text-base text-muted-foreground mb-16 max-w-3xl">
            We rebuild your acquisition infrastructure — tracking, landing pages, checkout,
            and qualification flows — then install a continuous testing programme that compounds
            gains month over month.
          </p>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {results.map((r) => (
              <div key={r.label} className="glass p-5 rounded-xl text-center">
                <div className="text-2xl font-bold text-gold mb-1">{r.value}</div>
                <div className="text-xs text-muted-foreground">{r.label}</div>
              </div>
            ))}
          </div>

          {/* Phases */}
          <h2 className="text-2xl font-bold mb-8">The Four-Phase System</h2>
          <div className="space-y-6 mb-20">
            {phases.map((phase) => (
              <div key={phase.step} className="glass-card p-8 rounded-xl">
                <div className="flex items-start gap-6">
                  <span className={`text-3xl font-mono font-bold ${phase.color} shrink-0`}>
                    {phase.step}
                  </span>
                  <div>
                    <h3 className={`text-xl font-bold mb-3 ${phase.color}`}>{phase.title}</h3>
                    <p className="text-muted-foreground mb-5 leading-relaxed">{phase.description}</p>
                    <ul className="space-y-2">
                      {phase.outcomes.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-muted-foreground text-sm">
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
            <h2 className="text-2xl font-bold mb-6">Built For Businesses With Traffic But No Conversion</h2>
            <div className="glass p-8 rounded-xl text-muted-foreground space-y-4">
              <p>
                If you are spending on ads and your ROAS is declining — conversion engineering is
                your fix. You are almost certainly losing revenue in your funnel, not your targeting.
              </p>
              <p>
                The benchmark: a well-engineered e-commerce funnel converts at 3–5%. Most brands
                are at 1–2%. That gap is pure revenue left on the table. On $1M in ad spend at
                2% conversion, closing to 4% doubles revenue without spending another dollar.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">Find Your Conversion Leak</h2>
            <p className="text-muted-foreground mb-6">
              Our free audit identifies every major drop-off point in your funnel and
              quantifies the revenue impact. No pitch — just the diagnosis.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Free Funnel Audit
              </Link>
              <Link
                href="/case-studies/ecommerce-conversion-4x"
                className="inline-flex items-center justify-center px-8 py-4 glass border border-gold/30 text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                See the 4× Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
