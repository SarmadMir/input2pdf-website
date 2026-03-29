import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';

export const metadata = {
  title: 'Forms & Agreements — Input2PDFSolution',
  description:
    'Structured business documents with digital signature support. Built for legal teams, HR, and finance departments.',
};

export default function FormsPage() {
  const solution = solutions.find((s) => s.icon === 'form')!;
  return <SolutionPageLayout solution={solution} />;
}
