import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Phone, Mail, MessageSquare, Shield, Clock, Target } from 'lucide-react';
import Link from 'next/link';

export const CTASection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Background effects */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top center, hsl(var(--gold) / 0.15) 0%, transparent 50%)',
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
            Ready to Engineer Your
            <br />
            <span className="text-gradient-gold">Next Outcome?</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Start with a free revenue audit. No obligation. 
            We'll show you exactly where you're losing money.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button variant="hero" size="xl" className="gap-2" asChild>
              <Link href="/scanner">
                <Zap className="w-5 h-5" />
                Start Free Revenue Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" className="gap-2" asChild>
              <Link href="/scanner">
                <Phone className="w-5 h-5" />
                Book 30-Min Strategy Call
              </Link>
            </Button>
          </div>

          {/* Contact options */}
          <div className="glass-card rounded-2xl p-6 max-w-xl mx-auto mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a href="mailto:hello@outcomelabs.ng" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <Mail className="w-5 h-5 text-gold" />
                <span className="text-sm">Email Us</span>
              </a>
              <a href="tel:+234XXXXXXXXX" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <Phone className="w-5 h-5 text-teal" />
                <span className="text-sm">Call Us</span>
              </a>
              <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                <MessageSquare className="w-5 h-5 text-success" />
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              <span>We never share your data</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal" />
              <span>Response within 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-success" />
              <span>Free audit, no strings attached</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
