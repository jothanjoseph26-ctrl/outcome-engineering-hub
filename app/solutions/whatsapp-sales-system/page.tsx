import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhatsApp Sales System | Outcome Labs',
  description:
    'Replace slow email intake with a WhatsApp qualification and sales system. Respond to leads in under 30 seconds, qualify in 4 minutes, and book meetings automatically. Most clients see 3–4× improvement in lead-to-meeting rate.',
  alternates: { canonical: 'https://outcomelabs.com/solutions/whatsapp-sales-system' },
};

const flowSteps = [
  {
    step: '01',
    title: 'Instant Trigger',
    color: 'text-gold',
    body: 'The moment a lead submits your form, a webhook fires. Within 30 seconds they receive a personalised WhatsApp message. No waiting. No lead decay.',
  },
  {
    step: '02',
    title: 'Automated Qualification',
    color: 'text-teal',
    body: 'A structured conversation qualifies budget, timeline, and fit in under 4 minutes. Branching logic handles every response path. No human required at this stage.',
  },
  {
    step: '03',
    title: 'Smart Routing',
    color: 'text-gold',
    body: 'Qualified leads receive a calendar booking link instantly. Unqualified leads enter a nurture sequence. Edge cases get flagged to your sales team with full context attached.',
  },
  {
    step: '04',
    title: 'CRM Sync',
    color: 'text-teal',
    body: 'Every conversation is logged to your CRM with qualification data attached. Your sales team walks into every call with context. No manual data entry.',
  },
];

const comparison = [
  { metric: 'First response time', before: '26 hours', after: '< 30 seconds' },
  { metric: 'Lead-to-meeting rate', before: '15–20%', after: '60–70%' },
  { metric: 'Qualification time', before: '2–3 days', after: '4 minutes' },
  { metric: 'Sales team time per lead', before: '45 minutes', after: '8 minutes' },
  { metric: 'Lead decay rate', before: 'High (24h+ response)', after: 'Near zero' },
];

export default function WhatsappSalesSystemPage() {
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
            WhatsApp Sales System
          </h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-3xl">
            Email intake is a revenue leak. Leads submit your form, wait 24 hours for a reply,
            and go cold. The WhatsApp Sales System closes that gap — responding in 30 seconds
            and qualifying leads automatically while your team sleeps.
          </p>
          <p className="text-base text-muted-foreground mb-16 max-w-3xl">
            This is not a chatbot. It is a revenue infrastructure build — triggered automation,
            branching qualification logic, CRM integration, and a human handoff protocol that
            gets your sales team talking to warm, pre-qualified prospects.
          </p>

          {/* Before / After */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold mb-8">Before vs After</h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 bg-card/50 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <span>Metric</span>
                <span className="text-center">Before</span>
                <span className="text-center text-gold">After</span>
              </div>
              {comparison.map((row, i) => (
                <div
                  key={row.metric}
                  className={`grid grid-cols-3 px-6 py-4 ${i % 2 === 0 ? 'bg-background/30' : ''}`}
                >
                  <span className="text-sm text-muted-foreground">{row.metric}</span>
                  <span className="text-center text-sm text-muted-foreground/60 line-through">
                    {row.before}
                  </span>
                  <span className="text-center text-sm font-semibold text-gold">{row.after}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Flow */}
          <h2 className="text-2xl font-bold mb-8">How the System Works</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {flowSteps.map((step) => (
              <div key={step.step} className="glass p-6 rounded-xl">
                <span className={`text-2xl font-mono font-bold ${step.color} block mb-3`}>
                  {step.step}
                </span>
                <h3 className={`text-lg font-bold mb-3 ${step.color}`}>{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>

          {/* What's included */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">What We Build</h2>
            <ul className="space-y-3">
              {[
                'WhatsApp Business API setup and phone number verification',
                'Webhook integration with your existing intake form',
                'Qualification conversation flow with branching logic',
                'Calendar integration for direct booking (Calendly, Cal.com, HubSpot)',
                'CRM sync with full conversation transcript and qualification data',
                'Nurture sequence for unqualified leads',
                'Sales team notification system with lead context',
                'Reporting dashboard: response rate, qualification rate, booking rate',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="text-gold mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-3">Stop Losing Leads to Slow Response</h2>
            <p className="text-muted-foreground mb-6">
              We can have a WhatsApp qualification system live for your business in two weeks.
              Start with a free audit of your current lead intake process.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/scanner"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Get Free Lead Audit
              </Link>
              <Link
                href="/case-studies/whatsapp-lead-qualification"
                className="inline-flex items-center justify-center px-8 py-4 glass border border-gold/30 text-gold font-bold rounded-lg hover:bg-gold/10 transition-colors"
              >
                See the 68% Case Study
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
