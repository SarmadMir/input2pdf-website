import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { PortalDashboardMockup } from '@/components/mockups';

export const metadata = {
  title: 'Generation Portals — Input2PDF',
  description:
    'Full-scale white-labeled platforms for document generation at volume. Built for organizations at scale.',
};

export default function PortalsPage() {
  const solution = getSolutionBySlug('portals');
  return <SolutionPageLayout solution={solution} preview={<PortalDashboardMockup />} />;
}
