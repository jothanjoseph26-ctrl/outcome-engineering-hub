import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { trendService, blogService, type Trend, type BlogPost } from '@/lib/blog-service';
import { openrouter, OPENROUTER_MODELS } from '@/lib/openrouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Zap, TrendingUp, FileText, CheckCircle, XCircle, Clock, Plus, Brain, Sparkles, Cpu } from 'lucide-react';

interface GenerationJob {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  articlesGenerated: number;
  createdAt: Date;
  error?: string;
}

const CONTENT_THEMES = [
  'AI Marketing Automation',
  'SEO Optimization Strategies',
  'Digital Transformation',
  'WhatsApp Business Solutions',
  'Server-Side Tracking',
  'Programmatic Advertising',
  'Content Marketing',
  'Data Analytics',
];

const ProgrammaticContent = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [currentJob, setCurrentJob] = useState<string | null>(null);
  const [articlesGenerated, setArticlesGenerated] = useState(0);
  const [customTopic, setCustomTopic] = useState('');
  const [aiStatus, setAiStatus] = useState<'idle' | 'connected' | 'error'>('idle');

  useEffect(() => {
    loadData();
    testAIConnection();
  }, []);

  const testAIConnection = async () => {
    try {
      setAiStatus('idle');
      await openrouter.chat([
        { role: 'user', content: 'Say "Connected" if you can hear me.' }
      ]);
      setAiStatus('connected');
    } catch (error) {
      setAiStatus('error');
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const trendsData = await trendService.getActiveTrends(20);
      setTrends(trendsData);
    } catch (err) {
      console.error('Failed to load trends:', err);
    } finally {
      setLoading(false);
    }
  };

  const createJob = (title: string): GenerationJob => ({
    id: `job-${Date.now()}`,
    title,
    status: 'processing',
    articlesGenerated: 0,
    createdAt: new Date(),
  });

  const updateJob = (jobId: string, updates: Partial<GenerationJob>) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, ...updates } : j));
  };

  const handleGenerateWithAI = async (count: number) => {
    setGenerating(true);
    
    const job = createJob(`AI Article Generation (${count} articles)`);
    setJobs(prev => [job, ...prev]);
    setCurrentJob(job.id);

    try {
      updateJob(job.id, { status: 'processing' });

      const articles = await openrouter.generateMultipleArticles(count, CONTENT_THEMES);
      
      let publishedCount = 0;
      for (const article of articles) {
        try {
          const slug = article.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 60);

          await blogService.createPost({
            title: article.title,
            slug,
            content: article.content,
            excerpt: article.excerpt,
            status: 'published',
            seo_title: article.seoTitle,
            seo_description: article.seoDescription,
            tags: article.tags,
            category: article.topic,
            published_at: new Date().toISOString(),
          });
          publishedCount++;
          setArticlesGenerated(prev => prev + 1);
          updateJob(job.id, { articlesGenerated: publishedCount });
        } catch (err) {
          console.error('Failed to publish article:', err);
        }
      }

      updateJob(job.id, { status: 'completed', articlesGenerated: publishedCount });
    } catch (error) {
      updateJob(job.id, { 
        status: 'failed', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
    } finally {
      setGenerating(false);
      setCurrentJob(null);
    }
  };

  const handleAddTrend = async () => {
    const topic = customTopic.trim() || CONTENT_THEMES[Math.floor(Math.random() * CONTENT_THEMES.length)];
    
    try {
      await trendService.addTrend({
        topic,
        source: 'ai-assisted',
        relevance_score: 0.8,
        keywords: [topic.toLowerCase().replace(/\s+/g, ''), '2026', 'marketing'],
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      setCustomTopic('');
      await loadData();
    } catch (err) {
      console.error('Failed to add trend:', err);
    }
  };

  const handleDetectTrends = async () => {
    setGenerating(true);
    const job = createJob('AI Trend Detection');
    setJobs(prev => [job, ...prev]);

    try {
      const result = await openrouter.detectTrends(CONTENT_THEMES);
      
      for (const topic of result.trending.slice(0, 5)) {
        try {
          await trendService.addTrend({
            topic,
            source: 'ai-detection',
            relevance_score: result.relevanceScores[topic] || 0.7,
            keywords: result.keywords[topic] || [topic.toLowerCase()],
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });
        } catch (err) {
          console.error('Failed to add trend:', err);
        }
      }

      updateJob(job.id, { status: 'completed', articlesGenerated: result.trending.length });
      await loadData();
    } catch (error) {
      updateJob(job.id, { status: 'failed', error: 'Trend detection failed' });
    } finally {
      setGenerating(false);
    }
  };

  const pendingJobs = jobs.filter(j => j.status === 'processing' || j.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
                <Brain className="h-8 w-8 text-purple-500" />
                AI Content Generation Engine
              </h1>
              <p className="text-muted-foreground">
                Powered by OpenRouter AI. Generate SEO-optimized content at scale with Claude, GPT-4, and more.
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${
                  aiStatus === 'connected' ? 'bg-green-500/20 text-green-500' :
                  aiStatus === 'error' ? 'bg-red-500/20 text-red-500' :
                  'bg-yellow-500/20 text-yellow-500'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    aiStatus === 'connected' ? 'bg-green-500' :
                    aiStatus === 'error' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`} />
                  AI: {aiStatus === 'connected' ? 'Connected' : aiStatus === 'error' ? 'Error' : 'Testing...'}
                </span>
                <span className="text-xs text-muted-foreground">
                  Model: {OPENROUTER_MODELS.CLAUDE_SONNET}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Articles Generated</CardDescription>
                      <CardTitle className="text-3xl font-bold">{articlesGenerated}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Active Trends</CardDescription>
                      <CardTitle className="text-3xl font-bold">{trends.length}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>AI Models</CardDescription>
                      <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Cpu className="h-5 w-5" /> 8+
                      </CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Jobs Running</CardDescription>
                      <CardTitle className="text-3xl font-bold text-blue-500">{pendingJobs}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card className="border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        AI-Powered Generation
                      </CardTitle>
                      <CardDescription>
                        Generate articles using Claude 3.5 Sonnet via OpenRouter
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          onClick={() => handleGenerateWithAI(1)} 
                          disabled={generating}
                          className="gap-2 bg-purple-600 hover:bg-purple-700"
                        >
                          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                          Generate 1 Article
                        </Button>
                        <Button 
                          onClick={() => handleGenerateWithAI(10)} 
                          disabled={generating}
                          variant="outline"
                          className="gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Generate 10
                        </Button>
                        <Button 
                          onClick={() => handleGenerateWithAI(50)} 
                          disabled={generating}
                          variant="outline"
                          className="gap-2"
                        >
                          <TrendingUp className="h-4 w-4" />
                          Generate 50
                        </Button>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold mb-2">AI Capabilities:</h4>
                        <ul className="text-sm space-y-1">
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> SEO-optimized content</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Keyword-rich articles</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Proper heading structure</li>
                          <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Meta descriptions included</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        AI Trend Detection
                      </CardTitle>
                      <CardDescription>
                        Let AI identify trending topics for your content
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Enter custom topic..."
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleAddTrend} variant="outline" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Add
                        </Button>
                      </div>
                      <Button 
                        onClick={handleDetectTrends}
                        disabled={generating}
                        variant="secondary"
                        className="w-full gap-2"
                      >
                        {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Brain className="h-4 w-4" />}
                        Detect Trending Topics with AI
                      </Button>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {trends.map((trend) => (
                          <div key={trend.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm font-medium">{trend.topic}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {(trend.relevance_score || 0).toFixed(2)}
                              </span>
                              {trend.source === 'ai-detection' && (
                                <span className="text-xs bg-purple-500/20 text-purple-500 px-1 rounded">AI</span>
                              )}
                            </div>
                          </div>
                        ))}
                        {trends.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No trends detected. Click "Detect Trending Topics" to start.
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Generation History
                    </CardTitle>
                    <CardDescription>
                      AI-powered content generation jobs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded">
                          <div>
                            <span className="text-sm font-medium">{job.title}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {job.createdAt.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {job.status === 'completed' && (
                              <span className="flex items-center gap-1 text-green-500 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                {job.articlesGenerated} articles
                              </span>
                            )}
                            {job.status === 'failed' && (
                              <span className="flex items-center gap-1 text-red-500 text-sm">
                                <XCircle className="h-4 w-4" />
                                Failed
                              </span>
                            )}
                            {job.status === 'processing' && (
                              <span className="flex items-center gap-1 text-blue-500 text-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing...
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {jobs.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No jobs yet. Start generating content to see history here.
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProgrammaticContent;
