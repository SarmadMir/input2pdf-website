/**
 * FAQ types (CNT-04 / CMP-03 / CMP-06).
 *
 * Full set (13-16) renders on /pricing. Landing renders a condensed subset (4-5)
 * via `landingFaqIds`. `namesCompetitor: true` is a tripwire — every such entry
 * must appear in .planning/phases/03-landing-polish-pricing-case-studies/COMPETITOR-LINES-REVIEW.md
 * with Sarmad's approval before Wave 4 merge.
 */
export type FAQCategory = 'pricing' | 'process' | 'positioning';

export interface FAQItem {
  /** Stable slug id (URL-safe, used as Accordion.Item value). */
  id: string;
  /** Category — drives section grouping on /pricing and filtering for landing subset. */
  category: FAQCategory;
  /** The question as the user might ask it. */
  question: string;
  /** The answer — 2-4 sentences, 6 absolute max (.planning/ui-direction.md FAQ rule). */
  answer: string;
  /** Tripwire: entries that name a competitor require Sarmad's CMP-06 review before merge. */
  namesCompetitor?: boolean;
}
