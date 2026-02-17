import { 
  Code2, 
  Database, 
  Cloud, 
  Cpu, 
  LineChart, 
  Shield,
  Zap,
  GitBranch,
  Server
} from 'lucide-react';

const techCategories = [
  {
    title: 'Advertising Automation',
    icon: Zap,
    items: [
      'Google Ads API (direct control)',
      'Meta Marketing API',
      'LinkedIn Campaign Manager API',
      'Custom bid algorithms (Python)',
      'Predictive budget allocation',
    ],
  },
  {
    title: 'Data & Analytics',
    icon: LineChart,
    items: [
      'BigQuery (data warehouse)',
      'Looker Studio (visualization)',
      'Google Analytics 4 + Server GTM',
      'Custom attribution modeling',
      'PostgreSQL (client databases)',
    ],
  },
  {
    title: 'Automation Infrastructure',
    icon: GitBranch,
    items: [
      'Cloudflare Workers (edge computing)',
      'WhatsApp Business API',
      'Zapier / Make.com (orchestration)',
      'Python / Node.js (custom scripts)',
      'AI Integration (GPT-4, Claude)',
    ],
  },
];

const techIcons = [
  { icon: Code2, label: 'Custom Code' },
  { icon: Database, label: 'Data Systems' },
  { icon: Cloud, label: 'Cloud Native' },
  { icon: Cpu, label: 'ML/AI Powered' },
  { icon: Server, label: 'Edge Computing' },
  { icon: Shield, label: 'Enterprise Security' },
];

export const TechnologySection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--teal)) 1px, transparent 0)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Built on
            <br />
            <span className="text-gradient-gold">Engineering-Grade Infrastructure</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't use marketing tools. We program them.
          </p>
        </div>

        {/* Tech Icons Row */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {techIcons.map(({ icon: Icon, label }) => (
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

        {/* Tech Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className="glass-card rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-display font-semibold">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {category.items.map((item) => (
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

        {/* Partner Badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {['Google Partner', 'Meta Partner', 'AWS Certified'].map((badge) => (
            <div 
              key={badge}
              className="px-6 py-3 rounded-full border border-border/50 bg-background/50 text-sm text-muted-foreground"
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
