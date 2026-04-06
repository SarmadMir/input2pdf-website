import { FilePenLine } from 'lucide-react';
import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { GenericPreview } from '@/components/solutions/previews/GenericPreview';

export const metadata = {
  title: 'Forms & Agreements — Input2PDFSolution',
  description:
    'Structured business documents with digital signature support. Built for legal teams, HR, and finance departments.',
};

export default function FormsPage() {
  const solution = solutions.find((s) => s.icon === 'form')!;
  return (
    <SolutionPageLayout
      solution={solution}
      preview={
        <GenericPreview
          icon={<FilePenLine size={48} strokeWidth={1.5} />}
          eyebrow="Service Agreement"
          title="Signed & Delivered"
          body={
            <>
              <p>Between Acme Corp and Jane Cooper</p>
              <p className="mt-3 text-xs text-foreground/50">
                Digital signature captured · April 5, 2026
              </p>
            </>
          }
          footer="Doc ID · AGR-2026-00423"
        />
      }
    />
  );
}
