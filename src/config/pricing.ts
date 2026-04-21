/**
 * Pricing dataset (PRC-01 / PRC-02 / PRC-03 / PRC-05 / PRC-07).
 *
 * LOCKED 2026-04-12: anchoring language, NOT price tiers. Zero currency amounts in this file.
 * Sarmad's framing (PRC-07) renders above the tier grid via PRICING_FRAMING.
 *
 * 5 tiers locked post-research (see 03-CONTEXT.md "Decisions finalized post-research"):
 *   single-template -> multi-input -> admin-portal -> workflow-platform -> enterprise-platform
 */
import type { ScopeTier } from '@/types/pricing';

/** Anchoring-language framing (PRC-07) rendered above the tier grid.
 *  Sarmad's approved alternate: "Built per use case — from simple generators to full-scale document systems." */
export const PRICING_FRAMING =
  'Projects typically range from custom document systems to full workflow automation platforms. The ladder below describes what gets built at each scope — for the price conversation, tell us about your project.' as const;

export const scopeTiers: ScopeTier[] = [
  {
    id: 'single-template',
    name: 'Single-template generator',
    summary: 'One document type, one input surface, one delivery channel.',
    includes: [
      'One branded document template',
      'One intake form or API endpoint',
      'Email or download delivery',
      'Basic generation logging',
    ],
    excludes: [
      'Admin dashboard',
      'Multi-user access',
      'Public verification page',
    ],
    timeline: '1-2 weeks',
    deepLinkType: 'certificates',
  },
  {
    id: 'multi-input',
    name: 'Multi-input document system',
    summary:
      'Multiple document types or intake sources with conditional logic and auto-calculations.',
    includes: [
      'Multiple document templates',
      'Multiple intake sources (form, API, CSV)',
      'Conditional fields and auto-calculations',
      'Email plus download delivery',
      'Structured generation logging',
    ],
    excludes: [
      'Admin dashboard',
      'Role-based permissions',
      'Custom branding surface',
    ],
    timeline: '2-4 weeks',
    deepLinkType: 'forms',
  },
  {
    id: 'admin-portal',
    name: 'Admin portal + generation pipeline',
    summary:
      'A generation pipeline behind an admin dashboard — history, search, optional public verification.',
    includes: [
      'Everything in the multi-input tier',
      'Admin dashboard with generation history',
      'Full-text search by recipient or document',
      'Optional public verification page',
      'Per-document audit trail',
    ],
    excludes: [
      'Multi-user access with separate permissions',
      'Integrations with external systems (SSO / CRM / HRIS)',
      'Department-level workflow routing',
    ],
    timeline: '3-6 weeks',
    deepLinkType: 'portals',
    highlight: true,
  },
  {
    id: 'workflow-platform',
    name: 'Full workflow platform',
    summary:
      'Multi-user workflows with role-based permissions, department routing, and audit logging.',
    includes: [
      'Everything in the admin-portal tier',
      'Multi-user access with role-based permissions',
      'Department-level workflow routing',
      'Approval chains where required',
      'Audit logging suitable for compliance review',
    ],
    excludes: [
      'Custom branding surface for white-label use',
      'Integrations with external systems (SSO / CRM / HRIS)',
      'Compliance-ready certification (SOC 2 / ISO 27001)',
    ],
    timeline: '6-10 weeks',
    deepLinkType: 'portals',
  },
  {
    id: 'enterprise-platform',
    name: 'White-labeled enterprise platform',
    summary:
      'End-to-end platform with custom branding, external-system integrations, and compliance-ready audit trail.',
    includes: [
      'Everything in the workflow-platform tier',
      'Custom branding surface for white-label use',
      'Integrations with existing systems (SSO / CRM / HRIS)',
      'Compliance-ready audit trail',
      'Deployment and knowledge-transfer to your team',
    ],
    excludes: [
      'Ongoing managed hosting (arranged separately)',
      'Dedicated support SLA (arranged separately)',
    ],
    timeline: '10+ weeks',
    deepLinkType: 'other',
  },
];
