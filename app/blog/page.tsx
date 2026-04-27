import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revenue Engineering Blog | Outcome Labs',
  description:
    'Technical guides on SEO engineering, conversion systems, programmatic advertising, and WhatsApp automation. No fluff — only systems thinking.',
  alternates: { canonical: 'https://outcomelabs.com/blog' },
};

const posts = [
  {
    slug: 'why-your-spa-is-invisible-to-google',
    category: 'SEO Engineering',
    title: 'Why Your SPA Is Invisible to Google (And How to Fix It)',
    excerpt:
      'Single-page applications serve JavaScript to crawlers. Here is what Google actually sees, why it matters, and the architectural fix.',
    date: '2026-04-20',
  },
  {
    slug: 'server-side-tracking-complete-guide',
    category: 'Server-Side Tracking',
    title: 'Server-Side Tracking: The Complete Engineering Guide',
    excerpt:
      'iOS changes killed browser-side tracking signal. Server-side tracking restores it — here is the full implementation blueprint.',
    date: '2026-04-10',
  },
  {
    slug: 'programmatic-seo-keyword-architecture',
    category: 'SEO Engineering',
    title: 'Programmatic SEO: How to Build a Keyword Architecture That Scales',
    excerpt:
      'Manual content does not scale. Programmatic SEO does. Here is how to design a keyword → page architecture for thousands of URLs.',
    date: '2026-03-28',
  },
  {
    slug: 'whatsapp-lead-qualification-system',
    category: 'WhatsApp Automation',
    title: 'How to Build a WhatsApp Lead Qualification System',
    excerpt:
      'Email intake is slow and lossy. A WhatsApp qualification flow qualifies leads in 4 minutes. Here is the technical blueprint.',
    date: '2026-03-15',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-gold">
            Revenue Engineering Blog
          </h1>
          <p className="text-xl text-muted-foreground mb-16">
            Technical guides on building revenue systems. No marketing fluff — only engineering
            and systems thinking.
          </p>

          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block glass-card p-8 rounded-xl border border-border/50 hover:border-gold/30 transition-colors group"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <span className="text-gold font-medium group-hover:underline">Read article →</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
