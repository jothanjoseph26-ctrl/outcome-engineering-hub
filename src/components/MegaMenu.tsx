import { useRef, useState, type MouseEvent } from 'react';
import { ArrowRight, Zap, BarChart3, Target, Database, Globe, Shield, FileText, Users, Calculator, BookOpen, MessageSquare, MessageCircle, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  activeSection: string;
}

const systemsContent = {
  columns: [
    {
      title: 'Programmatic Advertising',
      icon: Zap,
      summary: 'Automate acquisition and budget decisions with API-native media control.',
      items: [
        {
          label: 'API Campaign Control',
          desc: 'Direct manipulation via Google/Meta APIs',
          href: '/solutions/programmatic-advertising/api-control',
        },
        {
          label: 'Custom Automation Scripts',
          desc: 'Python-powered campaign optimization',
          href: '/solutions/programmatic-advertising/automation-scripts',
        },
        {
          label: 'Predictive Bidding',
          desc: 'ML-driven bid management',
          href: '/solutions/programmatic-advertising/predictive-bidding',
        },
        {
          label: 'Dynamic Creative',
          desc: 'Automated creative optimization',
          href: '/solutions/programmatic-advertising/dynamic-creative',
        },
      ],
      link: {
        label: 'View Technical Docs',
        href: '/solutions/programmatic-advertising/api-control',
        isRoute: true,
      },
    },
    {
      title: 'Edge SEO & Infrastructure',
      icon: Globe,
      summary: 'Not rankings work. Network-layer control for crawlability, rendering, and performance.',
      items: [
        {
          label: 'Cloudflare Workers',
          desc: 'Rewrite delivered HTML and metadata at edge nodes',
          href: '/solutions/edge-seo-infrastructure/cloudflare-workers',
        },
        {
          label: 'Edge-Deployed Optimization',
          desc: 'Latency physics and geo-aware response behavior',
          href: '/solutions/edge-seo-infrastructure/edge-deployed-optimization',
        },
        {
          label: 'Server-Side Rendering',
          desc: 'Make JavaScript sites crawlable and index-fast',
          href: '/solutions/edge-seo-infrastructure/server-side-rendering',
        },
        {
          label: 'Crawlability Engineering',
          desc: 'Fix crawl traps, duplicate renders, and budget waste',
          href: '/solutions/edge-seo-infrastructure/performance-crawlability-engineering',
        },
        {
          label: 'Schema Injection',
          desc: 'Push JSON-LD across thousands of URLs automatically',
          href: '/solutions/edge-seo-infrastructure/schema-injection',
        },
        {
          label: 'Structured Data Systems',
          desc: 'Transform backend records into search-ready markup',
          href: '/solutions/edge-seo-infrastructure/automated-structured-data-systems',
        },
        {
          label: 'CDN Optimization',
          desc: 'Region-aware acceleration and reliability tuning',
          href: '/solutions/edge-seo-infrastructure/cdn-optimization',
        },
        {
          label: 'Sub-Second Page Loads',
          desc: 'Performance thresholds tied directly to revenue impact',
          href: '/solutions/edge-seo-infrastructure/sub-second-page-loads',
        },
      ],
      link: {
        label: 'View Infrastructure Thesis',
        href: '/solutions/edge-seo-infrastructure',
        isRoute: true,
      },
    },
    {
      title: 'Server-Side Tracking',
      icon: Database,
      summary: 'Improve attribution accuracy with first-party data collection and routing.',
      items: [
        {
          label: 'Server GTM',
          desc: 'Bypass ad blockers (+30% data)',
          href: '/solutions/server-side-tracking/server-gtm',
        },
        {
          label: 'First-Party Pipelines',
          desc: 'Your data, your control',
          href: '/solutions/server-side-tracking/first-party-pipelines',
        },
        {
          label: 'Conversions API',
          desc: 'Facebook/Google CAPI',
          href: '/solutions/server-side-tracking/conversions-api',
        },
        {
          label: 'Multi-Touch Attribution',
          desc: 'Cookie-less tracking',
          href: '/solutions/server-side-tracking/multi-touch-attribution',
        },
      ],
      link: {
        label: 'Data Flow Diagram',
        href: '/solutions/server-side-tracking',
        isRoute: true,
      },
    },
    {
      title: 'Data Sovereignty',
      icon: Shield,
      summary: 'Own your analytics stack with warehouse-grade governance and modeling.',
      items: [
        {
          label: 'BigQuery Integration',
          desc: 'Enterprise data warehouse',
          href: '/solutions/data-sovereignty/bigquery-integration',
        },
        {
          label: 'Custom Dashboards',
          desc: 'Real-time decision interfaces',
          href: '/solutions/data-sovereignty/custom-dashboards',
        },
        {
          label: 'Predictive Scoring',
          desc: 'Lead and LTV prediction',
          href: '/solutions/data-sovereignty/predictive-scoring',
        },
        {
          label: 'Automated Audits',
          desc: 'Waste and integrity detection alerts',
          href: '/solutions/data-sovereignty/automated-audits',
        },
      ],
      link: {
        label: 'Dashboard Demo',
        href: '/solutions/data-sovereignty',
        isRoute: true,
      },
    },
    {
      title: 'WhatsApp Revenue Engineering',
      icon: MessageCircle,
      isNew: true,
      summary: 'Turn WhatsApp conversations into measurable pipeline and revenue flow.',
      items: [
        { label: 'Automated Lead Qualification', desc: 'AI-powered conversation routing', href: '/whatsapp/lead-qualification' },
        { label: 'CRM Integration', desc: 'Real-time sync with your systems', href: '/whatsapp/crm-integration' },
        { label: 'Broadcast Architecture', desc: 'Segmented mass messaging', href: '/whatsapp/broadcast' },
        { label: 'Conversion Analytics', desc: 'Full funnel tracking', href: '/whatsapp/analytics' },
      ],
      link: { label: 'View WhatsApp Stack', href: '/whatsapp', isRoute: true },
    },
    {
      title: 'Truereach - Digital Workforce',
      icon: Rocket,
      isNew: true,
      summary: 'Scale execution with a managed digital workforce and verified outcomes.',
      items: [
        { label: 'Human Task API', desc: '500+ verified digital workers' },
        { label: 'Campaign Orchestration', desc: 'Automated task distribution' },
        { label: 'Performance Tracking', desc: 'Real-time completion monitoring' },
        { label: 'Quality Assurance', desc: 'Verification & fraud prevention' },
      ],
      link: { label: 'View Truereach Platform', href: '/truereach', isRoute: true },
    },
  ],
  featured: {
    title: 'NEW: Inventory-Aware Ad Automation',
    desc: 'Automatically pause ads when stock drops below threshold. No wasted spend.',
    link: 'Learn More',
  },
};

