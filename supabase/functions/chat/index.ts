import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import {
  PROMPT_VERSION,
  buildBlogPostPrompt,
  buildChatContextPrompt,
  buildChatSystemPrompt,
  buildContentWriterPrompt,
  buildSeoAnalysisPrompt,
  buildTrendAnalysisPrompt,
} from './prompts.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-public-token, x-chat-session-token, x-tenant-id',
};

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = 'google/gemini-2.0-flash-exp';
const FALLBACK_MODEL = 'anthropic/claude-3.5-haiku';
const HISTORY_LIMIT = 20;
const CHAT_LIMIT = 30;
const CONTENT_LIMIT = 20;
const WINDOW_SECONDS = 60;
const TIMEOUT_MS = 30000;

type Operation =
  | 'createSession'
  | 'getSession'
  | 'message'
  | 'chat'
  | 'generateContent'
  | 'analyzeSEO'
  | 'detectTrends'
  | 'generateBlogPost'
  | 'generateMultipleArticles';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GatewayRequest {
  operation?: Operation;
  sessionId?: string;
  sessionToken?: string;
  tenantId?: string | null;
  userId?: string | null;
  channel?: string;
  message?: string;
  messages?: ChatMessage[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  prompt?: string;
  context?: string;
  pageContent?: string;
  topics?: string[];
  topic?: string;
  keywords?: string[];
  count?: number;
}

interface SessionRow {
  id: string;
  tenant_id: string | null;
  user_id: string | null;
  channel: string;
  status: string;
  session_token: string;
  created_at: string;
  updated_at: string | null;
}

const BLOCKED_PATTERNS = [
  'ignore previous instructions',
  'system prompt',
  'jailbreak',
  'reveal your prompt',
  'api key',
  'secret key',
];

const SENSITIVE_PATTERNS: Array<{ label: string; pattern: RegExp }> = [
  { label: 'email', pattern: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi },
  { label: 'phone', pattern: /\+?\d[\d\s().-]{8,}\d/g },
  { label: 'credit-card', pattern: /\b(?:\d[ -]*?){13,19}\b/g },
  { label: 'ssn', pattern: /\b\d{3}-\d{2}-\d{4}\b/g },
  { label: 'api-key', pattern: /\b(?:sk-|rk-|pk_)[A-Za-z0-9_-]{16,}\b/g },
];

const CONTACT_EMAIL = 'info@outcomelabs.online';
const CONTACT_PHONE = '+234 700 000 0000';
const BUSINESS_INFO_PATTERNS = {
  officeLocation: /\b(office|address|location|located|where are you|where is your office)\b/i,
  contact: /\b(contact|email|phone|call|reach you|get in touch)\b/i,
};

const supabaseUrl = Deno.env.get('SUPABASE_URL');
const serviceRoleKey = Deno.env.get('SERVICE_ROLE_KEY');
const openRouterApiKey = Deno.env.get('OPENROUTER_API_KEY');

if (!supabaseUrl || !serviceRoleKey || !openRouterApiKey) {
  throw new Error('Missing required environment variables for chat gateway');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const requestId = crypto.randomUUID();
  const payload = await readJson(req);
  const route = resolveRoute(req);

  try {
    if (route === 'createSession') return await handleCreateSession(req, payload, requestId);
    if (route === 'getSession') return await handleGetSession(req, payload, requestId);
    if (route === 'message') return await handleMessage(req, payload, requestId);
    return await handleGateway(req, payload, requestId);
  } catch (error) {
    console.error('chat gateway error', { requestId, error });
    return jsonResponse(500, {
      status: 'error',
      message: 'An error occurred while processing your request.',
      error: error instanceof Error ? error.message : 'Unknown error',
      requiresHumanHandoff: true,
    });
  }
});

function resolveRoute(req: Request): Operation | 'gateway' {
  const url = new URL(req.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const last = segments.at(-1)?.toLowerCase() ?? '';
  const penultimate = segments.at(-2)?.toLowerCase() ?? '';

  if (req.method === 'POST' && last === 'session') return 'createSession';
  if (req.method === 'GET' && penultimate === 'session') return 'getSession';
  if (req.method === 'POST' && last === 'message') return 'message';
  return 'gateway';
}

async function readJson(req: Request): Promise<GatewayRequest> {
  if (req.method === 'GET') return {};
  const text = await req.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as GatewayRequest;
  } catch {
    return {};
  }
}

