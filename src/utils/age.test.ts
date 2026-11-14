import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getAge } from './age.ts';

describe('getAge', () => {
  it('does not count the birthday before August 16', () => {
    assert.equal(getAge(new Date(2026, 7, 15)), 20);
  });

  it('counts the birthday on August 16', () => {
    assert.equal(getAge(new Date(2026, 7, 16)), 21);
  });

  it('keeps the same age until the next birthday', () => {
    assert.equal(getAge(new Date(2026, 11, 31)), 21);
    assert.equal(getAge(new Date(2027, 0, 1)), 21);
  });
});
