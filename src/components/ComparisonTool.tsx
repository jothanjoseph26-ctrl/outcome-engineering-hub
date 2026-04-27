'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scale, 
  Check, 
  X, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeatureComparison {
  feature: string;
  outcome: boolean;
  traditional: boolean;
}

const comparisons: FeatureComparison[] = [
  { feature: 'Real-time Analytics', outcome: true, traditional: false },
  { feature: 'AI-Powered Optimization', outcome: true, traditional: false },
  { feature: 'WhatsApp Integration', outcome: true, traditional: false },
  { feature: 'Server-Side Tracking', outcome: true, traditional: false },
  { feature: 'Automated Lead Scoring', outcome: true, traditional: false },
  { feature: 'Custom Dashboard', outcome: true, traditional: false },
  { feature: '24/7 Monitoring', outcome: true, traditional: false },
  { feature: 'Dedicated Account Manager', outcome: true, traditional: false },
  { feature: 'Monthly Strategy Reviews', outcome: true, traditional: false },
  { feature: 'Integration with 50+ Tools', outcome: true, traditional: false },
];

const packages = [
  {
    name: 'Traditional Agency',
    price: '₦500K-2M',
    period: '/month',
    description: 'Manual processes, limited automation',
    features: comparisons.map(c => c.traditional),
    cta: 'Learn More',
    popular: false,
  },
  {
    name: 'Outcome Labs',
    price: '₦800K+',
    period: '/month',
    description: 'Full-stack revenue systems',
    features: comparisons.map(c => c.outcome),
    cta: 'Get Started',
    popular: true,
  },
];

export function ComparisonTool() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20" />
      
      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Scale className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Compare</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Outcome Labs <span className="text-gradient-gold">Wins</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our systems stack up against traditional marketing agencies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-4 pb-8">
                  <span className="text-muted-foreground">Features</span>
                </th>
                {packages.map((pkg) => (
                  <th key={pkg.name} className="p-4 pb-8 text-center">
                    <div className={`glass-card rounded-xl p-6 ${pkg.popular ? 'border-gold/50 ring-1 ring-gold/20' : ''}`}>
                      {pkg.popular && (
                        <div className="flex items-center justify-center gap-1 mb-2">
                          <Sparkles className="h-4 w-4 text-gold" />
                          <span className="text-xs font-medium text-gold">RECOMMENDED</span>
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
                      <div className="flex items-baseline justify-center gap-1 mb-2">
                        <span className="text-2xl font-bold text-gold">{pkg.price}</span>
                        <span className="text-sm text-muted-foreground">{pkg.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((comparison, index) => (
                <motion.tr
                  key={comparison.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredRow(index)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`border-t border-border transition-colors ${
                    hoveredRow === index ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <span className="font-medium">{comparison.feature}</span>
                  </td>
                  <td className="p-4 text-center">
                    {comparison.traditional ? (
                      <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center mx-auto">
                        <Check className="h-4 w-4 text-success" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto">
                        <X className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {comparison.outcome ? (
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center mx-auto">
                        <Check className="h-4 w-4 text-gold" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto">
                        <X className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile Cards View */}
        <div className="lg:hidden mt-8 space-y-6">
          {packages.map((pkg) => (
            <Card key={pkg.name} className={`glass-card p-6 ${pkg.popular ? 'border-gold/50' : ''}`}>
              <h3 className="text-lg font-bold mb-2">{pkg.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>
              <div className="space-y-2">
                {comparisons.map((comparison, index) => {
                  const hasFeature = pkg.name === 'Outcome Labs' ? comparison.outcome : comparison.traditional;
                  return (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{comparison.feature}</span>
                      {hasFeature ? (
                        <Check className="h-4 w-4 text-success" />
                      ) : (
                        <X className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  );
                })}
              </div>
              <Button 
                variant={pkg.popular ? 'gold' : 'outline'} 
                className="w-full mt-6 gap-2"
              >
                {pkg.cta} <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" className="gap-2">
            Book a Comparison Call <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
