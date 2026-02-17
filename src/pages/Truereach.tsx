import { motion } from 'framer-motion';
import { ArrowRight, Users, Zap, Shield, BarChart3, CheckCircle, Target, Globe, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';

// Import images
import heroImage from '@/assets/truereach-hero.jpg';
import politicalImage from '@/assets/truereach-political.jpg';
import productLaunchImage from '@/assets/truereach-product-launch.jpg';
import localMarketImage from '@/assets/truereach-local.jpg';
import infrastructureImage from '@/assets/truereach-infrastructure.jpg';
const problems = [
  {
    title: 'Expensive Ads, Diminishing Returns',
    description: 'CPMs keep rising. Ad fatigue is real. Your cost per reach increases every quarter.',
  },
  {
    title: 'Fake Engagement Epidemic',
    description: 'Bot farms and click fraud drain budgets. You pay for impressions that never convert.',
  },
  {
    title: 'Limited Organic Reach',
    description: 'Algorithms throttle business content. Your posts reach 2% of your audience.',
  },
  {
    title: 'No Grassroots Infrastructure',
    description: 'Competitors with street teams win. You have no way to activate real people at scale.',
  },
];

const capabilities = [
  {
    icon: Users,
    title: 'Verified Digital Workers',
    stat: '500+',
    description: 'Real people with authentic accounts, aged profiles, and verified devices. No bots.',
  },
  {
    icon: Target,
    title: 'Precision Task Distribution',
    stat: '94%',
    suffix: '%',
    description: 'Smart matching ensures the right workers for your campaign. Geographic, demographic, interest-based targeting.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance Layer',
    stat: '99.2',
    suffix: '%',
    description: 'Every task verified with screenshots, completion timestamps, and fraud detection algorithms.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    stat: '< 5',
    suffix: 'min',
    description: 'Watch your campaign unfold live. Completion rates, engagement metrics, cost per action.',
  },
];

const useCases = [
  {
    category: 'Political Campaigns',
    title: 'Grassroots Activation',
    description: 'Mobilize supporters to share messaging, attend events, and amplify your candidate across authentic networks.',
    result: '12,000+ authentic shares in 48 hours',
    image: politicalImage,
  },
  {
    category: 'Product Launches',
    title: 'Authentic Buzz Generation',
    description: 'Create genuine excitement with real users sharing, reviewing, and discussing your product launch.',
    result: '3x conversion vs paid ads',
    image: productLaunchImage,
  },
  {
    category: 'Review Building',
    title: 'Verified Customer Feedback',
    description: 'Generate authentic reviews from real users who actually experience your product or service.',
    result: '4.8 average rating achieved',
    image: politicalImage,
  },
  {
    category: 'Local Marketing',
    title: 'Community Penetration',
    description: 'Activate local networks to drive foot traffic, event attendance, and regional awareness.',
    result: '₦400K vs ₦2M traditional ads',
    image: localMarketImage,
  },
];

const stats = [
  { value: 847, label: 'Active Workers', suffix: '' },
  { value: 12450, label: 'Tasks This Month', suffix: '' },
  { value: 94, label: 'Completion Rate', suffix: '%' },
  { value: 2.4, label: 'Avg. Cost Per Action', prefix: '₦', suffix: 'K', decimals: 1 },
];

export default function Truereach() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Truereach Command Center" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container-lg relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-gold" />
              <span className="text-sm font-mono text-gold">PROPRIETARY INFRASTRUCTURE</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Most agencies buy ads.
              <br />
              <span className="text-gold">We built an army.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Truereach is our proprietary digital workforce platform. 500+ verified workers. 
              Real devices. Authentic engagement. This is why we deliver results traditional agencies can't match.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" className="gap-2">
                Book Strategy Call <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                See How It Works
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
                <div className="text-3xl md:text-4xl font-bold font-mono text-gold">
                  {stat.prefix}
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
              The Problem Every Agency Faces
            </h2>
            <p className="text-lg text-muted-foreground">
              Traditional marketing infrastructure is broken. Here's what you're up against.
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

      {/* Solution Section */}
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
              We Built Infrastructure Others Can't Access
            </h2>
            <p className="text-lg text-muted-foreground">
              Truereach took 18 months to build. It's the engine behind our unfair advantage.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <cap.icon className="w-7 h-7 text-gold" />
                </div>
                <div className="text-4xl font-bold font-mono text-gold mb-2">
                  {cap.stat}{cap.suffix}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
                <p className="text-sm text-muted-foreground">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How We Deploy Truereach For Clients
            </h2>
            <p className="text-lg text-muted-foreground">
              This isn't a product you buy. It's infrastructure we use to win.
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
                className="glass-card rounded-xl overflow-hidden group"
              >
                {/* Use Case Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-block px-3 py-1 text-xs font-mono bg-gold/20 text-gold rounded-full backdrop-blur-sm">
                    {useCase.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground mb-4">{useCase.description}</p>
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

      {/* Exclusive Access Section */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-card p-12 rounded-2xl border border-gold/20">
              <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                This Is An Outcome Labs Exclusive
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                You can't buy Truereach. You can't rent it. The only way to access this infrastructure 
                is to work with us. This is one of several proprietary systems we've built to deliver 
                results traditional agencies simply cannot match.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="hero" size="lg" className="gap-2">
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

      {/* Why We Built This */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-lg">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Why We Built This
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The Nigerian market is different. Traditional advertising channels are 
                  expensive, fragmented, and increasingly ineffective. We saw an opportunity 
                  to build something new.
                </p>
                <p>
                  Truereach isn't just a tool—it's the result of 18 months of engineering, 
                  thousands of hours of development, and deep understanding of how authentic 
                  engagement actually works.
                </p>
                <p>
                  While other agencies rent access to the same platforms as everyone else, 
                  we built our own infrastructure. This is why we can promise results they can't.
                </p>
              </div>
              
              {/* Infrastructure Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-8 rounded-xl overflow-hidden border border-border"
              >
                <img 
                  src={infrastructureImage} 
                  alt="Truereach Infrastructure"
                  className="w-full h-64 object-cover"
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[
                'Real devices, verified through device fingerprinting',
                'Authentic accounts with aged history and real activity',
                'Quality control with ML-based fraud detection',
                'Geographic targeting down to local government areas',
                'Real-time performance dashboards',
                'Micro-payment infrastructure for instant settlement',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 glass-card rounded-lg">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-b from-gold/10 to-transparent">
        <div className="container-lg text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Access Our Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop competing on the same playing field as everyone else. 
              Let us show you what's possible with proprietary technology.
            </p>
            <Button variant="hero" size="lg" className="gap-2 text-lg px-8 py-6">
              Book Your Strategy Call <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}