async function handleCreateSession(req: Request, payload: GatewayRequest, requestId: string): Promise<Response> {
  const tenantId = payload.tenantId ?? req.headers.get('x-tenant-id');
  const userId = payload.userId ?? null;
  const channel = normalizeChannel(payload.channel ?? 'web');

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      tenant_id: tenantId,
      user_id: userId,
      channel,
      status: 'active',
    })
    .select('id, tenant_id, user_id, channel, status, session_token, created_at, updated_at')
    .single();

  if (error || !data) throw error ?? new Error('Unable to create chat session');

  const session = data as SessionRow;
  await recordAudit('chat_session_created', 'chat_session', session.id, session.tenant_id, session.user_id, {
    requestId,
    channel: session.channel,
  });

  return jsonResponse(200, {
    status: 'success',
    sessionId: session.id,
    sessionToken: session.session_token,
    data: {
      tenantId: session.tenant_id,
      channel: session.channel,
      status: session.status,
      createdAt: session.created_at,
    },
  });
}

async function handleGetSession(req: Request, payload: GatewayRequest, requestId: string): Promise<Response> {
  const url = new URL(req.url);
  const sessionId = payload.sessionId ?? url.searchParams.get('sessionId') ?? resolveSessionIdFromPath(url.pathname);
  const token = payload.sessionToken ?? req.headers.get('x-chat-session-token') ?? url.searchParams.get('token');

  if (!sessionId) {
    return jsonResponse(400, { status: 'error', message: 'sessionId is required', requiresHumanHandoff: false });
  }

  const { data: session, error } = await supabase
    .from('chat_sessions')
    .select('id, tenant_id, user_id, channel, status, session_token, created_at, updated_at')
    .eq('id', sessionId)
    .single();

  if (error || !session) {
    return jsonResponse(404, { status: 'error', message: 'Session not found', requiresHumanHandoff: false });
  }

  const typedSession = session as SessionRow;
  if (!authorizeSessionAccess(typedSession, token)) {
    return jsonResponse(403, { status: 'error', message: 'Session access denied', requiresHumanHandoff: false });
  }

  const { data: messages, error: messageError } = await supabase
    .from('chat_messages')
    .select('role, content, created_at')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true });

  if (messageError) throw messageError;

  await recordAudit('chat_session_read', 'chat_session', sessionId, typedSession.tenant_id, typedSession.user_id, { requestId });

  return jsonResponse(200, {
    status: 'success',
    sessionId,
    sessionToken: typedSession.session_token,
    data: {
      session: {
        id: typedSession.id,
        tenantId: typedSession.tenant_id,
        userId: typedSession.user_id,
        channel: typedSession.channel,
        status: typedSession.status,
        createdAt: typedSession.created_at,
        updatedAt: typedSession.updated_at,
      },
      messages: messages ?? [],
    },
  });
}

