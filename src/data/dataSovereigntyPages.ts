export type DataSovereigntyPage = {
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

export const dataSovereigntyPages: DataSovereigntyPage[] = [
  {
    slug: 'bigquery-integration',
    navLabel: 'BigQuery Integration',
    title: 'BigQuery Integration',
    strapline: 'Own the Warehouse. Own the Truth.',
    thesis:
      'If your revenue data lives only inside ad platforms, you do not own your growth intelligence.',
    story:
      'We centralize event, CRM, and media data in BigQuery so attribution and forecasting run on your infrastructure, not vendor dashboards.',
    architecture: [
      'Ingest web, server, CRM, and ad platform streams into BigQuery',
      'Standardize schemas across channels and business systems',
      'Model reusable marts for marketing, finance, and sales',
      'Version data contracts and pipeline logic',
    ],
    outcomes: [
      'One source of truth for performance and revenue',
      'Lower reporting conflicts between teams',
      'Faster analysis with SQL-ready business models',
    ],
    implementation: [
      'Map source systems and event taxonomy',
      'Build ingestion and transformation jobs',
      'Define canonical KPI model in warehouse',
      'Validate parity against legacy reports before cutover',
    ],
  },
  {
    slug: 'custom-dashboards',
    navLabel: 'Custom Dashboards',
    title: 'Custom Dashboards',
    strapline: 'Decision Interfaces, Not Vanity Charts',
    thesis:
      'Dashboards should trigger action. Most dashboards only describe history.',
    story:
      'We build role-specific decision surfaces: executive, acquisition, lifecycle, and operations. Every widget maps to a decision and owner.',
    architecture: [
      'Semantic layer connected to warehouse models',
      'Role-specific views by leadership and function',
      'Alerting thresholds tied to target ranges',
      'Drill-through from KPI to root-cause dimensions',
    ],
    outcomes: [
      'Faster decision cycles with less reporting overhead',
      'Shared KPI definitions across departments',
      'Real-time visibility into pipeline and revenue movement',
    ],
    implementation: [
      'Define KPI hierarchy and ownership',
      'Design dashboard information architecture',
      'Implement warehouse-backed charts and filters',
      'Ship alerting and weekly operating review views',
    ],
  },
  {
    slug: 'predictive-scoring',
    navLabel: 'Predictive Scoring',
    title: 'Predictive Scoring',
    strapline: 'Prioritize What Is Most Likely to Convert',
    thesis:
      'Not every lead, product, or campaign opportunity deserves equal budget.',
    story:
      'We build scoring layers that rank opportunities by expected value so teams prioritize actions with the highest revenue probability.',
    architecture: [
      'Feature store from behavior, CRM, and transaction signals',
      'Model layer for lead quality, conversion probability, or LTV',
      'Serving layer that exposes scores to operations',
      'Feedback loop for retraining and drift checks',
    ],
    outcomes: [
      'Better allocation of spend and sales attention',
      'Higher conversion efficiency from ranked prioritization',
      'Clearer pipeline health forecasts',
    ],
    implementation: [
      'Define scoring target and success criteria',
      'Train baseline model from historical outcomes',
      'Deploy score endpoints and workflow integration',
      'Monitor precision, recall, and calibration over time',
    ],
  },
  {
    slug: 'automated-audits',
    navLabel: 'Automated Audits',
    title: 'Automated Audits',
    strapline: 'Detect Waste Before It Compounds',
    thesis:
      'Manual audits are periodic. Revenue leaks are continuous.',
    story:
      'We run always-on audit scripts across tracking, spend, attribution, and funnel behavior to catch silent failures early.',
    architecture: [
      'Scheduled and event-triggered audit runners',
      'Rules engine for anomaly and integrity checks',
      'Issue severity scoring and routing',
      'Audit log and remediation tracking dashboard',
    ],
    outcomes: [
      'Faster detection of tracking and spend anomalies',
      'Lower wasted media and operational leakage',
      'Stronger governance over data reliability',
    ],
    implementation: [
      'Define audit rules by channel and KPI',
      'Build monitoring jobs and incident thresholds',
      'Route alerts to accountable owners',
      'Track fix latency and recurring issue patterns',
    ],
  },
];

export const dataSovereigntyBySlug = Object.fromEntries(dataSovereigntyPages.map((item) => [item.slug, item]));
