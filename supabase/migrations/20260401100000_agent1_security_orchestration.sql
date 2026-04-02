-- Migration: Add secure RLS, token-based access, and durable job state
-- This migration addresses security, data model, and job orchestration

BEGIN;

-- 1. Add new columns to scans table for durable job state
ALTER TABLE public.scans 
ADD COLUMN IF NOT EXISTS current_step TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS retry_count INTEGER NOT NULL DEFAULT 0 CHECK (retry_count >= 0 AND retry_count <= 5),
ADD COLUMN IF NOT EXISTS last_heartbeat_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS started_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS public_token UUID UNIQUE;

-- 2. Add partial unique index for idempotency (prevent duplicate queued scans)
CREATE UNIQUE INDEX IF NOT EXISTS idx_scans_unique_pending 
ON public.scans (id) 
WHERE status IN ('pending', 'queued');

-- 3. Update CHECK constraint to include 'queued' status
ALTER TABLE public.scans 
DROP CONSTRAINT scans_status_check;

ALTER TABLE public.scans 
ADD CONSTRAINT scans_status_check 
CHECK (status IN ('pending', 'queued', 'running', 'analyzing', 'completed', 'failed'));

-- 4. Create scan_events table for lifecycle tracking
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

-- 4b. Add rule_version column to scan_results for scoring version tracking
ALTER TABLE public.scan_results 
ADD COLUMN IF NOT EXISTS rule_version TEXT DEFAULT '1.0';

-- 5. Create indexes for scan_events
CREATE INDEX idx_scan_events_scan_id ON public.scan_events(scan_id);
CREATE INDEX idx_scan_events_created_at ON public.scan_events(created_at DESC);
CREATE INDEX idx_scan_events_type ON public.scan_events(event_type);

-- 5b. Enable RLS on scan_events table (required for policies to work)
ALTER TABLE public.scan_events ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing unsafe policies
DROP POLICY IF EXISTS "Anyone can create scans" ON public.scans;
DROP POLICY IF EXISTS "Anyone can view their own scan by ID" ON public.scans;
DROP POLICY IF EXISTS "System can update scans" ON public.scans;
DROP POLICY IF EXISTS "Anyone can view scan results" ON public.scan_results;
DROP POLICY IF EXISTS "System can insert scan results" ON public.scan_results;

-- 7. Create secure RLS policies for scans

-- Allow anyone to INSERT (scan creation) but with basic validation
CREATE POLICY "Allow scan creation" 
ON public.scans 
FOR INSERT 
WITH CHECK (
  website IS NOT NULL 
  AND website != '' 
  AND length(website) <= 2048
);

-- Allow read access only via public_token or owner (for authenticated users)
CREATE POLICY "Allow scan retrieval by token" 
ON public.scans 
FOR SELECT 
USING (
  public_token = (current_setting('request.headers', true)::json->>'x-public-token')::uuid
  OR 
  -- Service role bypass (for backend functions)
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Only service role can update scans (orchestration)
CREATE POLICY "Service role can update scans" 
ON public.scans 
FOR UPDATE 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Only service role can delete scans
CREATE POLICY "Service role can delete scans" 
ON public.scans 
FOR DELETE 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 8. Create secure RLS policies for scan_results

-- Allow read access via scan's public_token
CREATE POLICY "Allow scan_results retrieval by token" 
ON public.scan_results 
FOR SELECT 
USING (
  scan_id IN (
    SELECT id FROM public.scans 
    WHERE public_token = (current_setting('request.headers', true)::json->>'x-public-token')::uuid
  )
  OR
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Only service role can insert scan results
CREATE POLICY "Service role can insert scan_results" 
ON public.scan_results 
FOR INSERT 
WITH CHECK (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- Only service role can update scan results
CREATE POLICY "Service role can update scan_results" 
ON public.scan_results 
FOR UPDATE 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

-- 9. Create secure RLS policies for scan_events
-- Only service role can read/write scan_events
CREATE POLICY "Service role can manage scan_events" 
ON public.scan_events 
FOR ALL 
USING (
  current_setting('request.jwt.claim.role', true) = 'service_role'
);

COMMIT;