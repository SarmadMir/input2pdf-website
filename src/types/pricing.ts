/**
 * Pricing types (PRC-01 / PRC-02).
 *
 * LOCKED 2026-04-12: /pricing uses ANCHORING LANGUAGE, not dollar tiers. Scope tiers describe
 * what gets built, not what it costs. Zero `$` amounts appear anywhere in pricing.ts or its
 * consumers — enforced by tests/pricing-config.test.ts (Plan 03-15) and the voice-lint
 * prebuild script.
 */
import type { PROJECT_TYPES } from '@/lib/contact/schema';

/** Stable key for CTA linking, tests, and analytics. 5 tiers locked per 03-CONTEXT.md. */
export type ScopeTierId =
  | 'single-template'
  | 'multi-input'
  | 'admin-portal'
  | 'workflow-platform'
  | 'enterprise-platform';

export interface ScopeTier {
  /** Stable key (URL-safe, used in tests + analytics). */
  id: ScopeTierId;
  /** Short tier label rendered as the card heading. */
  name: string;
  /** 1-sentence tier description. */
  summary: string;
  /** 3-5 concrete deliverables this tier typically includes. */
  includes: string[];
  /** 2-4 scope fences — what this tier does NOT include (honest framing, per PRC-03). */
  excludes: string[];
  /** Timeline range in weeks (never days, never months-as-primary). */
  timeline: string;
  /** Default `contactHref({ type })` pre-fill value when the CTA is clicked.
   *  PRC-05 (locked 2026-04-12): no `&budget=` pre-fill. Only the type hint. */
  deepLinkType: typeof PROJECT_TYPES[number];
  /** Optional: mark one tier as the default visual anchor. */
  highlight?: boolean;
}
