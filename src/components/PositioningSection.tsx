'use client';

import { Check, X, ArrowRight, Zap, Clock, BarChart3, Cog } from 'lucide-react';
import { motion } from 'framer-motion';

const comparisonData = [
  { feature: 'Optimization Speed', traditional: 'Weekly', us: 'Hourly', icon: Clock },
  { feature: 'Cost Efficiency', traditional: 'Baseline', us: '-40%', icon: BarChart3 },
  { feature: 'Campaign Updates', traditional: 'Manual', us: 'Automated', icon: Cog },
  { feature: 'Attribution Accuracy', traditional: '~70%', us: '100%', icon: Zap },
];

export const PositioningSection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Animated pattern */}
      <motion.div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        animate={{ backgroundPosition: ['0px 0px', '32px 32px'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-lg relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Marketing Has Changed.
              <br />
              <span className="text-muted-foreground">Guesswork Has Not.</span>
              <br />
              <span className="text-gradient-gold">Until Now.</span>
            </motion.h2>

            <div className="space-y-6 text-lg text-muted-foreground">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Most agencies sell <span className="text-foreground font-medium">activities</span>: posts, ads, content calendars.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Outcome Labs builds <span className="text-gold font-medium">measurable systems</span> powered by:
              </motion.p>

              <motion.ul 
                className="space-y-3 text-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {[
                  'Custom code and automation',
                  'API-level campaign control',
                  'Real-time data intelligence',
                  'Predictive optimization',
                ].map((item, index) => (
                  <motion.li 
                    key={item} 
                    className="flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-4 h-4 text-gold" />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <motion.p 
                className="text-xl font-medium text-foreground pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                We don't promise impressions.
                <br />
                <span className="text-gold">We engineer outcomes.</span>
              </motion.p>
            </div>
          </motion.div>

          {/* Right column - Animated Comparison */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="h-px flex-1 bg-destructive/20" />
                  <span className="text-sm text-destructive/60 font-medium">TRADITIONAL</span>
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-sm text-gold font-medium">OUTCOME LABS</span>
                  <div className="h-px flex-1 bg-gold/20" />
                </div>
                <h3 className="text-lg font-display font-semibold mt-4">
                  <span className="text-muted-foreground">Guesswork</span>{' '}
                  <span className="text-foreground">vs</span>{' '}
                  <span className="text-gold">Engineering</span>
                </h3>
              </div>

              {/* Comparison Items */}
              <div className="space-y-4">
                {comparisonData.map((row, index) => {
                  const Icon = row.icon;
                  return (
                    <motion.div 
                      key={row.feature}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="relative"
                    >
                      {/* Feature Label */}
                      <div className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5" />
                        {row.feature}
                      </div>
                      
                      {/* Comparison Bar */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Traditional (Left) */}
                        <motion.div 
                          className="relative p-3 rounded-lg bg-destructive/5 border border-destructive/10 text-center"
                          initial={{ scale: 0.95 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                        >
                          <X className="w-3.5 h-3.5 text-destructive/60 mx-auto mb-1" />
                          <span className="text-sm text-destructive/80 font-medium">{row.traditional}</span>
                          {/* Strike-through overlay */}
                          <motion.div 
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                          >
                            <div className="w-full h-0.5 bg-destructive/30" />
                          </motion.div>
                        </motion.div>

                        {/* Outcome Labs (Right) */}
                        <motion.div 
                          className="relative p-3 rounded-lg bg-gold/5 border border-gold/20 text-center group hover:bg-gold/10 transition-colors"
                          initial={{ scale: 0.95 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <Check className="w-3.5 h-3.5 text-gold mx-auto mb-1" />
                          <span className="text-sm text-gold font-bold">{row.us}</span>
                          <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 bg-gold/40 rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <motion.div 
                className="mt-8 pt-6 border-t border-border text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-lg font-display font-semibold text-foreground">
                  Precision beats promotion.
                </p>
                <p className="text-gold font-semibold">Engineering beats guessing.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
