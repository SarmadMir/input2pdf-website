import type { Metadata } from 'next';
import { scopeTiers, PRICING_FRAMING } from '@/config/pricing';
import { ScopeTierCard } from '@/components/pricing/ScopeTierCard';
import { ButtonLink } from '@/components/ui/Button';
import { contactHref } from '@/lib/contact/url';

export const metadata: Metadata = {
  title: 'Pricing — Input2PDF',
  description:
    'Projects are scoped per use case. The ladder describes what gets built at each scope — the price conversation happens in the first reply.',
};

/**
 * /pricing — anchoring-language scope-tier page (PRC-01 / PRC-02 / PRC-05 / PRC-07).
 *
 * Pure Server Component. Pulls the 5-tier dataset and Sarmad's framing sentence
 * from `@/config/pricing` (Plan 03-02). Every tier CTA deep-links via
 * `contactHref({ type: tier.deepLinkType })` with zero casts and zero `budget=`
 * pre-fill. An empty `<section id="faq">` anchor is scaffolded so `/pricing#faq`
 * deep links resolve even before Plan 03-14 mounts the FAQ accordion inside it.
 */
export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
      <header className="mb-16 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
          Pricing
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Built per use case.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-light-dark">
          {PRICING_FRAMING}
        </p>
      </header>

      {/* Tier grid — 1 col mobile, 2 col tablet, 3 col desktop.
          5 tiers do not divide evenly into 3; the last two wrap to the next row. */}
      <section
        aria-label="Scope tiers"
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
      >
        {scopeTiers.map((tier) => (
          <ScopeTierCard key={tier.id} tier={tier} />
        ))}
      </section>

      {/* Bottom CTA — the "can't find a tier that fits?" surface.
          PRC-05 lock: contactHref() with no arguments, no budget pre-fill. */}
      <section className="mt-20 rounded-2xl border border-border bg-surface px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Not sure which tier fits?
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-lg text-light-dark">
          Describe your project and we&apos;ll tell you the scope it lands in —
          plus what it would actually cost.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={contactHref()}>
            Tell us about your project
          </ButtonLink>
        </div>
      </section>

      {/* FAQ mount-point. Plan 03-14 renders <FAQ /> inside this section.
          Keeping the anchor here so /pricing#faq deep links work before 03-14 lands. */}
      <section id="faq" aria-label="Frequently asked questions" className="mt-24">
        {/* Intentionally empty — filled by Plan 03-14. */}
      </section>
    </main>
  );
}
