import type { ChatTopic, TopicTier } from './types.ts';

const DEFAULT_MAX_RESULTS = 3;

const TIER_RANK: Readonly<Record<TopicTier, number>> = {
  social: 0,
  general: 1,
  specific: 2,
};

/**
 * Applied before lowercasing. Uppercase "AI" is artificial intelligence; lowercase "ai"
 * is usually the Portuguese "aí" ("e aí?") and must not trigger the AI topic.
 */
const CASE_SENSITIVE_ALIASES: ReadonlyArray<readonly [RegExp, string]> = [[/\bAI\b/g, ' artificial intelligence ']];

/** Technology names whose symbols would be lost when punctuation is removed. */
const SYMBOL_ALIASES: ReadonlyArray<readonly [RegExp, string]> = [
  [/c#/g, ' csharp '],
  [/c\+\+/g, ' cpp '],
  [/\.net\b/g, ' dotnet '],
  [/ci\/cd/g, ' cicd '],
];

/** Accepts "skill" → "skills" and "habilidad" → "habilidades". */
const PLURAL_SUFFIXES = ['', 's', 'es'] as const;

interface TopicMatch {
  readonly topic: ChatTopic;
  readonly hits: number;
  /** Where the topic is first mentioned, so answers follow the order of the question. */
  readonly firstPosition: number;
}

/** Lowercase, no accents, no punctuation, single spaces: "Olá, C#?" → "ola csharp". */
export function normalizeText(text: string): string {
  const expanded = applyAliases(text, CASE_SENSITIVE_ALIASES);
  const withoutAccents = expanded.toLowerCase().normalize('NFD').replace(/\p{M}/gu, ''); // combining accents left by NFD
  return applyAliases(withoutAccents, SYMBOL_ALIASES)
    .replace(/([a-z0-9])\.([a-z0-9])/g, '$1$2') // node.js → nodejs
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function applyAliases(text: string, aliases: ReadonlyArray<readonly [RegExp, string]>): string {
  return aliases.reduce((current, [pattern, replacement]) => current.replace(pattern, replacement), text);
}

function removeTerm(paddedText: string, term: string): string {
  const pattern = ` ${term} `;
  return paddedText.includes(pattern) ? removeTerm(paddedText.replace(pattern, ' '), term) : paddedText;
}

/**
 * How many words of the question are not part of the given topics' keywords.
 * "Oi, ele sabe Docker?" with the greeting topic → 3 ("ele sabe docker").
 */
export function countWordsOutsideKeywords(question: string, topics: readonly ChatTopic[]): number {
  const terms = topics
    .flatMap((topic) => topic.keywords.map(normalizeText))
    .filter((term) => term.length > 0)
    .sort((a, b) => b.length - a.length);
  const remaining = terms.reduce(removeTerm, ` ${normalizeText(question)} `);
  return remaining.split(' ').filter((word) => word.length > 0).length;
}

/** Position of the term as a whole word (or simple plural), or -1 when absent. */
function findTerm(paddedText: string, term: string): number {
  if (term.length === 0) {
    return -1;
  }
  const positions = PLURAL_SUFFIXES.map((suffix) => paddedText.indexOf(` ${term}${suffix} `)).filter(
    (position) => position >= 0,
  );
  return positions.length > 0 ? Math.min(...positions) : -1;
}

function scoreTopic(paddedText: string, topic: ChatTopic): TopicMatch | null {
  const isExcluded = (topic.exclude ?? []).some((term) => findTerm(paddedText, normalizeText(term)) >= 0);
  if (isExcluded) {
    return null;
  }

  const hitPositions = topic.keywords
    .map((keyword) => findTerm(paddedText, normalizeText(keyword)))
    .filter((position) => position >= 0);

  if (hitPositions.length === 0) {
    return null;
  }
  return { topic, hits: hitPositions.length, firstPosition: Math.min(...hitPositions) };
}

/**
 * Topics whose keywords appear in the question. Only the highest tier found is kept,
 * so "oi, ele sabe React?" answers about React instead of greeting back.
 */
export function findMatchingTopics(
  question: string,
  topics: readonly ChatTopic[],
  maxResults: number = DEFAULT_MAX_RESULTS,
): readonly ChatTopic[] {
  const normalized = normalizeText(question);
  if (!normalized) {
    return [];
  }

  const paddedText = ` ${normalized} `;
  const matches = topics
    .map((topic) => scoreTopic(paddedText, topic))
    .filter((match): match is TopicMatch => match !== null);

  if (matches.length === 0) {
    return [];
  }

  const topRank = Math.max(...matches.map((match) => TIER_RANK[match.topic.tier]));
  return matches
    .filter((match) => TIER_RANK[match.topic.tier] === topRank)
    .sort((a, b) => b.hits - a.hits || a.firstPosition - b.firstPosition)
    .slice(0, maxResults)
    .map((match) => match.topic);
}
