import { DAILY_AI_LIMIT } from '../../src/features/chatbot/quota.ts';
import { rateLimitKey } from './request.ts';

export { DAILY_AI_LIMIT };

/** The two Workers KV methods the quota needs (see the AI_USAGE binding in wrangler.toml). */
export interface KvStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface QuotaResult {
  readonly allowed: boolean;
  readonly remaining: number;
}

/** Kept a little longer than a day, so the counter outlives its own day and then disappears. */
const COUNTER_TTL_SECONDS = 26 * 60 * 60;

/** One counter per visitor (IPv4, or IPv6 /64) per UTC day. */
export function quotaKey(ip: string | null, now: Date): string {
  const day = now.toISOString().slice(0, 10);
  return `ai-quota:${day}:${rateLimitKey(ip)}`;
}

function parseCount(value: string | null): number {
  const count = Number(value);
  return Number.isInteger(count) && count > 0 ? count : 0;
}

/**
 * Counts one AI question for the visitor, or refuses it when the daily limit is reached.
 * KV is not atomic and its reads may be cached for about a minute, so a fast visitor can
 * overshoot by up to the per-minute limit (10). Exact counting would need a Durable Object.
 */
export async function consumeDailyQuota(
  kv: KvStore,
  ip: string | null,
  now: Date,
  limit: number = DAILY_AI_LIMIT,
): Promise<QuotaResult> {
  const key = quotaKey(ip, now);
  const used = parseCount(await kv.get(key));
  if (used >= limit) {
    return { allowed: false, remaining: 0 };
  }
  const updated = used + 1;
  await kv.put(key, String(updated), { expirationTtl: COUNTER_TTL_SECONDS });
  return { allowed: true, remaining: limit - updated };
}
