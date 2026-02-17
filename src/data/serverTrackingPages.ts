export type ServerTrackingPage = {
  slug: string;
  navLabel: string;
  title: string;
  strapline: string;
  thesis: string;
  story: string;
  architecture: string[];
  outcomes: string[];
  implementation: string[];
};

export const serverTrackingPages: ServerTrackingPage[] = [
  {
    slug: 'server-gtm',
    navLabel: 'Server GTM',
    title: 'Server GTM',
    strapline: 'Bypass Ad Blockers. Recover Signal.',
    thesis:
      'Browser-only tracking leaks revenue intelligence. Server-side Google Tag Manager moves measurement logic into your controlled environment.',
    story:
      'Google documents that server-side tagging improves performance, security, and data quality by shifting instrumentation off the client. We use that architecture to recover measurable signal loss and control outbound data flows.',
    architecture: [
      'Web container sends events to first-party endpoint',
      'Server container processes, transforms, and routes events',
      'Custom domain mapping for durable first-party context',
      'Consent-aware forwarding to Ads/Analytics destinations',
    ],
    outcomes: [
      'Recover high-value events blocked in browser-only setups',
      'Reduce page-side script load and improve runtime performance',
      'Centralized governance over what leaves your stack',
    ],
    implementation: [
      'Provision GTM server container on Cloud Run or equivalent',
      'Map first-party subdomain and routing rules',
      'Implement event transformations and PII controls',
      'Validate parity and then migrate destination tags gradually',
    ],
  },
  {
    slug: 'first-party-pipelines',
    navLabel: 'First-Party Pipelines',
    title: 'First-Party Pipelines',
    strapline: 'Your Data. Your Control.',
    thesis:
      'Most companies send raw data directly to vendors. We route all measurement through a first-party pipeline you govern.',
    story:
      'Google tag gateway and server-side tagging both support first-party measurement paths. We combine these patterns into a controlled data plane where you can redact, enrich, and route events before any third-party destination receives them.',
    architecture: [
      'Client event collection through first-party domain',
      'Server-side enrichment with CRM/order context',
      'Policy layer for redaction, hashing, and consent logic',
      'Destination routing by channel and attribution model',
    ],
    outcomes: [
      'Better data durability in a privacy-constrained ecosystem',
      'Lower dependency on brittle client-side collection',
      'Auditability for compliance and enterprise governance',
    ],
    implementation: [
      'Design event schema and identity key strategy',
      'Build ingestion endpoint and processing queues',
      'Apply transformations and consent gates',
      'Expose monitored streams to analytics and media platforms',
    ],
  },
  {
    slug: 'conversions-api',
    navLabel: 'Conversions API',
    title: 'Conversions API',
    strapline: 'Facebook and Google CAPI, Engineered Correctly',
    thesis:
      'API conversions are not a checkbox. Without deduplication and identity discipline, data quality degrades fast.',
    story:
      'Meta explicitly recommends redundant Pixel + Conversions API with deduplication using event_id/event_name. Google Ads recommends enhanced conversion workflows using first-party identifiers. We implement both as a unified conversion transport layer.',
    architecture: [
      'Server-side event ingestion with canonical event IDs',
      'Dual-channel strategy: browser + server where needed',
      'Meta deduplication (event_id + event_name)',
      'Google enhanced conversion payload normalization and hashing',
    ],
    outcomes: [
      'Higher match quality for paid optimization systems',
      'Reduced conversion undercount from browser restrictions',
      'More stable bidding and audience model feedback loops',
    ],
    implementation: [
      'Map business conversion events to platform taxonomy',
      'Set deterministic event IDs and dedup logic',
      'Configure payload hygiene (hashing, format validation)',
      'Monitor diagnostics and match quality continuously',
    ],
  },
  {
    slug: 'multi-touch-attribution',
    navLabel: 'Multi-Touch Attribution',
    title: 'Multi-Touch Attribution',
    strapline: 'Cookie-Less Attribution That Still Explains Revenue',
    thesis:
      'Last-click reports under-value acquisition systems. We build multi-touch models from first-party event streams.',
    story:
      'As browser identifiers degrade, attribution must rely on first-party event design, clean identity stitching, and modeled contribution. We engineer that stack so spend allocation reflects true incremental impact.',
    architecture: [
      'Unified event stream from web, CRM, and ad platforms',
      'Identity stitching with first-party IDs and consent states',
      'Attribution model layer (position-based or data-driven)',
      'Decision layer for budget and bid reallocation',
    ],
    outcomes: [
      'Clearer channel contribution beyond last-click noise',
      'Faster budget reallocation toward incremental winners',
      'Executive-grade reporting tied to pipeline and revenue',
    ],
    implementation: [
      'Standardize event taxonomy across touchpoints',
      'Build pathing datasets and conversion windows',
      'Run model comparisons and holdout validations',
      'Operationalize attribution outputs in media workflows',
    ],
  },
];

export const serverTrackingBySlug = Object.fromEntries(serverTrackingPages.map((item) => [item.slug, item]));
