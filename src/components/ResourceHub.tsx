'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  FileText, 
  Video, 
  Download, 
  ArrowRight,
  Search,
  Calendar,
  Eye,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface Resource {
  id: string;
  type: 'article' | 'whitepaper' | 'video' | 'template';
  title: string;
  description: string;
  category: string;
  readTime?: string;
  date: string;
  thumbnail?: string;
  premium: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    type: 'whitepaper',
    title: '2026 Nigeria Digital Marketing Report',
    description: 'Comprehensive analysis of digital marketing trends, benchmarks, and strategies for Nigerian businesses.',
    category: 'Reports',
    readTime: '25 min',
    date: 'Feb 2026',
    premium: false,
  },
  {
    id: '2',
    type: 'article',
    title: 'How to Reduce CAC by 60% with WhatsApp',
    description: 'Step-by-step guide to implementing WhatsApp automation that converts leads at 3x the rate of email.',
    category: 'Strategy',
    readTime: '12 min',
    date: 'Jan 2026',
    premium: false,
  },
  {
    id: '3',
    type: 'video',
    title: 'Server-Side Tracking Setup Masterclass',
    description: 'Watch our engineering team set up complete server-side tracking from scratch.',
    category: 'Technical',
    readTime: '45 min',
    date: 'Jan 2026',
    premium: true,
  },
  {
    id: '4',
    type: 'template',
    title: 'Lead Nurture Sequence Templates',
    description: 'Copy-paste WhatsApp and email sequences that nurture leads into buyers.',
    category: 'Templates',
    readTime: '5 min',
    date: 'Dec 2025',
    premium: true,
  },
  {
    id: '5',
    type: 'article',
    title: 'Programmatic Ads Explained for Beginners',
    description: 'Everything you need to know about programmatic advertising and why it matters for Nigerian businesses.',
    category: 'Education',
    readTime: '18 min',
    date: 'Dec 2025',
    premium: false,
  },
  {
    id: '6',
    type: 'whitepaper',
    title: 'WhatsApp Business API Implementation Guide',
    description: 'Complete technical guide to setting up WhatsApp Business API for enterprise scale.',
    category: 'Technical',
    readTime: '35 min',
    date: 'Nov 2025',
    premium: true,
  },
];

const categories = ['All', 'Strategy', 'Technical', 'Reports', 'Templates', 'Education'];

const typeIcons = {
  article: FileText,
  whitepaper: BookOpen,
  video: Video,
  template: Download,
};

export function ResourceHub() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = resources.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Resource Hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Learn & <span className="text-gradient-gold">Grow</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Free guides, templates, and insights to help you master revenue operations.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-surface-glass border-border"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'gold' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredResources.map((resource, index) => {
            const Icon = typeIcons[resource.type];
            return (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-card p-6 hover-card group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      resource.premium ? 'bg-gold/20' : 'bg-primary/20'
                    }`}>
                      <Icon className={`h-5 w-5 ${resource.premium ? 'text-gold' : 'text-primary'}`} />
                    </div>
                    {resource.premium && (
                      <Badge variant="secondary" className="bg-gold/20 text-gold">
                        <Lock className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>

                  <Badge variant="outline" className="w-fit mb-3">
                    {resource.category}
                  </Badge>

                  <h3 className="text-lg font-semibold mb-2 group-hover:text-gold transition-colors">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      {resource.readTime && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {resource.readTime}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {resource.date}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" className="gap-1 h-6 px-2">
                      Read <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="glass-card p-8 bg-gradient-to-br from-gold/10 to-teal/10 border-gold/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-2">Get Weekly Insights</h3>
                <p className="text-muted-foreground">
                  Join 5,000+ Nigerian marketers getting our weekly breakdown of what's working in digital marketing.
                </p>
              </div>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-background border-border"
                />
                <Button variant="gold">Subscribe</Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
