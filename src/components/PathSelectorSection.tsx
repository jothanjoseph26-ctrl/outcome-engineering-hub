import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Compass, Vote } from 'lucide-react';
import revenueGrowth from '@/assets/revenue-growth.jpg';
import marketDominance from '@/assets/market-dominance.jpg';
import electoralVictory from '@/assets/electoral-victory.jpg';

const paths = [
  {
    icon: Briefcase,
    title: 'Drive Revenue',
    subtitle: 'Revenue Growth',
    description: 'For businesses that need sales, not likes.',
    audience: 'E-commerce, SaaS, B2B Services',
    features: [
      'Conversion systems',
      'Performance advertising',
      'WhatsApp sales automation',
      'SEO engineering',
      'Revenue attribution',
    ],
    cta: 'Engineer My Revenue',
    color: 'gold',
    image: revenueGrowth,
  },
  {
    icon: Compass,
    title: 'Own Your Market',
    subtitle: 'Market Dominance',
    description: 'For brands that need attention and authority.',
    audience: 'Corporates, Startups, Personal Brands',
    features: [
      'Data-driven social strategy',
      'Community engineering',
      'Influencer activation',
      'Reputation management',
      'Brand intelligence',
    ],
    cta: 'Dominate My Market',
    color: 'teal',
    image: marketDominance,
  },
  {
    icon: Vote,
    title: 'Win Elections',
    subtitle: 'Electoral Victory',
    description: 'For political leaders who need digital power.',
    audience: 'Gubernatorial, Senate, House campaigns',
    features: [
      'Digital war room systems',
      'Voter sentiment analysis',
      'Grassroots activation',
      'Targeted messaging',
      'Rapid response ops',
    ],
    cta: 'Power My Campaign',
    color: 'success',
    image: electoralVictory,
  },
];

export const PathSelectorSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-10"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--gold) / 0.4) 0%, transparent 70%)',
        }}
      />

      <div className="container-lg relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Choose Your <span className="text-gradient-gold">Outcome</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every business has unique goals. We engineer systems tailored to your specific path to growth.
          </p>
        </div>

        {/* Path cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {paths.map((path, index) => (
            <div
              key={path.title}
              className="group relative glass-card rounded-2xl p-8 hover-lift cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                <img 
                  src={path.image} 
                  alt={path.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>

              {/* Icon */}
              <div className={`absolute top-28 left-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
                path.color === 'gold' ? 'bg-gold/20 group-hover:bg-gold/30' :
                path.color === 'teal' ? 'bg-teal/20 group-hover:bg-teal/30' :
                'bg-success/20 group-hover:bg-success/30'
              }`}>
                <path.icon className={`w-8 h-8 ${
                  path.color === 'gold' ? 'text-gold' :
                  path.color === 'teal' ? 'text-teal' :
                  'text-success'
                }`} />
              </div>

              {/* Content */}
              <div className="mt-8">
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {path.subtitle}
                </span>
                <h3 className="text-2xl font-display font-bold mt-1 mb-3 text-foreground group-hover:text-gold transition-colors">
                  {path.title}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {path.description}
                </p>
                <p className="text-sm text-muted-foreground/80 mb-6">
                  Perfect for: <span className="text-foreground">{path.audience}</span>
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {path.features.map((feature) => (
                  <li key={feature} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      path.color === 'gold' ? 'bg-gold' :
                      path.color === 'teal' ? 'bg-teal' :
                      'bg-success'
                    }`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button 
                variant={path.color === 'gold' ? 'hero' : path.color === 'teal' ? 'teal' : 'default'}
                className="w-full gap-2"
              >
                {path.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Hover border glow */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
                path.color === 'gold' ? 'shadow-glow-gold' :
                path.color === 'teal' ? 'shadow-glow-teal' :
                'shadow-[0_0_40px_-10px_hsl(var(--success)/0.4)]'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
