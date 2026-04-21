import type { Metadata } from 'next';
import { getSolutionBySlug } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { ContractMockup } from '@/components/mockups';

export const metadata: Metadata = {
  title: 'Contracts & eSign — Input2PDF',
  description:
    'Legal-style document systems generated from structured inputs. Optional extension for workflows that require approvals or signatures.',
};

export default function ContractsSolutionPage() {
  // Plan 03-03 widens SolutionSlug and registers the 'contracts' entry.
  // getSolutionBySlug is strictly typed post-Phase 1 ERR-03 — no cast needed.
  const solution = getSolutionBySlug('contracts');
  return <SolutionPageLayout solution={solution} preview={<ContractMockup />} />;
}
