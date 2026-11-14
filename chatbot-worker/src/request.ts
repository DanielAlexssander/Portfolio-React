import { MIN_QUESTION_LENGTH, sanitizeQuestion, visibleLength } from '../../src/features/chatbot/answer.ts';
import type { Language } from '../../src/types/index.ts';

export interface ChatRequest {
  readonly question: string;
  readonly language: Language;
}

export type ParseResult =
  | { readonly ok: true; readonly value: ChatRequest }
  | { readonly ok: false; readonly error: string };

const LANGUAGES: readonly Language[] = ['pt', 'en', 'es'];

const isLanguage = (value: unknown): value is Language =>
  typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value);

/** Validates the JSON body sent by the portfolio: `{ question, language }`. */
export function parseChatRequest(rawBody: string): ParseResult {
  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return { ok: false, error: 'Body must be valid JSON' };
  }

  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, error: 'Body must be a JSON object' };
  }

  const { question, language } = body as { question?: unknown; language?: unknown };
  if (typeof question !== 'string') {
    return { ok: false, error: '"question" must be a string' };
  }

  const cleanQuestion = sanitizeQuestion(question);
  if (!cleanQuestion) {
    return { ok: false, error: '"question" must not be empty' };
  }

  if (visibleLength(cleanQuestion) < MIN_QUESTION_LENGTH) {
    return { ok: false, error: '"question" is too short' };
  }

  if (!isLanguage(language)) {
    return { ok: false, error: '"language" must be pt, en or es' };
  }

  return { ok: true, value: { question: cleanQuestion, language } };
}

const IPV6_GROUPS = 8;
const IPV6_PREFIX_GROUPS = 4; // /64: one home connection usually owns the whole block

function expandIpv6(ip: string): readonly string[] {
  if (!ip.includes('::')) {
    return ip.split(':');
  }
  const [head = '', tail = ''] = ip.split('::');
  const headGroups = head ? head.split(':') : [];
  const tailGroups = tail ? tail.split(':') : [];
  const zeros = Array.from({ length: IPV6_GROUPS - headGroups.length - tailGroups.length }, () => '0');
  return [...headGroups, ...zeros, ...tailGroups];
}

/** Rate-limit key: the IPv4 address, or the /64 prefix of an IPv6 address. */
export function rateLimitKey(ip: string | null): string {
  if (!ip) {
    return 'unknown';
  }
  return ip.includes(':') ? expandIpv6(ip).slice(0, IPV6_PREFIX_GROUPS).join(':') : ip;
}

/** Reads the body as text, stopping as soon as it exceeds `maxBytes` (returns `null`). */
export async function readBodyWithLimit(request: Request, maxBytes: number): Promise<string | null> {
  if (!request.body) {
    return '';
  }
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(totalBytes);
  chunks.reduce((offset, chunk) => {
    bytes.set(chunk, offset);
    return offset + chunk.byteLength;
  }, 0);
  return new TextDecoder().decode(bytes);
}

/** "https://a.com, http://localhost:5173" → ["https://a.com", "http://localhost:5173"] */
export function parseAllowedOrigins(value: string | undefined): readonly string[] {
  return (value ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}
