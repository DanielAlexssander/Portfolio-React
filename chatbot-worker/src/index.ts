import { requestCompletion, type FetchLike } from './aiProvider.ts';
import { buildSystemPrompt } from './prompt.ts';
import { parseAllowedOrigins, parseChatRequest, rateLimitKey, readBodyWithLimit } from './request.ts';
import { consumeDailyQuota, type KvStore, type QuotaResult } from './usageQuota.ts';

export type { FetchLike, KvStore };

/** Cloudflare Workers Rate Limiting binding (see wrangler.toml). */
export interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  /** Secret: `npx wrangler secret put AI_API_KEY` */
  readonly AI_API_KEY?: string;
  readonly AI_BASE_URL?: string;
  readonly AI_MODEL?: string;
  readonly AI_REASONING_EFFORT?: string;
  /** Comma-separated list of sites allowed to call this Worker (browser CORS only). */
  readonly ALLOWED_ORIGINS?: string;
  /** Per visitor (IPv4 or IPv6 /64). Required: protects the AI quota. */
  readonly RATE_LIMITER?: RateLimiter;
  /** Shared by everyone. Required: caps the total even if many IPs are used. */
  readonly GLOBAL_LIMITER?: RateLimiter;
  /** Workers KV with the daily AI question count of each visitor. Required. */
  readonly AI_USAGE?: KvStore;
}

/** Lets the site tell "too fast" apart from "no more AI questions today". */
type ErrorCode = 'rate_limited' | 'daily_limit';

interface ApiResponse<T> {
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
  readonly code?: ErrorCode;
}

const MAX_BODY_BYTES = 2_000;
/** Shorter than the site's 15 s timeout, so the visitor never waits on a call that is still spending quota. */
const AI_TIMEOUT_MS = 12_000;
const GLOBAL_RATE_LIMIT_KEY = 'global';

type RateLimitResult = 'allowed' | 'limited' | 'misconfigured';

async function checkRateLimits(env: Env, ip: string | null): Promise<RateLimitResult> {
  if (!env.RATE_LIMITER || !env.GLOBAL_LIMITER) {
    return 'misconfigured';
  }
  const [perVisitor, global] = await Promise.all([
    env.RATE_LIMITER.limit({ key: rateLimitKey(ip) }),
    env.GLOBAL_LIMITER.limit({ key: GLOBAL_RATE_LIMIT_KEY }),
  ]);
  return perVisitor.success && global.success ? 'allowed' : 'limited';
}

/**
 * Counted only for valid questions about to reach the AI, before the call, so failures still count.
 * If KV fails (outage, free-plan write limit), the question goes through: the per-minute
 * limiters still protect the quota, and the chat keeps working.
 */
async function checkDailyQuota(kv: KvStore, ip: string | null, now: Date): Promise<QuotaResult | null> {
  try {
    return await consumeDailyQuota(kv, ip, now);
  } catch (error) {
    console.error('[chatbot-worker] AI_USAGE KV failed; skipping the daily limit', error);
    return null;
  }
}

const defaultFetch: FetchLike = (url, init) => fetch(url, init);

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json<T>(body: ApiResponse<T>, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json; charset=utf-8' },
  });
}

function readAiConfig(env: Env) {
  const apiKey = env.AI_API_KEY?.trim();
  const baseUrl = env.AI_BASE_URL?.trim();
  const model = env.AI_MODEL?.trim();
  if (!apiKey || !baseUrl || !model) {
    return null;
  }
  return { apiKey, baseUrl, model, reasoningEffort: env.AI_REASONING_EFFORT?.trim() || undefined };
}

export async function handleRequest(
  request: Request,
  env: Env,
  fetchImpl: FetchLike = defaultFetch,
  now: () => Date = () => new Date(),
): Promise<Response> {
  const origin = request.headers.get('Origin') ?? '';
  if (!parseAllowedOrigins(env.ALLOWED_ORIGINS).includes(origin)) {
    return json({ success: false, error: 'Origin not allowed' }, 403);
  }

  const cors = corsHeaders(origin);
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== 'POST') {
    return json({ success: false, error: 'Method not allowed' }, 405, { ...cors, Allow: 'POST, OPTIONS' });
  }

  if (!env.AI_USAGE) {
    console.error('[chatbot-worker] AI_USAGE KV binding missing (check wrangler.toml)');
    return json({ success: false, error: 'Service not configured' }, 503, cors);
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const rateLimit = await checkRateLimits(env, ip);
  if (rateLimit === 'misconfigured') {
    console.error('[chatbot-worker] RATE_LIMITER or GLOBAL_LIMITER binding missing (check wrangler.toml)');
    return json({ success: false, error: 'Service not configured' }, 503, cors);
  }
  if (rateLimit === 'limited') {
    return json(
      { success: false, error: 'Too many questions, try again in a minute', code: 'rate_limited' },
      429,
      cors,
    );
  }

  const declaredLength = Number(request.headers.get('Content-Length') ?? 0);
  const rawBody = declaredLength > MAX_BODY_BYTES ? null : await readBodyWithLimit(request, MAX_BODY_BYTES);
  if (rawBody === null) {
    return json({ success: false, error: 'Body too large' }, 413, cors);
  }

  const parsed = parseChatRequest(rawBody);
  if (!parsed.ok) {
    return json({ success: false, error: parsed.error }, 400, cors);
  }

  const config = readAiConfig(env);
  if (!config) {
    console.error('[chatbot-worker] Missing AI_API_KEY, AI_BASE_URL or AI_MODEL');
    return json({ success: false, error: 'Service not configured' }, 500, cors);
  }

  const quota = await checkDailyQuota(env.AI_USAGE, ip, now());
  if (quota && !quota.allowed) {
    return json({ success: false, error: 'Daily question limit reached', code: 'daily_limit' }, 429, cors);
  }
  // Omitted when KV failed: the site then keeps showing its last known count.
  const remaining = quota ? { remaining: quota.remaining } : {};

  try {
    const answer = await requestCompletion({
      ...config,
      systemPrompt: buildSystemPrompt(parsed.value.language, now()),
      question: parsed.value.question,
      timeoutMs: AI_TIMEOUT_MS,
      fetchImpl,
    });
    return json({ success: true, data: { answer, ...remaining } }, 200, cors);
  } catch (error) {
    console.error('[chatbot-worker] AI request failed', error);
    return json({ success: false, error: 'AI service unavailable' }, 502, cors);
  }
}

export default {
  fetch: (request: Request, env: Env): Promise<Response> => handleRequest(request, env),
};
