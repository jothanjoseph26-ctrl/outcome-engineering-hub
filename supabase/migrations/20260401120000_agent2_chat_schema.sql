-- Migration: Add enterprise chatbot tables (Agent B - Conversation and AI Orchestration)
-- This migration adds the data model for chat sessions, messages, model requests, 
-- audit logs, and knowledge sources for the enterprise chatbot

BEGIN;

-- 1. Create tenants table
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Create tenant_memberships table
CREATE TABLE IF NOT EXISTS public.tenant_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Create chat_sessions table
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  user_id TEXT,
  channel TEXT NOT NULL DEFAULT 'web' CHECK (channel IN ('web', 'api', 'whatsapp')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 4. Create chat_messages table
CREATE TABLE IF NOT EXISTS public.chat_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant')),
  content TEXT NOT NULL,
  redacted_content TEXT,
  token_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Create model_requests table
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

-- 6. Create audit_logs table
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

-- 7. Create knowledge_sources table
CREATE TABLE IF NOT EXISTS public.knowledge_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE SET NULL,
  source_type TEXT NOT NULL CHECK (source_type IN ('document', 'url', 'api')),
  title TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'inactive', 'failed')),
  checksum TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 8. Create indexes for performance
CREATE INDEX idx_chat_sessions_tenant_id ON public.chat_sessions(tenant_id);
CREATE INDEX idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX idx_chat_sessions_created_at ON public.chat_sessions(created_at DESC);

CREATE INDEX idx_chat_messages_session_id ON public.chat_messages(session_id);
CREATE INDEX idx_chat_messages_created_at ON public.chat_messages(created_at DESC);

CREATE INDEX idx_model_requests_session_id ON public.model_requests(session_id);
CREATE INDEX idx_model_requests_created_at ON public.model_requests(created_at DESC);
CREATE INDEX idx_model_requests_status ON public.model_requests(status);

CREATE INDEX idx_audit_logs_tenant_id ON public.audit_logs(tenant_id);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);

CREATE INDEX idx_knowledge_sources_tenant_id ON public.knowledge_sources(tenant_id);
CREATE INDEX idx_knowledge_sources_status ON public.knowledge_sources(status);

-- 9. Enable RLS
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenant_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_sources ENABLE ROW LEVEL SECURITY;

-- 10. RLS policies for chat_sessions
CREATE POLICY "Service role can manage chat_sessions" 
ON public.chat_sessions 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 11. RLS policies for chat_messages
CREATE POLICY "Service role can manage chat_messages" 
ON public.chat_messages 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 12. RLS policies for model_requests
CREATE POLICY "Service role can manage model_requests" 
ON public.model_requests 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 13. RLS policies for audit_logs
CREATE POLICY "Service role can manage audit_logs" 
ON public.audit_logs 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 14. RLS policies for knowledge_sources
CREATE POLICY "Service role can manage knowledge_sources" 
ON public.knowledge_sources 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 15. RLS policies for tenants (read-only for authenticated users)
CREATE POLICY "Authenticated users can read tenants" 
ON public.tenants 
FOR SELECT 
USING (
  current_setting('request.jwt.claim.role', true) IN ('service_role', 'authenticated')
);

-- 16. RLS policies for tenant_memberships
CREATE POLICY "Service role can manage tenant_memberships" 
ON public.tenant_memberships 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

COMMIT;
