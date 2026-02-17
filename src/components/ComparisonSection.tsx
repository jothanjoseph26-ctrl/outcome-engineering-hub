import { Check, X, AlertTriangle } from 'lucide-react';

const comparisonData = [
  { 
    capability: 'Campaign Management', 
    traditional: 'Manual UI clicks', 
    us: 'API automation',
    traditionalStatus: 'bad'
  },
  { 
    capability: 'Optimization Frequency', 
    traditional: 'Weekly reviews', 
    us: 'Real-time (24/7)',
    traditionalStatus: 'bad'
  },
  { 
    capability: 'Attribution Accuracy', 
    traditional: 'Cookie-based (~70%)', 
    us: 'Server-side (100%)',
    traditionalStatus: 'warning'
  },
  { 
    capability: 'Cost Structure', 
    traditional: '15-20% markup', 
    us: 'Flat fee + results',
    traditionalStatus: 'bad'
  },
  { 
    capability: 'Scaling Speed', 
    traditional: 'Hire more people', 
    us: 'Scale with code',
    traditionalStatus: 'warning'
  },
  { 
    capability: 'Custom Solutions', 
    traditional: 'None (templates)', 
    us: 'Built for you',
    traditionalStatus: 'bad'
  },
  { 
    capability: 'Data Ownership', 
    traditional: 'Agency keeps it', 
    us: 'You own everything',
    traditionalStatus: 'bad'
  },
  { 
    capability: 'Technology Stack', 
    traditional: 'Generic tools', 
    us: 'Proprietary systems',
    traditionalStatus: 'warning'
  },
];

export const ComparisonSection = () => {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px),
                           linear-gradient(hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Why Traditional Agencies
            <br />
            <span className="text-gradient-gold">Can't Compete</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See the fundamental differences between outdated agency models and our engineering-first approach.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-background/50 border-b border-border">
            <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Capability
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-destructive/80 uppercase tracking-wider">
                Traditional Agencies
              </span>
            </div>
            <div className="text-center">
              <span className="text-sm font-medium text-gold uppercase tracking-wider">
                Outcome Labs
              </span>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border/50">
            {comparisonData.map((row, index) => (
              <div 
                key={row.capability}
                className="grid grid-cols-3 gap-4 p-6 hover:bg-background/30 transition-colors"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="font-medium text-foreground">
                  {row.capability}
                </div>
                <div className="text-center flex items-center justify-center gap-2">
                  {row.traditionalStatus === 'bad' ? (
                    <X className="w-4 h-4 text-destructive flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                  )}
                  <span className="text-muted-foreground text-sm">
                    {row.traditional}
                  </span>
                </div>
                <div className="text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-gold font-medium text-sm">
                    {row.us}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-12 text-center">
          <p className="text-2xl md:text-3xl font-display font-semibold">
            Precision beats promotion.
            <br />
            <span className="text-gradient-gold">Engineering beats guessing.</span>
          </p>
        </div>
      </div>
    </section>
  );
};
