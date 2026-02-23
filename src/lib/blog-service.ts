import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type BlogPost = Tables<'blog_posts'>;
export type Trend = Tables<'trends'>;
export type ContentJob = Tables<'content_generation_jobs'>;

export const blogService = {
  async getPublishedPosts(limit = 20, offset = 0): Promise<BlogPost[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data || [];
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
    return data;
  },

  async createPost(post: {
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
    author?: string;
    status?: string;
    seo_title?: string;
    seo_description?: string;
    featured_image?: string;
    tags?: string[];
    category?: string;
    published_at?: string;
  }): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async publishPost(id: string): Promise<BlogPost> {
    return this.updatePost(id, { 
      status: 'published',
      published_at: new Date().toISOString()
    });
  },

  async getAllSlugs(): Promise<string[]> {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug')
      .eq('status', 'published');

    if (error) throw error;
    return data?.map(p => p.slug) || [];
  }
};

export const trendService = {
  async getActiveTrends(limit = 10): Promise<Trend[]> {
    const { data, error } = await supabase
      .from('trends')
      .select('*')
      .order('relevance_score', { ascending: false })
      .order('detected_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async addTrend(trend: {
    topic: string;
    source?: string;
    relevance_score?: number;
    keywords?: string[];
    expires_at?: string;
  }): Promise<Trend> {
    const { data, error } = await supabase
      .from('trends')
      .insert(trend)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getTrendingTopics(): Promise<string[]> {
    const trends = await this.getActiveTrends(20);
    return trends.map(t => t.topic);
  }
};

export const contentGenerationService = {
  async createJob(trendId?: string): Promise<ContentJob> {
    const { data, error } = await supabase
      .from('content_generation_jobs')
      .insert({
        trend_id: trendId,
        status: 'pending'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateJobStatus(id: string, status: string, data?: Partial<ContentJob>): Promise<ContentJob> {
    const { data: job, error } = await supabase
      .from('content_generation_jobs')
      .update({
        status,
        ...data,
        ...(status === 'completed' ? { completed_at: new Date().toISOString() } : {})
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return job;
  },

  async getJobs(limit = 50): Promise<ContentJob[]> {
    const { data, error } = await supabase
      .from('content_generation_jobs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async generateArticles(count: number): Promise<BlogPost[]> {
    const trends = await trendService.getActiveTrends(count);
    const articles: BlogPost[] = [];

    for (const trend of trends) {
      const job = await this.createJob(trend.id);
      
      try {
        const title = `${trend.topic}: The Ultimate Guide for 2026`;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        const content = await generateArticleContent(trend.topic, trend.keywords || []);
        
        const post = await blogService.createPost({
          title,
          slug,
          content,
          excerpt: `Discover everything about ${trend.topic} and how it impacts your business in 2026.`,
          status: 'published',
          seo_title: title,
          seo_description: `Learn about ${trend.topic} and stay ahead of the competition. Comprehensive guide for modern businesses.`,
          tags: trend.keywords || [trend.topic],
          category: 'Trending',
          published_at: new Date().toISOString()
        });

        await this.updateJobStatus(job.id, 'completed', {
          title,
          slug,
          content,
          articles_generated: 1
        });

        articles.push(post);
      } catch (err) {
        await this.updateJobStatus(job.id, 'failed', {
          error_message: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    return articles;
  }
};

async function generateArticleContent(topic: string, keywords: string[]): Promise<string> {
  const keywordList = keywords.length > 0 ? keywords.join(', ') : topic;
  
  return `# ${topic}: The Complete Guide for 2026

## Introduction

In today's rapidly evolving digital landscape, understanding ${topic} has become essential for businesses looking to stay competitive. This comprehensive guide explores everything you need to know about ${topic} and how it can transform your business operations.

## Why ${topic} Matters in 2026

The importance of ${topic} cannot be overstated. As we move through 2026, businesses that embrace ${keywordList} are seeing significant improvements in:

- **Customer Engagement**: Modern consumers expect businesses to understand and implement ${topic} strategies
- **Operational Efficiency**: Companies leveraging ${topic} report up to 40% efficiency gains
- **Competitive Advantage**: Early adopters of ${topic} consistently outperform competitors

## Key Trends in ${topic}

### 1. AI-Powered Solutions

Artificial intelligence continues to revolutionize how businesses approach ${topic}. Machine learning algorithms now enable predictive analytics that were impossible just two years ago.

### 2. Automation First

Automation has become the backbone of successful ${topic} strategies. Organizations are automating repetitive tasks to focus on strategic initiatives.

### 3. Data-Driven Decision Making

Data analytics plays a crucial role in ${topic}. Businesses are leveraging advanced analytics to make informed decisions and predict market trends.

## Implementation Guide

### Getting Started

1. **Assess Your Current State**: Evaluate your existing infrastructure and identify gaps
2. **Define Your Goals**: Establish clear objectives for your ${topic} initiative
3. **Choose the Right Tools**: Select platforms that align with your business needs
4. **Train Your Team**: Invest in training to ensure successful adoption
5. **Measure and Optimize**: Continuously monitor performance and make adjustments

### Best Practices

- Start with small, manageable projects
- Involve stakeholders early in the process
- Maintain data quality and consistency
- Regular review and optimization cycles

## Case Studies

### Company A: 300% ROI

By implementing ${topic}, Company A achieved a 300% return on investment within six months. Their secret? A phased approach with clear milestones.

### Company B: Market Leader

Company B used ${topic} to become the market leader in their industry, capturing 35% market share in just one year.

## Conclusion

${topic} is no longer optional—it's essential for business survival and growth. Organizations that act now will position themselves for long-term success in 2026 and beyond.

## Next Steps

Ready to transform your business with ${topic}? Contact OutcomeLabs today to learn how our SEO engineering and programmatic content solutions can help you achieve your goals.

---

*This article was programmatically generated based on current market trends. For personalized content strategies, reach out to our team.*
`;
}
