'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ROICalculatorProps {
  variant?: 'inline' | 'popup';
}

export function ROICalculator({ variant = 'inline' }: ROICalculatorProps) {
  const [inputs, setInputs] = useState({
    monthlyTraffic: 10000,
    conversionRate: 2,
    averageOrderValue: 5000,
    currentAdSpend: 100000,
  });

  const results = useMemo(() => {
    const { monthlyTraffic, conversionRate, averageOrderValue, currentAdSpend } = inputs;
    
    const currentRevenue = (monthlyTraffic * conversionRate / 100) * averageOrderValue;
    const currentROAS = currentAdSpend > 0 ? currentRevenue / currentAdSpend : 0;
    
    const improvedConversionRate = conversionRate * 1.8;
    const improvedRevenue = (monthlyTraffic * improvedConversionRate / 100) * averageOrderValue;
    const additionalRevenue = improvedRevenue - currentRevenue;
    const improvedROAS = currentAdSpend > 0 ? improvedRevenue / currentAdSpend : 0;
    
    const cacReduction = 0.65;
    const newCustomersMonthly = (monthlyTraffic * improvedConversionRate / 100) - (monthlyTraffic * conversionRate / 100);
    const cacSavings = newCustomersMonthly * averageOrderValue * cacReduction;

    return {
      currentRevenue,
      currentROAS,
      improvedRevenue,
      additionalRevenue,
      improvedROAS,
      cacSavings,
      conversionImprovement: ((improvedConversionRate - conversionRate) / conversionRate) * 100,
    };
  }, [inputs]);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `₦${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `₦${(value / 1000).toFixed(0)}K`;
    }
    return `₦${value.toFixed(0)}`;
  };

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
            <Calculator className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Revenue Calculator</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Calculate Your <span className="text-gradient-gold">Potential Revenue</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what your business could generate with our systems. Input your current metrics below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-6">Your Current Metrics</h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="traffic" className="text-foreground">Monthly Website Visitors</Label>
                  <Input
                    id="traffic"
                    type="number"
                    value={inputs.monthlyTraffic}
                    onChange={(e) => setInputs(prev => ({ ...prev, monthlyTraffic: Number(e.target.value) }))}
                    className="mt-2 bg-surface-glass border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="conversion" className="text-foreground">Current Conversion Rate (%)</Label>
                  <Input
                    id="conversion"
                    type="number"
                    step="0.1"
                    value={inputs.conversionRate}
                    onChange={(e) => setInputs(prev => ({ ...prev, conversionRate: Number(e.target.value) }))}
                    className="mt-2 bg-surface-glass border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="aov" className="text-foreground">Average Order Value (₦)</Label>
                  <Input
                    id="aov"
                    type="number"
                    value={inputs.averageOrderValue}
                    onChange={(e) => setInputs(prev => ({ ...prev, averageOrderValue: Number(e.target.value) }))}
                    className="mt-2 bg-surface-glass border-border text-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="adspend" className="text-foreground">Monthly Ad Spend (₦)</Label>
                  <Input
                    id="adspend"
                    type="number"
                    value={inputs.currentAdSpend}
                    onChange={(e) => setInputs(prev => ({ ...prev, currentAdSpend: Number(e.target.value) }))}
                    className="mt-2 bg-surface-glass border-border text-foreground"
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-6 md:p-8 h-full">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gold" />
                Projected Improvement
              </h3>

              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Additional Monthly Revenue</span>
                    <span className="text-success font-bold text-xl">
                      +{formatCurrency(results.additionalRevenue)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    With 80% conversion rate improvement
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-gold" />
                      <span className="text-sm text-muted-foreground">Current Revenue</span>
                    </div>
                    <span className="text-2xl font-bold">{formatCurrency(results.currentRevenue)}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-teal" />
                      <span className="text-sm text-muted-foreground">Projected Revenue</span>
                    </div>
                    <span className="text-2xl font-bold text-teal">{formatCurrency(results.improvedRevenue)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-card border border-border">
                    <span className="text-sm text-muted-foreground">Current ROAS</span>
                    <div className="text-xl font-bold">{results.currentROAS.toFixed(1)}x</div>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border">
                    <span className="text-sm text-muted-foreground">Projected ROAS</span>
                    <div className="text-xl font-bold text-teal">{results.improvedROAS.toFixed(1)}x</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gold/10 border border-gold/20">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">CAC Reduction</span>
                    <span className="text-gold font-bold">{(results.cacSavings / 1000).toFixed(0)}K/month</span>
                  </div>
                </div>

                <Button variant="gold" className="w-full gap-2" size="lg">
                  Unlock This Potential <ArrowRight className="w-4 h-4" />
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  *Projections based on average client results. Actual results may vary.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
