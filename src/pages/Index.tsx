import { Header } from '@/components/Header';
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
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { ROICalculator } from '@/components/ROICalculator';
import { CaseStudyGallery } from '@/components/CaseStudyGallery';
import { DashboardPreview } from '@/components/DashboardPreview';
import { ComparisonTool } from '@/components/ComparisonTool';
import { LiveChatWidget } from '@/components/LiveChatWidget';
import { ResourceHub } from '@/components/ResourceHub';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 lg:pt-24">
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
      </main>
      <Footer />
      <ScrollToTop />
      <LiveChatWidget />
    </div>
  );
};

export default Index;
