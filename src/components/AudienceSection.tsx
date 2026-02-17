import { Rocket, Building2, Vote, ShoppingCart } from 'lucide-react';

const audiences = [
  {
    icon: Rocket,
    title: 'Startups & Scaleups',
    challenge: 'Limited budget, need fast growth, can\'t waste money',
    solutions: [
      'Product-led growth systems',
      'Lean acquisition funnels',
      'Automated customer journeys',
      'Rapid testing frameworks',
    ],
    investment: '₦500K-2M/month',
    color: 'gold',
  },
  {
    icon: Building2,
    title: 'Corporate Brands',
    challenge: 'Complex approval processes, need proven results, risk-averse',
    solutions: [
      'Enterprise analytics infrastructure',
      'Multi-channel attribution',
      'Compliance-first automation',
      'Board-ready reporting',
    ],
    investment: '₦3M-10M/month',
    color: 'teal',
  },
  {
    icon: Vote,
    title: 'Political Campaigns',
    challenge: 'Short timeline, high stakes, need measurable impact',
    solutions: [
      'Digital war room systems',
      'Real-time voter sentiment',
      'Grassroots activation (Truereach)',
      'Rapid response infrastructure',
    ],
    investment: '₦5M-50M/campaign',
    color: 'gold',
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce Businesses',
    challenge: 'Thin margins, need direct ROI, attribution problems',
    solutions: [
      'WhatsApp sales systems',
      'Conversion rate optimization',
      'Server-side tracking',
      'Automated customer acquisition',
    ],
    investment: '₦800K-3M/month',
    color: 'teal',
  },
];

export const AudienceSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Designed for
            <br />
            <span className="text-gradient-gold">High-Stakes Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We work with organizations where marketing isn't an expense—it's the engine.
          </p>
        </div>

        {/* Audience Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            return (
              <div 
                key={audience.title}
                className="glass-card rounded-2xl p-8 group hover:border-gold/30 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    audience.color === 'gold' ? 'bg-gold/20' : 'bg-teal/20'
                  }`}>
                    <Icon className={`w-7 h-7 ${
                      audience.color === 'gold' ? 'text-gold' : 'text-teal'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-2">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground/80">Your Challenge:</span>{' '}
                      {audience.challenge}
                    </p>
                  </div>
                </div>

                {/* Solutions */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-3">
                    What We Build:
                  </p>
                  <ul className="grid grid-cols-1 gap-2">
                    {audience.solutions.map((solution) => (
                      <li 
                        key={solution}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                          audience.color === 'gold' ? 'bg-gold' : 'bg-teal'
                        }`} />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Investment */}
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Typical Investment:</span>
                    <span className={`font-display font-semibold ${
                      audience.color === 'gold' ? 'text-gold' : 'text-teal'
                    }`}>
                      {audience.investment}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
