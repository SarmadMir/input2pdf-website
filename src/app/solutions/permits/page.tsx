import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';

export const metadata = {
  title: 'Permits & Licenses — Input2PDFSolution',
  description:
    'Vehicle permits, inspection certificates, and compliance documents formatted to government standards. Built for government agencies, inspectors, and compliance teams.',
};

export default function PermitsPage() {
  const solution = solutions.find((s) => s.icon === 'permit')!;
  return <SolutionPageLayout solution={solution} />;
}
