import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { createAiClient, type FetchLike } from './aiClient.ts';
import { AiLimitReachedError } from './types.ts';

const ENDPOINT = 'https://chatbot.example.workers.dev';

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const clientWith = (fetchImpl: FetchLike, timeoutMs?: number) => {
  const askAi = createAiClient(ENDPOINT, { fetchImpl, timeoutMs });
  assert.ok(askAi, 'client should be enabled');
  return askAi;
};

describe('createAiClient', () => {
  beforeEach(() => {
    mock.method(console, 'warn', () => undefined);
  });

  afterEach(() => {
    mock.restoreAll();
  });

  it('is disabled without an endpoint', () => {
    assert.equal(createAiClient(undefined), undefined);
    assert.equal(createAiClient('  '), undefined);
  });

  it('is disabled with an invalid or insecure endpoint', () => {
    assert.equal(createAiClient('not a url'), undefined);
    assert.equal(createAiClient('http://example.com'), undefined);
  });

  it('accepts plain http on localhost for development', () => {
    assert.equal(typeof createAiClient('http://localhost:8787'), 'function');
  });

  it('posts the question and returns the trimmed answer', async () => {
    const fetchImpl = mock.fn<FetchLike>(async () => jsonResponse({ success: true, data: { answer: ' Resposta ' } }));
    const answer = await clientWith(fetchImpl)('Ele sabe Rust?', 'pt');

    assert.equal(answer, 'Resposta');
    const [url, init] = fetchImpl.mock.calls[0]?.arguments ?? [];
    assert.equal(url, ENDPOINT);
    assert.equal(init?.method, 'POST');
    assert.deepEqual(JSON.parse(String(init?.body)), { question: 'Ele sabe Rust?', language: 'pt' });
  });

  it('returns null when the server answers with an error status', async () => {
    const askAi = clientWith(async () => jsonResponse({ success: false, error: 'Too many requests' }, 429));
    assert.equal(await askAi('x', 'pt'), null);
  });

  it('throws AiLimitReachedError when the daily quota is used up', async () => {
    const askAi = clientWith(async () =>
      jsonResponse({ success: false, error: 'Daily question limit reached', code: 'daily_limit' }, 429),
    );
    await assert.rejects(askAi('x', 'pt'), AiLimitReachedError);
  });

  it('reports the remaining AI questions', async () => {
    const onRemaining = mock.fn<(remaining: number) => void>();
    const answered = createAiClient(ENDPOINT, {
      fetchImpl: async () => jsonResponse({ success: true, data: { answer: 'ok', remaining: 17 } }),
      onRemaining,
    });
    await answered?.('x', 'pt');
    assert.deepEqual(onRemaining.mock.calls.map((call) => call.arguments[0]), [17]);

    const limited = createAiClient(ENDPOINT, {
      fetchImpl: async () => jsonResponse({ success: false, code: 'daily_limit' }, 429),
      onRemaining,
    });
    await assert.rejects(limited?.('x', 'pt') ?? Promise.resolve(), AiLimitReachedError);
    assert.equal(onRemaining.mock.calls.at(-1)?.arguments[0], 0);
  });

  it('does not report a missing or invalid remaining count', async () => {
    const onRemaining = mock.fn<(remaining: number) => void>();
    for (const remaining of [undefined, -3, 'ten']) {
      const askAi = createAiClient(ENDPOINT, {
        fetchImpl: async () => jsonResponse({ success: true, data: { answer: 'ok', remaining } }),
        onRemaining,
      });
      assert.equal(await askAi?.('x', 'pt'), 'ok');
    }
    assert.equal(onRemaining.mock.callCount(), 0);
  });

  it('returns null when the body is malformed', async () => {
    assert.equal(await clientWith(async () => jsonResponse({ success: true, data: {} }))('x', 'pt'), null);
    assert.equal(await clientWith(async () => new Response('not json'))('x', 'pt'), null);
  });

  it('returns null on network failure', async () => {
    const askAi = clientWith(async () => {
      throw new TypeError('Failed to fetch');
    });
    assert.equal(await askAi('x', 'pt'), null);
  });

  it('returns null when the request times out', async () => {
    const neverResolves: FetchLike = (_url, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
      });
    assert.equal(await clientWith(neverResolves, 10)('x', 'pt'), null);
  });
});
