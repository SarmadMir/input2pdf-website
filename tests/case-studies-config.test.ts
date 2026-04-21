import { describe, it, expect } from 'vitest';
import { caseStudies, getCaseStudyBySlug } from '@/config/case-studies';

describe('CSE-01 / CSE-05 case studies', () => {
  it('has exactly 5 entries', () => {
    expect(caseStudies.length).toBe(5);
  });

  it('every entry passes CSE-05 quality gate (>=3 metrics, >=1 screenshot, hero image)', () => {
    for (const s of caseStudies) {
      expect(s.metrics.length, `${s.slug} metrics`).toBeGreaterThanOrEqual(3);
      expect(s.screenshots.length, `${s.slug} screenshots`).toBeGreaterThanOrEqual(1);
      expect(s.heroImage.src, `${s.slug} heroImage.src`).toBeTruthy();
    }
  });

  it('every slug resolves via getCaseStudyBySlug', () => {
    for (const s of caseStudies) {
      expect(getCaseStudyBySlug(s.slug)).toBeDefined();
    }
    expect(getCaseStudyBySlug('unknown-slug-xyz')).toBeUndefined();
  });

  it('Agreement Description Form entry is tagged to contracts (CSE-12)', () => {
    const entry = caseStudies.find((c) => c.slug === 'agreement-description');
    expect(entry).toBeDefined();
    expect(entry?.solutionSlug).toBe('contracts');
  });
});
