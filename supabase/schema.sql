-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title NOT NULL,
  TEXT slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  author TEXT DEFAULT 'OutcomeLabs',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  seo_title TEXT,
  seo_description TEXT,
  featured_image TEXT,
  tags TEXT[],
  category TEXT DEFAULT 'General',
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trends Table for tracking trends
CREATE TABLE IF NOT EXISTS trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  source TEXT,
  relevance_score NUMERIC(3,2) DEFAULT 0.5,
  keywords TEXT[],
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Content Generation Jobs Table
CREATE TABLE IF NOT EXISTS content_generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trend_id UUID REFERENCES trends(id),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  title TEXT,
  slug TEXT,
  content TEXT,
  error_message TEXT,
  articles_generated INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generation_jobs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view trends" ON trends
  FOR SELECT USING (true);

CREATE POLICY "Public can view completed jobs" ON content_generation_jobs
  FOR SELECT USING (status = 'completed');

-- Admin policies (would need service role for inserts/updates)
CREATE POLICY "Service role can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update blog posts" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Service role can insert trends" ON trends
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert jobs" ON content_generation_jobs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update jobs" ON content_generation_jobs
  FOR UPDATE USING (true);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_detected_at ON trends(detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_relevance ON trends(relevance_score DESC);
