import type { PROJECT_TYPES, BUDGET_RANGES } from './schema';

type ProjectType = (typeof PROJECT_TYPES)[number];
type BudgetRange = (typeof BUDGET_RANGES)[number];

/**
 * Build a /contact URL with typed pre-fill query params.
 *
 * Only enum dropdowns are pre-fillable — never name/email/projectDetails
 * (exfil / reflected-XSS risk). ContactForm re-validates via sanitizeEnum().
 */
export function contactHref(
  opts: { type?: ProjectType; budget?: BudgetRange } = {},
): string {
  const params = new URLSearchParams();
  if (opts.type) params.set('type', opts.type);
  if (opts.budget) params.set('budget', opts.budget);
  const qs = params.toString();
  return qs ? `/contact?${qs}` : '/contact';
}
