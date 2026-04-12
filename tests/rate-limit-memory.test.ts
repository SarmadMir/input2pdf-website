import { describe, it, expect, beforeAll } from 'vitest';

// Ensure Upstash env is unset so the in-memory implementation is selected.
// Set once per test file — no resetModules needed.
beforeAll(() => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  process.env.NODE_ENV = 'test';
});

// Static imports — no dynamic imports, no module reset.
import { ratelimit } from '@/lib/rate-limit';
import { parseWindow } from '@/lib/rate-limit/memory';

const uniqueKey = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2)}`;

describe('parseWindow', () => {
  it.each([
    ['10 s', 10_000],
    ['1 m', 60_000],
    ['5 m', 300_000],
    ['15 m', 900_000],
    ['1 h', 3_600_000],
  ])('parses %s to %d ms', (input, expected) => {
    expect(parseWindow(input as string)).toBe(expected);
  });

  it('throws on invalid window format', () => {
    expect(() => parseWindow('nonsense')).toThrow();
  });
});

describe('memory rate limiter — limit enforcement', () => {
  it('allows N requests within window then rejects the (N+1)th', async () => {
    const key = uniqueKey('limit');
    const ok1 = await ratelimit(key, { max: 2, window: '1 m' });
    const ok2 = await ratelimit(key, { max: 2, window: '1 m' });
    const blocked = await ratelimit(key, { max: 2, window: '1 m' });
    expect(ok1.success).toBe(true);
    expect(ok2.success).toBe(true);
    expect(blocked.success).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it('tracks remaining correctly across consecutive calls', async () => {
    const key = uniqueKey('remaining');
    const r1 = await ratelimit(key, { max: 5, window: '1 m' });
    const r2 = await ratelimit(key, { max: 5, window: '1 m' });
    const r3 = await ratelimit(key, { max: 5, window: '1 m' });
    expect(r1.remaining).toBe(4);
    expect(r2.remaining).toBe(3);
    expect(r3.remaining).toBe(2);
  });
});

describe('memory rate limiter — window semantics', () => {
  it('returns a reset timestamp in the future within the window', async () => {
    const key = uniqueKey('reset');
    const start = Date.now();
    const r = await ratelimit(key, { max: 1, window: '10 s' });
    expect(r.reset).toBeGreaterThan(start);
    // 100ms jitter tolerance for test execution overhead
    expect(r.reset).toBeLessThanOrEqual(start + 10_000 + 100);
  });

  it('isolates keys from each other', async () => {
    const keyA = uniqueKey('isoA');
    const keyB = uniqueKey('isoB');
    await ratelimit(keyA, { max: 1, window: '1 m' });
    const blockedA = await ratelimit(keyA, { max: 1, window: '1 m' });
    const okB = await ratelimit(keyB, { max: 1, window: '1 m' });
    expect(blockedA.success).toBe(false);
    expect(okB.success).toBe(true);
  });

  it('accepts all RateLimitWindow values without throwing', async () => {
    const windows = ['10 s', '1 m', '5 m', '15 m', '1 h'] as const;
    for (const w of windows) {
      const r = await ratelimit(uniqueKey(`w-${w}`), { max: 1, window: w });
      expect(typeof r.success).toBe('boolean');
      expect(typeof r.reset).toBe('number');
    }
  });
});
