'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import type { FAQItem } from '@/types/faq';

interface FAQProps {
  /** Items to render. /pricing passes the full faqItems; landing passes landingFaqSet. */
  items: FAQItem[];
  /** Optional heading override — /pricing uses "Questions we get"; landing uses a shorter prompt. */
  heading?: string;
  /** Optional supporting paragraph under the heading. */
  subheading?: string;
}

/**
 * Radix Accordion-based FAQ (CNT-04 / CMP-03).
 *
 * Pure presentation — all copy flows through the items prop. Voice discipline
 * is enforced at the config layer (`src/config/faq.ts`, Plan 03-04) and by
 * Plan 03-15's voice-lint Vitest.
 *
 * A11y (handled by Radix):
 *   - aria-expanded / aria-controls on trigger (automatic).
 *   - Space / Enter toggles.
 *   - Up / Down arrow keys navigate between triggers.
 *   - Home / End jumps to first / last.
 *   - Focus-visible outline via Tailwind focus-visible:ring-*.
 *
 * Motion:
 *   - Chevron rotates 180deg via group-data-[state=open]:rotate-180.
 *   - Height animation via the @keyframes accordion-down / accordion-up
 *     defined in src/app/globals.css (keyed to --radix-accordion-content-height).
 *   - Both respect motion-reduce:animate-none / motion-reduce:transition-none.
 */
export function FAQ({
  items,
  heading = 'Questions we get',
  subheading,
}: FAQProps) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-5 py-20 sm:px-8"
    >
      <header className="mb-10">
        <h2
          id="faq-heading"
          className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
        >
          {heading}
        </h2>
        {subheading && (
          <p className="mt-3 text-lg leading-relaxed text-light-dark">{subheading}</p>
        )}
      </header>

      <Accordion.Root
        type="single"
        collapsible
        className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface"
      >
        {items.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Header>
              <Accordion.Trigger
                className="group flex w-full items-center justify-between px-6 py-5 text-left font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              >
                <span className="pr-6 text-base sm:text-lg">{item.question}</span>
                <ChevronDown
                  size={18}
                  className="shrink-0 text-foreground/45 transition-transform duration-200 group-data-[state=open]:rotate-180 motion-reduce:transition-none"
                  aria-hidden
                />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content
              className="overflow-hidden text-sm leading-relaxed text-foreground/70 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up motion-reduce:animate-none"
            >
              <div className="px-6 pb-6 pt-1">{item.answer}</div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
}
