import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

const posts: Record<
  string,
  {
    category: string;
    title: string;
    date: string;
    description: string;
    body: string;
    relatedLinks: { href: string; label: string }[];
  }
> = {
  'why-your-spa-is-invisible-to-google': {
    category: 'SEO Engineering',
    title: 'Why Your SPA Is Invisible to Google (And How to Fix It)',
    date: '2026-04-20',
    description:
      'Single-page applications serve JavaScript to crawlers. Here is what Google actually sees, why it matters, and the architectural fix using Next.js App Router.',
    body: `When Googlebot hits a single-page application, it receives a shell of HTML containing a root div and a JavaScript bundle. The actual content — your headlines, your copy, your internal links — does not exist in the initial response. It exists only after JavaScript executes.

This is the core problem: Google can render JavaScript, but it does so as a second wave. Pages get indexed with lower confidence, lower depth, and lower authority. Your service pages may never be indexed at all.

The fix is architectural. Move to a framework that ships complete HTML on the first server response. Next.js App Router with Server Components does exactly this. Your page component renders on the server, produces real HTML, and that HTML is what Googlebot receives — complete, parseable, and indexable.

The implementation pattern is straightforward: separate your UI into Server Components (content, structure, links) and Client Components (interactivity, animations, forms). The server layer ships first. The client layer hydrates on top.

This is not just an SEO win. It also improves LCP — the largest contentful paint — because real content reaches the browser faster than a JS bundle that then renders content.

If your current site is a Vite or Create React App SPA, you need to migrate. The SEO debt compounds every day you wait.`,
    relatedLinks: [
      { href: '/solutions/seo-engineering', label: 'Our SEO Engineering System' },
      { href: '/scanner', label: 'Free SEO Audit' },
    ],
  },
  'server-side-tracking-complete-guide': {
    category: 'Server-Side Tracking',
    title: 'Server-Side Tracking: The Complete Engineering Guide',
    date: '2026-04-10',
    description:
      'iOS changes killed browser-side tracking signal. Server-side tracking restores it — here is the full implementation blueprint for first-party data infrastructure.',
    body: `iOS 14 changed everything. When Apple introduced App Tracking Transparency, it did not just limit ad targeting — it broke the measurement layer that every business depends on. Browser cookies, pixels, and client-side tracking all degraded. ROAS became unreliable. Attribution windows shrank.

The solution is not to wait for the industry to fix this. The solution is server-side tracking.

Server-side tracking moves the measurement layer from the browser to your own server. Instead of firing a Facebook pixel from the user's browser — which gets blocked by iOS, ad blockers, and browser privacy settings — you fire conversion events from your server directly to the ad platform's API.

This means: complete conversion signal. No iOS blocking. No ad blocker interference. No cookie expiry issues. First-party data that you own and control.

The implementation involves: setting up a server-side tag manager container, instrumenting your backend to capture conversion events, mapping events to each platform's Conversions API format, and deduplicating server-side events against any browser-side events that do get through.

The payoff is measurable: advertisers who implement server-side tracking typically see 20–40% more reported conversions, better audience building, and lower effective CPAs because the algorithm gets cleaner signal to optimise against.`,
    relatedLinks: [
      { href: '/services', label: 'Our Services' },
      { href: '/case-studies', label: 'See Case Studies' },
    ],
  },
  'programmatic-seo-keyword-architecture': {
    category: 'SEO Engineering',
    title: 'Programmatic SEO: How to Build a Keyword Architecture That Scales',
    date: '2026-03-28',
    description:
      'Manual content does not scale. Programmatic SEO does. Here is how to design a keyword-to-page architecture that targets thousands of queries simultaneously.',
    body: `Most SEO strategies target maybe 50–200 keywords. A programmatic SEO system targets thousands. The difference is architecture.

Programmatic SEO starts with identifying a keyword pattern — a consistent structure where one variable changes across many queries. "Best CRM for [industry]", "How to [action] in [tool]", "[city] marketing agency" — these are patterns that can be scaled programmatically by generating a unique page for each variable combination.

The architecture has three layers. First, the keyword research layer: extract the pattern, enumerate the variables (industries, cities, tools, use cases), and validate search volume. Second, the page template layer: design a page structure that is unique and valuable for each combination, not just thin duplicate content with a word swapped. Third, the content layer: either write unique content for high-volume targets, or use structured data to populate templates for the long tail.

The key constraint is quality. Google penalises thin, low-value programmatic pages. Every page in your system needs to be genuinely useful for the specific query it targets. This means each template must contain real information, real structure, and real answers — not just the keyword inserted into boilerplate.

When done correctly, a programmatic SEO system can rank for 3,000–10,000 keywords with a team of two engineers and a content lead. That is the compounding advantage.`,
    relatedLinks: [
      { href: '/solutions/seo-engineering', label: 'Our SEO Engineering System' },
      { href: '/services/revenue-growth', label: 'SEO Engineering Service' },
    ],
  },
  'whatsapp-lead-qualification-system': {
    category: 'WhatsApp Automation',
    title: 'How to Build a WhatsApp Lead Qualification System',
    date: '2026-03-15',
    description:
      'Email intake is slow and lossy. A WhatsApp qualification flow qualifies leads in 4 minutes. Here is the technical blueprint for replacing your intake form.',
    body: `The average email response time for B2B sales is 26 hours. The average lead decay time — the point at which a prospect's intent has cooled — is under 5 minutes. These two numbers explain why most lead intake forms destroy value.

WhatsApp changes this equation. With a properly built qualification flow, you can respond to a form submission in under 30 seconds, complete qualification in under 4 minutes, and route qualified leads directly to a calendar booking — all automatically.

The technical implementation works like this: the prospect submits your intake form, which triggers a webhook. The webhook fires a WhatsApp message via the WhatsApp Business API. The message opens a structured conversation — budget, timeline, fit criteria. Based on the responses, the system routes qualified leads to your calendar tool and flags disqualified leads for nurture.

The qualification questions are critical. You need to identify: budget (do they have the resources to buy?), timeline (are they ready to move?), and fit (is their problem one you solve?). Three questions, branching logic, automated follow-up if they go quiet.

The payoff in our data: lead-to-meeting rates go from an industry average of 15–20% to 60–70%. Response time drops from hours to minutes. Sales teams stop chasing cold leads and start talking to qualified, warm prospects.`,
    relatedLinks: [
      { href: '/solutions/whatsapp-sales-system', label: 'Our WhatsApp Sales System' },
      { href: '/case-studies/whatsapp-lead-qualification', label: 'See the Case Study' },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} | Outcome Labs`,
    description: post.description,
    alternates: { canonical: `https://outcomelabs.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-lg">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/blog" className="text-gold hover:underline inline-block">
              ← Blog
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
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

          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          <p className="text-lg text-muted-foreground mb-12 border-l-2 border-gold pl-4">
            {post.description}
          </p>

          <div className="prose prose-invert max-w-none">
            {post.body.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border/50">
            <h2 className="text-lg font-bold mb-4">Related</h2>
            <div className="space-y-2">
              {post.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gold hover:underline"
                >
                  {link.label} →
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-12 glass-card p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-3">Ready to build your revenue system?</h2>
            <p className="text-muted-foreground mb-6">
              Start with a free audit of your current infrastructure.
            </p>
            <Link
              href="/scanner"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-gold text-black font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Your Free Audit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
