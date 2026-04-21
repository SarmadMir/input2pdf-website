import { Hero } from '@/components/landing/Hero';
import { SolutionsOverview } from '@/components/landing/SolutionsOverview';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DocumentTypesGrid } from '@/components/landing/DocumentTypesGrid';
import { ProofOfWork } from '@/components/landing/proof/ProofOfWork';
import { CallToAction } from '@/components/landing/CallToAction';
import { DemoSection } from '@/components/demo/DemoSection';
import { landingDemo } from '@/config/demo';

export default function Home() {
  return (
    <>
      <Hero />
      <div id="demo">
        <DemoSection config={landingDemo} />
      </div>
      <HowItWorks />
      <SolutionsOverview />
      <DocumentTypesGrid />
      <ProofOfWork />
      <CallToAction />
    </>
  );
}
