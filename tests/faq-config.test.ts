import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { faqItems, landingFaqIds } from '@/config/faq';

// tests/ is at input2pdf-website/tests/; the review queue lives at the workspace root
// under .planning/... — two levels up from __dirname.
const ROOT = resolve(__dirname, '..', '..');
const QUEUE_PATH = resolve(
  ROOT,
  '.planning/phases/03-landing-polish-pricing-case-studies/COMPETITOR-LINES-REVIEW.md',
);

describe('CNT-04 / CMP-03 / CMP-06 FAQ invariants', () => {
  it('has 13-16 entries (CNT-04)', () => {
    expect(faqItems.length).toBeGreaterThanOrEqual(13);
    expect(faqItems.length).toBeLessThanOrEqual(16);
  });

  it('has >=6 positioning entries (CMP-03 minimum is 3; we enforce 6)', () => {
    const positioning = faqItems.filter((i) => i.category === 'positioning');
    expect(positioning.length).toBeGreaterThanOrEqual(6);
  });

  it('every landingFaqIds id resolves to an existing faqItem', () => {
    expect(landingFaqIds.length).toBeGreaterThanOrEqual(4);
    expect(landingFaqIds.length).toBeLessThanOrEqual(5);
    for (const id of landingFaqIds) {
      expect(faqItems.find((i) => i.id === id), `landingFaqIds id ${id} missing`).toBeDefined();
    }
  });

  it('every namesCompetitor:true entry is listed in COMPETITOR-LINES-REVIEW.md (CMP-06)', () => {
    const queue = readFileSync(QUEUE_PATH, 'utf8');
    const flagged = faqItems.filter((i) => i.namesCompetitor === true);
    for (const item of flagged) {
      expect(queue, `${item.id} not in review queue`).toContain(item.id);
    }
  });

  it('3 Sarmad-baseline positioning ids are present verbatim', () => {
    const ids = faqItems.map((i) => i.id);
    expect(ids).toContain('positioning-saas');
    expect(ids).toContain('positioning-compare-esign');
    expect(ids).toContain('positioning-when-not');
  });
});
