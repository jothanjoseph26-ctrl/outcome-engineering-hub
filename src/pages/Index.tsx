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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PositioningSection />
        <PathSelectorSection />
        <ComparisonSection />
        <SystemsSection />
        <TechnologySection />
        <OutcomeBrainSection />
        <ResultsSection />
        <AudienceSection />
        <ProcessSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
