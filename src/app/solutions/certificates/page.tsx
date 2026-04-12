import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { CertificateMockup } from '@/components/mockups';

export const metadata = {
  title: 'Certificates — Input2PDF',
  description:
    'Auto-generated professional certificates delivered directly to recipients. Built for course platforms, training providers, and schools.',
};

export default function CertificatesPage() {
  const solution = getSolutionBySlug('certificates');
  return <SolutionPageLayout solution={solution} preview={<CertificateMockup />} />;
}
