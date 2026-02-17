import { motion } from 'framer-motion';
import { ArrowRight, Bot, Brain, Zap, Target, Users, Clock, CheckCircle, MessageSquare, Filter, Route, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Link } from 'react-router-dom';

import heroImage from '@/assets/whatsapp-lead-qualification-hero.jpg';

const stats = [
  { value: 2.4, label: 'Avg Response Time', suffix: 'sec', decimals: 1 },
  { value: 67, label: 'Qualification Rate', suffix: '%' },
  { value: 94, label: 'Accuracy Score', suffix: '%' },
  { value: 12, label: 'Qualified Leads/Hour', suffix: 'x' },
];

const qualificationSteps = [
  {
    step: '01',
    title: 'Instant Capture',
    description: 'Lead messages in. AI responds in under 3 seconds. No delays. No missed opportunities.',
    icon: Zap,
  },
  {
    step: '02',
    title: 'Intelligent Questioning',
    description: 'Dynamic conversation flows that adapt based on responses. Budget, timeline, needs—all captured naturally.',
    icon: Brain,
  },
  {
    step: '03',
    title: 'Lead Scoring',
    description: 'Real-time scoring based on 15+ qualification criteria. Hot, warm, or cold—instantly categorized.',
    icon: Target,
  },
  {
    step: '04',
    title: 'Smart Routing',
    description: 'Hot leads go to humans immediately. Warm leads enter nurture sequences. Cold leads get value content.',
    icon: Route,
  },
];

const features = [
  {
    icon: Clock,
    title: '24/7 Instant Response',
    description: 'Never miss a lead. AI responds instantly at 2am Sunday or 3pm Monday. Consistent, professional, always-on.',
  },
  {
    icon: Filter,
    title: 'Multi-Criteria Scoring',
    description: 'Budget, authority, need, timeline—score leads on the criteria that matter to your business.',
  },
  {
    icon: Users,
    title: 'Human Handoff Protocol',
    description: 'Seamless transition when leads hit qualification threshold. Full conversation context transferred.',
  },
  {
    icon: Sparkles,
    title: 'Learning Engine',
    description: 'AI improves over time based on which qualified leads convert. Smarter qualification, better leads.',
  },
];

const useCases = [
  {
    industry: 'Real Estate',
    problem: 'Agents waste 60% of time on unqualified buyers',
    solution: 'AI pre-qualifies budget, location, timeline before agent contact',
    result: '4x agent productivity, 67% fewer wasted calls',
  },
  {
    industry: 'Financial Services',
    problem: 'Loan officers review applications that never convert',
    solution: 'AI collects documents, checks eligibility, scores urgency',
    result: '3.2x faster processing, 45% higher close rate',
  },
  {
    industry: 'E-commerce B2B',
    problem: 'Sales team drowning in unqualified wholesale inquiries',
    solution: 'AI validates business credentials, order volume, payment terms',
    result: '5x qualified leads per rep, 89% order completion',
  },
];

export default function WhatsAppLeadQualification() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Lead Qualification System" 
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
              <Bot className="w-4 h-4 text-teal" />
              <span className="text-sm font-mono text-teal">AI-POWERED QUALIFICATION</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              Qualify Leads in
              <br />
              <span className="text-teal">Under 30 Seconds.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              AI-powered conversation routing that qualifies, scores, and routes leads 
              before your sales team even picks up the phone. Stop wasting time on tire-kickers.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="lg" className="gap-2">
                See It In Action <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                View Technical Docs
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

      {/* Qualification Flow */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              The 4-Step Qualification Engine
            </h2>
            <p className="text-lg text-muted-foreground">
              From first message to qualified handoff—every step engineered for conversion.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualificationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl relative group hover:border-teal/30 transition-colors"
              >
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center">
                  <span className="text-sm font-bold font-mono text-teal">{item.step}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center mb-4 mt-4 group-hover:bg-teal/20 transition-colors">
                  <item.icon className="w-6 h-6 text-teal" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
              <span className="text-sm font-mono text-teal">CORE CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Enterprise-Grade Qualification
            </h2>
            <p className="text-lg text-muted-foreground">
              Not a chatbot. A complete lead qualification infrastructure.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-xl"
              >
                <div className="w-14 h-14 rounded-xl bg-teal/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-teal" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Use Cases */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Industry-Specific Qualification
            </h2>
            <p className="text-lg text-muted-foreground">
              Custom qualification criteria for your industry's unique needs.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <span className="inline-block px-3 py-1 text-xs font-mono bg-teal/20 text-teal rounded-full mb-4">
                  {useCase.industry}
                </span>
                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Problem</span>
                    <p className="text-foreground">{useCase.problem}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Solution</span>
                    <p className="text-foreground">{useCase.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-teal font-mono text-sm">
                      <CheckCircle className="w-4 h-4" />
                      {useCase.result}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
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
                Stop Qualifying Leads Manually
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your sales team should close deals, not play 20 questions with tire-kickers.
                Let our AI handle the qualification so humans can handle the conversion.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="teal" size="lg" className="gap-2">
                  Book Strategy Call <ArrowRight className="w-4 h-4" />
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
