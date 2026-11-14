import type { Language } from '../../types/index.ts';
import { parseRemaining } from './quota.ts';
import { AiLimitReachedError, type AskAi } from './types.ts';

export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

export interface AiClientOptions {
  readonly fetchImpl?: FetchLike;
  readonly timeoutMs?: number;
  /** Called with the AI questions left today, whenever the worker reports it. */
  readonly onRemaining?: (remaining: number) => void;
}

const DEFAULT_TIMEOUT_MS = 15_000;
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1']);

// Wrapped so `fetch` is never called with another object as `this` ("Illegal invocation").
const defaultFetch: FetchLike = (url, init) => fetch(url, init);

/** The endpoint itself when it is https (or http on localhost); otherwise `null`. */
function validateEndpoint(endpoint: string | undefined): string | null {
  const trimmed = endpoint?.trim();
  if (!trimmed) {
    return null;
  }
  try {
    const url = new URL(trimmed);
    const isSecure = url.protocol === 'https:' || (url.protocol === 'http:' && LOCAL_HOSTS.has(url.hostname));
    return isSecure ? trimmed : null;
  } catch {
    return null;
  }
}

interface ParsedReply {
  readonly answer: string | null;
  readonly remaining: number | null;
}

function readReply(body: unknown): ParsedReply {
  if (typeof body !== 'object' || body === null) {
    return { answer: null, remaining: null };
  }
  const { success, data } = body as { success?: unknown; data?: { answer?: unknown; remaining?: unknown } };
  const answer = success === true ? data?.answer : undefined;
  return {
    answer: typeof answer === 'string' && answer.trim() ? answer.trim() : null,
    remaining: parseRemaining(data?.remaining),
  };
}

const HTTP_TOO_MANY_REQUESTS = 429;

/** True when the worker refused because the visitor's daily AI questions are used up. */
async function isDailyLimit(response: Response): Promise<boolean> {
  if (response.status !== HTTP_TOO_MANY_REQUESTS) {
    return false;
  }
  try {
    const body: unknown = await response.json();
    return typeof body === 'object' && body !== null && (body as { code?: unknown }).code === 'daily_limit';
  } catch {
    return false;
  }
}

/**
 * Client for the chatbot-worker. Returns `undefined` (AI disabled) when the endpoint
 * is missing or invalid, so the site keeps working in keyword-only mode.
 */
export function createAiClient(endpoint: string | undefined, options: AiClientOptions = {}): AskAi | undefined {
  const url = validateEndpoint(endpoint);
  if (!url) {
    if (endpoint?.trim()) {
      console.warn('[chatbot] Invalid VITE_CHATBOT_API_URL; AI disabled. Use https (or http on localhost).');
    }
    return undefined;
  }

  const fetchImpl = options.fetchImpl ?? defaultFetch;
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  return async (question: string, language: Language): Promise<string | null> => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, language }),
        signal: controller.signal,
      });
      if (await isDailyLimit(response)) {
        options.onRemaining?.(0);
        throw new AiLimitReachedError();
      }
      if (!response.ok) {
        console.warn(`[chatbot] AI endpoint answered ${response.status}`);
        return null;
      }
      const { answer, remaining } = readReply(await response.json());
      if (remaining !== null) {
        options.onRemaining?.(remaining);
      }
      if (!answer) {
        console.warn('[chatbot] AI endpoint returned an unexpected body');
      }
      return answer;
    } catch (error) {
      if (error instanceof AiLimitReachedError) {
        throw error;
      }
      console.warn('[chatbot] AI request failed', error);
      return null;
    } finally {
      clearTimeout(timer);
    }
  };
}
