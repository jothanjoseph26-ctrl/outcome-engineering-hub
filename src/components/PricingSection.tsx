import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const packages = [
  {
    name: 'Starter',
    subtitle: 'Revenue Growth Package',
    price: '₦800,000',
    period: '/month',
    features: [
      'One outcome focus (Revenue OR Market)',
      '1 proprietary system implementation',
      'Google/Meta advertising management',
      'Basic automation setup',
      'Monthly reporting & strategy calls',
    ],
    cta: 'Start Free Audit',
    ctaVariant: 'outline' as const,
    bestFor: 'Small businesses, startups testing systems',
    popular: false,
  },
  {
    name: 'Growth',
    subtitle: 'Multi-Channel Engineering',
    price: '₦2,500,000',
    period: '/month',
    features: [
      'Two outcome focuses',
      '2 proprietary systems',
      'Full advertising automation',
      'Advanced attribution setup',
      'Weekly optimization reviews',
      'Custom integrations',
      'Priority support',
    ],
    cta: 'Book Strategy Call',
    ctaVariant: 'gold' as const,
    bestFor: 'Scaling businesses, established brands',
    popular: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'Custom Infrastructure',
    price: 'From ₦5,000,000',
    period: '/month',
    features: [
      'Unlimited outcome focuses',
      'All proprietary systems',
      'Custom system development',
      'Dedicated engineering team',
      'White-glove implementation',
      '24/7 monitoring',
      'Quarterly business reviews',
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
    bestFor: 'Corporates, political campaigns',
    popular: false,
  },
];

const additionalOptions = [
  { name: 'Revenue Audit', price: '₦500,000' },
  { name: 'System Implementation', price: '₦2M-8M' },
  { name: 'Political Campaign', price: '₦5M-50M' },
  { name: 'Custom Development', price: 'Quote-based' },
];

export const PricingSection = () => {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--gold)) 1px, transparent 1px),
                           linear-gradient(hsl(var(--gold)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="container-lg relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
            Transparent,
            <br />
            <span className="text-gradient-gold">Outcome-Based Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We only win when you win. Choose the package that fits your growth stage.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div 
              key={pkg.name}
              className={`glass-card rounded-2xl p-8 relative transition-all duration-300 ${
                pkg.popular 
                  ? 'border-gold/50 ring-1 ring-gold/20' 
                  : 'hover:border-gold/30'
              }`}
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold text-background text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-8 pt-2">
                <h3 className="text-2xl font-display font-bold mb-1">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{pkg.subtitle}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-display font-bold text-gradient-gold">
                    {pkg.price}
                  </span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-gold" />
                    </div>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Best For */}
              <p className="text-xs text-muted-foreground text-center mb-6">
                Best For: {pkg.bestFor}
              </p>

              {/* CTA */}
              <Button 
                variant={pkg.ctaVariant}
                className="w-full"
                size="lg"
              >
                {pkg.cta}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        {/* Additional Options */}
        <div className="glass-card rounded-2xl p-8">
          <h3 className="text-xl font-display font-semibold text-center mb-8">
            Project-Based Pricing
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalOptions.map((option) => (
              <div 
                key={option.name}
                className="flex items-center justify-between p-4 rounded-xl bg-background/50 border border-border/50"
              >
                <span className="text-sm text-muted-foreground">{option.name}</span>
                <span className="font-display font-semibold text-gold">{option.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
