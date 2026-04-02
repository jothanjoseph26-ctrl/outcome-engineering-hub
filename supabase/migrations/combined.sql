-- Combined migrations for Supabase deployment
-- Run this entire file in Supabase SQL Editor

BEGIN;

-- ============================================
-- 1. Initial schema (scans, scan_results)
-- ============================================

CREATE TABLE IF NOT EXISTS public.scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  website TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'queued', 'running', 'analyzing', 'completed', 'failed')),
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  answers JSONB NOT NULL DEFAULT '{}',
  contact_email TEXT,
  contact_name TEXT,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  current_step TEXT DEFAULT 'pending',
  retry_count INTEGER NOT NULL DEFAULT 0 CHECK (retry_count >= 0 AND retry_count <= 5),
  last_heartbeat_at TIMESTAMP WITH TIME ZONE,
  started_at TIMESTAMP WITH TIME ZONE,
  public_token UUID UNIQUE
);

CREATE TABLE IF NOT EXISTS public.scan_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id UUID NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  maturity_level TEXT NOT NULL,
  findings JSONB NOT NULL DEFAULT '[]',
  recommendations JSONB NOT NULL DEFAULT '[]',
  category_scores JSONB NOT NULL DEFAULT '{}',
  ai_summary TEXT,
  estimated_revenue_loss TEXT,
  rule_version TEXT DEFAULT '1.0.0',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scans_status ON public.scans(status);
CREATE INDEX IF NOT EXISTS idx_scans_created_at ON public.scans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scan_results_scan_id ON public.scan_results(scan_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_scans_unique_pending ON public.scans(id) WHERE status IN ('pending', 'queued');

-- ============================================
-- 2. Tenant & Chat schema (Agent 2)
-- ============================================

CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.tenant_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  user_id TEXT,
  channel TEXT NOT NULL DEFAULT 'web' CHECK (channel IN ('web', 'api', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE,
  session_token UUID NOT NULL DEFAULT gen_random_uuid(),
  last_message_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant')),
  content TEXT NOT NULL,
  redacted_content TEXT,
  token_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.model_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.chat_sessions(id) ON DELETE SET NULL,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  latency_ms INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'timeout')),
  prompt_version TEXT,
  error_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  user_id TEXT,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  metadata JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.knowledge_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('document', 'url', 'api')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'failed')),
  checksum TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.scan_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  scan_id UUID NOT NULL REFERENCES public.scans(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN (
    'scan_created', 'scan_started', 'scan_progress', 'analysis_started', 
    'analysis_completed', 'scan_completed', 'scan_failed', 'scan_retried',
    'heartbeat', 'status_changed'
  )),
  event_data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.chat_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scope_type TEXT NOT NULL CHECK (scope_type IN ('ip', 'session', 'tenant', 'user')),
  scope_key TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  window_seconds INTEGER NOT NULL DEFAULT 60 CHECK (window_seconds > 0),
  request_count INTEGER NOT NULL DEFAULT 0 CHECK (request_count >= 0),
  blocked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (scope_type, scope_key, window_start)
);

