import { ArrowRight, Zap, BarChart3, Target, Database, Globe, Shield, FileText, Lightbulb, Users, Calculator, BookOpen, MessageSquare, MessageCircle, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  activeSection: string;
}

const systemsContent = {
  columns: [
    {
      title: 'Programmatic Advertising',
      icon: Zap,
      items: [
        { label: 'API Campaign Control', desc: 'Direct manipulation via Google/Meta APIs' },
        { label: 'Custom Automation Scripts', desc: 'Python-powered campaign optimization' },
        { label: 'Predictive Bidding', desc: 'ML-driven bid management' },
        { label: 'Dynamic Creative', desc: 'Automated creative optimization' },
      ],
      link: { label: 'View Technical Docs', href: '#' },
    },
    {
      title: 'Edge SEO & Infrastructure',
      icon: Globe,
      items: [
        { label: 'Cloudflare Workers', desc: 'Edge-deployed optimization' },
        { label: 'Server-Side Rendering', desc: 'Performance & crawlability' },
        { label: 'Schema Injection', desc: 'Automated structured data' },
        { label: 'CDN Optimization', desc: 'Sub-second page loads' },
      ],
      link: { label: 'View Architecture', href: '#' },
    },
    {
      title: 'Server-Side Tracking',
      icon: Database,
      items: [
        { label: 'Server GTM', desc: 'Bypass ad blockers (+30% data)' },
        { label: 'First-Party Pipelines', desc: 'Your data, your control' },
        { label: 'Conversions API', desc: 'Facebook/Google CAPI' },
        { label: 'Multi-Touch Attribution', desc: 'Cookie-less tracking' },
      ],
      link: { label: 'Data Flow Diagram', href: '#' },
    },
    {
      title: 'Data Sovereignty',
      icon: Shield,
      items: [
        { label: 'BigQuery Integration', desc: 'Enterprise data warehouse' },
        { label: 'Custom Dashboards', desc: 'Real-time Looker reports' },
        { label: 'Predictive Scoring', desc: 'Lead & LTV prediction' },
        { label: 'Automated Audits', desc: 'Waste detection alerts' },
      ],
      link: { label: 'Dashboard Demo', href: '#' },
    },
    {
      title: 'WhatsApp Revenue Engineering',
      icon: MessageCircle,
      isNew: true,
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
  if (activeSection === 'Systems') {
    return (
      <div className="absolute left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border/50 shadow-2xl mega-menu-enter">
        <div className="container-lg py-12">
          <div className="grid grid-cols-6 gap-8 xl:gap-12">
            {systemsContent.columns.map((column, index) => (
              <div key={column.title} className={`space-y-6 ${index < systemsContent.columns.length - 1 ? 'border-r border-border/30 pr-8' : ''}`}>
                <div className="flex items-center gap-3 text-gold">
                  <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                    <column.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-lg uppercase tracking-wide flex items-center gap-2">
                    {column.title}
                    {column.isNew && (
                      <span className="px-2 py-1 text-xs bg-teal/20 text-teal rounded-full font-mono">NEW</span>
                    )}
                  </h3>
                </div>
                 <div className="space-y-1">
                   {column.items.map((item) => (
                     <div key={item.label} className="group">
                       {item.href ? (
                         <Link to={item.href} className="group block p-3 rounded-lg hover-card hover:bg-muted/30">
                           <span className="text-foreground group-hover:text-gold transition-colors font-semibold text-sm leading-tight">
                             {item.label}
                           </span>
                           <span className="block text-xs text-muted-foreground/60 mt-1 leading-relaxed">
                             {item.desc}
                           </span>
                         </Link>
                       ) : (
                         <a href="#" className="group block p-3 rounded-lg hover-card hover:bg-muted/30">
                           <span className="text-foreground group-hover:text-gold transition-colors font-semibold text-sm leading-tight">
                             {item.label}
                           </span>
                           <span className="block text-xs text-muted-foreground/60 mt-1 leading-relaxed">
                             {item.desc}
                           </span>
                         </a>
                       )}
                     </div>
                   ))}
                 </div>
                 {column.link.isRoute ? (
                   <Link to={column.link.href} className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-glow transition-colors font-medium">
                     {column.link.label} <ArrowRight className="w-4 h-4" />
                   </Link>
                 ) : (
                   <a href={column.link.href} className="inline-flex items-center gap-2 text-sm text-gold hover:text-gold-glow transition-colors font-medium">
                     {column.link.label} <ArrowRight className="w-4 h-4" />
                   </a>
                 )}
              </div>
            ))}
          </div>
          
          {/* Featured System */}
          <div className="mt-8 pt-6 border-t border-border/50">
            <div className="gradient-border rounded-xl p-6 flex items-center gap-6 hover-card">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 text-gold" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg text-foreground">{systemsContent.featured.title}</h4>
                <p className="text-sm text-muted-foreground/80 mt-1 leading-relaxed">{systemsContent.featured.desc}</p>
              </div>
              <a href="#" className="ml-6 px-4 py-2 rounded-lg bg-gold/10 text-gold hover:bg-gold/20 transition-all duration-200 flex items-center gap-2 text-sm font-semibold">
                {systemsContent.featured.link} <ArrowRight className="w-4 h-4" />
              </a>
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
