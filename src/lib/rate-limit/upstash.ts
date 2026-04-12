import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import type { RateLimitResult, RateLimitWindow } from './types';

// Cache limiter instances by config signature to avoid re-creating per request
const limiterCache = new Map<string, Ratelimit>();

function getLimiter(config: { max: number; window: RateLimitWindow }): Ratelimit {
  const cacheKey = `${config.max}:${config.window}`;
  let limiter = limiterCache.get(cacheKey);
  if (!limiter) {
    limiter = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(
        config.max,
        config.window as Parameters<typeof Ratelimit.slidingWindow>[1]
      ),
      analytics: true,
      prefix: 'rl',
    });
    limiterCache.set(cacheKey, limiter);
  }
  return limiter;
}

export async function createUpstashLimiter(
  key: string,
  config: { max: number; window: RateLimitWindow }
): Promise<RateLimitResult> {
  try {
    const limiter = getLimiter(config);
    const result = await limiter.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    // Fail CLOSED: if Upstash errors, treat as rate-limited
    console.error('[RATE-LIMIT] Upstash error — failing closed:', error);
    return { success: false, remaining: 0, reset: Date.now() + 60_000 };
  }
}