async function handleMessage(req: Request, payload: GatewayRequest, requestId: string): Promise<Response> {
  const message = safeTrim(payload.message);
  if (!message) {
    return jsonResponse(400, { status: 'error', message: 'message is required', requiresHumanHandoff: false });
  }

  let session = await resolveSessionForMessage(req, payload);
  if (!session) {
    session = await createFallbackSession(req, payload);
  }

  const ipKey = getClientIp(req);
  const ipLimit = await claimRateLimit('ip', ipKey, CHAT_LIMIT, WINDOW_SECONDS);
  if (!ipLimit.allowed) {
    await recordAudit('chat_rate_limited', 'chat_session', session.id, session.tenant_id, session.user_id, {
      requestId,
      scopeType: 'ip',
      scopeKey: ipKey,
      requestCount: ipLimit.request_count,
    });

    return jsonResponse(429, {
      status: 'error',
      message: 'Rate limit exceeded. Please try again later.',
      requiresHumanHandoff: false,
    });
  }

  if (session.tenant_id) {
    const tenantLimit = await claimRateLimit('tenant', session.tenant_id, CHAT_LIMIT, WINDOW_SECONDS);
    if (!tenantLimit.allowed) {
      return jsonResponse(429, {
        status: 'error',
        message: 'Tenant rate limit exceeded. Please try again later.',
        requiresHumanHandoff: false,
      });
    }
  }

  const moderation = moderateMessage(message);
  const redacted = redactContent(message);

  await recordAudit('chat_message_received', 'chat_session', session.id, session.tenant_id, session.user_id, {
    requestId,
    labels: moderation.labels,
    piiDetected: redacted.piiDetected,
    channel: session.channel,
  });

  await persistChatMessage(session.id, 'user', redacted.safeText, redacted.redactionNote);

  if (!moderation.allowed) {
    await recordModelRequest(session.id, 'none', 'policy-block', 0, 'failed', PROMPT_VERSION, moderation.reason ?? 'blocked');
    await recordAudit('chat_message_blocked', 'chat_session', session.id, session.tenant_id, session.user_id, {
      requestId,
      labels: moderation.labels,
      reason: moderation.reason,
    });

    return jsonResponse(200, {
      status: 'blocked',
      message: 'Your message was blocked by policy.',
      sessionId: session.id,
      sessionToken: session.session_token,
      requiresHumanHandoff: false,
      moderationResult: moderation,
      fallbackUsed: false,
      modelMetadata: {
        provider: 'none',
        model: 'policy-block',
        promptVersion: PROMPT_VERSION,
        latencyMs: 0,
        fallbackUsed: false,
      },
    });
  }

  const businessInfoAnswer = getDeterministicBusinessAnswer(redacted.safeText);
  if (businessInfoAnswer) {
    await persistChatMessage(session.id, 'assistant', businessInfoAnswer, null);
    await recordAudit('chat_response_returned', 'chat_session', session.id, session.tenant_id, session.user_id, {
      requestId,
      responseType: 'business_info',
      fallbackUsed: false,
      latencyMs: 0,
    });

    return jsonResponse(200, {
      status: 'success',
      message: businessInfoAnswer,
      sessionId: session.id,
      sessionToken: session.session_token,
      requiresHumanHandoff: false,
      fallbackUsed: false,
      moderationResult: moderation,
      modelMetadata: {
        provider: 'internal',
        model: 'business-info-router',
        promptVersion: PROMPT_VERSION,
        latencyMs: 0,
        fallbackUsed: false,
      },
    });
  }

  const history = await loadConversation(session.id);

  const messages = [
    { role: 'system', content: buildChatSystemPrompt() },
    { role: 'system', content: buildChatContextPrompt() },
    ...history,
    { role: 'user', content: redacted.safeText },
  ];

  await recordAudit('model_request_dispatched', 'chat_session', session.id, session.tenant_id, session.user_id, {
    requestId,
    historyCount: history.length,
    promptVersion: PROMPT_VERSION,
  });

  const result = await callModelWithFallback({
    sessionId: session.id,
    tenantId: session.tenant_id,
    userId: session.user_id,
    messages,
    model: payload.model ?? DEFAULT_MODEL,
    temperature: payload.temperature ?? 0.7,
    maxTokens: payload.maxTokens ?? 4096,
  });

  await persistChatMessage(session.id, 'assistant', result.text, null);
  await recordAudit('chat_response_returned', 'chat_session', session.id, session.tenant_id, session.user_id, {
    requestId,
    model: result.modelUsed,
    fallbackUsed: result.fallbackUsed,
    latencyMs: result.latencyMs,
  });

  return jsonResponse(200, {
    status: 'success',
    message: result.text,
    sessionId: session.id,
    sessionToken: session.session_token,
    requiresHumanHandoff: false,
    fallbackUsed: result.fallbackUsed,
    moderationResult: moderation,
    modelMetadata: {
      provider: 'openrouter',
      model: result.modelUsed,
      promptVersion: PROMPT_VERSION,
      latencyMs: result.latencyMs,
      fallbackUsed: result.fallbackUsed,
    },
  });
}

