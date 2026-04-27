import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowRight, Users, MessageSquare, Search, Zap } from 'lucide-react';
import Link from 'next/link';

const dashboardPreview = '/images/dashboard-preview.jpg';
const whatsappSystem = '/images/whatsapp-system.jpg';

const systems = [
  {
    id: 'truereach',
    title: 'Truereach',
    subtitle: 'Digital Workforce Platform',
    description: 'Transform everyday people into a powerful digital workforce. Launch campaigns across active users, drive authentic engagement, and execute micro-tasks at scale.',
    features: [
      'Launch campaigns across 500+ active users',
      'Drive authentic engagement (likes, shares, reviews)',
      'Track and verify all activity',
      'Pay per completed action',
    ],
    metrics: [
      { label: 'Active Digital Workers', value: 847 },
      { label: 'Tasks Completed (30 days)', value: 12450 },
      { label: 'Task Success Rate', value: 94, suffix: '%' },
    ],
    icon: Users,
    color: 'gold',
    image: dashboardPreview,
    link: '/truereach',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Sales Engineering',
    subtitle: 'Revenue Infrastructure',
    description: 'Turn WhatsApp from inbox chaos into revenue infrastructure. Automated lead qualification, CRM sync, smart broadcasts, and conversion funnel tracking.',
    features: [
      'WhatsApp Business API integration',
      'Automated lead qualification',
      'Real-time CRM synchronization',
      'Smart broadcast systems',
    ],
    metrics: [
      { label: 'Avg Conversion Rate', value: 64, suffix: '%' },
      { label: 'Avg Response Time', value: 2.3, suffix: ' min', decimals: 1 },
      { label: 'Customer Satisfaction', value: 89, suffix: '%' },
    ],
    icon: MessageSquare,
    color: 'teal',
    image: whatsappSystem,
    link: '/whatsapp',
  },
  {
    id: 'seo',
    title: 'Edge SEO Infrastructure',
    subtitle: 'Network-Layer Control System',
    description: 'This is not content tuning. We modify the layer between your application and the internet using edge logic, render control, and crawl instrumentation.',
    features: [
      'Cloudflare Worker execution for HTML/schema rewrites',
      'Bot-aware rendering and crawlability engineering',
      'Automated structured data injection at scale',
      'CDN and load-path optimization for sub-second delivery',
    ],
    metrics: [
      { label: 'Avg Organic Growth (6mo)', value: 217, suffix: '%' },
      { label: 'Keywords Ranking', value: 3400, suffix: '+' },
      { label: 'Technical Score', value: 94, suffix: '/100' },
    ],
    icon: Search,
    color: 'success',
    image: dashboardPreview,
    link: '/solutions/edge-seo-infrastructure',
  },
];

export const SystemsSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden noise">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at bottom, hsl(var(--gold) / 0.1) 0%, transparent 60%)',
        }}
      />

      <div className="container-lg relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Zap className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-muted-foreground">Proprietary Technology</span>
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            The Engines Behind <span className="text-gradient-gold">Our Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Other agencies rent tools. We build the systems we run on.
          </p>
        </div>

        {/* Systems grid */}
        <div className="space-y-8">
          {systems.map((system, index) => (
            <div 
              key={system.id}
              className={`glass-card rounded-2xl p-8 lg:p-10 ${
                index % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      system.color === 'gold' ? 'bg-gold/20' :
                      system.color === 'teal' ? 'bg-teal/20' :
                      'bg-success/20'
                    }`}>
                      <system.icon className={`w-6 h-6 ${
                        system.color === 'gold' ? 'text-gold' :
                        system.color === 'teal' ? 'text-teal' :
                        'text-success'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-display font-bold text-foreground">{system.title}</h3>
                      <span className="text-sm text-muted-foreground">{system.subtitle}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-6">
                    {system.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {system.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-foreground">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          system.color === 'gold' ? 'bg-gold' :
                          system.color === 'teal' ? 'bg-teal' :
                          'bg-success'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={system.color === 'gold' ? 'hero' : system.color === 'teal' ? 'teal' : 'default'}
                    className="gap-2"
                    asChild
                  >
                    <Link href={system.link}>
                      Inspect {system.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Image + Metrics */}
                <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* System Preview Image */}
                  <div className="relative rounded-xl overflow-hidden border border-border/50">
                    <img 
                      src={system.image} 
                      alt={`${system.title} preview`}
                      className="w-full h-48 object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  </div>
                  
                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3">
                    {system.metrics.map((metric) => (
                      <div 
                        key={metric.label}
                        className="bg-background/50 rounded-xl p-4 text-center border border-border/50"
                      >
                        <div className={`text-2xl font-mono font-bold ${
                          system.color === 'gold' ? 'text-gold' :
                          system.color === 'teal' ? 'text-teal' :
                          'text-success'
                        }`}>
                          <AnimatedCounter 
                            end={metric.value} 
                            suffix={metric.suffix || ''} 
                            decimals={metric.decimals || 0}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
