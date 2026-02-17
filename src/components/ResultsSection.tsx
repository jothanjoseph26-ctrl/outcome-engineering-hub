import { ArrowUp, ArrowDown, TrendingUp, Clock, Users, Target } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { Button } from './ui/button';

const mainMetrics = [
  {
    value: 127.4,
    prefix: '₦',
    suffix: 'M',
    label: 'Total Client Revenue Generated',
    change: '+23%',
    changeLabel: 'vs Last Month',
    positive: true,
  },
  {
    value: 284,
    suffix: '%',
    label: 'Average ROI Across Active Clients',
    subtext: 'Industry Avg: 142%',
    positive: true,
  },
  {
    value: 42,
    prefix: '-',
    suffix: '%',
    label: 'Average Cost Per Acquisition Reduction',
    subtext: 'vs Their Previous Agency',
    positive: true,
  },
  {
    value: 89,
    suffix: ' Days',
    label: 'Average Time to Positive ROI',
    subtext: 'Industry: 180+ days',
    positive: true,
  },
];

const caseStudies = [
  {
    type: 'E-commerce Brand',
    icon: Target,
    challenge: '₦2M/month ad spend, negative ROI',
    solution: 'WhatsApp automation + attribution fixing',
    result: '₦8M revenue, 3.2× ROAS in 90 days',
    color: 'gold',
  },
  {
    type: 'Political Campaign',
    icon: Users,
    challenge: 'Low social media reach, youth disconnect',
    solution: 'Truereach activation + sentiment system',
    result: '847K reach, 23% engagement rate, won election',
    color: 'teal',
  },
  {
    type: 'B2B SaaS',
    icon: TrendingUp,
    challenge: 'High CAC, long sales cycle',
    solution: 'SEO engineering + automated nurturing',
    result: '-67% CAC, 4× demo bookings in 6 months',
    color: 'gold',
  },
];

export const ResultsSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-background to-teal/5" />
      
      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Outcomes,
            <br />
            <span className="text-gradient-gold">Not Opinions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real clients. Every number verified.
          </p>
        </div>

        {/* Main Metrics Dashboard */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainMetrics.map((metric, index) => (
            <div 
              key={metric.label}
              className="glass-card rounded-2xl p-6 text-center group hover:border-gold/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient-gold mb-2">
                {metric.prefix}
                <AnimatedCounter 
                  end={metric.value} 
                  decimals={metric.value % 1 !== 0 ? 1 : 0}
                  duration={2000}
                />
                {metric.suffix}
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {metric.label}
              </p>
              {metric.change && (
                <div className="flex items-center justify-center gap-1 text-emerald-500 text-sm">
                  <ArrowUp className="w-3 h-3" />
                  {metric.change} {metric.changeLabel}
                </div>
              )}
              {metric.subtext && (
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.subtext}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Case Studies */}
        <div className="mb-8">
          <h3 className="text-2xl font-display font-semibold text-center mb-8">
            Featured Case Studies
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => {
              const Icon = study.icon;
              return (
                <div 
                  key={study.type}
                  className="glass-card rounded-2xl p-8 group hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      study.color === 'gold' ? 'bg-gold/20' : 'bg-teal/20'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        study.color === 'gold' ? 'text-gold' : 'text-teal'
                      }`} />
                    </div>
                    <span className="font-display font-semibold">{study.type}</span>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="text-muted-foreground mb-1">Challenge:</p>
                      <p className="text-foreground">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Solution:</p>
                      <p className="text-foreground">{study.solution}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Result:</p>
                      <p className={`font-medium ${
                        study.color === 'gold' ? 'text-gold' : 'text-teal'
                      }`}>
                        {study.result}
                      </p>
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="mt-6 w-full group-hover:text-gold transition-colors"
                  >
                    Read Full Story →
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
