const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';
const CHAT_GATEWAY_URL = SUPABASE_URL ? `${SUPABASE_URL.replace(/\/$/, '')}/functions/v1/chat` : '';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatModerationResult {
  allowed: boolean;
  labels: string[];
  reason?: string;
}

export interface ChatModelMetadata {
  provider: string;
  model: string;
  promptVersion?: string;
  latencyMs?: number;
  fallbackUsed?: boolean;
}

export interface ChatSendResult {
  message: string;
  status: 'success' | 'blocked' | 'error';
  sessionId: string | null;
  sessionToken: string | null;
  requiresHumanHandoff: boolean;
  fallbackUsed: boolean;
  moderationResult?: ChatModerationResult;
  modelMetadata?: ChatModelMetadata;
}

export interface Model {
  id: string;
  name: string;
  description: string;
  pricing: {
    prompt: number;
    completion: number;
  };
}

export const OPENROUTER_MODELS = {
  GEMINI_FLASH: 'google/gemini-2.0-flash-exp',
  DEEPSEEK_V3: 'deepseek/deepseek-chat-v3-0324',
  LLAMA_3_1_8B: 'meta-llama/llama-3.1-8b-instruct',
  MISTRAL_NEMO: 'mistralai/mistral-nemo',
  CLAUDE_HAIKU: 'anthropic/claude-3.5-haiku',
  CLAUDE_SONNET: 'anthropic/claude-3.5-sonnet',
  GPT4_TURBO: 'openai/gpt-4-turbo',
  GPT35_TURBO: 'openai/gpt-3.5-turbo',
  GEMINI_PRO: 'google/gemini-pro-1.5',
  MIXTRAL: 'mistralai/mixtral-8x7b-instruct',
  LLAMA3_70B: 'meta-llama/llama-3-70b-instruct',
  PHI3_MEDIUM: 'microsoft/phi-3-medium-128k-instruct',
} as const;

export const FREE_MODELS = [
  OPENROUTER_MODELS.GEMINI_FLASH,
  OPENROUTER_MODELS.DEEPSEEK_V3,
  OPENROUTER_MODELS.LLAMA_3_1_8B,
  OPENROUTER_MODELS.MISTRAL_NEMO,
  OPENROUTER_MODELS.CLAUDE_HAIKU,
] as const;

export const DEFAULT_MODEL = OPENROUTER_MODELS.GEMINI_FLASH;

export type ModelId = typeof OPENROUTER_MODELS[keyof typeof OPENROUTER_MODELS];

interface GatewayResponse<T = unknown> {
  status: 'success' | 'blocked' | 'error';
  message?: string;
  data?: T;
  sessionId?: string | null;
  sessionToken?: string | null;
  requiresHumanHandoff?: boolean;
  fallbackUsed?: boolean;
}

class OpenRouterService {
  private requestCount = 0;
  private lastRequestTime = 0;
  private chatSessionId: string | null = null;
  private chatSessionToken: string | null = null;

