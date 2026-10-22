/**
 * Minimal in-memory rate limiter for the contact endpoint.
 *
 * NOTE ON DEPLOYMENT: this keeps state in a single process. It provides
 * meaningful protection on a single long-lived instance and during local
 * development, but serverless platforms (including Vercel) may spin up
 * multiple isolated instances, so the limit is per-instance, not global.
 * For strict, globally-consistent limiting, back this with a shared store
 * such as Upstash Redis or Vercel KV (see README). It is intentionally
 * dependency-free so the project builds and runs without extra services.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60 * 60 * 1000,
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(identifier);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(identifier, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: limit - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Opportunistically drop expired buckets to bound memory use. */
export function pruneRateLimitBuckets(): void {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}
