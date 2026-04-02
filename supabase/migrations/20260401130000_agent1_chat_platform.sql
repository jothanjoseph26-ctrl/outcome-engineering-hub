-- Agent 1: Platform and Security hardening for enterprise chat

BEGIN;

ALTER TABLE public.chat_sessions
  ADD COLUMN IF NOT EXISTS session_token UUID NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS last_message_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS channel TEXT NOT NULL DEFAULT 'web';

CREATE UNIQUE INDEX IF NOT EXISTS idx_chat_sessions_session_token
  ON public.chat_sessions(session_token);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_tenant_status
  ON public.chat_sessions(tenant_id, status);

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

CREATE INDEX IF NOT EXISTS idx_chat_rate_limits_scope
  ON public.chat_rate_limits(scope_type, scope_key, window_start DESC);

ALTER TABLE public.chat_rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage chat_rate_limits" ON public.chat_rate_limits;
CREATE POLICY "Service role can manage chat_rate_limits"
  ON public.chat_rate_limits
  FOR ALL
  USING (current_setting('request.jwt.claim.role', true) = 'service_role')
  WITH CHECK (current_setting('request.jwt.claim.role', true) = 'service_role');

CREATE OR REPLACE FUNCTION public.touch_chat_session_activity()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.chat_sessions
  SET updated_at = now(),
      last_message_at = now()
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
RETURNS TABLE (
  allowed BOOLEAN,
  request_count INTEGER,
  reset_at TIMESTAMPTZ,
  blocked_until TIMESTAMPTZ
)
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

  INSERT INTO public.chat_rate_limits (
    scope_type,
    scope_key,
    window_start,
    window_seconds,
    request_count,
    updated_at
  )
  VALUES (
    p_scope_type,
    p_scope_key,
    v_window_start,
    p_window_seconds,
    1,
    now()
  )
  ON CONFLICT (scope_type, scope_key, window_start)
  DO UPDATE SET
    request_count = public.chat_rate_limits.request_count + 1,
    updated_at = now()
  RETURNING request_count, blocked_until INTO v_request_count, v_blocked_until;

  IF v_request_count > p_limit THEN
    v_blocked_until := COALESCE(v_blocked_until, now() + make_interval(secs => p_window_seconds));

    UPDATE public.chat_rate_limits
    SET blocked_until = v_blocked_until,
        updated_at = now()
    WHERE scope_type = p_scope_type
      AND scope_key = p_scope_key
      AND window_start = v_window_start;

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
