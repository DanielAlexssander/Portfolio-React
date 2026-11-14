import type { Language } from '../../types/index.ts';
import { getAge } from '../../utils/age.ts';
import { KNOWLEDGE_TOPICS } from './knowledge/index.ts';
import { countWordsOutsideKeywords, findMatchingTopics } from './matcher.ts';
import { CHAT_TEXTS } from './texts.ts';
import { AiLimitReachedError, type AskAi, type ChatTopic } from './types.ts';

export const MAX_QUESTION_LENGTH = 300;
/** Shorter messages ("a", "?", "👍") get an automatic reply and never reach the AI. */
export const MIN_QUESTION_LENGTH = 2;

const ANSWER_SEPARATOR = '\n\n';
/** "Oi, ele sabe Docker?" has a real question after the greeting; "Oi, tudo bem?" does not. */
const MIN_WORDS_AFTER_GREETING = 2;
// eslint-disable-next-line no-control-regex -- the point is to strip control characters
const CONTROL_CHARACTERS = /[\u0000-\u001F\u007F]/g;

export interface AnswerDeps {
  /** Called only when no keyword matches. Omit it to run in keyword-only mode. */
  readonly askAi?: AskAi;
  readonly now?: () => Date;
  readonly topics?: readonly ChatTopic[];
}

/** Length in characters as people see them, so an emoji counts as one. */
export function visibleLength(text: string): number {
  return [...text].length;
}

/** Single-line, trimmed and capped question, safe to show and to send. */
export function sanitizeQuestion(raw: string): string {
  return raw
    .replace(CONTROL_CHARACTERS, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_QUESTION_LENGTH);
}

export function renderTopicAnswer(topic: ChatTopic, language: Language, today: Date): string {
  return topic.answer[language].replaceAll('{age}', String(getAge(today)));
}

/** A greeting followed by an unknown question should reach the AI instead of greeting back. */
function isGreetingWithQuestion(question: string, matches: readonly ChatTopic[]): boolean {
  return (
    matches.every((topic) => topic.tier === 'social') &&
    countWordsOutsideKeywords(question, matches) >= MIN_WORDS_AFTER_GREETING
  );
}

function answerFromKeywords(
  question: string,
  language: Language,
  today: Date,
  topics: readonly ChatTopic[],
  isAiEnabled: boolean,
): string | null {
  const matches = findMatchingTopics(question, topics);
  if (matches.length === 0 || (isAiEnabled && isGreetingWithQuestion(question, matches))) {
    return null;
  }
  return matches.map((topic) => renderTopicAnswer(topic, language, today)).join(ANSWER_SEPARATOR);
}

/**
 * Keyword answer first; if nothing matches, the AI (when configured);
 * otherwise the out-of-scope message. Never throws.
 */
export async function resolveAnswer(rawQuestion: string, language: Language, deps: AnswerDeps = {}): Promise<string> {
  const texts = CHAT_TEXTS[language];
  const question = sanitizeQuestion(rawQuestion);
  if (!question) {
    return texts.outOfScope;
  }
  if (visibleLength(question) < MIN_QUESTION_LENGTH) {
    return texts.tooShort;
  }

  const today = deps.now ? deps.now() : new Date();
  const topics = deps.topics ?? KNOWLEDGE_TOPICS;
  const keywordAnswer = answerFromKeywords(question, language, today, topics, Boolean(deps.askAi));
  if (keywordAnswer) {
    return keywordAnswer;
  }

  if (!deps.askAi) {
    return texts.outOfScope;
  }

  try {
    const aiAnswer = await deps.askAi(question, language);
    return aiAnswer ?? texts.unavailable;
  } catch (error) {
    if (error instanceof AiLimitReachedError) {
      return texts.limitReached;
    }
    console.error('[chatbot] AI answer failed', error);
    return texts.unavailable;
  }
}
