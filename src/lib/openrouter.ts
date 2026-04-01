const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
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
  CLAUDE_SONNET: 'anthropic/claude-3.5-sonnet',
  CLAUDE_HAIKU: 'anthropic/claude-3-haiku',
  GPT4_TURBO: 'openai/gpt-4-turbo',
  GPT35_TURBO: 'openai/gpt-3.5-turbo',
  GEMINI_PRO: 'google/gemini-pro-1.5',
  MIXTRAL: 'mistralai/mixtral-8x7b-instruct',
  LLAMA3_70B: 'meta-llama/llama-3-70b-instruct',
  PHI3_MEDIUM: 'microsoft/phi-3-medium-128k-instruct',
} as const;

export type ModelId = typeof OPENROUTER_MODELS[keyof typeof OPENROUTER_MODELS];

class OpenRouterService {
  private apiKey: string;
  private baseUrl: string;
  private requestCount = 0;
  private lastRequestTime = 0;
  private readonly requestsPerMinute = 60;

  constructor() {
    this.apiKey = OPENROUTER_API_KEY;
    this.baseUrl = OPENROUTER_API_URL;
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (this.requestCount >= this.requestsPerMinute) {
      const waitTime = Math.ceil((60000 - timeSinceLastRequest) / 1000);
      if (waitTime > 0) {
        console.log(`Rate limit reached. Waiting ${waitTime} seconds...`);
        await new Promise(resolve => setTimeout(resolve, waitTime * 1000));
      }
      this.requestCount = 0;
    }
  }

  async chat(
    messages: Message[],
    model: ModelId = OPENROUTER_MODELS.CLAUDE_SONNET,
    options: { temperature?: number; maxTokens?: number } = {}
  ): Promise<string> {
    await this.rateLimit();

    const request: ChatCompletionRequest = {
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 4096,
    };

    try {
      this.requestCount++;
      this.lastRequestTime = Date.now();

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': 'https://outcomelabs.online',
          'X-Title': 'OutcomeLabs',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || `API Error: ${response.status}`);
      }

      const data: ChatCompletionResponse = await response.json();
      return data.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('OpenRouter API Error:', error);
      throw error;
    }
  }

  async generateContent(prompt: string, context?: string): Promise<string> {
    const systemPrompt = `You are an expert content writer for OutcomeLabs, a company specializing in SEO engineering, programmatic content generation, and digital transformation. Generate high-quality, SEO-optimized content that is engaging and informative.`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (context) {
      messages.push({ role: 'user', content: `Context: ${context}\n\n${prompt}` });
    } else {
      messages.push({ role: 'user', content: prompt });
    }

    return this.chat(messages);
  }

  async analyzeSEO(pageContent: string): Promise<{
    score: number;
    issues: string[];
    recommendations: string[];
  }> {
    const prompt = `Analyze the following webpage content for SEO performance. Return a JSON object with:
    - score: number from 0-100
    - issues: array of SEO issues found
    - recommendations: array of improvement suggestions
    
    Content:\n${pageContent.slice(0, 5000)}`;

    const systemPrompt = `You are an SEO expert. Return ONLY valid JSON in this format:
    {"score": 85, "issues": ["issue1", "issue2"], "recommendations": ["rec1", "rec2"]}`;

    const result = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ], OPENROUTER_MODELS.CLAUDE_SONNET, { temperature: 0.3 });

    try {
      return JSON.parse(result);
    } catch {
      return { score: 75, issues: ['Unable to parse analysis'], recommendations: ['Review content manually'] };
    }
  }

  async detectTrends(topics: string[]): Promise<{
    trending: string[];
    relevanceScores: Record<string, number>;
    keywords: Record<string, string[]>;
  }> {
    const prompt = `Analyze these topics and determine which are trending in digital marketing/tech:
    ${topics.join(', ')}
    
    Return JSON with trending topics ranked by relevance, relevance scores (0-1), and suggested keywords for each.`;

    const systemPrompt = `You are a trend analyst. Return ONLY valid JSON:
    {"trending": ["topic1", "topic2"], "relevanceScores": {"topic1": 0.9}, "keywords": {"topic1": ["keyword1", "keyword2"]}}`;

    const result = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ], OPENROUTER_MODELS.CLAUDE_SONNET, { temperature: 0.5 });

    try {
      return JSON.parse(result);
    } catch {
      return { 
        trending: topics, 
        relevanceScores: Object.fromEntries(topics.map(t => [t, 0.7])), 
        keywords: Object.fromEntries(topics.map(t => [t, [t.toLowerCase()]])) 
      };
    }
  }

  async generateBlogPost(topic: string, keywords: string[]): Promise<{
    title: string;
    content: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
  }> {
    const prompt = `Generate a comprehensive blog post about "${topic}" for OutcomeLabs.
    
    Requirements:
    - Include these keywords naturally: ${keywords.join(', ')}
    - Minimum 1500 words
    - Include proper headings (H2, H3)
    - Include bullet points and numbered lists
    - SEO optimized with keyword density ~2%
    - Include meta description (max 160 chars)
    - Include 3-5 relevant tags
    
    Return JSON with: title, content, excerpt, seoTitle, seoDescription, tags`;

    const systemPrompt = `You are an expert SEO content writer. Return ONLY valid JSON matching this schema:
    {"title": "...", "content": "...", "excerpt": "...", "seoTitle": "...", "seoDescription": "...", "tags": ["tag1", "tag2"]}`;

    const result = await this.chat([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt },
    ], OPENROUTER_MODELS.CLAUDE_SONNET, { temperature: 0.7, maxTokens: 8192 });

    try {
      return JSON.parse(result);
    } catch (error) {
      console.error('Failed to parse blog post:', error);
      throw new Error('Failed to generate blog post');
    }
  }

  async generateMultipleArticles(count: number, themes: string[]): Promise<Array<{
    title: string;
    content: string;
    excerpt: string;
    seoTitle: string;
    seoDescription: string;
    tags: string[];
    topic: string;
  }>> {
    const articles = [];
    const articlesPerTheme = Math.ceil(count / themes.length);

    for (const theme of themes) {
      for (let i = 0; i < articlesPerTheme && articles.length < count; i++) {
        const angle = i === 0 ? '' : ` (角度 ${i + 1}: 不同的视角或方面)`;
        try {
          const article = await this.generateBlogPost(
            `${theme}${angle}`,
            [theme.toLowerCase(), '2026', 'marketing', 'digital']
          );
          articles.push({ ...article, topic: theme });
        } catch (error) {
          console.error(`Failed to generate article for ${theme}:`, error);
        }
      }
    }

    return articles;
  }

  async chatWithUser(userMessage: string, conversationHistory?: Message[]): Promise<string> {
    const systemPrompt = `You are an AI assistant for OutcomeLabs, a digital marketing and SEO engineering company. 
    Help users with questions about:
    - SEO optimization and engineering
    - Programmatic content generation
    - Server-side tracking
    - WhatsApp business solutions
    - Digital transformation strategies
    
    Be helpful, concise, and professional.`;

    const messages: Message[] = [
      { role: 'system', content: systemPrompt },
      ...(conversationHistory || []),
      { role: 'user', content: userMessage },
    ];

    return this.chat(messages);
  }

  getUsageStats() {
    return {
      requestsThisMinute: this.requestCount,
      lastRequestTime: new Date(this.lastRequestTime).toISOString(),
    };
  }
}

export const openrouter = new OpenRouterService();
export default openrouter;
