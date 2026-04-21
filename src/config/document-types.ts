import type { DocumentType } from '@/types/document-type';

/**
 * Landing Document Types grid — LOCKED as "core differentiator" per `.planning/ui-direction.md`.
 * Manually curated from the 7 solutions' examples[] arrays so each card carries a distinct
 * use case line, not a generic tag.
 *
 * Spans all 7 solutions (certificates, ecards, forms, invoices, permits, portals, contracts).
 * ≤16 entries shown at once per the UI contract.
 */
export const documentTypes: DocumentType[] = [
  // Certificates — 3
  {
    name: 'Course completion certificates',
    useCase: 'Branded certificates emailed the moment a student finishes a course.',
    solutionSlug: 'certificates',
    icon: 'award',
  },
  {
    name: 'Achievement certificates',
    useCase: 'Tournament placements, cohort achievements, season badges — bulk-generated per roster.',
    solutionSlug: 'certificates',
    icon: 'trophy',
  },
  {
    name: 'Professional credentials',
    useCase: 'Issued with a unique ID, verifiable on a public page, revocable if needed.',
    solutionSlug: 'certificates',
    icon: 'badge-check',
  },

  // eCards — 2
  {
    name: 'CPR eCards',
    useCase: 'Digital credentials with 2-year validity, unique IDs, and a public verify URL.',
    solutionSlug: 'ecards',
    icon: 'heart-pulse',
  },
  {
    name: 'Membership cards',
    useCase: 'Branded member cards issued per membership tier, with expiry and renewal tracking.',
    solutionSlug: 'ecards',
    icon: 'id-card',
  },

  // Forms — 2
  {
    name: 'Intake-to-document flows',
    useCase: 'A structured form on submit produces a branded PDF delivered to the submitter.',
    solutionSlug: 'forms',
    icon: 'file-input',
  },
  {
    name: 'Health records',
    useCase: 'Practice intake captures fields once; the record is composed and emailed in one pass.',
    solutionSlug: 'forms',
    icon: 'stethoscope',
  },

  // Invoices — 2
  {
    name: 'Line-item invoices',
    useCase: 'Structured order inputs become branded invoices with totals, tax, and payment terms.',
    solutionSlug: 'invoices',
    icon: 'receipt',
  },
  {
    name: 'Quote-to-invoice pipelines',
    useCase: 'Quote inputs feed a quote PDF; on acceptance, the invoice generates from the same record.',
    solutionSlug: 'invoices',
    icon: 'file-spreadsheet',
  },

  // Permits — 1
  {
    name: 'Official permits and licenses',
    useCase: 'Government-format output from structured intake, with audit-ready logging per issuance.',
    solutionSlug: 'permits',
    icon: 'stamp',
  },

  // Portals — 2
  {
    name: 'Admin dashboards',
    useCase: 'A searchable history of every document generated — by recipient, by operator, by category.',
    solutionSlug: 'portals',
    icon: 'layout-dashboard',
  },
  {
    name: 'Public verification pages',
    useCase: 'Each issued document gets a URL where third parties verify its authenticity by ID.',
    solutionSlug: 'portals',
    icon: 'search-check',
  },

  // Contracts — 2
  {
    name: 'Service agreements',
    useCase: 'Structured intake composes a signature-ready agreement using your clause library.',
    solutionSlug: 'contracts',
    icon: 'file-signature',
  },
  {
    name: 'Consent forms',
    useCase: 'Conditional disclosures appear only when required — one structured record per visit.',
    solutionSlug: 'contracts',
    icon: 'clipboard-check',
  },
];
