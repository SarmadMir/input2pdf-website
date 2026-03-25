import { Hero } from '@/components/landing/Hero';
import { SolutionsOverview } from '@/components/landing/SolutionsOverview';
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
      <SolutionsOverview />
      <CallToAction />
    </>
  );
}
