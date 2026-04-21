/**
 * Document types shown on the landing DocumentTypesGrid (Plan 03-13).
 * Curated manually from the 7 solutions' examples[] arrays — NOT auto-derived, so each
 * card can carry a specific use-case line richer than the solution's examples tag.
 */
import type { SolutionSlug } from '@/config/solutions';

export interface DocumentType {
  /** Display name, e.g. 'Course completion certificates'. */
  name: string;
  /** 1-line use case revealed on hover (desktop) or tap (mobile). */
  useCase: string;
  /** Solution category this example is sourced from (post-03-03 includes 'contracts'). */
  solutionSlug: SolutionSlug;
  /** Lucide icon name — Plan 03-13 maps to <Icon> components. */
  icon: string;
}
