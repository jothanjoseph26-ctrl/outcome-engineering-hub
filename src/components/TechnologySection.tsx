import {
  Bot,
  Cloud,
  Gauge,
  Network,
  Radar,
  Route,
  Server,
  Workflow,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const edgePillars = [
  {
    title: 'Cloudflare Workers',
    strapline: 'Rewrite Reality at the Edge',
    icon: Cloud,
    description:
      'We execute SEO logic between your origin and the browser. Google ranks what it sees, and we control that layer.',
    bullets: [
      'Modify HTML responses before delivery',
      'Inject schema into thousands of pages programmatically',
      'Run metadata tests without CMS deployment',
      'Fix crawl blockers without core code edits',
    ],
  },
  {
    title: 'Edge-Deployed Optimization',
    strapline: 'Speed as a Ranking Weapon',
    icon: Zap,
    description:
      'Most teams optimize content. We optimize latency physics and routing behavior where milliseconds change revenue.',
    bullets: [
      'Edge caching by page intent and traffic type',
      'Geo-aware rendering and intelligent bot routing',
      'Crawl-priority scripting for high-value sections',
      'Sub-second delivery tuned for African networks first',
    ],
  },
  {
    title: 'SSR and Dynamic Rendering',
    strapline: 'Make JavaScript Crawlable',
    icon: Server,
    description:
      'Modern frontend stacks can hide content from crawlers. We build hybrid render pipelines so bots get indexable output.',
    bullets: [
      'Bot-specific rendering logic for crawl reliability',
      'Hybrid SSR/CSR architecture design',
      'Prerender workflows for critical templates',
      'Faster indexation with lower crawl waste',
    ],
  },
  {
    title: 'Crawlability Engineering',
    strapline: 'Fix Invisible Leaks',
    icon: Radar,
    description:
      'Traffic loss usually comes from technical inefficiencies, not copy quality. We instrument and eliminate crawl leakage.',
    bullets: [
      'Crawl map design and orphan-page detection',
      'Log-level analysis of bot behavior',
      'Parameter control and duplicate-render handling',
      'Crawl budget allocation by revenue priority',
    ],
  },
  {
    title: 'Schema Injection',
    strapline: 'Structured Data at Scale',
    icon: Workflow,
    description:
      'Rich results are engineered systems. We deploy edge-level JSON-LD injection and entity reinforcement.',
    bullets: [
      'FAQ, Product, Review, and Organization schema',
      'Automated schema updates as source data changes',
      'Entity consistency across templates and locales',
      'No manual page-by-page schema operations',
    ],
  },
  {
    title: 'Automated Data Pipelines',
    strapline: 'Turn Databases into Rankings',
    icon: Network,
    description:
      'Your backend stores ranking assets. We build pipelines that transform structured records into search-ready markup.',
    bullets: [
      'Pull from backend APIs, DBs, and catalogs',
      'Map records to schema graph structures',
      'Inject dynamically at edge or render layer',
      'Keep search output synchronized automatically',
    ],
  },
  {
    title: 'CDN Optimization',
    strapline: 'Infrastructure-Level Acceleration',
    icon: Route,
    description:
      'Performance is not a plugin setting. We optimize asset distribution, cache logic, and route behavior at the network layer.',
    bullets: [
      'Image and asset delivery pipelines',
      'Geo-routing and cache invalidation strategy',
      'Load balancing for traffic volatility',
      'Regional resilience tuning for mobile-first usage',
    ],
  },
  {
    title: 'Sub-Second Load Systems',
    strapline: 'Engineer Speed, Not Hope',
    icon: Gauge,
    description:
      'We target measurable performance thresholds that directly impact ranking, conversion, and ad efficiency.',
    bullets: [
      'LCP targets under 1.2 seconds where feasible',
      'TTFB minimization and render-path reduction',
      'Mobile performance as baseline, not fallback',
      'Continuous monitoring tied to revenue KPIs',
    ],
  },
];

const signalIcons = [
  { icon: Bot, label: 'Bot-Aware Rendering' },
  { icon: Cloud, label: 'Edge Execution Layer' },
  { icon: Network, label: 'Systems Thinking' },
  { icon: Radar, label: 'Crawl Intelligence' },
  { icon: Gauge, label: 'Performance Engineering' },
  { icon: Workflow, label: 'Automation Pipelines' },
];

export const TechnologySection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--teal)) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold mb-5">
            Edge SEO and Infrastructure
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Not Rankings. Not Traffic.
            <br />
            <span className="text-gradient-gold">Infrastructure.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Most agencies optimize pages. We optimize the layer between your code and the internet.
            That is where leverage lives.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {signalIcons.map(({ icon: Icon, label }) => (
            <div 
              key={label}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-xl glass-card flex items-center justify-center group-hover:border-gold/50 transition-colors">
                <Icon className="w-8 h-8 text-muted-foreground group-hover:text-gold transition-colors" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
              </span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {edgePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.title}
                className="glass-card rounded-2xl p-7 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold">{pillar.title}</h3>
                    <p className="text-xs font-mono uppercase tracking-[0.14em] text-teal mt-1">
                      {pillar.strapline}
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{pillar.description}</p>
                <ul className="space-y-3">
                  {pillar.bullets.map((item) => (
                    <li 
                      key={item}
                      className="flex items-start gap-3 text-muted-foreground group-hover:text-foreground/80 transition-colors"
                    >
                      <span className="text-gold font-mono text-sm mt-0.5">›</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-br from-card to-muted/30 p-8 md:p-10">
          <h3 className="text-2xl md:text-3xl font-display font-bold">
            Positioning Signal: We Are Infrastructure, Not a Service Vendor.
          </h3>
          <p className="mt-4 text-muted-foreground max-w-3xl">
            Outcome Labs is early-stage by age, but engineered for enterprise-grade execution from day one.
            We do not sell activity. We design and operate technical systems that compound revenue.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="hero" className="gap-2">
              Start Infrastructure Audit
            </Button>
            <Button variant="heroOutline" className="gap-2">
              See Technical Architecture
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Edge Layer Control', 'Crawl Budget Instrumentation', 'Automated Schema Systems'].map((badge) => (
              <span
                key={badge}
                className="px-4 py-2 rounded-full border border-border/60 bg-background/60 text-xs font-mono text-muted-foreground"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