const resultsContent = {
  columns: [
    {
      title: 'By Metric',
      items: [
        { label: 'CAC Reduction', value: '-40%', desc: 'average reduction' },
        { label: 'ROI Increase', value: '+294%', desc: 'average increase' },
        { label: 'Speed to Market', value: '3×', desc: 'faster deployment' },
      ],
    },
    {
      title: 'By Industry',
      items: [
        { label: 'SaaS B2B', href: '#' },
        { label: 'E-commerce', href: '#' },
        { label: 'Fintech', href: '#' },
        { label: 'Healthcare', href: '#' },
        { label: 'Political', href: '#' },
      ],
    },
    {
      title: 'Featured Case Study',
      featured: {
        client: 'TechCo Nigeria',
        result: '-60% CAC in 90 days',
        desc: 'API automation + server-side tracking',
      },
    },
  ],
  liveMetric: {
    value: '₦48.5M',
    label: 'Generated This Month',
  },
};

const resourcesContent = {
  columns: [
    {
      title: 'Learn',
      icon: BookOpen,
      items: [
        { label: 'The Engineering Books', desc: 'SEO, Ads, Social, Conversion' },
        { label: 'Technical Docs', desc: 'API guides & code examples' },
        { label: 'Academy', desc: 'Video courses & workshops' },
      ],
    },
    {
      title: 'Tools',
      icon: Calculator,
      items: [
        { label: 'Free SEO Audit', desc: 'Technical analysis' },
        { label: 'Ads Waste Detector', desc: 'Find budget leaks' },
        { label: 'ROI Calculator', desc: 'Estimate your savings' },
      ],
    },
    {
      title: 'Support',
      icon: MessageSquare,
      items: [
        { label: 'Book a Call', desc: '30-min strategy session' },
        { label: 'Discord Community', desc: 'Join 500+ marketers' },
        { label: 'Newsletter', desc: 'Weekly growth insights' },
      ],
    },
  ],
};

