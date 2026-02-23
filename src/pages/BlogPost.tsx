import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService, type BlogPost } from '@/lib/blog-service';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Loader2, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      try {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);
        if (!data) {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load blog post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = post.seo_title || post.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.seo_description || post.excerpt || '');
      }
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-2xl font-semibold mb-4">{error || 'Post not found'}</h1>
              <Link to="/blog" className="text-primary hover:underline">
                ← Back to blog
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Link
              to="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>

            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              )}
            </header>

            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full h-auto rounded-lg mb-8"
              />
            )}

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {post.content ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.*?)\*/g, '<em>$1</em>')
                      .replace(/^- (.*$)/gm, '<li>$1</li>')
                      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
                      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(?!<[hulo])/gm, '<p>')
                      .replace(/(?<![>])$/gm, '</p>')
                  }}
                />
              ) : (
                <p className="text-muted-foreground">No content available.</p>
              )}
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                }}
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            <div className="mt-12 p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">Need help with SEO?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                OutcomeLabs specializes in SEO engineering and programmatic content generation. 
                Contact us to learn how we can help your business.
              </p>
              <Link
                to="/contact"
                className="text-primary font-medium hover:underline"
              >
                Get in touch →
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
