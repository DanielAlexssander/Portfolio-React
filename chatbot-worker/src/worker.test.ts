import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { handleRequest, type Env, type FetchLike, type RateLimiter } from './index.ts';
import { buildSystemPrompt } from './prompt.ts';
import { parseChatRequest, rateLimitKey } from './request.ts';
import { DAILY_AI_LIMIT, type KvStore } from './usageQuota.ts';
import { CHAT_TEXTS } from '../../src/features/chatbot/texts.ts';

const ORIGIN = 'https://danielrossinatti.site';

const limiter = (success: boolean): RateLimiter => ({ limit: async () => ({ success }) });

const memoryKv = (): KvStore & { readonly data: Map<string, string> } => {
  const data = new Map<string, string>();
  return {
    data,
    get: async (key) => data.get(key) ?? null,
    put: async (key, value) => {
      data.set(key, value);
    },
  };
};

const BASE_ENV: Env = {
  AI_API_KEY: 'test-key',
  AI_BASE_URL: 'https://ai.example.com/v1/',
  AI_MODEL: 'test-model',
  AI_REASONING_EFFORT: 'minimal',
  ALLOWED_ORIGINS: `${ORIGIN}, http://localhost:5173`,
  RATE_LIMITER: limiter(true),
  GLOBAL_LIMITER: limiter(true),
  // Stateless, so the count never leaks between tests (each request sees an unused quota).
  AI_USAGE: { get: async () => null, put: async () => undefined },
};

interface RequestOptions {
  readonly origin?: string;
  readonly method?: string;
  readonly rawBody?: string;
  readonly ip?: string;
}

const chatRequest = (body: unknown, options: RequestOptions = {}): Request => {
  const method = options.method ?? 'POST';
  const hasBody = method === 'POST';
  const headers = new Headers({ 'Content-Type': 'application/json', Origin: options.origin ?? ORIGIN });
  if (options.ip) {
    headers.set('CF-Connecting-IP', options.ip);
  }
  return new Request('https://worker.example.com/', {
    method,
    headers,
    body: hasBody ? (options.rawBody ?? JSON.stringify(body)) : undefined,
  });
};

const completion = (content: string): Response =>
  new Response(JSON.stringify({ choices: [{ message: { content } }] }), { status: 200 });

const VALID_BODY = { question: 'Ele sabe Rust?', language: 'pt' };

describe('parseChatRequest', () => {
  it('accepts a valid body and cleans the question', () => {
    assert.deepEqual(parseChatRequest('{"question":"  Ele   sabe Rust? ","language":"en"}'), {
      ok: true,
      value: { question: 'Ele sabe Rust?', language: 'en' },
    });
  });

  it('rejects invalid input', () => {
    const invalid = ['not json', '[]', '{"language":"pt"}', '{"question":"   ","language":"pt"}', '{"question":"oi","language":"fr"}'];
    for (const raw of invalid) {
      assert.equal(parseChatRequest(raw).ok, false, raw);
    }
  });
});

describe('rateLimitKey', () => {
  it('uses the whole IPv4 address', () => {
    assert.equal(rateLimitKey('203.0.113.7'), '203.0.113.7');
  });

  it('groups IPv6 addresses by their /64 prefix', () => {
    assert.equal(rateLimitKey('2001:db8:1:2:3:4:5:6'), '2001:db8:1:2');
    assert.equal(rateLimitKey('2001:db8:1:2::9'), '2001:db8:1:2');
    assert.equal(rateLimitKey('2001:db8::1'), '2001:db8:0:0');
  });

  it('falls back to a shared key without an IP', () => {
    assert.equal(rateLimitKey(null), 'unknown');
  });
});

describe('buildSystemPrompt', () => {
  const prompt = buildSystemPrompt('en', new Date(2026, 10, 13));

  it('includes the profile with the current age', () => {
    assert.ok(prompt.includes('21 anos'));
    assert.ok(!prompt.includes('{age}'));
  });

  it('includes the refusal message in every language and the fallback language', () => {
    for (const texts of Object.values(CHAT_TEXTS)) {
      assert.ok(prompt.includes(texts.outOfScope));
    }
    assert.ok(prompt.includes('inglês'));
  });
});

