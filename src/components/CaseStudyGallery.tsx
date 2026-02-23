import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ArrowRight, 
  Play,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  logo: string;
  metric: { value: string; label: string };
  challenge: string;
  solution: string;
  result: string;
  testimonial: string;
  videoThumbnail?: string;
  tags: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: '1',
    client: 'TechStore Nigeria',
    industry: 'E-commerce',
    logo: '🛒',
    metric: { value: '312%', label: 'Revenue Increase' },
    challenge: 'Low conversion rate and high ad spend with poor ROI',
    solution: 'WhatsApp Revenue Engine + Programmatic Ads',
    result: '3x revenue in 6 months, CAC reduced by 65%',
    testimonial: 'OutcomeLabs transformed our business. We went from struggling to scale to hitting 8-figure revenue.',
    tags: ['E-commerce', 'WhatsApp', 'Ads'],
  },
  {
    id: '2',
    client: 'Prime Healthcare',
    industry: 'Healthcare',
    logo: '🏥',
    metric: { value: '89%', label: 'Lead Quality' },
    challenge: 'Poor lead quality and no proper CRM integration',
    solution: 'WhatsApp CRM Integration + Lead Qualification AI',
    result: '89% qualified leads, 3x appointment bookings',
    testimonial: 'The WhatsApp integration changed how we handle patient inquiries. Our team is more efficient than ever.',
    tags: ['Healthcare', 'WhatsApp', 'AI'],
  },
  {
    id: '3',
    client: 'PropertyHub',
    industry: 'Real Estate',
    logo: '🏠',
    metric: { value: '5.4x', label: 'ROAS' },
    challenge: 'Unable to track property viewings to ad conversions',
    solution: 'Server-Side Tracking + Dynamic Creative',
    result: '5.4x ROAS, 47% reduction in ad spend',
    testimonial: 'Finally, we can prove our ads are working. The tracking setup was a game-changer for our property business.',
    tags: ['Real Estate', 'Tracking', 'Programmatic'],
  },
  {
    id: '4',
    client: 'EduTech Pro',
    industry: 'Education',
    logo: '📚',
    metric: { value: '234%', label: 'Enrollment Boost' },
    challenge: 'High drop-off rates in enrollment funnel',
    solution: 'Edge SEO + Marketing Automation',
    result: '234% more enrollments, 60% lower cost per enrollment',
    testimonial: 'Our enrollment numbers have never been better. The automated follow-ups are incredible.',
    tags: ['Education', 'SEO', 'Automation'],
  },
  {
    id: '5',
    client: 'Fashion Forward',
    industry: 'E-commerce',
    logo: '👗',
    metric: { value: '180%', label: 'Repeat Purchases' },
    challenge: 'Low customer retention and repeat purchases',
    solution: 'WhatsApp Broadcast + CRM Integration',
    result: '180% increase in repeat purchases in 90 days',
    testimonial: 'Our customers love getting updates through WhatsApp. Retention has never been higher.',
    tags: ['E-commerce', 'WhatsApp', 'Retention'],
  },
  {
    id: '6',
    client: 'AutoDealer NG',
    industry: 'Automotive',
    logo: '🚗',
    metric: { value: '₦2.1B', label: 'Attributed Sales' },
    challenge: 'Could not attribute offline sales to marketing',
    solution: 'Full Stack Tracking + Attribution',
    result: '₦2.1B in trackable sales, 12x attribution accuracy',
    testimonial: 'For the first time, we know exactly which ads are driving car sales.',
    tags: ['Automotive', 'Tracking', 'Attribution'],
  },
];

const industries = ['All', 'E-commerce', 'Healthcare', 'Real Estate', 'Education', 'Automotive'];

export function CaseStudyGallery() {
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  const filteredStudies = activeIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(s => s.industry === activeIndustry);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/20" />
      
      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Proven Results</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Client <span className="text-gradient-gold">Success Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how we've helped businesses across Nigeria transform their revenue operations.
          </p>
        </motion.div>

        {/* Industry Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {industries.map((industry) => (
            <Button
              key={industry}
              variant={activeIndustry === industry ? 'gold' : 'outline'}
              size="sm"
              onClick={() => setActiveIndustry(industry)}
              className="gap-2"
            >
              <Filter className="w-3 h-3" />
              {industry}
            </Button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <motion.div 
          layout 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.map((study, index) => (
              <motion.div
                key={study.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className="glass-card p-6 hover-card cursor-pointer group"
                  onClick={() => setSelectedStudy(study)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{study.logo}</span>
                      <div>
                        <h3 className="font-semibold text-foreground">{study.client}</h3>
                        <p className="text-sm text-muted-foreground">{study.industry}</p>
                      </div>
                    </div>
                    {study.videoThumbnail && (
                      <Button size="icon" variant="ghost" className="rounded-full">
                        <Play className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-gold/20 to-teal/20 border border-gold/20">
                    <div className="text-3xl font-bold text-gold mb-1">{study.metric.value}</div>
                    <div className="text-sm text-muted-foreground">{study.metric.label}</div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {study.challenge}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full group-hover:bg-gold/10">
                    View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="gold" size="lg" className="gap-2">
            View All Case Studies <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      {/* Detail Modal would go here */}
      {selectedStudy && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setSelectedStudy(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{selectedStudy.logo}</span>
                <div>
                  <h3 className="text-2xl font-bold">{selectedStudy.client}</h3>
                  <p className="text-muted-foreground">{selectedStudy.industry}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedStudy(null)}>
                ×
              </Button>
            </div>

            <div className="mb-6 p-6 rounded-xl bg-gradient-to-br from-gold/20 to-teal/20 border border-gold/20">
              <div className="text-4xl font-bold text-gold mb-2">{selectedStudy.metric.value}</div>
              <div className="text-lg text-muted-foreground">{selectedStudy.metric.label}</div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold mb-1">Challenge</h4>
                <p className="text-muted-foreground">{selectedStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Solution</h4>
                <p className="text-muted-foreground">{selectedStudy.solution}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Result</h4>
                <p className="text-muted-foreground">{selectedStudy.result}</p>
              </div>
            </div>

            <blockquote className="border-l-4 border-gold pl-4 italic text-muted-foreground mb-6">
              "{selectedStudy.testimonial}"
            </blockquote>

            <Button variant="gold" className="w-full gap-2">
              Get Similar Results <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      )}
    </section>
  );
}
