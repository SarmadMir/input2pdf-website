import { HeartHandshake } from 'lucide-react';
import { solutions } from '@/config/solutions';
import { SolutionPageLayout } from '@/components/solutions/SolutionPageLayout';
import { GenericPreview } from '@/components/solutions/previews/GenericPreview';

export const metadata = {
  title: 'eCards & Invitations — Input2PDFSolution',
  description:
    'Branded digital cards for events, courses, and special occasions — personalized and generated at scale.',
};

export default function EcardsPage() {
  const solution = solutions.find((s) => s.icon === 'ecard')!;
  return (
    <SolutionPageLayout
      solution={solution}
      preview={
        <GenericPreview
          icon={<HeartHandshake size={48} strokeWidth={1.5} />}
          eyebrow="CPR eCard"
          title="Jane Cooper"
          body={
            <>
              <p>Certified in Adult CPR &amp; First Aid</p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/80">
                Valid through April 2028
              </p>
            </>
          }
          footer="Card ID · EC-2026-08472"
        />
      }
    />
  );
}
