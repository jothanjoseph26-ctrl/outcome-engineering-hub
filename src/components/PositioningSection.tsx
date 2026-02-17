import { Check, X, ArrowRight } from 'lucide-react';

const comparisonData = [
  { feature: 'Optimization Speed', traditional: 'Weekly', us: 'Hourly' },
  { feature: 'Cost Efficiency', traditional: 'Baseline', us: '-40%' },
  { feature: 'Campaign Updates', traditional: 'Manual', us: 'Automated' },
  { feature: 'Attribution Accuracy', traditional: '~70%', us: '100%' },
];

export const PositioningSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
              Marketing Has Changed.
              <br />
              <span className="text-muted-foreground">Guesswork Has Not.</span>
              <br />
              <span className="text-gradient-gold">Until Now.</span>
            </h2>

            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Most agencies sell <span className="text-foreground font-medium">activities</span>: posts, ads, content calendars.
              </p>

              <p>
                Outcome Labs builds <span className="text-gold font-medium">measurable systems</span> powered by:
              </p>

              <ul className="space-y-3 text-foreground">
                {[
                  'Custom code and automation',
                  'API-level campaign control',
                  'Real-time data intelligence',
                  'Predictive optimization',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-gold" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <p className="text-xl font-medium text-foreground pt-4">
                We don't promise impressions.
                <br />
                <span className="text-gold">We engineer outcomes.</span>
              </p>
            </div>
          </div>

          {/* Right column - Comparison table */}
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-display font-semibold text-center mb-6">
              Traditional Agency <span className="text-muted-foreground">vs</span> <span className="text-gold">Outcome Labs</span>
            </h3>

            <div className="space-y-4">
              {comparisonData.map((row, index) => (
                <div 
                  key={row.feature}
                  className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-background/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-sm font-medium text-muted-foreground">
                    {row.feature}
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-sm text-destructive/80">
                      <X className="w-4 h-4" />
                      {row.traditional}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-sm text-gold font-medium">
                      <Check className="w-4 h-4" />
                      {row.us}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-lg font-display font-semibold text-foreground">
                Precision beats promotion.
                <br />
                <span className="text-gold">Engineering beats guessing.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
