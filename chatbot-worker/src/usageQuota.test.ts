import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_AI_LIMIT, consumeDailyQuota, quotaKey, type KvStore } from './usageQuota.ts';

/** Minimal in-memory KV with the two methods the quota needs. */
function fakeKv(): KvStore & { readonly data: Map<string, { value: string; ttl?: number }> } {
  const data = new Map<string, { value: string; ttl?: number }>();
  return {
    data,
    get: async (key) => data.get(key)?.value ?? null,
    put: async (key, value, options) => {
      data.set(key, { value, ttl: options?.expirationTtl });
    },
  };
}

const NOW = new Date('2026-11-13T15:00:00Z');
const IP = '203.0.113.7';

describe('quotaKey', () => {
  it('is per visitor and per UTC day', () => {
    assert.equal(quotaKey('203.0.113.7', NOW), 'ai-quota:2026-11-13:203.0.113.7');
    assert.notEqual(quotaKey('203.0.113.8', NOW), quotaKey('203.0.113.7', NOW));
    assert.notEqual(quotaKey(IP, new Date('2026-11-14T00:00:00Z')), quotaKey(IP, NOW));
  });

  it('groups IPv6 addresses by /64, like the rate limiter', () => {
    assert.equal(quotaKey('2001:db8:1:2::9', NOW), quotaKey('2001:db8:1:2:aaaa::1', NOW));
  });
});

describe('consumeDailyQuota', () => {
  it('allows up to the limit and reports what is left', async () => {
    const kv = fakeKv();
    const first = await consumeDailyQuota(kv, IP, NOW, 3);
    assert.deepEqual(first, { allowed: true, remaining: 2 });
    assert.deepEqual(await consumeDailyQuota(kv, IP, NOW, 3), { allowed: true, remaining: 1 });
    assert.deepEqual(await consumeDailyQuota(kv, IP, NOW, 3), { allowed: true, remaining: 0 });
  });

  it('blocks after the limit without increasing the counter', async () => {
    const kv = fakeKv();
    await consumeDailyQuota(kv, IP, NOW, 1);
    assert.deepEqual(await consumeDailyQuota(kv, IP, NOW, 1), { allowed: false, remaining: 0 });
    assert.equal(kv.data.get(quotaKey(IP, NOW))?.value, '1');
  });

  it('counts each visitor separately', async () => {
    const kv = fakeKv();
    await consumeDailyQuota(kv, IP, NOW, 1);
    assert.equal((await consumeDailyQuota(kv, '198.51.100.1', NOW, 1)).allowed, true);
  });

  it('starts over on the next day', async () => {
    const kv = fakeKv();
    await consumeDailyQuota(kv, IP, NOW, 1);
    const tomorrow = new Date('2026-11-14T00:00:01Z');
    assert.equal((await consumeDailyQuota(kv, IP, tomorrow, 1)).allowed, true);
  });

  it('expires the counter on its own', async () => {
    const kv = fakeKv();
    await consumeDailyQuota(kv, IP, NOW, 5);
    assert.ok((kv.data.get(quotaKey(IP, NOW))?.ttl ?? 0) >= 60);
  });

  it('treats a corrupted counter as zero', async () => {
    const kv = fakeKv();
    kv.data.set(quotaKey(IP, NOW), { value: 'abc' });
    assert.deepEqual(await consumeDailyQuota(kv, IP, NOW, 2), { allowed: true, remaining: 1 });
  });

  it('defaults to 20 questions per day', async () => {
    assert.equal(DAILY_AI_LIMIT, 20);
    const kv = fakeKv();
    const results = [];
    for (let i = 0; i < 21; i += 1) {
      results.push(await consumeDailyQuota(kv, IP, NOW));
    }
    assert.equal(results.filter((result) => result.allowed).length, 20);
    assert.equal(results[20]?.allowed, false);
  });
});
