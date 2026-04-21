import { Check, X, Clock, ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { contactHref } from '@/lib/contact/url';
import type { ScopeTier } from '@/types/pricing';

/**
 * ScopeTierCard — renders one /pricing scope tier.
 *
 * Pure Server Component (no client directive). Consumes the typed `ScopeTier` shape from
 * Plan 03-02's `src/config/pricing.ts` and deep-links its CTA via
 * `contactHref({ type: tier.deepLinkType })` with zero casts — PRC-05 lock
 * (no `&budget=` pre-fill). Zero currency characters render here or in the
 * page that composes it; PRC-01 is enforced by Task 3's grep gate and
 * Plan 03-15's Vitest invariants.
 */
export function ScopeTierCard({ tier }: { tier: ScopeTier }) {
  const highlight = tier.highlight === true;
  return (
    <article
      className={[
        'relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-all duration-200 sm:p-8',
        highlight
          ? 'border-2 border-primary/60 bg-primary/[0.04] shadow-lg shadow-primary/10'
          : 'border border-border bg-surface',
      ].join(' ')}
    >
      {highlight && (
        <span className="absolute right-5 top-5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
          Most common
        </span>
      )}

      <h3 className="font-display text-xl font-bold tracking-tight text-foreground">
        {tier.name}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground/65 sm:text-base">
        {tier.summary}
      </p>

      <div className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/75">
        <Clock size={12} className="text-primary" aria-hidden />
        Typical timeline: {tier.timeline}
      </div>

      {/* Includes — concrete deliverables */}
      <div className="mt-7">
        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Includes
        </h4>
        <ul className="mt-3 space-y-2">
          {tier.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/85">
              <Check size={14} className="mt-1 shrink-0 text-secondary" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excludes — honest scope fence (PRC-03) */}
      <div className="mt-6">
        <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-foreground/45">
          Not in this tier
        </h4>
        <ul className="mt-3 space-y-2">
          {tier.excludes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-foreground/55">
              <X size={14} className="mt-1 shrink-0 text-foreground/40" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA — deep-link with type pre-fill only (PRC-05 lock: no budget pre-fill). */}
      <div className="mt-auto pt-8">
        <ButtonLink
          href={contactHref({ type: tier.deepLinkType })}
          variant={highlight ? 'primary' : 'secondary'}
        >
          Get a quote for this scope
          <ArrowRight size={14} className="ml-2" />
        </ButtonLink>
      </div>
    </article>
  );
}
