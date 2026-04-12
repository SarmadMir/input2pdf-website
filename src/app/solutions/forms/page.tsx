import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { FormAgreementMockup } from '@/components/mockups';

export const metadata = {
  title: 'Forms & Agreements — Input2PDF',
  description:
    'Structured business documents with digital signature support. Built for legal teams, HR, and finance departments.',
};

export default function FormsPage() {
  const solution = getSolutionBySlug('forms');
  return <SolutionPageLayout solution={solution} preview={<FormAgreementMockup />} />;
}