async function handleGateway(req: Request, payload: GatewayRequest, requestId: string): Promise<Response> {
  const operation = payload.operation ?? 'chat';
  const ipKey = getClientIp(req);
  const limit = operation === 'chat' ? CHAT_LIMIT : CONTENT_LIMIT;
  const rateLimit = await claimRateLimit('ip', ipKey, limit, WINDOW_SECONDS);

  if (!rateLimit.allowed) {
    return jsonResponse(429, {
      status: 'error',
      message: 'Rate limit exceeded. Please try again later.',
      requiresHumanHandoff: false,
    });
  }

  if (operation === 'chat') {
    const messages = Array.isArray(payload.messages) && payload.messages.length > 0
      ? payload.messages
      : [{ role: 'user', content: safeTrim(payload.message) }];

    const result = await callModelWithFallback({
      sessionId: null,
      tenantId: payload.tenantId ?? null,
      userId: payload.userId ?? null,
      messages,
      model: payload.model ?? DEFAULT_MODEL,
      temperature: payload.temperature ?? 0.7,
      maxTokens: payload.maxTokens ?? 4096,
    });

    return jsonResponse(200, {
      status: 'success',
      message: result.text,
      requiresHumanHandoff: false,
      fallbackUsed: result.fallbackUsed,
      modelMetadata: {
        provider: 'openrouter',
        model: result.modelUsed,
        promptVersion: PROMPT_VERSION,
        latencyMs: result.latencyMs,
        fallbackUsed: result.fallbackUsed,
      },
    });
  }

  if (operation === 'generateContent') {
    const prompt = safeTrim(payload.prompt);
    const context = safeTrim(payload.context);
    const messages = [
      { role: 'system', content: buildContentWriterPrompt() },
      { role: 'user', content: context ? `Context: ${context}\n\n${prompt}` : prompt },
    ];

    const result = await callModelWithFallback({
      sessionId: null,
      tenantId: payload.tenantId ?? null,
      userId: payload.userId ?? null,
      messages,
      model: payload.model ?? DEFAULT_MODEL,
      temperature: payload.temperature ?? 0.7,
      maxTokens: payload.maxTokens ?? 4096,
    });

    return jsonResponse(200, {
      status: 'success',
      data: { content: result.text },
      fallbackUsed: result.fallbackUsed,
      modelMetadata: {
        provider: 'openrouter',
        model: result.modelUsed,
        promptVersion: PROMPT_VERSION,
        latencyMs: result.latencyMs,
        fallbackUsed: result.fallbackUsed,
      },
    });
  }

  if (operation === 'analyzeSEO') {
    const content = (payload.pageContent ?? '').slice(0, 5000);
    const resultText = await runPrompt([
      { role: 'system', content: buildSeoAnalysisPrompt() },
      { role: 'user', content: `Analyze the following webpage content for SEO performance.\n\nContent:\n${content}` },
    ], payload.model ?? DEFAULT_MODEL, payload.temperature ?? 0.3, payload.maxTokens ?? 1024, null, payload.tenantId ?? null, payload.userId ?? null);

    return jsonResponse(200, {
      status: 'success',
      data: parseOrFallback(resultText, {
        score: 75,
        issues: ['Unable to parse analysis'],
        recommendations: ['Review content manually'],
      }),
    });
  }

  if (operation === 'detectTrends') {
    const topics = Array.isArray(payload.topics) ? payload.topics.filter((topic) => typeof topic === 'string') : [];
    const resultText = await runPrompt([
      { role: 'system', content: buildTrendAnalysisPrompt() },
      { role: 'user', content: `Analyze these topics and determine which are trending in digital marketing or tech: ${topics.join(', ')}` },
    ], payload.model ?? DEFAULT_MODEL, payload.temperature ?? 0.5, payload.maxTokens ?? 1024, null, payload.tenantId ?? null, payload.userId ?? null);

    return jsonResponse(200, {
      status: 'success',
      data: parseOrFallback(resultText, {
        trending: topics,
        relevanceScores: Object.fromEntries(topics.map((topic) => [topic, 0.7])),
        keywords: Object.fromEntries(topics.map((topic) => [topic, [topic.toLowerCase()]])),
      }),
    });
  }

  if (operation === 'generateBlogPost') {
    const topic = safeTrim(payload.topic) || 'Untitled topic';
    const keywords = Array.isArray(payload.keywords) ? payload.keywords.filter((keyword) => typeof keyword === 'string') : [];
    const resultText = await runPrompt([
      { role: 'system', content: buildBlogPostPrompt() },
      { role: 'user', content: `Generate a comprehensive blog post about "${topic}" for OutcomeLabs. Include these keywords naturally: ${keywords.join(', ')}` },
    ], payload.model ?? DEFAULT_MODEL, payload.temperature ?? 0.7, payload.maxTokens ?? 8192, null, payload.tenantId ?? null, payload.userId ?? null);

    return jsonResponse(200, {
      status: 'success',
      data: parseOrFallback(resultText, {
        title: topic,
        content: resultText,
        excerpt: topic,
        seoTitle: topic,
        seoDescription: topic,
        tags: keywords.slice(0, 5),
      }),
    });
  }

  if (operation === 'generateMultipleArticles') {
    const count = Math.max(1, Number(payload.count ?? 1));
    const topics = Array.isArray(payload.topics) && payload.topics.length > 0 ? payload.topics : ['General'];
    const articles: unknown[] = [];
    const perTopic = Math.ceil(count / topics.length);

    for (const topic of topics) {
      for (let index = 0; index < perTopic && articles.length < count; index++) {
        const item = await generateSingleArticle(topic, index, payload.model ?? DEFAULT_MODEL, payload.tenantId ?? null, payload.userId ?? null);
        articles.push(item);
      }
    }

    return jsonResponse(200, {
      status: 'success',
      data: articles,
    });
  }

  return jsonResponse(400, {
    status: 'error',
    message: `Unsupported operation: ${operation}`,
    requiresHumanHandoff: false,
  });
}