export const MegaMenu = ({ activeSection }: MegaMenuProps) => {
  const [activeSystem, setActiveSystem] = useState(systemsContent.columns[0].title);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const activeSystemContent =
    systemsContent.columns.find((column) => column.title === activeSystem) ?? systemsContent.columns[0];
  const handleSidebarMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const container = sidebarRef.current;
    if (!container) return;

    const maxScroll = container.scrollHeight - container.clientHeight;
    if (maxScroll <= 0) return;

    const rect = container.getBoundingClientRect();
    const pointerY = event.clientY - rect.top;
    const edgeZone = 56;
    const maxStep = 18;
    let step = 0;

    if (pointerY < edgeZone) {
      step = -((edgeZone - pointerY) / edgeZone) * maxStep;
    } else if (pointerY > rect.height - edgeZone) {
      step = ((pointerY - (rect.height - edgeZone)) / edgeZone) * maxStep;
    }

    if (step !== 0) {
      container.scrollTop = Math.min(maxScroll, Math.max(0, container.scrollTop + step));
    }
  };

  if (activeSection === 'Systems') {
    return (
      <div className="absolute left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-2xl mega-menu-enter">
        <div className="container-lg py-10">
          <div className="rounded-2xl border border-border/50 bg-card/70 overflow-hidden">
            <div className="grid lg:grid-cols-[320px_minmax(0,1fr)] h-[72vh] min-h-[420px] max-h-[720px]">
              <div ref={sidebarRef} className="bg-muted/30 p-5 h-full overflow-y-auto" onMouseMove={handleSidebarMouseMove}>
                <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-semibold">Directions</span>
                <div className="mt-3 space-y-1.5">
                  {systemsContent.columns.map((column) => {
                    const isActive = activeSystemContent.title === column.title;
                    return (
                      <button
                        key={column.title}
                        type="button"
                        className={`w-full text-left rounded-xl p-3 transition-all duration-200 border ${
                          isActive
                            ? 'bg-card border-border/70 shadow-lg'
                            : 'border-transparent hover:bg-card/70 hover:border-border/50'
                        }`}
                        onMouseEnter={() => setActiveSystem(column.title)}
                        onFocus={() => setActiveSystem(column.title)}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                            <column.icon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-semibold text-foreground leading-tight">{column.title}</h3>
                              {column.isNew && (
                                <span className="px-2 py-0.5 text-[10px] bg-teal/20 text-teal rounded-full font-mono">NEW</span>
                              )}
                            </div>
                            <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug line-clamp-2">{column.summary}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-l border-border/40 p-6 h-full overflow-y-auto">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground/80 font-semibold">Solutions</span>
                    <h3 className="mt-2 text-xl font-display font-semibold text-foreground">{activeSystemContent.title}</h3>
                  </div>
                  <div className="w-11 h-11 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                    <activeSystemContent.icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  {activeSystemContent.items.map((item) => (
                    <div key={item.label}>
                      {item.href ? (
                        <Link to={item.href} className="group block rounded-xl border border-transparent p-3 hover:border-border/60 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                              <activeSystemContent.icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">{item.label}</span>
                              <span className="block mt-1 text-xs text-muted-foreground/80 leading-relaxed">{item.desc}</span>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <a href="#" className="group block rounded-xl border border-transparent p-3 hover:border-border/60 hover:bg-muted/30 transition-colors">
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5 w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">
                              <activeSystemContent.icon className="w-3.5 h-3.5" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">{item.label}</span>
                              <span className="block mt-1 text-xs text-muted-foreground/80 leading-relaxed">{item.desc}</span>
                            </div>
                          </div>
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-border/50 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Need different solutions?</p>
                    <p className="text-xs text-muted-foreground mt-1">Get a custom stack mapped to your revenue goals.</p>
                  </div>
                  <a href="#" className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/15 text-gold hover:bg-gold/25 transition-colors text-sm font-semibold">
                    Start Free Revenue Audit <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'Results') {
    return (
      <div className="absolute left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-2xl mega-menu-enter">
        <div className="container-lg py-12">
          <div className="grid grid-cols-4 gap-10 xl:gap-12">
             {/* By Metric */}
             <div className="space-y-6">
               <div className="flex items-center gap-3 text-gold">
                 <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                   <BarChart3 className="w-6 h-6" />
                 </div>
                 <h3 className="font-display font-bold text-lg uppercase tracking-wide">By Metric</h3>
               </div>
              <div className="space-y-4">
                {resultsContent.columns[0].items.map((item: any) => (
                  <div key={item.label} className="glass-card rounded-lg p-3">
                    <span className="text-2xl font-bold font-mono text-gold">{item.value}</span>
                    <span className="block text-sm text-foreground">{item.label}</span>
                     <span className="text-xs text-muted-foreground/70 leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

             {/* By Industry */}
             <div className="space-y-6">
               <div className="flex items-center gap-3 text-gold">
                 <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                   <Target className="w-6 h-6" />
                 </div>
                 <h3 className="font-display font-bold text-lg uppercase tracking-wide">By Industry</h3>
               </div>
              <ul className="space-y-2">
                {resultsContent.columns[1].items.map((item: any) => (
                  <li key={item.label}>
                       <a href={item.href} className="block py-3 px-4 rounded-lg hover-card hover:bg-muted/30 text-foreground hover:text-gold transition-all duration-200">
                         {item.label}
                       </a>
                  </li>
                ))}
              </ul>
            </div>

             {/* Featured Case */}
             <div className="space-y-6">
               <div className="flex items-center gap-3 text-gold">
                 <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                   <Users className="w-6 h-6" />
                 </div>
                 <h3 className="font-display font-bold text-lg uppercase tracking-wide">Featured Case</h3>
               </div>
              <div className="glass-card rounded-xl p-5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Client</span>
                <h4 className="text-lg font-semibold text-foreground mt-1">{resultsContent.columns[2].featured?.client}</h4>
                <p className="text-2xl font-bold font-mono text-gold mt-2">{resultsContent.columns[2].featured?.result}</p>
                <p className="text-sm text-muted-foreground mt-1">{resultsContent.columns[2].featured?.desc}</p>
                <a href="#" className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold-glow transition-colors mt-4">
                  Read Full Story <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

             {/* Live Metric */}
             <div className="space-y-6">
               <div className="flex items-center gap-3 text-teal">
                 <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center">
                   <BarChart3 className="w-6 h-6 text-teal" />
                 </div>
                 <h3 className="font-display font-bold text-lg uppercase tracking-wide">Live Dashboard</h3>
               </div>
              <div className="gradient-border rounded-xl p-6 text-center">
                <span className="text-4xl font-bold font-mono text-foreground">{resultsContent.liveMetric.value}</span>
                <span className="block text-sm text-muted-foreground mt-1">{resultsContent.liveMetric.label}</span>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
                  <span className="text-xs text-success">Updating live</span>
                </div>
              </div>
              <a href="#" className="inline-flex items-center gap-1 text-sm text-teal hover:text-teal-glow transition-colors">
                View Real-Time Dashboard <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSection === 'Resources') {
    return (
      <div className="absolute left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-2xl mega-menu-enter">
        <div className="container-lg py-12">
          <div className="grid grid-cols-3 gap-16 xl:gap-20">
            {resourcesContent.columns.map((column, index) => (
              <div key={column.title} className={`space-y-6 ${index < resourcesContent.columns.length - 1 ? 'border-r border-border/30 pr-8' : ''}`}>
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                    <column.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide">
                    {column.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <a href="#" className="group block p-4 rounded-lg hover-card hover:bg-muted/30 transition-all duration-200">
                         <span className="text-foreground group-hover:text-gold transition-colors font-semibold">
                           {item.label}
                         </span>
                         <span className="block text-sm text-muted-foreground/70 mt-1 leading-relaxed">
                           {item.desc}
                         </span>
                       </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
