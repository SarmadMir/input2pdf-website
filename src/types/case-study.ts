import type { SolutionSlug } from '@/config/solutions';

export interface CaseStudyScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  /** Stable URL key -- used in /case-studies/[slug] */
  slug: string;

  /** Client name (real if permission granted, anonymized otherwise) */
  clientName: string;

  /** Whether the client name is anonymized */
  anonymized: boolean;

  /** Client industry for context */
  industry: string;

  /** Related solution type -- links to /solutions/[slug] */
  solutionSlug: SolutionSlug;

  /** Problem the client was facing */
  problemStatement: string;

  /** How Input2PDF solved it */
  approachSummary: string;

  /** Results with concrete metrics */
  outcome: string;

  /** Concrete numbers proving value (min 3 per CSE-05 quality gate) */
  metrics: CaseStudyMetric[];

  /** 3-5 screenshots (min 1 real per CSE-05 quality gate) */
  screenshots: CaseStudyScreenshot[];

  /** Technologies used in the project */
  technologies: string[];

  /** Project timeline / duration */
  timeline: string;

  /** Card-level summary for index page (1-2 sentences) */
  summary: string;

  /** Hero image for the case study page */
  heroImage: CaseStudyScreenshot;

  /** Optional client testimonial */
  testimonial?: {
    quote: string;
    attribution: string;
  };

  /** Optional live link to client's program */
  clientUrl?: string;
}
