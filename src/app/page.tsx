import { Hero } from '@/components/landing/Hero';
import { SolutionsOverview } from '@/components/landing/SolutionsOverview';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { DocumentTypesGrid } from '@/components/landing/DocumentTypesGrid';
import { ProofOfWork } from '@/components/landing/proof/ProofOfWork';
import { CallToAction } from '@/components/landing/CallToAction';
import { DemoSection } from '@/components/demo/DemoSection';
import { FAQ } from '@/components/landing/FAQ';
import { landingDemo } from '@/config/demo';
import { faqItems, landingFaqIds } from '@/config/faq';

// Condensed landing FAQ subset — filtered from the full faqItems using the
// landingFaqIds tuple exported by config/faq.ts (Plan 03-04, 4-5 entries).
const landingFaqSet = faqItems.filter((item) =>
  (landingFaqIds as readonly string[]).includes(item.id),
);

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
      <FAQ
        items={landingFaqSet}
        heading="Common questions"
        subheading="The ones visitors ask before reaching out. Full set on the pricing page."
      />
      <CallToAction />
    </>
  );
}
