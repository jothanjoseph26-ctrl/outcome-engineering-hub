'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Compass, Vote } from 'lucide-react';
import revenueGrowth from '@/assets/revenue-growth.jpg';
import marketDominance from '@/assets/market-dominance.jpg';
import electoralVictory from '@/assets/electoral-victory.jpg';
import { FunnelPrequalifierModal } from '@/components/funnels/FunnelPrequalifierModal';
import type { FunnelId } from '@/data/conversionFunnels';

const paths = [
  {
    id: 'drive-revenue' as FunnelId,
    icon: Briefcase,
    title: 'Engineer My Revenue',
    subtitle: 'Revenue Growth',
    description: 'For operators who know revenue is leaking somewhere in the pipeline.',
    audience: 'E-commerce, SaaS, B2B Services',
    features: [
      'Pipeline instrumentation',
      'Leak impact scoring',
      'Trust and checkout systems',
      'SEO engineering',
      'Revenue attribution',
    ],
    signal: '"My business is bleeding. Show me where."',
    cta: 'Engineer My Revenue',
    color: 'gold',
    image: revenueGrowth,
  },
  {
    id: 'own-your-market' as FunnelId,
    icon: Compass,
    title: 'Dominate My Market',
    subtitle: 'Market Dominance',
    description: 'For brands that are visible, but not category-defining enough.',
    audience: 'Corporates, Startups, Personal Brands',
    features: [
      'Signal velocity audit',
      'Authority gap mapping',
      'API distribution system',
      'Competitor intelligence',
      'Brand intelligence',
    ],
    signal: '"We exist, but we are not owning enough attention."',
    cta: 'Dominate My Market',
    color: 'teal',
    image: marketDominance,
  },
  {
    id: 'win-elections' as FunnelId,
    icon: Vote,
    title: 'Power My Campaign',
    subtitle: 'Electoral Victory',
    description: 'For campaigns that need infrastructure, intelligence, and operational control.',
    audience: 'Gubernatorial, Senate, House campaigns',
    features: [
      'Digital war room systems',
      'Voter sentiment analysis',
      'Grassroots activation',
      'Targeted messaging',
      'Rapid response ops',
    ],
    signal: '"I need digital infrastructure that wins elections."',
    cta: 'Power My Campaign',
    color: 'success',
    image: electoralVictory,
  },
];

export const PathSelectorSection = () => {
  const [activeFunnel, setActiveFunnel] = useState<FunnelId | null>(null);

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
            This is the homepage intent router. Each button launches a distinct diagnostic pathway instead of dumping high-intent visitors into a generic service page.
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
                <div className="mb-6 rounded-xl border border-border/50 bg-background/40 px-4 py-3 text-sm italic text-muted-foreground">
                  {path.signal}
                </div>
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
                onClick={() => setActiveFunnel(path.id)}
              >
                <span>
                  {path.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
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

      <FunnelPrequalifierModal
        funnelId={activeFunnel}
        open={activeFunnel !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActiveFunnel(null);
          }
        }}
      />
    </section>
  );
};
