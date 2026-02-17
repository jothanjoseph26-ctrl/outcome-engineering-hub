import { motion } from 'framer-motion';
import { ArrowRight, Radio, Users, Target, Calendar, BarChart3, CheckCircle, MessageSquare, Layers, Sparkles, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Link } from 'react-router-dom';

import heroImage from '@/assets/whatsapp-broadcast-hero.jpg';

const stats = [
  { value: 50, label: 'Max Recipients/Broadcast', suffix: 'K+' },
  { value: 98, label: 'Delivery Rate', suffix: '%' },
  { value: 45, label: 'Avg Open Rate', suffix: '%' },
  { value: 12, label: 'Response Rate', suffix: '%' },
];

const segmentationTypes = [
  {
    title: 'Behavioral Segments',
    description: 'Target based on past purchases, cart abandonment, browsing history, engagement patterns.',
    icon: Target,
    examples: ['Abandoned cart (24h)', 'Repeat buyers', 'High LTV customers'],
  },
  {
    title: 'Demographic Segments',
    description: 'Filter by location, age, gender, language preference for hyper-relevant messaging.',
    icon: Users,
    examples: ['Lagos only', 'Age 25-35', 'English speakers'],
  },
  {
    title: 'Engagement Segments',
    description: 'Reach active contacts or re-engage dormant ones with tailored messaging.',
    icon: Sparkles,
    examples: ['Active last 30 days', 'Never opened', 'High responders'],
  },
  {
    title: 'Custom Segments',
    description: 'Create any segment using your CRM data, custom fields, or external data sources.',
    icon: Layers,
    examples: ['VIP tier', 'Product category', 'Lead score > 80'],
  },
];

const broadcastFeatures = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Send at optimal times based on recipient timezone and historical open patterns.',
  },
  {
    icon: Sparkles,
    title: 'Dynamic Personalization',
    description: 'Merge fields, conditional content blocks, personalized offers per recipient.',
  },
  {
    icon: Shield,
    title: 'Compliance Built-In',
    description: 'Automatic opt-out handling, rate limiting, and WhatsApp policy compliance.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description: 'Delivery, open, response rates—all tracked in real-time with actionable insights.',
  },
];

const templateTypes = [
  {
    name: 'Promotional',
    description: 'Sales, offers, product launches',
    approval: 'Requires approval',
    bestFor: 'E-commerce, retail',
  },
  {
    name: 'Transactional',
    description: 'Order updates, confirmations',
    approval: 'Pre-approved',
    bestFor: 'All industries',
  },
  {
    name: 'Utility',
    description: 'Appointments, reminders',
    approval: 'Pre-approved',
    bestFor: 'Services, healthcare',
  },
  {
    name: 'Authentication',
    description: 'OTPs, verification codes',
    approval: 'Pre-approved',
    bestFor: 'Fintech, security',
  },
];

const useCases = [
  {
    industry: 'E-commerce',
    useCase: 'Flash Sale Announcement',
    segment: '10K high-LTV customers',
    result: '34% conversion rate, ₦45M revenue',
  },
  {
    industry: 'Real Estate',
    useCase: 'New Property Alert',
    segment: '2.5K budget-matched prospects',
    result: '67 site visits, 12 sales in 72hrs',
  },
  {
    industry: 'Events',
    useCase: 'Event Reminder Sequence',
    segment: '8K ticket holders',
    result: '94% attendance, 23% upsells',
  },
];

export default function WhatsAppBroadcast() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Broadcast Architecture" 
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
              <Radio className="w-4 h-4 text-teal" />
              <span className="text-sm font-mono text-teal">MASS MESSAGING INFRASTRUCTURE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Mass Messages That
              <br />
              <span className="text-teal">Feel Personal.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Send 50,000+ messages that convert. Segmented audiences, personalized content, 
              intelligent scheduling—broadcast architecture that outperforms email 10x.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="lg" className="gap-2">
                Plan Your Campaign <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Template Library
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
                  <AnimatedCounter end={stat.value} decimals={0} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Segmentation Types */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Precision Segmentation
            </h2>
            <p className="text-lg text-muted-foreground">
              The right message to the right person. Always.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {segmentationTypes.map((segment, index) => (
              <motion.div
                key={segment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                  <segment.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{segment.title}</h3>
                <p className="text-muted-foreground mb-4">{segment.description}</p>
                <div className="flex flex-wrap gap-2">
                  {segment.examples.map((example) => (
                    <span key={example} className="px-3 py-1 text-xs font-mono bg-muted rounded-full text-muted-foreground">
                      {example}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Broadcast Features */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
              <span className="text-sm font-mono text-teal">BROADCAST ENGINE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Enterprise Broadcast Capabilities
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to run high-converting mass campaigns.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {broadcastFeatures.map((feature, index) => (
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

      {/* Template Types */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Template Categories
            </h2>
            <p className="text-lg text-muted-foreground">
              Pre-approved templates for every use case.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templateTypes.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="space-y-2 pt-3 border-t border-border">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Approval</span>
                    <span className={template.approval === 'Pre-approved' ? 'text-teal' : 'text-gold'}>
                      {template.approval}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Best for</span>
                    <span className="text-foreground">{template.bestFor}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Broadcast Results
            </h2>
            <p className="text-lg text-muted-foreground">
              Real campaigns. Real revenue.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.useCase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <span className="inline-block px-3 py-1 text-xs font-mono bg-teal/20 text-teal rounded-full mb-4">
                  {useCase.industry}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{useCase.useCase}</h3>
                <p className="text-sm text-muted-foreground mb-4">Segment: {useCase.segment}</p>
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-teal font-mono text-sm">
                    <CheckCircle className="w-4 h-4" />
                    {useCase.result}
                  </div>
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
              <MessageSquare className="w-16 h-16 text-teal mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Ready to Broadcast at Scale?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop sending generic blasts. Start sending segmented, personalized messages 
                that drive real revenue. 98% delivery. 45% opens. 12% responses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="teal" size="lg" className="gap-2">
                  Plan Your Campaign <ArrowRight className="w-4 h-4" />
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
