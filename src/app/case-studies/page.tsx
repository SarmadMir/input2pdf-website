import type { Metadata } from 'next';
import { caseStudies } from '@/config/case-studies';
import { CaseStudyCard } from '@/components/case-studies/CaseStudyCard';

/**
 * /case-studies index (CSE-02).
 *
 * Server Component. Renders a voice-locked header + a responsive grid of
 * CaseStudyCard driven by the typed `caseStudies` dataset (5 entries shipped
 * in Plan 03-01). Phase 4 (SEO-04) will expand the metadata block with a
 * per-route OG image.
 */
export const metadata: Metadata = {
  title: 'Case Studies — Input2PDF',
  description:
    'Document automation systems built for real organizations. Short reads, concrete outcomes.',
};

export default function CaseStudiesIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-16">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Case studies
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Systems that run continuously.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-light-dark">
          Each system was built for a specific organization with a specific workflow.
          The patterns repeat; the systems don&apos;t.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
    </main>
  );
}
