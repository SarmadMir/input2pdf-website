import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { ECardMockup } from '@/components/mockups';

export const metadata = {
  title: 'eCards & Invitations — Input2PDFSolution',
  description:
    'Branded digital cards for events, courses, and special occasions — personalized and generated at scale.',
};

export default function EcardsPage() {
  const solution = solutions.find((s) => s.icon === 'ecard')!;
  return <SolutionPageLayout solution={solution} preview={<ECardMockup />} />;
}
