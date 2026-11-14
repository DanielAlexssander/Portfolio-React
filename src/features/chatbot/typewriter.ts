/** Time between two typing steps. */
export const TYPING_TICK_MS = 20;
/** Longest an answer takes to type; longer answers type more characters per step. */
export const MAX_TYPING_MS = 1500;

const MAX_TICKS = Math.floor(MAX_TYPING_MS / TYPING_TICK_MS);

/** Characters revealed per step: 1 for short answers, more for long ones. */
export function charsPerTick(length: number): number {
  return Math.max(1, Math.ceil(length / MAX_TICKS));
}

export function nextVisibleLength(current: number, total: number, step: number): number {
  return Math.min(total, current + step);
}
