export type FetchLike = (url: string, init?: RequestInit) => Promise<Response>;

export interface CompletionRequest {
  /** OpenAI-compatible base URL, e.g. https://generativelanguage.googleapis.com/v1beta/openai */
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly model: string;
  /** Optional (Gemini accepts "minimal"). Leave empty for providers that reject it. */
  readonly reasoningEffort?: string;
  readonly systemPrompt: string;
  readonly question: string;
  readonly timeoutMs: number;
  readonly fetchImpl: FetchLike;
}

const MAX_OUTPUT_TOKENS = 800;
const MAX_ANSWER_LENGTH = 1_500;
const TEMPERATURE = 0.2;
const ERROR_BODY_PREVIEW = 300;

function buildBody(request: CompletionRequest): Record<string, unknown> {
  const body: Record<string, unknown> = {
    model: request.model,
    temperature: TEMPERATURE,
    max_tokens: MAX_OUTPUT_TOKENS,
    messages: [
      { role: 'system', content: request.systemPrompt },
      { role: 'user', content: request.question },
    ],
  };
  return request.reasoningEffort ? { ...body, reasoning_effort: request.reasoningEffort } : body;
}

function extractContent(data: unknown): string | null {
  const choices = (data as { choices?: Array<{ message?: { content?: unknown } }> } | null)?.choices;
  const content = Array.isArray(choices) ? choices[0]?.message?.content : undefined;
  return typeof content === 'string' && content.trim() ? content.trim().slice(0, MAX_ANSWER_LENGTH) : null;
}

/** Calls an OpenAI-compatible `/chat/completions` endpoint. Throws on any failure. */
export async function requestCompletion(request: CompletionRequest): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), request.timeoutMs);
  try {
    const response = await request.fetchImpl(`${request.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${request.apiKey}` },
      body: JSON.stringify(buildBody(request)),
      signal: controller.signal,
    });

    if (!response.ok) {
      const preview = (await response.text().catch(() => '')).slice(0, ERROR_BODY_PREVIEW);
      throw new Error(`AI provider answered ${response.status}: ${preview}`);
    }

    const content = extractContent(await response.json());
    if (!content) {
      throw new Error('AI provider returned an empty answer');
    }
    return content;
  } finally {
    clearTimeout(timer);
  }
}
