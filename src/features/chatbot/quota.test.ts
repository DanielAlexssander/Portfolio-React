import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_AI_LIMIT, loadRemaining, parseRemaining, saveRemaining, type QuotaStorage } from './quota.ts';

const memoryStorage = (): QuotaStorage & { readonly data: Map<string, string> } => {
  const data = new Map<string, string>();
  return {
    data,
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      data.set(key, value);
    },
  };
};

const TODAY = new Date('2026-11-13T15:00:00Z');
const TOMORROW = new Date('2026-11-14T00:00:01Z');

describe('parseRemaining', () => {
  it('accepts whole numbers between 0 and the limit', () => {
    assert.equal(parseRemaining(0), 0);
    assert.equal(parseRemaining(DAILY_AI_LIMIT), DAILY_AI_LIMIT);
  });

  it('rejects anything else', () => {
    for (const value of [-1, DAILY_AI_LIMIT + 1, 1.5, '3', null, undefined, Number.NaN]) {
      assert.equal(parseRemaining(value), null, String(value));
    }
  });
});

describe('remaining questions storage', () => {
  it('starts with the full limit', () => {
    assert.equal(loadRemaining(memoryStorage(), TODAY), DAILY_AI_LIMIT);
  });

  it('remembers the value for the same UTC day', () => {
    const storage = memoryStorage();
    saveRemaining(storage, 7, TODAY);
    assert.equal(loadRemaining(storage, TODAY), 7);
  });

  it('resets on the next UTC day', () => {
    const storage = memoryStorage();
    saveRemaining(storage, 0, TODAY);
    assert.equal(loadRemaining(storage, TOMORROW), DAILY_AI_LIMIT);
  });

  it('ignores corrupted values', () => {
    const storage = memoryStorage();
    storage.setItem('chatbot-ai-remaining', '{"day":"2026-11-13","remaining":"x"}');
    assert.equal(loadRemaining(storage, TODAY), DAILY_AI_LIMIT);
    storage.setItem('chatbot-ai-remaining', 'not json');
    assert.equal(loadRemaining(storage, TODAY), DAILY_AI_LIMIT);
  });

  it('works without storage (private mode, blocked site data)', () => {
    const throwing: QuotaStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
    };
    assert.equal(loadRemaining(throwing, TODAY), DAILY_AI_LIMIT);
    assert.doesNotThrow(() => saveRemaining(throwing, 3, TODAY));
    assert.equal(loadRemaining(undefined, TODAY), DAILY_AI_LIMIT);
  });
});
