import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { InvoiceMockup } from '@/components/mockups';

export const metadata = {
  title: 'Invoices & Orders — Input2PDF',
  description:
    'Order confirmations, reservation forms, and financial documents with automated pricing calculations. Built for e-commerce, banking, and service businesses.',
};

export default function InvoicesPage() {
  const solution = getSolutionBySlug('invoices');
  return <SolutionPageLayout solution={solution} preview={<InvoiceMockup />} />;
}
