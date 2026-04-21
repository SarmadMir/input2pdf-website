import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies, getCaseStudyBySlug } from '@/config/case-studies';
import { CaseStudyLayout } from '@/components/case-studies/CaseStudyLayout';

/**
 * /case-studies/[slug] dynamic route (CSE-03).
 *
 * Next.js 16 contract (see `input2pdf-website/AGENTS.md`): `params` is
 * `Promise<{ slug: string }>` and MUST be awaited. Do not destructure
 * synchronously -- TypeScript flags it and Next 16 deprecates the sync shape.
 *
 * Build-time prerender: every slug in `caseStudies` (5 today) is emitted as
 * a static route via `generateStaticParams`. Misses trigger `notFound()`
 * from `next/navigation`, which renders `app/not-found.tsx` (Plan 03-08).
 */

/** Prerender every case study at build time. */
export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

/** Per-study metadata. Phase 4 (SEO-04) expands with per-study OG image. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) return { title: 'Case Study — Input2PDF' };
  return {
    title: `${study.clientName} — Input2PDF`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();
  return <CaseStudyLayout study={study} />;
}