async function generateSingleArticle(
  topic: string,
  index: number,
  model: string,
  tenantId: string | null,
  userId: string | null,
): Promise<unknown> {
  const angle = index === 0 ? '' : ` (angle ${index + 1})`;
  const keywords = [topic.toLowerCase(), '2026', 'marketing', 'digital'];
  const resultText = await runPrompt([
    { role: 'system', content: buildBlogPostPrompt() },
    { role: 'user', content: `Generate a comprehensive blog post about "${topic}${angle}" for OutcomeLabs.` },
  ], model, 0.7, 8192, null, tenantId, userId);

  return parseOrFallback(resultText, {
    title: topic,
    content: resultText,
    excerpt: topic,
    seoTitle: topic,
    seoDescription: topic,
    tags: keywords,
    topic,
  });
}

async function callModelWithFallback(params: {
  sessionId: string | null;
  tenantId: string | null;
  userId: string | null;
  messages: ChatMessage[];
  model: string;
  temperature: number;
  maxTokens: number;
}): Promise<{
  text: string;
  modelUsed: string;
  fallbackUsed: boolean;
  latencyMs: number;
}> {
  const start = Date.now();
  try {
    const text = await callOpenRouter(params.messages, params.model, params.temperature, params.maxTokens);
    const latencyMs = Date.now() - start;
    await recordModelRequest(params.sessionId, 'openrouter', params.model, latencyMs, 'success', PROMPT_VERSION, null);
    return { text, modelUsed: params.model, fallbackUsed: false, latencyMs };
  } catch (primaryError) {
    const primaryFailure = primaryError instanceof Error ? primaryError.message : 'primary_request_failed';
    try {
      const text = await callOpenRouter(params.messages, FALLBACK_MODEL, params.temperature, params.maxTokens);
      const latencyMs = Date.now() - start;
      await recordModelRequest(params.sessionId, 'openrouter', FALLBACK_MODEL, latencyMs, 'success', PROMPT_VERSION, 'fallback_used');
      await recordAudit('model_request_fallback', 'chat_session', params.sessionId, params.tenantId, params.userId, {
        primaryModel: params.model,
        fallbackModel: FALLBACK_MODEL,
        primaryFailure,
      });
      return { text, modelUsed: FALLBACK_MODEL, fallbackUsed: true, latencyMs };
    } catch (fallbackError) {
      const fallbackFailure = fallbackError instanceof Error ? fallbackError.message : 'fallback_request_failed';
      const latencyMs = Date.now() - start;
      await recordModelRequest(params.sessionId, 'openrouter', FALLBACK_MODEL, latencyMs, 'failed', PROMPT_VERSION, fallbackFailure);
      throw new Error(`Primary model failed: ${primaryFailure}; fallback failed: ${fallbackFailure}`);
    }
  }
}

