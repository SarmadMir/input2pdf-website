import type { SolutionSlug } from '@/config/solutions';
import type { PROJECT_TYPES } from '@/lib/contact/schema';

/**
 * Map a SolutionSlug to the /contact form's `type` enum (PROJECT_TYPES).
 *
 * Every slug matches a PROJECT_TYPE value 1:1 EXCEPT `'contracts'`, which maps
 * to the schema-locked enum value `'contracts-esign'` (see 03-CONTEXT.md:66
 * and `.planning/brand-voice.md` Contracts rules -- the schema's enum keeps the
 * `-esign` suffix to preserve the optional-extension framing in form analytics).
 *
 * Plan 03-03 widened SolutionSlug to 7 values and used a local helper inside
 * SolutionPageLayout to bridge the two enums. Plan 03-05 adds a second consumer
 * (CaseStudyLayout), so the helper is extracted here to avoid duplication.
 * Keep it pure and typed -- the return type is `PROJECT_TYPES[number]`, which
 * is the exact type `contactHref({ type })` expects.
 */
export function slugToProjectType(
  slug: SolutionSlug,
): (typeof PROJECT_TYPES)[number] {
  return slug === 'contracts' ? 'contracts-esign' : slug;
}
