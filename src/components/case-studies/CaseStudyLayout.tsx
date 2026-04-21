import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { contactHref } from '@/lib/contact/url';
import { slugToProjectType } from '@/lib/contact/slug-to-project-type';
import type { CaseStudy } from '@/types/case-study';

/**
 * CaseStudyLayout -- hybrid-style layout for /case-studies/[slug].
 *
 * Server Component. Renders every section of a single case study:
 * back link -> hero (industry + timeline + clientName + summary + optional
 * live-program link) -> hero image (+ anonymization caption when applicable)
 * -> Problem -> Approach -> Outcome (with metric grid) -> Screenshots ->
 * Tech chips -> optional testimonial -> end CTA.
 *
 * Style contract (`.planning/ui-direction.md`): short narrative + concrete
 * numbers. NOT long-form Apple-style, NOT dense metric-only tables.
 *
 * Voice contract: every narrative string lives in `src/config/case-studies.ts`
 * (voice-linted by Plan 03-01). Only structural copy lives here: "All case
 * studies", "Problem", "Approach", "Outcome", "Interface", "Tech",
 * "Have a project like this?", "Start your project", "More case studies".
 * Changing any of this copy requires a full /impeccable:critique pass.
 */
export function CaseStudyLayout({ study }: { study: CaseStudy }) {
  return (
    <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24">
      {/* Back link */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
      >
        <ArrowLeft size={14} /> All case studies
      </Link>

      {/* Hero */}
      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          <span>{study.industry}</span>
          <span className="h-1 w-1 rounded-full bg-primary/50" aria-hidden />
          <span>{study.timeline}</span>
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
          {study.clientName}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-light-dark">
          {study.summary}
        </p>
        {study.clientUrl && !study.anonymized && (
          <p className="mt-4 text-sm text-foreground/60">
            Live program:{' '}
            <a
              href={study.clientUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
            >
              {study.clientUrl.replace(/^https?:\/\//, '')}
            </a>
          </p>
        )}
      </header>

      {/* Hero image -- priority for above-the-fold LCP */}
      <div className="relative mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
        <Image
          src={study.heroImage.src}
          alt={study.heroImage.alt}
          width={study.heroImage.width}
          height={study.heroImage.height}
          sizes="(max-width: 768px) 100vw, 896px"
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {study.anonymized && (
        <p className="mt-3 text-xs text-foreground/45">
          Interface overview — system visualization, not a live screenshot.
        </p>
      )}

      {/* Problem */}
      <section className="mt-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Problem
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">
          {study.problemStatement}
        </p>
      </section>

      {/* Approach */}
      <section className="mt-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Approach
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">
          {study.approachSummary}
        </p>
      </section>

      {/* Outcome -- narrative first, metric grid second */}
      <section className="mt-16">
        <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Outcome
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/85">
          {study.outcome}
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {study.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-surface p-5">
              <dt className="text-xs text-foreground/50">{m.label}</dt>
              <dd className="mt-2 font-display text-2xl font-bold text-foreground">{m.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Screenshots -- captioned via alt text, lazy-loaded by default */}
      {study.screenshots.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Interface
          </h2>
          <div className="mt-6 space-y-8">
            {study.screenshots.map((s) => (
              <figure key={s.src} className="overflow-hidden rounded-2xl border border-border">
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={s.width}
                  height={s.height}
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="w-full"
                />
                <figcaption className="border-t border-border bg-surface px-5 py-3 text-xs text-foreground/60">
                  {s.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Tech stack -- compact chip list, not a paragraph */}
      {study.technologies.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Tech
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.technologies.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground/75"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Optional testimonial */}
      {study.testimonial && (
        <blockquote className="mt-16 rounded-2xl border-l-4 border-primary bg-surface px-6 py-5 text-lg italic leading-relaxed text-foreground/80">
          &ldquo;{study.testimonial.quote}&rdquo;
          <footer className="mt-3 text-sm not-italic text-foreground/55">
            — {study.testimonial.attribution}
          </footer>
        </blockquote>
      )}

      {/* End-of-study CTA block (CSE-11). SolutionSlug `'contracts'` bridges to
          PROJECT_TYPES `'contracts-esign'` via slugToProjectType() -- the two
          enums intentionally diverge per 03-CONTEXT.md:66. The bridge is a
          typed pure function, not a cast. */}
      <section className="mt-20 rounded-2xl border-t border-border bg-surface/30 px-6 py-14 text-center sm:px-10">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Have a project like this?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-light-dark">
          We build systems around your workflow — tell us what you need.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href={contactHref({ type: slugToProjectType(study.solutionSlug) })}>
            Start your project
            <ArrowRight size={14} className="ml-2" />
          </ButtonLink>
          <ButtonLink href="/case-studies" variant="secondary">
            More case studies
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}
