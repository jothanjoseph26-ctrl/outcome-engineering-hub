'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Cpu, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Server, 
  BarChart3,
  Zap,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const pipelineSteps = [
  {
    icon: Database,
    title: '01. DATA LAYER',
    description: 'Unify CRM, inventory, margins, and analytics in real-time.',
  },
  {
    icon: Cpu,
    title: '02. INTELLIGENCE ENGINE',
    description: 'ML models predict outcomes, optimize bids, and detect waste.',
  },
  {
    icon: Globe,
    title: '03. EXECUTION LAYER',
    description: 'Deploy changes across Google, Meta, LinkedIn APIs automatically.',
  },
];

const features = [
  'Programmatic Advertising Automation',
  'Edge SEO Infrastructure',
  'Server-Side Tracking Systems',
  'Custom Analytics Pipelines',
];

export const HeroSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--background))]">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/5 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="container-lg relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-sm font-mono tracking-widest"
          >
            <Server size={16} />
            <span>STRATEGIC GROWTH. ENGINEERED.</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.1]"
          >
            Engineering{' '}
            <span className="text-gradient-gold">Outcomes,</span>
            <br />
            Not Campaigns
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl leading-relaxed"
          >
            We build{' '}
            <span className="text-gold/90 font-semibold">automated systems</span> that replace manual marketing work. 
            API-level control. Real-time optimization. Predictive intelligence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl font-medium text-foreground/90"
          >
            40% lower costs.&nbsp;
            <span className="text-muted-foreground">3× faster execution.&nbsp;</span>
            <span className="text-gold">294% average ROI.</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link href="/scanner" className="inline-flex items-center justify-center gap-2 bg-gold text-[hsl(var(--primary-foreground))] px-8 py-4 rounded-xl font-bold text-base hover:bg-gold/90 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.4)] hover:shadow-[0_0_60px_-10px_hsl(var(--gold)/0.5)]">
              Start Free Technical Audit
              <ArrowRight size={18} />
            </Link>
            <button 
              onClick={() => scrollToSection('systems')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base border border-gold/30 text-gold/80 hover:border-gold/60 hover:text-gold hover:bg-gold/5 transition-all duration-300"
            >
              Explore Our Systems
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 gap-4 pt-4"
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3 group">
                <CheckCircle2 size={18} className="text-gold mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{feature}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right - Pipeline Visualization */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative bg-surface-glass/40 backdrop-blur-xl border border-gold/10 rounded-3xl p-8 md:p-10 space-y-6 shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]">
            {/* Connecting Line */}
            <div className="absolute left-[2.75rem] top-20 bottom-32 w-0.5 bg-gold/10">
              <motion.div 
                className="w-full bg-gold shadow-[0_0_10px_hsl(var(--gold))]"
                animate={{ height: `${(activeStep / 2) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {pipelineSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.title}
                  animate={{
                    backgroundColor: isActive ? 'rgba(231, 173, 62, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                    borderColor: isActive ? 'rgba(231, 173, 62, 0.3)' : 'transparent',
                    x: isActive ? 10 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative flex items-start gap-6 p-5 rounded-xl border"
                >
                  <motion.div 
                    animate={{
                      backgroundColor: isActive ? 'hsl(var(--gold))' : 'rgba(231, 173, 62, 0.1)',
                      color: isActive ? 'hsl(var(--primary-foreground))' : 'hsl(var(--gold))',
                      boxShadow: isActive ? '0 0 20px rgba(231, 173, 62, 0.3)' : 'none',
                    }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  >
                    <Icon size={24} />
                  </motion.div>
                  <div>
                    <h3 className="font-display font-bold text-sm tracking-widest text-foreground/90 mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Live System Status */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-6 p-5 rounded-xl bg-background/50 border border-gold/10 font-mono"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gold tracking-widest">LIVE SYSTEM STATUS</span>
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(40,200,65,0.8)]" 
                  />
                  <BarChart3 size={14} className="text-emerald-500" />
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground/60 space-y-1.5 leading-relaxed">
                <motion.div animate={{ color: '#28c841' }} className="text-emerald-500">[OK] Google_Ads_API: Connected</motion.div>
                <motion.div animate={{ color: '#28c841' }} className="text-emerald-500">[OK] Meta_Marketing_API: Active</motion.div>
                <div className="text-gold/70">[EXEC] Optimizing 247 campaigns...</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};