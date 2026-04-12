import type { RateLimitResult } from './types';

export type { RateLimitResult };

/**
 * Rate-limit a request by key.
 * Production: Upstash Redis sliding window.
 * Development: In-memory Map (with loud warning if used in prod).
 *
 * Fails CLOSED on Upstash errors in production (returns limited: true).
 */
export async function ratelimit(
  key: string,
  config: { max: number; window: string }
): Promise<RateLimitResult> {
  if (isUpstashConfigured()) {
    return upstashRateLimit(key, config);
  }

  if (process.env.NODE_ENV === 'production') {
    console.error(
      '[RATE-LIMIT] CRITICAL: Upstash env vars missing in production! ' +
      'Failing CLOSED — all requests will be rate-limited. ' +
      'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.'
    );
    return { success: false, remaining: 0, reset: Date.now() + 60_000 };
  }

  console.warn(
    '[RATE-LIMIT] Using in-memory fallback (dev only). ' +
    'Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for production.'
  );
  return memoryRateLimit(key, config);
}

function isUpstashConfigured(): boolean {
  return !!(
    process.env.UPSTASH_REDIS_REST_URL &&
    process.env.UPSTASH_REDIS_REST_TOKEN
  );
}

// Lazy imports to avoid loading Upstash SDK when not needed
async function upstashRateLimit(
  key: string,
  config: { max: number; window: string }
): Promise<RateLimitResult> {
  const { createUpstashLimiter } = await import('./upstash');
  return createUpstashLimiter(key, config);
}

async function memoryRateLimit(
  key: string,
  config: { max: number; window: string }
): Promise<RateLimitResult> {
  const { createMemoryLimiter } = await import('./memory');
  return createMemoryLimiter(key, config);
}
