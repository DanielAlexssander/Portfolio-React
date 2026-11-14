import type { Language } from '../../types/index.ts';

export type LocalizedText = Readonly<Record<Language, string>>;

/**
 * Priority of a topic when several match the same question:
 * specific (a technology, contact...) > general (about, skills...) > social (greetings).
 */
export type TopicTier = 'social' | 'general' | 'specific';

export interface ChatTopic {
  readonly id: string;
  readonly tier: TopicTier;
  /** Words or phrases that trigger the topic, in any of the three languages. */
  readonly keywords: readonly string[];
  /** Terms that cancel the topic (e.g. "experiência" cancels the age topic). */
  readonly exclude?: readonly string[];
  /** Answer per language. `{age}` is replaced with Daniel's current age. */
  readonly answer: LocalizedText;
}

export type ChatRole = 'user' | 'bot';

export interface ChatMessage {
  readonly id: string;
  readonly role: ChatRole;
  readonly text: string;
  /** Bot answer not typed out yet (drives the typing animation once). */
  readonly isNew?: boolean;
}

/** Asks the AI back-end. Resolves to `null` when no answer is available. */
export type AskAi = (question: string, language: Language) => Promise<string | null>;

/** Thrown by the AI client when the visitor used up today's AI questions. */
export class AiLimitReachedError extends Error {
  constructor() {
    super('Daily AI question limit reached');
    this.name = 'AiLimitReachedError';
  }
}
