import { Search, Target, Rocket, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    number: '01',
    title: 'Diagnose',
    subtitle: 'Data Audit',
    icon: Search,
    timeline: 'Week 1',
    items: [
      'Funnel analysis',
      'Traffic quality assessment',
      'Conversion leak detection',
      'Competitive intelligence',
      'Technology stack review',
    ],
    deliverable: 'Technical audit report (20-40 pages)',
  },
  {
    number: '02',
    title: 'Design',
    subtitle: 'System Architecture',
    icon: Target,
    timeline: 'Week 2',
    items: [
      'Outcome definition',
      'KPI framework',
      'Technology selection',
      'Automation blueprints',
      'Attribution modeling',
    ],
    deliverable: 'Implementation roadmap',
  },
  {
    number: '03',
    title: 'Deploy',
    subtitle: 'Implementation',
    icon: Rocket,
    timeline: 'Weeks 3-4',
    items: [
      'System build-out',
      'API integrations',
      'Tracking infrastructure',
      'Campaign launch',
      'Automation activation',
    ],
    deliverable: 'Live systems',
  },
  {
    number: '04',
    title: 'Optimize',
    subtitle: 'Continuous Improvement',
    icon: TrendingUp,
    timeline: 'Ongoing',
    items: [
      'Real-time monitoring',
      'A/B testing',
      'Algorithm tuning',
      'Monthly strategy sessions',
      'Quarterly deep dives',
    ],
    deliverable: 'Ongoing optimization',
  },
];

export const ProcessSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold) / 0.5) 1px, transparent 1px)`,
          backgroundSize: '1px 80px',
        }}
      />

      <div className="container-lg relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            The Outcome <span className="text-gradient-gold">Engineering</span> Process
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that transforms marketing from guesswork to precision engineering.
          </p>
        </div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card */}
                <div className="glass-card rounded-2xl p-6 h-full hover-lift">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-5xl font-display font-bold text-gold/20 group-hover:text-gold/40 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-gold" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gold mb-4">{step.subtitle}</p>

                  <ul className="space-y-2 mb-6">
                    {step.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">{step.timeline}</span>
                      <span className="text-xs text-gold">{step.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-card border-2 border-gold z-10" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button variant="hero" size="xl" className="gap-2">
            <Target className="w-5 h-5" />
            Start Your Diagnostic Audit
          </Button>
        </div>
      </div>
    </section>
  );
};
