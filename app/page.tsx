import type { Metadata } from 'next';
import { HeroSection } from '@/components/HeroSection';
import { PositioningSection } from '@/components/PositioningSection';
import { PathSelectorSection } from '@/components/PathSelectorSection';
import { ComparisonSection } from '@/components/ComparisonSection';
import { SystemsSection } from '@/components/SystemsSection';
import { TechnologySection } from '@/components/TechnologySection';
import { OutcomeBrainSection } from '@/components/OutcomeBrainSection';
import { ResultsSection } from '@/components/ResultsSection';
import { AudienceSection } from '@/components/AudienceSection';
import { ProcessSection } from '@/components/ProcessSection';
import { PricingSection } from '@/components/PricingSection';
import { CTASection } from '@/components/CTASection';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ROICalculator } from '@/components/ROICalculator';
import { CaseStudyGallery } from '@/components/CaseStudyGallery';
import { DashboardPreview } from '@/components/DashboardPreview';
import { ComparisonTool } from '@/components/ComparisonTool';
import { LiveChatWidget } from '@/components/LiveChatWidget';
import { ResourceHub } from '@/components/ResourceHub';

export const metadata: Metadata = {
  title: 'Outcome Labs | Revenue Engineering for Growth Companies',
  description:
    'We engineer revenue systems using SEO, conversion engineering, and automation. Build systems that generate qualified leads on autopilot. 40% lower costs. 3x faster execution. 294% average ROI.',
  alternates: { canonical: 'https://outcomelabs.com' },
};

export default function HomePage() {
  return (
    <>
      {/* Crawlable positioning copy — served in raw HTML, visible to Google and AI crawlers */}
      <div className="sr-only">
        <h1>Outcome Labs — Revenue Engineering for Growth Companies</h1>
        <p>
          We engineer automated revenue systems that replace manual marketing work. API-level
          control, real-time optimisation, and predictive intelligence across SEO, paid media, and
          conversion infrastructure. Services include programmatic advertising automation, edge SEO
          infrastructure, server-side tracking, and custom analytics pipelines.
        </p>
        <nav aria-label="Key pages">
          <a href="/services">Revenue Growth Services</a>
          <a href="/services/revenue-growth">SEO Engineering</a>
          <a href="/services/market-dominance">Market Dominance</a>
          <a href="/solutions/seo-engineering">SEO Engineering System</a>
          <a href="/solutions/conversion-engineering">Conversion Engineering</a>
          <a href="/solutions/whatsapp-sales-system">WhatsApp Sales System</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/scanner">Free SEO Audit</a>
        </nav>
      </div>

      <HeroSection />
      <PositioningSection />
      <PathSelectorSection />
      <ComparisonSection />
      <div id="systems">
        <SystemsSection />
      </div>
      <TechnologySection />
      <OutcomeBrainSection />
      <ResultsSection />
      <CaseStudyGallery />
      <DashboardPreview />
      <ComparisonTool />
      <ROICalculator />
      <ResourceHub />
      <AudienceSection />
      <ProcessSection />
      <PricingSection />
      <CTASection />
      <ScrollToTop />
      <LiveChatWidget />
    </>
  );
}