import { motion } from 'framer-motion';
import { Activity, TrendingUp, DollarSign, Clock, Zap, Users, Target, BarChart3, ArrowUpRight, Radio } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';
import { useEffect, useState } from 'react';

const liveMetrics = [
  {
    icon: Activity,
    label: 'Active Campaigns',
    value: 47,
    suffix: '',
    change: '+3 this week',
    positive: true,
  },
  {
    icon: TrendingUp,
    label: 'Avg. Conversion Uplift',
    value: 284,
    suffix: '%',
    change: 'vs. industry avg',
    positive: true,
  },
  {
    icon: DollarSign,
    label: 'Revenue Generated',
    value: 12.4,
    prefix: '$',
    suffix: 'M',
    decimals: 1,
    change: 'Last 90 days',
    positive: true,
  },
  {
    icon: Clock,
    label: 'Avg. Response Time',
    value: 2.3,
    suffix: 'hrs',
    decimals: 1,
    change: 'Lead to first contact',
    positive: true,
  },
];

const topSystems = [
  { name: 'WhatsApp Revenue Engine', performance: 94, clients: 23 },
  { name: 'Truereach Activation', performance: 89, clients: 18 },
  { name: 'Programmatic Ads Suite', performance: 87, clients: 31 },
  { name: 'Edge SEO Framework', performance: 82, clients: 15 },
];

const recentActivity = [
  { action: 'Campaign optimized', system: 'Programmatic Ads', time: '2 min ago' },
  { action: 'Lead captured', system: 'WhatsApp Engine', time: '5 min ago' },
  { action: 'Conversion tracked', system: 'Truereach', time: '8 min ago' },
  { action: 'Report generated', system: 'Analytics Suite', time: '12 min ago' },
];

export const OutcomeBrainSection = () => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % recentActivity.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Radio className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live System Status</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-gold">Outcome Brain</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time performance across all active client systems. 
            Your proof isn't a PDF — it's a live operating system.
          </p>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {liveMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 relative group"
            >
              {/* Live indicator */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-xs text-success font-medium">Live</span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                  <metric.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{metric.label}</span>
              </div>

              <div className="mb-2">
                <AnimatedCounter
                  end={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals || 0}
                  duration={2500}
                  className="text-3xl font-bold text-foreground"
                />
              </div>

              <div className="flex items-center gap-1 text-sm">
                <ArrowUpRight className="h-3.5 w-3.5 text-success" />
                <span className="text-success">{metric.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Grid: Top Systems + Activity Feed */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Performing Systems */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Top Performing Systems</h3>
              </div>
              <span className="text-xs text-muted-foreground">Last 30 days</span>
            </div>

            <div className="space-y-4">
              {topSystems.map((system, index) => (
                <div key={system.name} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground w-5">
                        #{index + 1}
                      </span>
                      <span className="text-sm font-medium">{system.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {system.clients} clients
                      </span>
                      <span className="text-sm font-bold text-primary">{system.performance}%</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${system.performance}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-full bg-gradient-to-r from-primary to-gold rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Activity Feed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                <h3 className="font-semibold text-lg">Live Activity</h3>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-xs text-success">Real-time</span>
              </div>
            </div>

            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    backgroundColor: pulseIndex === index ? 'hsl(var(--primary) / 0.05)' : 'transparent',
                    borderColor: pulseIndex === index ? 'hsl(var(--primary) / 0.2)' : 'hsl(var(--border))',
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${pulseIndex === index ? 'bg-primary/20' : 'bg-muted'}`}>
                      <Target className={`h-3.5 w-3.5 ${pulseIndex === index ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.system}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </motion.div>
              ))}
            </div>

            {/* Activity pulse bar */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>System health</span>
                <span className="text-success font-medium">All systems operational</span>
              </div>
              <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-success via-success/80 to-success"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '50%' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
