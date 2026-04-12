import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { ECardMockup } from '@/components/mockups';

export const metadata = {
  title: 'eCards & Invitations — Input2PDF',
  description:
    'Branded digital cards for events, courses, and special occasions — personalized and generated at scale.',
};

export default function EcardsPage() {
  const solution = getSolutionBySlug('ecards');
  return <SolutionPageLayout solution={solution} preview={<ECardMockup />} />;
}
