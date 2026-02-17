import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Bot, Database, Radio, BarChart3, CheckCircle, Zap, Globe, Rocket, Users, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';

// Import images
import heroImage from '@/assets/whatsapp-hero.jpg';
import qualificationImage from '@/assets/whatsapp-qualification.jpg';
import crmImage from '@/assets/whatsapp-crm.jpg';
import broadcastImage from '@/assets/whatsapp-broadcast.jpg';
import analyticsImage from '@/assets/whatsapp-analytics.jpg';

const problems = [
  {
    title: 'Leads Die in Your Inbox',
    description: 'Prospects message at 2am. Your team responds at 9am. By then, they\'ve moved on to competitors.',
  },
  {
    title: 'Manual Qualification Bottleneck',
    description: 'Your sales team wastes 60% of time talking to unqualified leads who will never convert.',
  },
  {
    title: 'CRM Data Disconnection',
    description: 'WhatsApp conversations happen in a silo. No sync with your systems. No attribution. No insights.',
  },
  {
    title: 'Broadcast Limitations',
    description: 'Generic mass messages get ignored. No segmentation. No personalization. No results.',
  },
];

const capabilities = [
  {
    icon: Bot,
    title: 'AI Lead Qualification',
    stat: '< 30',
    suffix: 'sec',
    description: 'Instant response. Intelligent routing. Hot leads go to humans. Cold leads get nurtured automatically.',
    image: qualificationImage,
  },
  {
    icon: Database,
    title: 'Real-Time CRM Sync',
    stat: '100',
    suffix: '%',
    description: 'Every conversation, every contact, every deal stage. Synced live to your HubSpot, Salesforce, or custom CRM.',
    image: crmImage,
  },
  {
    icon: Radio,
    title: 'Broadcast Architecture',
    stat: '50K',
    suffix: '+',
    description: 'Segment by behavior, purchase history, engagement. Mass messaging that feels personal.',
    image: broadcastImage,
  },
  {
    icon: BarChart3,
    title: 'Conversion Analytics',
    stat: '100',
    suffix: '%',
    description: 'Full funnel visibility. First message to closed deal. Every touchpoint tracked and attributed.',
    image: analyticsImage,
  },
];

const useCases = [
  {
    category: 'E-Commerce',
    title: 'Abandoned Cart Recovery',
    description: 'Automated WhatsApp sequences that recover 23% of abandoned carts with personalized offers.',
    result: '23% cart recovery rate',
  },
  {
    category: 'Real Estate',
    title: 'Property Matching',
    description: 'AI qualifies budget, location, and preferences. Only hot leads reach your agents.',
    result: '4x agent productivity',
  },
  {
    category: 'Financial Services',
    title: 'Loan Pre-Qualification',
    description: 'Automated document collection and eligibility checks before human touch.',
    result: '67% faster processing',
  },
  {
    category: 'Healthcare',
    title: 'Appointment Booking',
    description: 'Smart scheduling that reduces no-shows with automated reminders and rescheduling.',
    result: '89% appointment completion',
  },
];

const architectureSteps = [
  {
    step: '01',
    title: 'Lead Capture',
    description: 'Click-to-WhatsApp ads, website widgets, QR codes',
  },
  {
    step: '02',
    title: 'AI Qualification',
    description: 'Instant response, intelligent questioning, lead scoring',
  },
  {
    step: '03',
    title: 'Smart Routing',
    description: 'Hot leads → humans, cold leads → nurture sequences',
  },
  {
    step: '04',
    title: 'CRM Sync',
    description: 'Real-time data push to your existing systems',
  },
  {
    step: '05',
    title: 'Analytics',
    description: 'Full attribution, conversion tracking, ROI measurement',
  },
];

const stats = [
  { value: 2.4, label: 'Avg Response Time', suffix: 'sec', decimals: 1 },
  { value: 340, label: 'Conversations/Day', suffix: 'K' },
  { value: 67, label: 'Lead Qualification Rate', suffix: '%' },
  { value: 8.2, label: 'Avg ROI Multiple', suffix: 'x', decimals: 1 },
];

export default function WhatsAppEngineering() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="WhatsApp Engineering Command Center" 
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-8 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-teal" />
              <span className="text-sm font-mono text-teal">REVENUE INFRASTRUCTURE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Turn WhatsApp into a
              <br />
              <span className="text-teal">Revenue Machine.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Automated conversations. AI qualification. Real-time CRM sync. 
              We've built the infrastructure that makes WhatsApp your highest-converting channel.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="lg" className="gap-2">
                Book Strategy Call <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                See Architecture
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

      {/* Problem Section */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Why Most Businesses Fail at WhatsApp Sales
            </h2>
            <p className="text-lg text-muted-foreground">
              You have the leads. You have the conversations. But you're leaving money on the table.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl border-l-4 border-destructive/50"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section with Images */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
              <span className="text-sm font-mono text-teal">OUR SOLUTION</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              End-to-End WhatsApp Revenue Infrastructure
            </h2>
            <p className="text-lg text-muted-foreground">
              We didn't just integrate WhatsApp. We built a complete revenue engine around it.
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                    <cap.icon className="w-7 h-7 text-teal" />
                  </div>
                  <div className="text-5xl font-bold font-mono text-teal mb-2">
                    {cap.stat}{cap.suffix}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">{cap.title}</h3>
                  <p className="text-lg text-muted-foreground">{cap.description}</p>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="rounded-xl overflow-hidden border border-border shadow-2xl">
                    <img 
                      src={cap.image} 
                      alt={cap.title}
                      className="w-full h-72 object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Flow */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              The Conversation Flow Architecture
            </h2>
            <p className="text-lg text-muted-foreground">
              From first message to closed deal—every step engineered for conversion.
            </p>
          </motion.div>
          
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal/20 via-teal to-teal/20 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {architectureSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl text-center relative"
                >
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <span className="text-lg font-bold font-mono text-teal">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How We Deploy This For Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results across industries. Real revenue impact.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <span className="inline-block px-3 py-1 text-xs font-mono bg-teal/20 text-teal rounded-full mb-4">
                  {useCase.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-3">{useCase.title}</h3>
                <p className="text-muted-foreground mb-4">{useCase.description}</p>
                <div className="flex items-center gap-2 text-teal font-mono text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {useCase.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Access Section */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-card p-12 rounded-2xl border border-teal/20">
              <Phone className="w-16 h-16 text-teal mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                This Is An Outcome Labs Exclusive
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                This isn't a SaaS product you can buy. It's proprietary infrastructure we've built and refined 
                over years. The only way to access this system is to work with us.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="teal" size="lg" className="gap-2">
                  Book Strategy Call <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  See Other Systems <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Integration Logos */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-sm text-muted-foreground font-mono">INTEGRATES WITH YOUR EXISTING STACK</p>
          </motion.div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['HubSpot', 'Salesforce', 'Zoho', 'Pipedrive', 'Custom API'].map((name, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="px-6 py-3 rounded-lg border border-border bg-card/50 text-muted-foreground font-mono text-sm"
              >
                {name}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-teal/10 to-transparent">
        <div className="container-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Turn Conversations into Revenue?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's engineer your WhatsApp sales system. From qualification to close—automated, 
              tracked, and optimized.
            </p>
            <Button variant="teal" size="xl" className="gap-2">
              Book Your Strategy Call <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
