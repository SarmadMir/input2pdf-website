/**
 * Allowed rate-limit window strings.
 *
 * Enforced at every `ratelimit()` callsite so dev (memory store) and prod
 * (Upstash sliding window) cannot silently diverge on malformed formats.
 * Both implementations parse the `<number> <unit>` format identically.
 */
export type RateLimitWindow = '10 s' | '1 m' | '5 m' | '15 m' | '1 h';

export interface RateLimitResult {
  /** Whether the request is allowed */
  success: boolean;
  /** Remaining requests in the current window */
  remaining: number;
  /** Unix timestamp (ms) when the window resets */
  reset: number;
}
