import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';

export const metadata = {
  title: 'Generation Portals — Input2PDFSolution',
  description:
    'Full-scale white-labeled platforms for document generation at volume. Built for organizations at scale.',
};

export default function PortalsPage() {
  const solution = solutions.find((s) => s.icon === 'portal')!;
  return <SolutionPageLayout solution={solution} />;
}
