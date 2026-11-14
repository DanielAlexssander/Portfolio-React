import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_TYPING_MS, TYPING_TICK_MS, charsPerTick, nextVisibleLength } from './typewriter.ts';

const ticksToFinish = (length: number): number => {
  const step = charsPerTick(length);
  let visible = 0;
  let ticks = 0;
  while (visible < length) {
    visible = nextVisibleLength(visible, length, step);
    ticks += 1;
  }
  return ticks;
};

describe('typewriter', () => {
  it('types short answers one character at a time', () => {
    assert.equal(charsPerTick(10), 1);
    assert.equal(ticksToFinish(10), 10);
  });

  it('speeds up long answers so they never take longer than the maximum', () => {
    for (const length of [100, 500, 1500, 5000]) {
      assert.ok(ticksToFinish(length) * TYPING_TICK_MS <= MAX_TYPING_MS + TYPING_TICK_MS, String(length));
    }
  });

  it('never goes past the end and handles empty text', () => {
    assert.equal(nextVisibleLength(8, 10, 5), 10);
    assert.equal(nextVisibleLength(10, 10, 5), 10);
    assert.equal(charsPerTick(0), 1);
    assert.equal(ticksToFinish(0), 0);
  });
});
