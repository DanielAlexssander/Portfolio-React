/** AI questions each visitor may ask per UTC day. Shared by the site and chatbot-worker. */
export const DAILY_AI_LIMIT = 20;

/** The subset of `localStorage` used here, so tests can pass a fake. */
export interface QuotaStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

const STORAGE_KEY = 'chatbot-ai-remaining';

const utcDay = (now: Date): string => now.toISOString().slice(0, 10);

/** A valid remaining count (whole number from 0 to the limit), or `null`. */
export function parseRemaining(value: unknown): number | null {
  return typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= DAILY_AI_LIMIT
    ? value
    : null;
}

/**
 * Last known remaining count for today. Falls back to the full limit (new day, first visit,
 * blocked storage). It is only a display hint: the worker holds the real count.
 */
export function loadRemaining(storage: QuotaStorage | undefined, now: Date): number {
  try {
    const saved: unknown = JSON.parse(storage?.getItem(STORAGE_KEY) ?? 'null');
    if (typeof saved !== 'object' || saved === null) {
      return DAILY_AI_LIMIT;
    }
    const { day, remaining } = saved as { day?: unknown; remaining?: unknown };
    return day === utcDay(now) ? (parseRemaining(remaining) ?? DAILY_AI_LIMIT) : DAILY_AI_LIMIT;
  } catch {
    return DAILY_AI_LIMIT;
  }
}

export function saveRemaining(storage: QuotaStorage | undefined, remaining: number, now: Date): void {
  try {
    storage?.setItem(STORAGE_KEY, JSON.stringify({ day: utcDay(now), remaining }));
  } catch {
    // Private mode or blocked site data: the counter just resets on reload.
  }
}
