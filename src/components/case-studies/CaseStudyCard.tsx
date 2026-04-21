import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/types/case-study';

/**
 * CaseStudyCard -- index-grid preview for /case-studies.
 *
 * Server Component. Renders hero image + industry + clientName + summary +
 * two metric pull-quotes + a "Read case study" affordance. The whole card is
 * a single <Link> (no nested anchors) so the entire surface is the click target.
 *
 * Hover motion budget: color/border/shadow transitions + <=1.02 scale on the
 * hero image only, per `.planning/ui-direction.md`.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
    >
      {/* Hero image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-background">
        <Image
          src={study.heroImage.src}
          alt={study.heroImage.alt}
          width={study.heroImage.width}
          height={study.heroImage.height}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {study.industry}
        </div>

        <h3 className="mt-3 font-display text-lg font-bold text-foreground sm:text-xl">
          {study.clientName}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/65 sm:text-base">
          {study.summary}
        </p>

        {/* Two metric pull-quotes (first two from study.metrics). The full set
            appears on the individual [slug] page. */}
        {study.metrics.length >= 2 && (
          <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-5 text-left">
            {study.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <dt className="text-xs text-foreground/50">{m.label}</dt>
                <dd className="mt-1 font-display text-base font-semibold text-foreground">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-primary/80 transition-colors group-hover:text-primary">
          Read case study
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
