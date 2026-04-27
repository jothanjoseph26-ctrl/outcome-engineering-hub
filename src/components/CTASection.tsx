'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Phone, Mail, MessageSquare, Shield, Clock, Target, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="section-padding bg-card relative overflow-hidden">
      {/* Animated Background effects */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 20%, hsl(var(--gold) / 0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 80%, hsl(var(--gold) / 0.12) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 20%, hsl(var(--gold) / 0.12) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating elements */}
      <motion.div 
        className="absolute top-20 right-20 w-32 h-32 border border-gold/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div 
        className="absolute bottom-20 left-20 w-24 h-24 border border-teal/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />

      <div className="container-lg relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-8"
          >
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Limited capacity: Onboarding 3 clients/month</span>
          </motion.div>

          {/* Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
          >
            Stop Bleeding Revenue
            <br />
            <span className="text-gradient-gold">Every Day You Wait</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Every day without proper attribution is money lost forever. 
            <span className="text-foreground font-medium">See exactly where your leak is — in 24 hours.</span>
          </motion.p>

          {/* Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-6 mb-10 text-sm"
          >
            {[
              { icon: TrendingUp, text: 'Average +₦2.4M recovered/month' },
              { icon: CheckCircle2, text: '100% attribution accuracy' },
              { icon: Clock, text: 'Results in 7-14 days' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <item.icon className="w-4 h-4 text-success" />
                <span className="text-success font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button 
              variant="hero" 
              size="xl" 
              className="gap-2 group relative overflow-hidden shadow-[0_0_40px_-10px_hsl(var(--gold)/0.5)] hover:shadow-[0_0_60px_-10px_hsl(var(--gold)/0.6)]"
              asChild
            >
              <Link href="/scanner">
                <Zap className="w-5 h-5" />
                Start Free Revenue Audit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                {/* Shimmer */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </Link>
            </Button>
            <Button 
              variant="heroOutline" 
              size="xl" 
              className="gap-2 group border-gold/40 hover:border-gold/60"
              asChild
            >
              <Link href="/scanner">
                <Phone className="w-5 h-5" />
                Book Strategy Call
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full ml-1"
                >
                  FREE
                </motion.span>
              </Link>
            </Button>
          </motion.div>

          {/* Contact options */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <div className="glass-card rounded-2xl p-6 max-w-xl mx-auto mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a href="mailto:hello@outcomelabs.ng" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground group">
                  <Mail className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Email Us</span>
                </a>
                <a href="tel:+234XXXXXXXXX" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground group">
                  <Phone className="w-5 h-5 text-teal group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Call Us</span>
                </a>
                <a href="https://wa.me/2340000000000" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-muted transition-all duration-300 text-muted-foreground hover:text-foreground group">
                  <MessageSquare className="w-5 h-5 text-success group-hover:scale-110 transition-transform" />
                  <span className="text-sm">WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2 group">
              <Shield className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
              <span>We never share your data</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Clock className="w-4 h-4 text-teal group-hover:scale-110 transition-transform" />
              <span>Response within 2 hours</span>
            </div>
            <div className="flex items-center gap-2 group">
              <Target className="w-4 h-4 text-success group-hover:scale-110 transition-transform" />
              <span>Free audit, no strings attached</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
