import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, TrendingUp, Eye, Target, Zap, CheckCircle, MessageSquare, PieChart, Activity, GitBranch, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Link } from 'react-router-dom';

import heroImage from '@/assets/whatsapp-analytics-hero.jpg';

const stats = [
  { value: 100, label: 'Touchpoints Tracked', suffix: '%' },
  { value: 47, label: 'Avg Conversion Lift', suffix: '%' },
  { value: 2.3, label: 'Attribution Windows', suffix: 'sec', decimals: 1 },
  { value: 15, label: 'Custom Report Types', suffix: '+' },
];

const trackingCapabilities = [
  {
    title: 'Message-Level Analytics',
    description: 'Track every message sent, delivered, read, and responded to. Know exactly what works.',
    icon: MessageSquare,
    metrics: ['Delivery rate', 'Read rate', 'Response rate', 'Click-through rate'],
  },
  {
    title: 'Conversation Flow Analysis',
    description: 'Visualize how conversations progress. Identify drop-off points and optimize flows.',
    icon: GitBranch,
    metrics: ['Flow completion', 'Drop-off points', 'Avg conversation length', 'Time to resolution'],
  },
  {
    title: 'Revenue Attribution',
    description: 'Connect WhatsApp conversations directly to sales. First-touch, last-touch, or multi-touch.',
    icon: TrendingUp,
    metrics: ['Revenue per conversation', 'Cost per lead', 'ROI by campaign', 'LTV attribution'],
  },
  {
    title: 'Agent Performance',
    description: 'Track human agent metrics alongside AI. Response times, resolution rates, customer satisfaction.',
    icon: Activity,
    metrics: ['Response time', 'Resolution rate', 'CSAT score', 'Conversations/day'],
  },
];

const dashboardFeatures = [
  {
    icon: PieChart,
    title: 'Real-Time Dashboards',
    description: 'Live metrics updating every second. See performance as it happens, not days later.',
  },
  {
    icon: Layers,
    title: 'Custom Report Builder',
    description: 'Build any report you need. Filter by date, segment, campaign, agent, or any custom dimension.',
  },
  {
    icon: Target,
    title: 'Goal Tracking',
    description: 'Set conversion goals and track progress. Automated alerts when targets are hit or missed.',
  },
  {
    icon: Zap,
    title: 'Automated Insights',
    description: 'AI-powered insights surface what matters. No digging through data—we tell you what changed.',
  },
];

const attributionModels = [
  {
    model: 'First Touch',
    description: 'Credit the first WhatsApp interaction',
    bestFor: 'Brand awareness campaigns',
  },
  {
    model: 'Last Touch',
    description: 'Credit the final conversion interaction',
    bestFor: 'Direct response campaigns',
  },
  {
    model: 'Linear',
    description: 'Equal credit across all touchpoints',
    bestFor: 'Long sales cycles',
  },
  {
    model: 'Time Decay',
    description: 'More credit to recent interactions',
    bestFor: 'Nurture sequences',
  },
  {
    model: 'Position Based',
    description: '40% first, 40% last, 20% middle',
    bestFor: 'Balanced attribution',
  },
  {
    model: 'Custom',
    description: 'Build your own attribution logic',
    bestFor: 'Complex funnels',
  },
];

const reportTypes = [
  { name: 'Campaign Performance', description: 'ROI, conversions, and engagement by campaign' },
  { name: 'Audience Insights', description: 'Segment behavior, preferences, and patterns' },
  { name: 'Funnel Analysis', description: 'Stage-by-stage conversion breakdown' },
  { name: 'Revenue Reports', description: 'Revenue attribution and forecast' },
  { name: 'Agent Leaderboard', description: 'Team performance rankings and metrics' },
  { name: 'A/B Test Results', description: 'Statistical analysis of experiments' },
];

export default function WhatsAppAnalytics() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Analytics Dashboard" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-lg relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <Link to="/whatsapp" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-teal transition-colors mb-6">
              ← Back to WhatsApp Stack
            </Link>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8 backdrop-blur-sm">
              <BarChart3 className="w-4 h-4 text-teal" />
              <span className="text-sm font-mono text-teal">FULL FUNNEL TRACKING</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Every Message.
              <br />
              <span className="text-teal">Every Conversion.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Complete visibility from first message to closed deal. Multi-touch attribution, 
              real-time dashboards, and automated insights that actually tell you what to do next.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="lg" className="gap-2">
                See Live Dashboard <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Sample Reports
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="py-6 border-y border-border bg-card/50">
        <div className="container-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold font-mono text-teal">
                  <AnimatedCounter end={stat.value} decimals={stat.decimals || 0} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracking Capabilities */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Track Everything That Matters
            </h2>
            <p className="text-lg text-muted-foreground">
              Not vanity metrics. Revenue-driving insights.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {trackingCapabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                  <cap.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{cap.title}</h3>
                <p className="text-muted-foreground mb-4">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.metrics.map((metric) => (
                    <span key={metric} className="px-3 py-1 text-xs font-mono bg-muted rounded-full text-muted-foreground">
                      {metric}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Features */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
              <span className="text-sm font-mono text-teal">ANALYTICS ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Dashboards That Drive Decisions
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-time visibility. Actionable insights. No spreadsheets required.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {dashboardFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl flex gap-4"
              >
                <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center shrink-0">
                  <feature.icon className="w-7 h-7 text-teal" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution Models */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Multi-Touch Attribution
            </h2>
            <p className="text-lg text-muted-foreground">
              Know exactly which touchpoints drive revenue.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attributionModels.map((model, index) => (
              <motion.div
                key={model.model}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{model.model}</h3>
                <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                <div className="pt-3 border-t border-border">
                  <span className="text-xs text-muted-foreground">Best for: </span>
                  <span className="text-xs text-teal">{model.bestFor}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Types */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Pre-Built Report Library
            </h2>
            <p className="text-lg text-muted-foreground">
              Start with templates. Customize to your needs.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reportTypes.map((report, index) => (
              <motion.div
                key={report.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-teal mt-1 shrink-0" />
                <div>
                  <h3 className="text-foreground font-semibold">{report.name}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-card p-12 rounded-2xl border border-teal/20">
              <Eye className="w-16 h-16 text-teal mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Stop Guessing. Start Knowing.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Every conversation tracked. Every conversion attributed. Every decision data-driven.
                See exactly what's working and what's not—in real-time.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="teal" size="lg" className="gap-2">
                  See Live Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
                <Link to="/whatsapp">
                  <Button variant="outline" size="lg" className="gap-2">
                    Explore Full Stack <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