describe('handleRequest', () => {
  beforeEach(() => {
    mock.method(console, 'error', () => undefined);
  });

  afterEach(() => {
    mock.restoreAll();
  });

  const unusedFetch: FetchLike = async () => {
    throw new Error('fetch should not be called');
  };

  it('rejects unknown origins', async () => {
    const response = await handleRequest(chatRequest(VALID_BODY, { origin: 'https://evil.example.com' }), BASE_ENV, unusedFetch);
    assert.equal(response.status, 403);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), null);
  });

  it('answers the CORS preflight', async () => {
    const response = await handleRequest(chatRequest(null, { method: 'OPTIONS' }), BASE_ENV, unusedFetch);
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), ORIGIN);
  });

  it('only accepts POST', async () => {
    const response = await handleRequest(chatRequest(null, { method: 'GET' }), BASE_ENV, unusedFetch);
    assert.equal(response.status, 405);
  });

  it('rejects invalid and oversized bodies', async () => {
    const invalid = await handleRequest(chatRequest(null, { rawBody: '{"question":1}' }), BASE_ENV, unusedFetch);
    assert.equal(invalid.status, 400);

    const oversized = await handleRequest(chatRequest(null, { rawBody: 'x'.repeat(5_000) }), BASE_ENV, unusedFetch);
    assert.equal(oversized.status, 413);

    const declaredTooLarge = new Request('https://worker.example.com/', {
      method: 'POST',
      headers: { Origin: ORIGIN, 'Content-Length': '999999' },
      body: '{}',
    });
    assert.equal((await handleRequest(declaredTooLarge, BASE_ENV, unusedFetch)).status, 413);
  });

  it('applies the rate limit per visitor', async () => {
    const limit = mock.fn(async () => ({ success: false }));
    const env: Env = { ...BASE_ENV, RATE_LIMITER: { limit } };
    const response = await handleRequest(chatRequest(VALID_BODY, { ip: '2001:db8:1:2::9' }), env, unusedFetch);

    assert.equal(response.status, 429);
    assert.deepEqual(limit.mock.calls[0]?.arguments, [{ key: '2001:db8:1:2' }]);
  });

  it('applies the global rate limit', async () => {
    const env: Env = { ...BASE_ENV, GLOBAL_LIMITER: limiter(false) };
    const response = await handleRequest(chatRequest(VALID_BODY), env, unusedFetch);
    assert.equal(response.status, 429);
  });

  it('refuses to run without the rate limit bindings', async () => {
    const response = await handleRequest(chatRequest(VALID_BODY), { ...BASE_ENV, GLOBAL_LIMITER: undefined }, unusedFetch);
    assert.equal(response.status, 503);
  });

  it('blocks a visitor who used up the daily AI quota, without calling the AI', async () => {
    const kv = memoryKv();
    const env: Env = { ...BASE_ENV, AI_USAGE: kv };
    const fetchImpl = mock.fn<FetchLike>(async () => completion('ok'));

    for (let i = 0; i < DAILY_AI_LIMIT; i += 1) {
      assert.equal((await handleRequest(chatRequest(VALID_BODY, { ip: '203.0.113.7' }), env, fetchImpl)).status, 200);
    }
    const blocked = await handleRequest(chatRequest(VALID_BODY, { ip: '203.0.113.7' }), env, fetchImpl);

    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get('Access-Control-Allow-Origin'), ORIGIN);
    assert.deepEqual(await blocked.json(), { success: false, error: 'Daily question limit reached', code: 'daily_limit' });
    assert.equal(fetchImpl.mock.callCount(), DAILY_AI_LIMIT);

    const other = await handleRequest(chatRequest(VALID_BODY, { ip: '198.51.100.9' }), env, fetchImpl);
    assert.equal(other.status, 200);
  });

  it('tells the site how many AI questions are left today', async () => {
    const env: Env = { ...BASE_ENV, AI_USAGE: memoryKv() };
    const fetchImpl = async () => completion('ok');
    const first = await handleRequest(chatRequest(VALID_BODY), env, fetchImpl);
    const second = await handleRequest(chatRequest(VALID_BODY), env, fetchImpl);
    assert.deepEqual(await first.json(), { success: true, data: { answer: 'ok', remaining: DAILY_AI_LIMIT - 1 } });
    assert.deepEqual(await second.json(), { success: true, data: { answer: 'ok', remaining: DAILY_AI_LIMIT - 2 } });
  });

  it('does not spend quota on invalid requests', async () => {
    const kv = memoryKv();
    const env: Env = { ...BASE_ENV, AI_USAGE: kv };
    await handleRequest(chatRequest(null, { rawBody: '{"question":1}' }), env, unusedFetch);
    assert.equal(kv.data.size, 0);
  });

  it('still answers (and logs) when the quota storage fails', async () => {
    const brokenKv: KvStore = {
      get: async () => {
        throw new Error('KV unavailable');
      },
      put: async () => undefined,
    };
    const fetchImpl = mock.fn<FetchLike>(async () => completion('ok'));
    const response = await handleRequest(chatRequest(VALID_BODY), { ...BASE_ENV, AI_USAGE: brokenKv }, fetchImpl);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), ORIGIN);
    assert.equal(fetchImpl.mock.callCount(), 1);
    assert.deepEqual(await response.json(), { success: true, data: { answer: 'ok' } });
  });

  it('refuses to run without the quota storage', async () => {
    const response = await handleRequest(chatRequest(VALID_BODY), { ...BASE_ENV, AI_USAGE: undefined }, unusedFetch);
    assert.equal(response.status, 503);
  });

  it('marks the per-minute limit with its own code', async () => {
    const env: Env = { ...BASE_ENV, GLOBAL_LIMITER: limiter(false) };
    const response = await handleRequest(chatRequest(VALID_BODY), env, unusedFetch);
    assert.equal(((await response.json()) as { code?: string }).code, 'rate_limited');
  });

  it('fails clearly when the AI is not configured', async () => {
    const response = await handleRequest(chatRequest(VALID_BODY), { ...BASE_ENV, AI_API_KEY: '' }, unusedFetch);
    assert.equal(response.status, 500);
  });

  it('asks the AI provider and returns its answer', async () => {
    const fetchImpl = mock.fn<FetchLike>(async () => completion(' Não consta no perfil dele. '));

    const response = await handleRequest(chatRequest(VALID_BODY), BASE_ENV, fetchImpl);

    assert.equal(response.status, 200);
    assert.equal(response.headers.get('Access-Control-Allow-Origin'), ORIGIN);
    assert.deepEqual(await response.json(), {
      success: true,
      data: { answer: 'Não consta no perfil dele.', remaining: DAILY_AI_LIMIT - 1 },
    });

    const [url, init] = fetchImpl.mock.calls[0]?.arguments ?? [];
    assert.equal(url, 'https://ai.example.com/v1/chat/completions');
    assert.equal(new Headers(init?.headers).get('Authorization'), 'Bearer test-key');
    const sent = JSON.parse(String(init?.body));
    assert.equal(sent.model, 'test-model');
    assert.equal(sent.reasoning_effort, 'minimal');
    assert.equal(sent.messages[0].role, 'system');
    assert.deepEqual(sent.messages[1], { role: 'user', content: 'Ele sabe Rust?' });
  });

  it('omits reasoning_effort when it is not configured', async () => {
    const fetchImpl = mock.fn<FetchLike>(async () => completion('ok'));
    await handleRequest(chatRequest(VALID_BODY), { ...BASE_ENV, AI_REASONING_EFFORT: '' }, fetchImpl);
    const sent = JSON.parse(String(fetchImpl.mock.calls[0]?.arguments[1]?.body));
    assert.equal('reasoning_effort' in sent, false);
  });

  it('returns 502 when the AI provider fails or answers nothing', async () => {
    const failing = await handleRequest(chatRequest(VALID_BODY), BASE_ENV, async () => new Response('quota', { status: 429 }));
    assert.equal(failing.status, 502);

    const empty = await handleRequest(chatRequest(VALID_BODY), BASE_ENV, async () => completion('   '));
    assert.equal(empty.status, 502);
  });
});