  private async invokeGateway<T>(
    payload: Record<string, unknown>,
    path = '',
    method: 'POST' | 'GET' = 'POST',
  ): Promise<GatewayResponse<T>> {
    if (!CHAT_GATEWAY_URL) {
      throw new Error('Chat gateway URL is not configured');
    }

    const response = await fetch(`${CHAT_GATEWAY_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
        ...(this.chatSessionToken ? { 'x-chat-session-token': this.chatSessionToken } : {}),
      },
      body: method === 'GET' ? undefined : JSON.stringify(payload),
    });

    this.requestCount += 1;
    this.lastRequestTime = Date.now();

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.error || data.message || `Gateway error: ${response.status}`);
    }

    return data as GatewayResponse<T>;
  }

  private async ensureChatSession(): Promise<void> {
    if (this.chatSessionId && this.chatSessionToken) {
      return;
    }

    try {
      const response = await this.invokeGateway<{ tenantId: string | null; channel: string }>({
        operation: 'createSession',
        channel: 'web',
      }, '/session');

      this.chatSessionId = response.sessionId ?? null;
      this.chatSessionToken = response.sessionToken ?? null;
    } catch (error) {
      console.warn('Unable to create persistent chat session:', error);
    }
  }

  private mapResponse(response: GatewayResponse<unknown>): ChatSendResult {
    const message = typeof response.message === 'string' ? response.message : this.unwrapText(response);

    return {
      message,
      status: response.status,
      sessionId: response.sessionId ?? this.chatSessionId,
      sessionToken: response.sessionToken ?? this.chatSessionToken,
      requiresHumanHandoff: Boolean(response.requiresHumanHandoff),
      fallbackUsed: Boolean(response.fallbackUsed),
      moderationResult: response.moderationResult as ChatModerationResult | undefined,
      modelMetadata: response.modelMetadata as ChatModelMetadata | undefined,
    };
  }

  private unwrapText<T>(response: GatewayResponse<T>): string {
    if (typeof response.message === 'string' && response.message.trim()) {
      return response.message;
    }

    const data = response.data as { content?: string } | undefined;
    return data?.content || '';
  }

  async chat(
    messages: Message[],
    model: ModelId = DEFAULT_MODEL,
    options: { temperature?: number; maxTokens?: number } = {},
  ): Promise<string> {
    const response = await this.invokeGateway<{ content: string }>({
      operation: 'chat',
      messages,
      model,
      temperature: options.temperature ?? 0.7,
      maxTokens: options.maxTokens ?? 4096,
    });

    if (response.status === 'blocked') {
      return response.message || 'Your message was blocked by policy.';
    }

    return this.unwrapText(response);
  }

  async sendChatMessage(
    userMessage: string,
    conversationHistory: Message[] = [],
  ): Promise<ChatSendResult> {
    await this.ensureChatSession();

    if (this.chatSessionId && this.chatSessionToken) {
      try {
        const response = await this.invokeGateway<unknown>({
          operation: 'message',
          sessionId: this.chatSessionId,
          sessionToken: this.chatSessionToken,
          message: userMessage,
          channel: 'web',
        }, '/message');

        if (response.sessionId) {
          this.chatSessionId = response.sessionId;
        }
        if (response.sessionToken) {
          this.chatSessionToken = response.sessionToken;
        }

        return this.mapResponse(response);
      } catch (error) {
        console.warn('Persistent chat session failed, using stateless fallback:', error);
      }
    }

    const response = await this.invokeGateway<unknown>({
      operation: 'chat',
      messages: conversationHistory,
      model: DEFAULT_MODEL,
      temperature: 0.7,
      maxTokens: 4096,
    });

    return this.mapResponse(response);
  }

  async generateContent(prompt: string, context?: string): Promise<string> {
    const response = await this.invokeGateway<{ content: string }>({
      operation: 'generateContent',
      prompt,
      context,
      model: DEFAULT_MODEL,
      temperature: 0.7,
      maxTokens: 4096,
    });

    return this.unwrapText(response);
  }

  async analyzeSEO(pageContent: string): Promise<{
    score: number;
    issues: string[];
    recommendations: string[];
  }> {
    const response = await this.invokeGateway<{
      score: number;
      issues: string[];
      recommendations: string[];
    }>({
      operation: 'analyzeSEO',
      pageContent,
      model: DEFAULT_MODEL,
      temperature: 0.3,
      maxTokens: 1024,
    });

    return (response.data as { score: number; issues: string[]; recommendations: string[] }) || {
      score: 75,
      issues: ['Unable to parse analysis'],
      recommendations: ['Review content manually'],
    };
  }

  async detectTrends(topics: string[]): Promise<{
    trending: string[];
    relevanceScores: Record<string, number>;
    keywords: Record<string, string[]>;
  }> {
    const response = await this.invokeGateway<{
      trending: string[];
      relevanceScores: Record<string, number>;
      keywords: Record<string, string[]>;
    }>({
      operation: 'detectTrends',
      topics,
      model: DEFAULT_MODEL,
      temperature: 0.5,
      maxTokens: 1024,
    });

    return (response.data as {
      trending: string[];
      relevanceScores: Record<string, number>;
      keywords: Record<string, string[]>;
    }) || {
      trending: topics,
      relevanceScores: Object.fromEntries(topics.map((topic) => [topic, 0.7])),
      keywords: Object.fromEntries(topics.map((topic) => [topic, [topic.toLowerCase()]])),
    };
  }

  async generateBlogPost(topic: string, keywords: string[]): Promise<{
    title: string;
    content: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
  }> {
    const response = await this.invokeGateway<{
      title: string;
      content: string;
      excerpt: string;
      seoTitle: string;
      seoDescription: string;
      tags: string[];
    }>({
      operation: 'generateBlogPost',
      topic,
      keywords,
      model: DEFAULT_MODEL,
      temperature: 0.7,
      maxTokens: 8192,
    });

    return (response.data as {
      title: string;
      content: string;
      excerpt: string;
      seoTitle: string;
      seoDescription: string;
      tags: string[];
    }) || {
      title: topic,
      content: '',
      excerpt: topic,
      seoTitle: topic,
      seoDescription: topic,
      tags: keywords,
    };
  }

  async generateMultipleArticles(
    count: number,
    themes: string[],
  ): Promise<Array<{
    title: string;
    content: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
    topic: string;
  }>> {
    const response = await this.invokeGateway<Array<{
      title: string;
      content: string;
      excerpt: string;
      seoTitle: string;
      seoDescription: string;
      tags: string[];
      topic: string;
    }>>({
      operation: 'generateMultipleArticles',
      count,
      topics: themes,
      model: DEFAULT_MODEL,
    });

    return (response.data as Array<{
      title: string;
      content: string;
      excerpt: string;
      seoTitle: string;
      seoDescription: string;
      tags: string[];
      topic: string;
    }>) || [];
  }

  async chatWithUser(userMessage: string, conversationHistory?: Message[]): Promise<string> {
    const response = await this.sendChatMessage(userMessage, conversationHistory);
    return response.message || 'Sorry, I could not generate a response.';
  }

  getUsageStats() {
    return {
      requestsThisMinute: this.requestCount,
      lastRequestTime: this.lastRequestTime ? new Date(this.lastRequestTime).toISOString() : null,
      chatSessionId: this.chatSessionId,
      chatSessionToken: this.chatSessionToken ? 'set' : null,
    };
  }
}

export const openrouter = new OpenRouterService();
export default openrouter;
