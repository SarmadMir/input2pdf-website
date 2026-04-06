import { Stamp } from 'lucide-react';
import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { GenericPreview } from '@/components/solutions/previews/GenericPreview';

export const metadata = {
  title: 'Permits & Licenses — Input2PDFSolution',
  description:
    'Vehicle permits, inspection certificates, and compliance documents formatted to government standards. Built for government agencies, inspectors, and compliance teams.',
};

export default function PermitsPage() {
  const solution = solutions.find((s) => s.icon === 'permit')!;
  return (
    <SolutionPageLayout
      solution={solution}
      preview={
        <GenericPreview
          icon={<Stamp size={48} strokeWidth={1.5} />}
          eyebrow="Vehicle Inspection Permit"
          title="APPROVED"
          body={
            <>
              <p>Reg. #VHC-2026-884713</p>
              <p className="mt-2 text-xs text-foreground/50">
                Valid: April 5, 2026 — April 5, 2027
              </p>
            </>
          }
          footer="Verify at input2pdf.io/verify"
        />
      }
    />
  );
}
