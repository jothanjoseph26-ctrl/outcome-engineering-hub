import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Target,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Calendar
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockMetrics = [
  { label: 'Revenue', value: '₦12.4M', change: '+23%', positive: true, icon: DollarSign },
  { label: 'Conversions', value: '847', change: '+12%', positive: true, icon: Target },
  { label: 'CAC', value: '₦2,340', change: '-8%', positive: true, icon: Users },
  { label: 'ROAS', value: '4.2x', change: '+0.8', positive: true, icon: TrendingUp },
];

const mockCampaigns = [
  { name: 'WhatsApp Broadcast', status: 'active', leads: 234, revenue: '₦1.2M' },
  { name: 'Meta Ads - Retargeting', status: 'active', leads: 156, revenue: '₦890K' },
  { name: 'Google Ads - Search', status: 'paused', leads: 89, revenue: '₦450K' },
  { name: 'Email Sequence', status: 'active', leads: 67, revenue: '₦320K' },
];

const mockFunnel = [
  { stage: 'Visitors', value: 45000, percent: 100 },
  { stage: 'Leads', value: 4500, percent: 10 },
  { stage: 'Qualified', value: 1800, percent: 4 },
  { stage: 'Customers', value: 847, percent: 1.88 },
];

export function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <LayoutDashboard className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Client Dashboard</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Command <span className="text-gradient-gold">Center</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time visibility into every metric that matters. Track performance, optimize campaigns, and scale with confidence.
          </p>
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          {/* Dashboard Header */}
          <div className="bg-card border-b border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold to-gold-glow flex items-center justify-center">
                  <span className="text-background font-bold">O</span>
                </div>
                <span className="font-semibold">Outcome Labs</span>
              </div>
              <Badge variant="secondary" className="bg-success/20 text-success">
                <span className="w-2 h-2 rounded-full bg-success mr-1.5 animate-pulse" />
                Live
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>Last 30 days</span>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <div className="border-b border-border bg-card/50">
            <div className="flex gap-1 p-2">
              {['overview', 'campaigns', 'leads', 'reports'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-gold/20 text-gold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-card border border-border"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">{metric.label}</span>
                    <metric.icon className="h-4 w-4 text-gold" />
                  </div>
                  <div className="flex items-end justify-between">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className={`text-sm flex items-center ${metric.positive ? 'text-success' : 'text-destructive'}`}>
                      {metric.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {metric.change}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Campaigns & Funnel */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Campaigns */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Activity className="h-4 w-4 text-gold" />
                    Active Campaigns
                  </h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="space-y-3">
                  {mockCampaigns.map((campaign) => (
                    <div key={campaign.name} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${campaign.status === 'active' ? 'bg-success' : 'bg-muted-foreground'}`} />
                        <div>
                          <p className="font-medium text-sm">{campaign.name}</p>
                          <p className="text-xs text-muted-foreground">{campaign.leads} leads</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm">{campaign.revenue}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Funnel */}
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-teal" />
                    Conversion Funnel
                  </h3>
                  <Button variant="ghost" size="sm">Analyze</Button>
                </div>
                <div className="space-y-3">
                  {mockFunnel.map((stage, index) => (
                    <div key={stage.stage}>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">{stage.stage}</span>
                        <span className="font-medium">{stage.value.toLocaleString()} ({stage.percent}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stage.percent * 20}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-gold to-teal rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Footer */}
          <div className="bg-card border-t border-border p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              All systems operational
            </div>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track every metric as it happens' },
            { icon: Target, title: 'Campaign Optimization', desc: 'AI-powered suggestions to improve performance' },
            { icon: PieChart, title: 'Custom Reports', desc: 'Generate reports tailored to your needs' },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
