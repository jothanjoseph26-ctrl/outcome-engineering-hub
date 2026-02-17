import { motion } from 'framer-motion';
import { ArrowRight, Database, RefreshCw, Link2, Shield, Zap, CheckCircle, MessageSquare, GitBranch, Workflow, Server, CloudCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { Link } from 'react-router-dom';

import heroImage from '@/assets/whatsapp-crm-hero.jpg';

const stats = [
  { value: 100, label: 'Data Sync Rate', suffix: '%' },
  { value: 0.3, label: 'Avg Sync Latency', suffix: 'sec', decimals: 1 },
  { value: 15, label: 'CRM Platforms', suffix: '+' },
  { value: 0, label: 'Data Loss Rate', suffix: '%' },
];

const syncFeatures = [
  {
    title: 'Real-Time Bidirectional Sync',
    description: 'Every WhatsApp message, every CRM update—synced in real-time. No batch jobs. No delays.',
    icon: RefreshCw,
  },
  {
    title: 'Contact Auto-Creation',
    description: 'New WhatsApp contact? Automatically created in your CRM with full conversation history.',
    icon: Link2,
  },
  {
    title: 'Deal Stage Automation',
    description: 'Conversation triggers move deals through your pipeline automatically. No manual updates.',
    icon: GitBranch,
  },
  {
    title: 'Custom Field Mapping',
    description: 'Map any conversation data to any CRM field. Budget, timeline, preferences—all captured.',
    icon: Workflow,
  },
];

const integrations = [
  { name: 'HubSpot', status: 'Native', type: 'Marketing & Sales' },
  { name: 'Salesforce', status: 'Native', type: 'Enterprise CRM' },
  { name: 'Zoho CRM', status: 'Native', type: 'SMB CRM' },
  { name: 'Pipedrive', status: 'Native', type: 'Sales Pipeline' },
  { name: 'Monday.com', status: 'Native', type: 'Work Management' },
  { name: 'Custom API', status: 'Available', type: 'Any System' },
];

const dataFlowSteps = [
  {
    step: '01',
    title: 'Message Received',
    description: 'Customer sends WhatsApp message',
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'Data Extraction',
    description: 'AI extracts contact info, intent, preferences',
    icon: Database,
  },
  {
    step: '03',
    title: 'CRM Lookup',
    description: 'Match to existing contact or create new',
    icon: Server,
  },
  {
    step: '04',
    title: 'Field Update',
    description: 'Push data to mapped CRM fields instantly',
    icon: CloudCog,
  },
];

const capabilities = [
  {
    title: 'Conversation History Sync',
    points: [
      'Full conversation transcripts in CRM',
      'Searchable message history',
      'Conversation tagging & categorization',
      'Attachment storage & linking',
    ],
  },
  {
    title: 'Contact Enrichment',
    points: [
      'Auto-populate contact fields from chat',
      'Preference tracking over time',
      'Engagement scoring from messages',
      'Lead source attribution',
    ],
  },
  {
    title: 'Pipeline Automation',
    points: [
      'Stage changes from keywords',
      'Task creation from commitments',
      'Follow-up scheduling automation',
      'Win/loss reason capture',
    ],
  },
];

export default function WhatsAppCRMIntegration() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="CRM Integration Architecture" 
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
              <Database className="w-4 h-4 text-teal" />
              <span className="text-sm font-mono text-teal">REAL-TIME SYNC</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-tight mb-6">
              WhatsApp ↔ CRM
              <br />
              <span className="text-teal">Perfect Sync.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Every conversation, every contact, every deal stage—synced to your CRM in real-time.
              No more copy-pasting. No more data silos. No more missed insights.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="teal" size="lg" className="gap-2">
                View Integration Docs <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="gap-2">
                See Data Flow
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

      {/* Data Flow Visualization */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              How Data Flows
            </h2>
            <p className="text-lg text-muted-foreground">
              Message to CRM in under 300 milliseconds. Every time.
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal/20 via-teal to-teal/20 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dataFlowSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 rounded-xl text-center relative"
                >
                  <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-4 relative z-10">
                    <item.icon className="w-6 h-6 text-teal" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{item.step}</span>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sync Features */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 border border-teal/20 mb-6">
              <span className="text-sm font-mono text-teal">SYNC CAPABILITIES</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Beyond Basic Integration
            </h2>
            <p className="text-lg text-muted-foreground">
              This isn't Zapier. It's enterprise-grade data synchronization.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {syncFeatures.map((feature, index) => (
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

      {/* Supported Integrations */}
      <section className="py-24">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Works With Your Stack
            </h2>
            <p className="text-lg text-muted-foreground">
              Native integrations with major CRMs. Custom API for everything else.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.type}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-mono rounded-full ${
                  integration.status === 'Native' 
                    ? 'bg-teal/20 text-teal' 
                    : 'bg-gold/20 text-gold'
                }`}>
                  {integration.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Deep Dive */}
      <section className="py-24 bg-card/30">
        <div className="container-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Full-Spectrum Sync
            </h2>
            <p className="text-lg text-muted-foreground">
              Every piece of data, properly synced and organized.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold text-foreground mb-4">{cap.title}</h3>
                <ul className="space-y-3">
                  {cap.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-teal mt-1 shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
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
              <Shield className="w-16 h-16 text-teal mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Your Data. Your Control.
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Enterprise-grade security. SOC 2 compliant infrastructure. Your customer data 
                stays yours—we just make sure it flows where it needs to go.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="teal" size="lg" className="gap-2">
                  Schedule Integration Review <ArrowRight className="w-4 h-4" />
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
