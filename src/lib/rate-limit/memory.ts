import type { RateLimitResult, RateLimitWindow } from './types';

// Parse window strings like '15 m', '1 h', '30 s' into milliseconds
function parseWindow(window: string): number {
  const match = window.match(/^(\d+)\s*(s|m|h|d)$/);
  if (!match) throw new Error(`Invalid rate-limit window format: "${window}"`);
  const [, num, unit] = match;
  const multipliers: Record<string, number> = {
    s: 1_000,
    m: 60_000,
    h: 3_600_000,
    d: 86_400_000,
  };
  return parseInt(num, 10) * multipliers[unit];
}

const store = new Map<string, { count: number; resetAt: number }>();

// WR-01: evict expired entries so the Map does not grow unbounded across HMR
// or long-running dev sessions with many unique keys.
function evictExpired(): void {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

// Dev-only: prevent unbounded growth in long hot-reload sessions.
// .unref?.() so the interval does not keep the Node process alive.
if (process.env.NODE_ENV !== 'production') {
  const handle = setInterval(evictExpired, 5 * 60_000);
  handle.unref?.();
}

export function createMemoryLimiter(
  key: string,
  config: { max: number; window: RateLimitWindow }
): RateLimitResult {
  const now = Date.now();
  const windowMs = parseWindow(config.window);
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: config.max - 1, reset: now + windowMs };
  }

  if (entry.count >= config.max) {
    return { success: false, remaining: 0, reset: entry.resetAt };
  }

  entry.count++;
  return {
    success: true,
    remaining: config.max - entry.count,
    reset: entry.resetAt,
  };
}
