import { Link } from 'react-router-dom';
import { ArrowRight, Box, Cloud, Code2, Database, Globe, Layers, Network, Server, Shield, Workflow, Zap } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

const techComponents = [
  {
    icon: Cloud,
    title: 'Cloudflare Edge Network',
    description: 'Global edge execution via Workers for sub-50ms response times worldwide.',
    details: ['HTML response modification', 'Request/response header manipulation', 'Bot traffic routing', 'Geo-aware load balancing'],
  },
  {
    icon: Database,
    title: 'Data Layer Architecture',
    description: 'Unified customer data platform connecting CRM, analytics, and attribution systems.',
    details: ['Real-time CRM sync', 'Event streaming pipelines', 'Customer identity resolution', 'Data warehouse integration'],
  },
  {
    icon: Workflow,
    title: 'Automation Pipelines',
    description: 'Workflow automation connecting advertising APIs with internal systems.',
    details: ['Cross-platform bid management', 'Creative rotation systems', 'Budget allocation logic', 'Reporting automation'],
  },
  {
    icon: Code2,
    title: 'Server-Side Rendering',
    description: 'Hybrid SSR architecture ensuring crawler-friendly content delivery.',
    details: ['Bot-specific render paths', 'Dynamic prerendering', 'Cache invalidation', 'Core web vitals optimization'],
  },
  {
    icon: Network,
    title: 'CDN & Asset Pipeline',
    description: 'Intelligent asset delivery with edge caching and optimization.',
    details: ['Image optimization pipeline', 'Script deferral strategies', 'Preconnect/Preload hints', 'Brotli compression'],
  },
  {
    icon: Shield,
    title: 'Security & Compliance',
    description: 'Enterprise-grade security with data sovereignty controls.',
    details: ['DDoS protection', 'Rate limiting', 'GDPR compliance tools', 'Audit logging'],
  },
];

const integrationPoints = [
  { platform: 'Google Ads', status: 'Connected', capabilities: ['Bid management', 'Conversion tracking', 'Performance reporting'] },
  { platform: 'Meta Business', status: 'Connected', capabilities: ['Campaign automation', 'Audience sync', 'Attribution'] },
  { platform: 'LinkedIn Ads', status: 'Connected', capabilities: ['Lead gen forms', 'Account targeting', 'Campaign management'] },
  { platform: 'WhatsApp Business', status: 'Connected', capabilities: ['Message automation', 'Template management', 'CRM integration'] },
  { platform: 'HubSpot', status: 'Connected', capabilities: ['Contact sync', 'Deal pipeline', 'Activity tracking'] },
  { platform: 'Shopify', status: 'Connected', capabilities: ['Product sync', 'Order tracking', 'Customer data'] },
];

export default function TechnicalArchitecture() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <section className="pt-28 pb-16">
          <div className="container-lg">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold">Technical Systems</p>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-bold">
              Technical <span className="text-gradient-gold">Architecture</span>
            </h1>
            <p className="mt-5 max-w-3xl text-lg text-muted-foreground">
              A behind-the-scenes look at the infrastructure powering our client campaigns.
              Every system is built for scale, automation, and measurable outcomes.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" className="gap-2" asChild>
                <Link to="/scanner">
                  Start Infrastructure Audit <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="heroOutline" className="gap-2">
                Request Architecture Review
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14 border-y border-border/60 bg-card/30">
          <div className="container-lg">
            <h2 className="text-2xl font-display font-semibold mb-8">Core Infrastructure</h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {techComponents.map((tech) => {
                const Icon = tech.icon;
                return (
                  <div key={tech.title} className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-lg font-semibold">{tech.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{tech.description}</p>
                    <ul className="mt-4 space-y-2">
                      {tech.details.map((detail) => (
                        <li key={detail} className="text-xs text-muted-foreground flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-teal" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-display font-semibold">Integration Points</h2>
              <span className="text-xs font-mono uppercase tracking-[0.1em] text-gold">6 Active</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrationPoints.map((integration) => (
                <div key={integration.platform} className="glass-card rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">{integration.platform}</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">{integration.status}</span>
                  </div>
                  <ul className="space-y-1">
                    {integration.capabilities.map((cap) => (
                      <li key={cap} className="text-xs text-muted-foreground">{cap}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="container-lg">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-display font-semibold">Why This Matters</h2>
              <p className="mt-4 text-muted-foreground">
                Most agencies rely on third-party tools with limited customization. 
                We own our infrastructure, which means:
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-mono">01</span>
                  <div>
                    <strong className="block">Full API Access</strong>
                    <span className="text-sm text-muted-foreground">No feature limitations or platform dependencies</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-mono">02</span>
                  <div>
                    <strong className="block">Custom Automation</strong>
                    <span className="text-sm text-muted-foreground">Workflows tailored to your specific business logic</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-mono">03</span>
                  <div>
                    <strong className="block">Competitive Advantage</strong>
                    <span className="text-sm text-muted-foreground">Systems your competitors cannot easily replicate</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-card to-muted/30 p-8 md:p-10 text-center">
              <h2 className="text-3xl font-display font-bold">Ready to See Your Infrastructure?</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                Run a free technical audit to see where your current setup is losing you money.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="hero" size="lg" className="gap-2" asChild>
                  <Link to="/scanner">
                    Start Free Audit <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="heroOutline" size="lg" className="gap-2">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
