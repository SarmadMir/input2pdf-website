/** Single source of truth for all stats displayed across the site.
 *  Update these values here -- they propagate to Hero, ProofOfWork, /solutions, etc.
 *
 *  ASSUMED -- confirm with Sarmad before Phase 3 wires these into the UI.
 *  Values extracted from existing hardcoded references in the codebase.
 */

export const PROJECTS_SHIPPED = 20; // ASSUMED -- verify with Fiverr order history
export const FIVERR_RATING = 5.0; // ASSUMED -- verify on Fiverr profile
export const YEARS_EXPERIENCE = 5; // ASSUMED -- verify timeline

/** Collected stats for iteration (e.g., stats bar component) */
export const stats = {
  projectsShipped: { value: PROJECTS_SHIPPED, label: 'Projects Shipped', suffix: '+' },
  fiverrRating: { value: FIVERR_RATING, label: 'Fiverr Rating', suffix: '/5' },
  yearsExperience: { value: YEARS_EXPERIENCE, label: 'Years Experience', suffix: '+' },
} as const;

export type StatKey = keyof typeof stats;
