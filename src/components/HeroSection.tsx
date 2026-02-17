import { Button } from '@/components/ui/button';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { ArrowRight, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroAbstract from '@/assets/hero-abstract.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroAbstract} 
          alt="" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gold) / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--gold) / 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">
              Engineering growth systems since 2020
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 animate-fade-up delay-100">
            Engineering{' '}
            <span className="text-gradient-gold">Outcomes</span>,
            <br />
            Not Campaigns
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-up delay-200">
            We write code that controls advertising APIs. 
            While agencies click buttons, we automate optimization.
          </p>

          {/* Key stats inline */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-up delay-300">
            <div className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-gold" />
              <span className="font-mono font-bold text-gold">40%</span>
              <span className="text-muted-foreground">lower costs</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-lg">
              <Zap className="w-5 h-5 text-teal" />
              <span className="font-mono font-bold text-teal">3×</span>
              <span className="text-muted-foreground">faster results</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-border" />
            <div className="flex items-center gap-2 text-lg">
              <BarChart3 className="w-5 h-5 text-success" />
              <span className="font-mono font-bold text-success">100%</span>
              <span className="text-muted-foreground">attribution</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-up delay-400">
            <Button variant="hero" size="xl" className="gap-2" asChild>
              <Link to="/scanner">
                <Zap className="w-5 h-5" />
                Start Free Revenue Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="gap-2">
              <BarChart3 className="w-5 h-5" />
              See Our Systems
            </Button>
          </div>

          {/* Live metrics card */}
          <div className="glass-card rounded-2xl p-6 md:p-8 max-w-3xl mx-auto animate-fade-up delay-500">
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-glow" />
              <span className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                Live Client Metrics
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="text-center">
                <div className="metric-value text-foreground">
                  <AnimatedCounter end={47.3} decimals={1} prefix="₦" suffix="M" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Revenue Generated This Month</p>
              </div>
              <div className="text-center">
                <div className="metric-value text-gold">
                  <AnimatedCounter end={284} suffix="%" prefix="↑ " />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Average ROI Across Clients</p>
              </div>
              <div className="text-center">
                <div className="metric-value text-teal">
                  <AnimatedCounter end={1847} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Campaigns Optimized Today</p>
              </div>
            </div>
          </div>

          {/* Trust logos placeholder */}
          <div className="mt-16 animate-fade-up delay-500">
            <p className="text-sm text-muted-foreground mb-6">Trusted by forward-thinking brands</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-40">
              {['TechCo', 'FinBank', 'GrowthOS', 'ShopNow', 'DataFlow', 'CloudPay'].map((name) => (
                <div key={name} className="text-lg font-display font-semibold text-muted-foreground">
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
