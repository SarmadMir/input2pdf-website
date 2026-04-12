import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { PermitMockup } from '@/components/mockups';

export const metadata = {
  title: 'Permits & Licenses — Input2PDF',
  description:
    'Vehicle permits, inspection certificates, and compliance documents formatted to government standards. Built for government agencies, inspectors, and compliance teams.',
};

export default function PermitsPage() {
  const solution = getSolutionBySlug('permits');
  return <SolutionPageLayout solution={solution} preview={<PermitMockup />} />;
}