-- Chat indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_sessions_session_token ON public.chat_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_tenant_status ON public.chat_sessions(tenant_id, status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_tenant_id ON public.chat_sessions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON public.chat_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON public.chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_model_requests_session_id ON public.model_requests(session_id);
CREATE INDEX IF NOT EXISTS idx_model_requests_created_at ON public.model_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_model_requests_status ON public.model_requests(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_tenant_id ON public.audit_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_knowledge_sources_tenant_id ON public.knowledge_sources(tenant_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_sources_status ON public.knowledge_sources(status);
CREATE INDEX IF NOT EXISTS idx_scan_events_scan_id ON public.scan_events(scan_id);
CREATE INDEX IF NOT EXISTS idx_scan_events_created_at ON public.scan_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scan_events_type ON public.scan_events(event_type);
CREATE INDEX IF NOT EXISTS idx_chat_rate_limits_scope ON public.chat_rate_limits(scope_type, scope_key, window_start DESC);

-- ============================================
-- 3. Enable RLS on all tables
-- ============================================

ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scan_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. RLS Policies (service_role only)
-- ============================================

-- Scans policies
DROP POLICY IF EXISTS "Anyone can create scans" ON public.scans;
DROP POLICY IF EXISTS "Anyone can view their own scan by ID" ON public.scans;
DROP POLICY IF EXISTS "System can update scans" ON public.scans;

CREATE POLICY "Allow scan creation" ON public.scans FOR INSERT WITH CHECK (
  website IS NOT NULL AND website != '' AND length(website) <= 2048
);

CREATE POLICY "Allow scan retrieval by token" ON public.scans FOR SELECT USING (
  public_token = (current_setting('request.headers', true)::json->>'x-public-token')::uuid
  OR current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can update scans" ON public.scans FOR UPDATE USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can delete scans" ON public.scans FOR DELETE USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Scan_results policies
DROP POLICY IF EXISTS "Anyone can view scan results" ON public.scan_results;
DROP POLICY IF EXISTS "System can insert scan results" ON public.scan_results;

CREATE POLICY "Allow scan_results retrieval by token" ON public.scan_results FOR SELECT USING (
  scan_id IN (SELECT id FROM public.scans WHERE public_token = (current_setting('request.headers', true)::json->>'x-public-token')::uuid)
  OR current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can insert scan_results" ON public.scan_results FOR INSERT WITH CHECK (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can update scan_results" ON public.scan_results FOR UPDATE USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Scan_events policies
CREATE POLICY "Service role can manage scan_events" ON public.scan_events FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Chat tables policies
CREATE POLICY "Service role can manage chat_sessions" ON public.chat_sessions FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can manage chat_messages" ON public.chat_messages FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can manage model_requests" ON public.model_requests FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can manage audit_logs" ON public.audit_logs FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can manage knowledge_sources" ON public.knowledge_sources FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Service role can manage tenant_memberships" ON public.tenant_memberships FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

CREATE POLICY "Authenticated users can read tenants" ON public.tenants FOR SELECT USING (
  current_setting('request.jwt.claim.role', true) IN ('service_role', 'authenticated')
);

-- Chat_rate_limits policies
DROP POLICY IF EXISTS "Service role can manage chat_rate_limits" ON public.chat_rate_limits;
CREATE POLICY "Service role can manage chat_rate_limits" ON public.chat_rate_limits FOR ALL USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
) WITH CHECK (current_setting('request.jwt.claim.role', true) = 'service_role');

-- ============================================
-- 5. Functions
-- ============================================

CREATE OR REPLACE FUNCTION public.touch_chat_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.chat_sessions
  SET updated_at = now(), last_message_at = now()
  WHERE id = NEW.session_id;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_chat_messages_touch_session ON public.chat_messages;
CREATE TRIGGER trg_chat_messages_touch_session
AFTER INSERT ON public.chat_messages
FOR EACH ROW
EXECUTE FUNCTION public.touch_chat_session_activity();

CREATE OR REPLACE FUNCTION public.claim_chat_rate_limit(
  p_scope_type TEXT,
  p_scope_key TEXT,
  p_limit INTEGER,
  p_window_seconds INTEGER
)
RETURNS TABLE (allowed BOOLEAN, request_count INTEGER, reset_at TIMESTAMPTZ, blocked_until TIMESTAMPTZ)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_window_start TIMESTAMPTZ;
  v_request_count INTEGER;
  v_blocked_until TIMESTAMPTZ;
BEGIN
  v_window_start := to_timestamp(floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds);

  INSERT INTO public.chat_rate_limits (scope_type, scope_key, window_start, window_seconds, request_count, updated_at)
  VALUES (p_scope_type, p_scope_key, v_window_start, p_window_seconds, 1, now())
  ON CONFLICT (scope_type, scope_key, window_start)
  DO UPDATE SET request_count = public.chat_rate_limits.request_count + 1, updated_at = now()
  RETURNING request_count, blocked_until INTO v_request_count, v_blocked_until;

  IF v_request_count > p_limit THEN
    v_blocked_until := COALESCE(v_blocked_until, now() + make_interval(secs => p_window_seconds));
    UPDATE public.chat_rate_limits SET blocked_until = v_blocked_until, updated_at = now()
    WHERE scope_type = p_scope_type AND scope_key = p_scope_key AND window_start = v_window_start;
    allowed := false;
  ELSE
    allowed := true;
  END IF;

  request_count := v_request_count;
  reset_at := v_window_start + make_interval(secs => p_window_seconds);
  blocked_until := v_blocked_until;
  RETURN NEXT;
END;
$$;

GRANT EXECUTE ON FUNCTION public.claim_chat_rate_limit(TEXT, TEXT, INTEGER, INTEGER) TO service_role;

COMMIT;

-- ============================================
-- 6. Blog/Content schema (separate transaction)
-- ============================================

BEGIN;

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
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

CREATE TABLE IF NOT EXISTS trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  source TEXT,
  relevance_score NUMERIC(3,2) DEFAULT 0.5,
  keywords TEXT[],
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

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

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_generation_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published blog posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view trends" ON trends FOR SELECT USING (true);
CREATE POLICY "Public can view completed jobs" ON content_generation_jobs FOR SELECT USING (status = 'completed');
CREATE POLICY "Service role can insert blog posts" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update blog posts" ON blog_posts FOR UPDATE USING (true);
CREATE POLICY "Service role can insert trends" ON trends FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can insert jobs" ON content_generation_jobs FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update jobs" ON content_generation_jobs FOR UPDATE USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_detected_at ON trends(detected_at DESC);
CREATE INDEX IF NOT EXISTS idx_trends_relevance ON trends(relevance_score DESC);

COMMIT;