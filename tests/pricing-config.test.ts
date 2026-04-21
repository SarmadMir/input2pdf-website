import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, it, expect } from 'vitest';
import { scopeTiers, PRICING_FRAMING } from '@/config/pricing';
import { PROJECT_TYPES } from '@/lib/contact/schema';

const ROOT = resolve(__dirname, '..');
const PRICING_SOURCES = ['src/config/pricing.ts', 'src/types/pricing.ts'];

describe('PRC-01 / PRC-02 pricing invariants', () => {
  it('has exactly 5 scope tiers (locked 2026-04-12)', () => {
    expect(scopeTiers.length).toBe(5);
  });

  it('zero dollar characters in either pricing file (PRC-01 lock)', () => {
    for (const p of PRICING_SOURCES) {
      const content = readFileSync(resolve(ROOT, p), 'utf8');
      expect(/\$[0-9]/.test(content), `${p} contains $[0-9]`).toBe(false);
    }
  });

  it('PRICING_FRAMING is non-empty and references "scope"', () => {
    expect(PRICING_FRAMING.length).toBeGreaterThan(20);
    expect(PRICING_FRAMING.toLowerCase()).toContain('scope');
  });

  it('every deepLinkType is a valid PROJECT_TYPES value', () => {
    for (const t of scopeTiers) {
      expect(PROJECT_TYPES, `tier ${t.id} deepLinkType`).toContain(t.deepLinkType);
    }
  });

  it('exactly one tier is highlighted (anchor tier)', () => {
    const highlighted = scopeTiers.filter((t) => t.highlight === true);
    expect(highlighted.length).toBe(1);
  });
});
