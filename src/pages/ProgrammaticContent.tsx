import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { trendService, contentGenerationService, type Trend, type ContentJob, type BlogPost } from '@/lib/blog-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Zap, TrendingUp, FileText, CheckCircle, XCircle, Clock, RefreshCw, Plus } from 'lucide-react';

const ProgrammaticContent = () => {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [jobs, setJobs] = useState<ContentJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [articlesGenerated, setArticlesGenerated] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [trendsData, jobsData] = await Promise.all([
        trendService.getActiveTrends(20),
        contentGenerationService.getJobs(20)
      ]);
      setTrends(trendsData);
      setJobs(jobsData);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateArticles = async (count: number) => {
    setGenerating(true);
    try {
      const articles = await contentGenerationService.generateArticles(count);
      setArticlesGenerated(prev => prev + articles.length);
      await loadData();
    } catch (err) {
      console.error('Failed to generate articles:', err);
    } finally {
      setGenerating(false);
    }
  };

  const handleAddTrend = async () => {
    const topics = [
      'AI Marketing Automation',
      'Voice Search Optimization',
      'Zero-Click Searches',
      'Core Web Vitals 2026',
      'Programmatic SEO',
      'LLM Optimization',
      'Conversational AI',
      'Semantic Search',
      'Video SEO',
      'Mobile-First Indexing'
    ];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    try {
      await trendService.addTrend({
        topic: randomTopic,
        source: 'manual',
        relevance_score: Math.random() * 0.5 + 0.5,
        keywords: [randomTopic.toLowerCase().replace(/\s+/g, ''), '2026', 'marketing'],
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
      });
      await loadData();
    } catch (err) {
      console.error('Failed to add trend:', err);
    }
  };

  const completedJobs = jobs.filter(j => j.status === 'completed').length;
  const failedJobs = jobs.filter(j => j.status === 'failed').length;
  const pendingJobs = jobs.filter(j => j.status === 'pending' || j.status === 'processing').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Programmatic Content Engine</h1>
              <p className="text-muted-foreground">
                Generate 1000+ articles per day based on trending topics. Our SEO engineering at work.
              </p>
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
                      <CardDescription>Total Articles Generated</CardDescription>
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
                      <CardDescription>Completed Jobs</CardDescription>
                      <CardTitle className="text-3xl font-bold text-green-500">{completedJobs}</CardTitle>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardDescription>Pending Jobs</CardDescription>
                      <CardTitle className="text-3xl font-bold text-yellow-500">{pendingJobs}</CardTitle>
                    </CardHeader>
                  </Card>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-yellow-500" />
                        Generate Content
                      </CardTitle>
                      <CardDescription>
                        Programmatically generate and publish articles based on trends
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          onClick={() => handleGenerateArticles(1)} 
                          disabled={generating || trends.length === 0}
                          className="gap-2"
                        >
                          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                          Generate 1 Article
                        </Button>
                        <Button 
                          onClick={() => handleGenerateArticles(10)} 
                          disabled={generating || trends.length === 0}
                          variant="outline"
                          className="gap-2"
                        >
                          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                          Generate 10
                        </Button>
                        <Button 
                          onClick={() => handleGenerateArticles(100)} 
                          disabled={generating || trends.length === 0}
                          variant="outline"
                          className="gap-2"
                        >
                          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <TrendingUp className="h-4 w-4" />}
                          Generate 100
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Our system can generate up to 1000+ articles per day. Each article is:
                      </p>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> SEO optimized</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Based on real-time trends</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Automatically published</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> Schema markup included</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Trend Management
                      </CardTitle>
                      <CardDescription>
                        Add and manage trending topics for content generation
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button 
                        onClick={handleAddTrend}
                        variant="outline"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Add New Trend
                      </Button>
                      <div className="max-h-48 overflow-y-auto space-y-2">
                        {trends.map((trend) => (
                          <div key={trend.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <span className="text-sm font-medium">{trend.topic}</span>
                            <span className="text-xs text-muted-foreground">
                              {(trend.relevance_score || 0).toFixed(2)}
                            </span>
                          </div>
                        ))}
                        {trends.length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No trends added yet
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
                      Generation Jobs
                    </CardTitle>
                    <CardDescription>
                      Recent content generation jobs and their status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {jobs.map((job) => (
                        <div key={job.id} className="flex items-center justify-between p-3 bg-muted rounded">
                          <div>
                            <span className="text-sm font-medium">
                              {job.title || 'Untitled Job'}
                            </span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {new Date(job.created_at).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {job.status === 'completed' && (
                              <span className="flex items-center gap-1 text-green-500 text-sm">
                                <CheckCircle className="h-4 w-4" />
                                Completed ({job.articles_generated} articles)
                              </span>
                            )}
                            {job.status === 'failed' && (
                              <span className="flex items-center gap-1 text-red-500 text-sm">
                                <XCircle className="h-4 w-4" />
                                Failed
                              </span>
                            )}
                            {job.status === 'pending' && (
                              <span className="flex items-center gap-1 text-yellow-500 text-sm">
                                <Clock className="h-4 w-4" />
                                Pending
                              </span>
                            )}
                            {job.status === 'processing' && (
                              <span className="flex items-center gap-1 text-blue-500 text-sm">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Processing
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {jobs.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No jobs yet. Generate some content to see jobs here.
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
