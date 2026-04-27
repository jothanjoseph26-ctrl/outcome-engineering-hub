import { ArrowRight, Blocks, Building2, FileSearch, Library, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export type HeaderSectionId = 'Solutions' | 'Platform' | 'Research' | 'Enterprise' | 'Resources';

type MenuLinkItem = {
  label: string;
  description?: string;
  to?: string;
  href?: string;
  badge?: string;
};

type MenuColumn = {
  title: string;
  description?: string;
  items: MenuLinkItem[];
};

type MegaMenuSection = {
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Blocks;
  columns: MenuColumn[];
  footerLink?: MenuLinkItem;
};

export const HEADER_NAV_ORDER: HeaderSectionId[] = [
  'Solutions',
  'Platform',
  'Research',
  'Enterprise',
  'Resources',
];

export const MEGA_MENU_SECTIONS: Record<HeaderSectionId, MegaMenuSection> = {
  Solutions: {
    eyebrow: 'Solutions Architecture',
    title: 'Engineering systems for revenue, distribution, and infrastructure',
    description:
      'Outcome Lab organizes capabilities by operating function so teams can buy systems, not disconnected services.',
    icon: Blocks,
    columns: [
      {
        title: 'Revenue Engineering',
        items: [
          { label: 'SEO Engineering', description: 'Programmatic content + authority systems', to: '/solutions/seo-engineering' },
          { label: 'Conversion Engineering', description: 'Funnel instrumentation + tracking', to: '/solutions/conversion-engineering' },
          { label: 'WhatsApp Sales System', description: 'Pipeline automation and sales flow', to: '/solutions/whatsapp-sales-system' },
        ],
      },
      {
        title: 'Distribution Engineering',
        items: [
          { label: 'Truereach Platform', description: 'Managed distribution workforce infrastructure', to: '/truereach' },
          { label: 'Social Media Engineering', description: 'Channel execution systems and automation', href: '#' },
          { label: 'Distribution Architecture', description: 'Cross-channel routing and scaling frameworks', href: '#' },
        ],
      },
      {
        title: 'Infrastructure Engineering',
        items: [
          { label: 'Edge SEO Infrastructure', description: 'Network-layer crawlability and performance control', to: '/solutions/edge-seo-infrastructure' },
          { label: 'AI Marketing Automation', description: 'Automated optimization logic and decision loops', to: '/solutions/programmatic-advertising/automation-scripts' },
          { label: 'Technical Architecture', description: 'System design for measurement and execution', to: '/technical-architecture' },
        ],
      },
      {
        title: 'Campaign Engineering',
        items: [
          { label: 'Campaign Stack', description: 'Composable execution stack for launches and growth', to: '/programmatic-content' },
          { label: 'War Room Dashboard', description: 'Live control surfaces for operators and leadership', to: '/portal' },
          { label: 'Confidential Advisory', description: 'Senior operator support for sensitive campaigns', href: '#' },
        ],
      },
    ],
    footerLink: { label: 'View All Solutions', to: '/services' },
  },
  Platform: {
    eyebrow: 'Platform Operations',
    title: 'Separate marketing narratives from delivery infrastructure',
    description:
      'Platform gives buyers and operators a direct path into execution, documentation, and controls.',
    icon: ShieldCheck,
    columns: [
      {
        title: 'Operations',
        items: [
          { label: 'Client Portal', description: 'Access dashboards, artifacts, and project updates', to: '/portal' },
          { label: 'Implementation Process', description: 'Delivery stages, milestones, and ownership', href: '#' },
          { label: 'Technical Documentation', description: 'Architecture notes, runbooks, and specs', href: '#' },
        ],
      },
      {
        title: 'Trust & Validation',
        items: [
          { label: 'Case Studies', description: 'Execution outcomes and deployment narratives', href: '#' },
          { label: 'Security & Compliance', description: 'Controls, governance, and access boundaries', href: '#' },
        ],
      },
    ],
  },
  Research: {
    eyebrow: 'Research & Models',
    title: 'Intellectual infrastructure for decision quality',
    description:
      'Research assets position the platform above agency delivery by exposing frameworks, benchmarks, and predictive models.',
    icon: FileSearch,
    columns: [
      {
        title: 'Decision Systems',
        items: [
          { label: 'ROI Framework', description: 'Financial logic for channel and infrastructure decisions', href: '#' },
          { label: 'Conversion Reports', description: 'Pattern analysis across funnel implementations', href: '#' },
          { label: 'Benchmarks', description: 'Comparative performance baselines by deployment type', href: '#' },
        ],
      },
      {
        title: 'Advanced Assets',
        items: [
          { label: 'Whitepapers', description: 'Deep dives into architecture and measurement strategy', href: '#' },
          { label: 'Predictive Models', description: 'Forecasting logic for spend, CAC, and conversion outcomes', to: '/solutions/programmatic-advertising/predictive-bidding' },
        ],
      },
    ],
  },
  Enterprise: {
    eyebrow: 'Enterprise Access',
    title: 'Procurement-ready pathways for complex deployments',
    description:
      'Enterprise navigation focuses serious buyers on custom infrastructure, deployment complexity, and proposal workflows.',
    icon: Building2,
    columns: [
      {
        title: 'Deployment Types',
        items: [
          { label: 'Custom Infrastructure', description: 'Bespoke systems for unique operational constraints', to: '/technical-architecture' },
          { label: 'Multi-domain Deployments', description: 'Distributed properties, governance, and orchestration', to: '/solutions/edge-seo-infrastructure' },
          { label: 'Government / Political', description: 'Controlled, sensitive, and high-stakes operating environments', to: '/truereach' },
        ],
      },
      {
        title: 'Commercial Pathways',
        items: [
          { label: 'Partnerships', description: 'Strategic delivery relationships and co-build opportunities', href: '#' },
          { label: 'Request Proposal', description: 'Formal scoping and procurement intake', href: '#' },
        ],
      },
    ],
  },
  Resources: {
    eyebrow: 'Resources',
    title: 'Operator education, documentation, and support',
    description:
      'Resources support both buyers and teams with learning assets, implementation guidance, and help channels.',
    icon: Library,
    columns: [
      {
        title: 'Learn',
        items: [
          { label: 'Blog', description: 'Articles on systems, growth, and execution', to: '/blog' },
          { label: 'Playbooks', description: 'Reusable operating procedures and campaign patterns', href: '#' },
          { label: 'Guides', description: 'Step-by-step implementation references', href: '#' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: 'FAQ', description: 'Common questions across onboarding and delivery', href: '#' },
          { label: 'Support', description: 'Help and issue routing for active engagements', href: '#' },
        ],
      },
    ],
  },
};

interface MegaMenuProps {
  activeSection: HeaderSectionId;
}

const MenuEntry = ({ item }: { item: MenuLinkItem }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm font-semibold text-foreground group-hover:text-gold transition-colors">
          {item.label}
        </span>
        {item.badge ? (
          <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
            {item.badge}
          </span>
        ) : null}
      </div>
      {item.description ? (
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {item.description}
        </span>
      ) : null}
    </>
  );

  if (item.to) {
    return (
      <Link
        to={item.to}
        className="group block rounded-xl border border-border/60 bg-card/90 p-3.5 transition-colors hover:border-gold/30 hover:bg-card"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={item.href ?? '#'}
      className="group block rounded-xl border border-border/60 bg-card/90 p-3.5 transition-colors hover:border-gold/30 hover:bg-card"
    >
      {content}
    </a>
  );
};

export const MegaMenu = ({ activeSection }: MegaMenuProps) => {
  const section = MEGA_MENU_SECTIONS[activeSection];
  const Icon = section.icon;
  const isSolutions = activeSection === 'Solutions';

  return (
    <div className="absolute inset-x-0 top-full border-b border-border/70 bg-background/96 shadow-[0_28px_90px_-52px_rgba(0,0,0,0.95)] backdrop-blur-xl">
      <div className="container-lg py-6">
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/95 shadow-[0_28px_90px_-42px_rgba(0,0,0,0.9)]">
          <div className="grid gap-0 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="border-b border-border/50 bg-muted/55 p-5 lg:border-b-0 lg:border-r">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    {section.eyebrow}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-foreground">
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {section.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className={isSolutions ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-4' : 'grid gap-4 md:grid-cols-2'}>
                {section.columns.map((column) => (
                  <div key={column.title} className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-[0_14px_34px_-28px_rgba(0,0,0,0.85)]">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {column.title}
                    </h4>
                    {column.description ? (
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {column.description}
                      </p>
                    ) : null}
                    <div className="mt-3 space-y-2">
                      {column.items.map((item) => (
                        <MenuEntry key={item.label} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {section.footerLink ? (
                <div className="mt-4 border-t border-border/40 pt-4">
                  {section.footerLink.to ? (
                    <Link
                      to={section.footerLink.to}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-glow"
                    >
                      {section.footerLink.label} <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a
                      href={section.footerLink.href ?? '#'}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-glow"
                    >
                      {section.footerLink.label} <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