async function runPrompt(
  messages: ChatMessage[],
  model: string,
  temperature: number,
  maxTokens: number,
  sessionId: string | null,
  tenantId: string | null,
  userId: string | null,
): Promise<string> {
  const result = await callModelWithFallback({
    sessionId,
    tenantId,
    userId,
    messages,
    model,
    temperature,
    maxTokens,
  });

  return result.text;
}

async function callOpenRouter(
  messages: ChatMessage[],
  model: string,
  temperature: number,
  maxTokens: number,
): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': 'https://outcomelabs.online',
        'X-Title': 'OutcomeLabs',
      },
      body: JSON.stringify({ model, messages, temperature, max_tokens: maxTokens }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `OpenRouter error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } finally {
    clearTimeout(timeout);
  }
}

async function persistChatMessage(
  sessionId: string,
  role: 'user' | 'assistant' | 'system',
  content: string,
  redactedContent: string | null,
): Promise<void> {
  const { error } = await supabase.from('chat_messages').insert({
    session_id: sessionId,
    role,
    content,
    redacted_content: redactedContent,
  });

  if (error) throw error;
}

async function loadConversation(sessionId: string): Promise<ChatMessage[]> {
  const { data, error } = await supabase
    .from('chat_messages')
    .select('role, content')
    .eq('session_id', sessionId)
    .order('created_at', { ascending: true })
    .limit(HISTORY_LIMIT);

  if (error) throw error;
  return (data ?? []) as ChatMessage[];
}

async function resolveSessionForMessage(req: Request, payload: GatewayRequest): Promise<SessionRow | null> {
  const url = new URL(req.url);
  const sessionId = payload.sessionId ?? url.searchParams.get('sessionId');
  const token = payload.sessionToken ?? req.headers.get('x-chat-session-token') ?? url.searchParams.get('token');

  if (!sessionId) return null;

  const { data, error } = await supabase
    .from('chat_sessions')
    .select('id, tenant_id, user_id, channel, status, session_token, created_at, updated_at')
    .eq('id', sessionId)
    .single();

  if (error || !data) return null;

  const session = data as SessionRow;
  return authorizeSessionAccess(session, token) ? session : null;
}

async function createFallbackSession(req: Request, payload: GatewayRequest): Promise<SessionRow> {
  const tenantId = payload.tenantId ?? req.headers.get('x-tenant-id') ?? null;
  const userId = payload.userId ?? null;
  const channel = normalizeChannel(payload.channel ?? 'web');

  const { data, error } = await supabase
    .from('chat_sessions')
    .insert({
      tenant_id: tenantId,
      user_id: userId,
      channel,
      status: 'active',
    })
    .select('id, tenant_id, user_id, channel, status, session_token, created_at, updated_at')
    .single();

  if (error || !data) throw error ?? new Error('Unable to create chat session');

  const session = data as SessionRow;
  await recordAudit('chat_session_created', 'chat_session', session.id, session.tenant_id, session.user_id, {
    fallback: true,
    channel: session.channel,
  });

  return session;
}

async function recordModelRequest(
  sessionId: string | null,
  provider: string,
  model: string,
  latencyMs: number,
  status: 'success' | 'failed',
  promptVersion: string,
  errorCode: string | null,
): Promise<void> {
  const { error } = await supabase.from('model_requests').insert({
    session_id: sessionId,
    provider,
    model,
    latency_ms: latencyMs,
    status,
    prompt_version: promptVersion,
    error_code: errorCode,
  });

  if (error) throw error;
}

async function recordAudit(
  action: string,
  resourceType: string,
  resourceId: string | null,
  tenantId: string | null,
  userId: string | null,
  metadata: Record<string, unknown> = {},
): Promise<void> {
  const { error } = await supabase.from('audit_logs').insert({
    action,
    resource_type: resourceType,
    resource_id: resourceId,
    tenant_id: tenantId,
    user_id: userId,
    metadata,
  });

  if (error) throw error;
}

async function claimRateLimit(
  scopeType: 'ip' | 'session' | 'tenant' | 'user',
  scopeKey: string,
  limit: number,
  windowSeconds: number,
): Promise<{
  allowed: boolean;
  request_count: number;
  reset_at: string;
  blocked_until: string | null;
}> {
  const { data, error } = await supabase.rpc('claim_chat_rate_limit', {
    p_scope_type: scopeType,
    p_scope_key: scopeKey,
    p_limit: limit,
    p_window_seconds: windowSeconds,
  });

  if (error) throw error;

  const row = Array.isArray(data) ? data[0] : data;
  return {
    allowed: Boolean(row?.allowed),
    request_count: Number(row?.request_count ?? 0),
    reset_at: row?.reset_at ?? new Date().toISOString(),
    blocked_until: row?.blocked_until ?? null,
  };
}

function moderateMessage(content: string): { allowed: boolean; labels: string[]; reason?: string } {
  const lower = content.toLowerCase();
  for (const pattern of BLOCKED_PATTERNS) {
    if (lower.includes(pattern)) {
      return { allowed: false, labels: ['prompt-injection'], reason: 'blocked_pattern' };
    }
  }
  const labels = lower.includes('password') || lower.includes('secret') ? ['sensitive-credentials'] : ['allowed'];
  return { allowed: true, labels };
}

function getDeterministicBusinessAnswer(content: string): string | null {
  if (BUSINESS_INFO_PATTERNS.officeLocation.test(content)) {
    return `Outcome Labs does not currently list a public office street address in the approved site content. You can contact the team at ${CONTACT_EMAIL} or call ${CONTACT_PHONE}.`;
  }

  if (BUSINESS_INFO_PATTERNS.contact.test(content)) {
    return `You can reach Outcome Labs at ${CONTACT_EMAIL} or call ${CONTACT_PHONE}. A public office street address is not currently listed in the approved site content.`;
  }

  return null;
}

function redactContent(content: string): { safeText: string; piiDetected: boolean; redactionNote: string | null } {
  let safeText = content;
  const labels = new Set<string>();

  for (const item of SENSITIVE_PATTERNS) {
    item.pattern.lastIndex = 0;
    if (item.pattern.test(safeText)) {
      item.pattern.lastIndex = 0;
      safeText = safeText.replace(item.pattern, `[REDACTED_${item.label.toUpperCase()}]`);
      labels.add(item.label);
    }
  }

  return {
    safeText,
    piiDetected: labels.size > 0,
    redactionNote: labels.size > 0 ? `redacted:${Array.from(labels).join(',')}` : null,
  };
}

function authorizeSessionAccess(session: SessionRow, token: string | null): boolean {
  return Boolean(token && token === session.session_token);
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers.get('cf-connecting-ip') ?? req.headers.get('x-real-ip') ?? 'anonymous';
}

function normalizeChannel(channel: string): string {
  const normalized = channel.toLowerCase();
  return normalized === 'api' || normalized === 'whatsapp' || normalized === 'web' ? normalized : 'web';
}

function safeTrim(value?: string | null): string {
  return (value ?? '').trim();
}

function resolveSessionIdFromPath(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  const index = segments.findIndex((segment) => segment.toLowerCase() === 'session');
  return index >= 0 && segments[index + 1] ? segments[index + 1] : null;
}

function parseOrFallback<T>(input: string, fallback: T): T {
  try {
    return JSON.parse(input) as T;
  } catch {
    return fallback;
  }
}

function jsonResponse(status: number, payload: Record<string, unknown>): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
    },
  });
}
