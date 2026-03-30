import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';

export const metadata = {
  title: 'Invoices & Orders — Input2PDFSolution',
  description:
    'Order confirmations, reservation forms, and financial documents with automated pricing calculations. Built for e-commerce, banking, and service businesses.',
};

export default function InvoicesPage() {
  const solution = solutions.find((s) => s.icon === 'invoice')!;
  return <SolutionPageLayout solution={solution} />;
}
