export type EdgePillar = {
  slug: string;
  navLabel: string;
  title: string;
  strapline: string;
  thesis: string;
  description: string;
  capabilities: string[];
  whyItMatters: string[];
  engineeredUseCases: string[];
};

export const edgePillars: EdgePillar[] = [
  {
    slug: 'cloudflare-workers',
    navLabel: 'Cloudflare Workers',
    title: 'Cloudflare Workers',
    strapline: 'Rewrite Reality at the Edge',
    thesis:
      'Your competitors optimize inside CMS dashboards. We deploy logic at the network layer.',
    description:
      'We modify responses before they hit users or crawlers, which means we can change what Google sees without waiting on CMS cycles.',
    capabilities: [
      'Modify HTML before it reaches the browser',
      'Inject schema dynamically at response time',
      'Personalize metadata by location and intent',
      'Serve bot-optimized response variants',
      'Fix crawl issues without touching CMS core',
    ],
    whyItMatters: [
      'Google ranks what it can render and parse efficiently',
      'Edge rewrites turn SEO changes into deployable infrastructure',
    ],
    engineeredUseCases: [
      'Inject product schema into 10,000 pages in 24 hours',
      'A/B test title tags without dev deployment',
      'Run legacy URL redirects at scale without server strain',
      'Render SEO-optimized variants for bots',
    ],
  },
  {
    slug: 'edge-deployed-optimization',
    navLabel: 'Edge Optimization',
    title: 'Edge-Deployed Optimization',
    strapline: 'Speed as a Ranking Weapon',
    thesis:
      'Traditional SEO optimizes content. Edge SEO optimizes latency physics.',
    description:
      'Milliseconds impact ranking, bounce rate, and conversion. We optimize performance from edge nodes outward, with African network constraints as baseline.',
    capabilities: [
      'Edge caching rules per page type and intent',
      'Dynamic content prefetching',
      'Geo-based rendering and route decisions',
      'Intelligent bot routing',
      'Crawl-priority scripting',
    ],
    whyItMatters: [
      'Slow sites lose both crawlers and users on weak mobile networks',
      'Edge-first acceleration increases reliability across regions',
    ],
    engineeredUseCases: [
      'Sub-second experiences across African and global traffic',
      'Latency-aware routing for mobile-heavy markets',
      'Faster bot fetch cycles on high-value templates',
    ],
  },
  {
    slug: 'server-side-rendering',
    navLabel: 'SSR + Bot Rendering',
    title: 'Server-Side Rendering',
    strapline: 'Make JavaScript Crawlable',
    thesis:
      'Modern frontend stacks are great for users and often fragile for crawlers.',
    description:
      'We implement rendering architectures that ensure bots receive complete, indexable HTML even when apps are JavaScript-heavy.',
    capabilities: [
      'Dynamic rendering for bot traffic',
      'Prerendering pipelines',
      'Hybrid SSR/CSR architecture design',
      'Bot-detection rendering logic',
    ],
    whyItMatters: [
      'If content does not render cleanly, it effectively does not exist in search',
      'Crawl budget is preserved when render paths are deterministic',
    ],
    engineeredUseCases: [
      'Reduce indexation errors on React/SPA properties',
      'Improve Core Web Vitals and crawl depth simultaneously',
      'Shorten time-to-rank on new technical pages',
    ],
  },
  {
    slug: 'performance-crawlability-engineering',
    navLabel: 'Crawl Engineering',
    title: 'Performance & Crawlability Engineering',
    strapline: 'Fix the Invisible Leaks',
    thesis:
      'Most ranking losses are technical leakage, not content quality failures.',
    description:
      'We instrument crawl behavior and eliminate structural issues that quietly drain organic revenue.',
    capabilities: [
      'Custom crawl maps',
      'Log file analysis dashboards',
      'Crawl budget allocation models',
      'Render comparison testing',
    ],
    whyItMatters: [
      'Crawl traps and duplicate render paths silently waste indexation capacity',
      'Bot inefficiency compounds over large URL inventories',
    ],
    engineeredUseCases: [
      'Resolve parameter chaos and duplicate rendering',
      'Detect orphaned pages and infinite pagination loops',
      'Prioritize crawl effort on revenue pages first',
    ],
  },
  {
    slug: 'schema-injection',
    navLabel: 'Schema Injection',
    title: 'Schema Injection',
    strapline: 'Structured Data at Scale',
    thesis:
      'Rich results are engineered. They are not luck.',
    description:
      'We deploy structured data as a system: fast, scalable, and synchronized with live business data.',
    capabilities: [
      'JSON-LD injection at edge level',
      'FAQ schema automation',
      'Product structured data scaling',
      'Review markup synchronization',
      'Organization and entity reinforcement',
    ],
    whyItMatters: [
      'Search engines increasingly rank entities, not pages alone',
      'Schema clarifies meaning at machine speed across thousands of URLs',
    ],
    engineeredUseCases: [
      'Deploy consistent schema graph site-wide without manual edits',
      'Strengthen entity understanding for products and organizations',
      'Improve eligibility for rich result surfaces',
    ],
  },
  {
    slug: 'automated-structured-data-systems',
    navLabel: 'Structured Data Systems',
    title: 'Automated Structured Data Systems',
    strapline: 'Turn Databases into Rankings',
    thesis:
      'Most companies store ranking assets in their backend but never operationalize them for search.',
    description:
      'We build pipelines that convert records into structured markup and keep it updated automatically.',
    capabilities: [
      'Pull source data from backend systems',
      'Transform records into structured markup',
      'Inject dynamically at render/edge layers',
      'Auto-update on source-of-truth changes',
    ],
    whyItMatters: [
      'Manual schema publishing does not scale with catalog growth',
      'Automation keeps search output aligned with business reality',
    ],
    engineeredUseCases: [
      'Sync product, listing, category, and event entities continuously',
      'Eliminate plugin fatigue with data-driven pipelines',
      'Reduce SEO debt across large inventories',
    ],
  },
  {
    slug: 'cdn-optimization',
    navLabel: 'CDN Optimization',
    title: 'CDN Optimization',
    strapline: 'Infrastructure-Level Acceleration',
    thesis:
      'Africa-first optimization requires region-aware delivery engineering.',
    description:
      'We tune delivery infrastructure for latency variability, network reliability, and mobile-heavy traffic patterns.',
    capabilities: [
      'Asset delivery optimization',
      'Image compression pipelines',
      'Geo-based routing',
      'Cache invalidation logic',
      'Traffic load balancing',
    ],
    whyItMatters: [
      'SEO without performance is not durable',
      'Delivery consistency protects both ranking and conversion',
    ],
    engineeredUseCases: [
      'Stable delivery under peak regional traffic',
      'Improved media performance on constrained networks',
      'Reduced infrastructure drag on crawl/render timing',
    ],
  },
  {
    slug: 'sub-second-page-loads',
    navLabel: 'Sub-Second Loads',
    title: 'Sub-Second Page Loads',
    strapline: 'We Engineer Speed, Not Hope',
    thesis:
      'Infrastructure affects ranking, conversion, ad efficiency, and retention directly.',
    description:
      'We design and verify performance systems against concrete thresholds, then tie them to business outcomes.',
    capabilities: [
      '<1.2s LCP targeting for critical templates',
      'Minimal TTFB architecture',
      'Optimized render path engineering',
      'Mobile-first speed dominance',
    ],
    whyItMatters: [
      'Fast pages compound across organic, paid, and retention channels',
      'Performance proofs build enterprise trust faster than claims',
    ],
    engineeredUseCases: [
      'Move slow landing templates under performance threshold',
      'Reduce bounce caused by load delays on mobile data',
      'Improve blended media efficiency via better page speed',
    ],
  },
];

export const edgePillarsBySlug = Object.fromEntries(edgePillars.map((pillar) => [pillar.slug, pillar]));
