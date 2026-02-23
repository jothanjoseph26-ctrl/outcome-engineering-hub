import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogService, type BlogPost } from '@/lib/blog-service';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getPublishedPosts(50);
        setPosts(data);
      } catch (err) {
        setError('Failed to load blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
              <p className="text-xl text-muted-foreground">
                Insights on SEO engineering, programmatic content, and digital transformation
              </p>
            </div>

            {error && (
              <div className="text-center text-red-500 mb-8">{error}</div>
            )}

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No blog posts yet. Check back soon for insights on SEO engineering and programmatic content.
                </p>
                <p className="text-sm text-muted-foreground">
                  We programmatically generate content based on trending topics. 
                  Our system can produce 1000+ articles per day.
                </p>
              </div>
            ) : (
              <div className="grid gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-card border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <Link to={`/blog/${post.slug}`} className="block group">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : 'Draft'}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author || 'OutcomeLabs'}
                        </span>
                        {post.category && (
                          <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs">
                            {post.category}
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      )}
                      <div className="flex items-center text-primary font-medium">
                        Read more <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-16 p-8 bg-muted rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Programmatic Content Generation</h3>
              <p className="text-muted-foreground mb-4">
                Our blog is powered by our proprietary programmatic content generation system. 
                We can programmatically generate and publish 1000+ articles per day based on trending topics.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Trend detection and analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  AI-powered content generation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Automatic SEO optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Scheduled publishing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
