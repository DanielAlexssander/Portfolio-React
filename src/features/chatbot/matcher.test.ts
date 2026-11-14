import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { countWordsOutsideKeywords, findMatchingTopics, normalizeText } from './matcher.ts';
import type { ChatTopic, TopicTier } from './types.ts';

const ANSWER = { pt: 'pt', en: 'en', es: 'es' };

const topic = (
  id: string,
  tier: TopicTier,
  keywords: readonly string[],
  exclude?: readonly string[],
): ChatTopic => ({ id, tier, keywords, exclude, answer: ANSWER });

const TOPICS: readonly ChatTopic[] = [
  topic('greeting', 'social', ['oi', 'e ai', 'tudo bem']),
  topic('skills', 'general', ['skill', 'o que ele sabe']),
  topic('bi', 'specific', ['power bi', 'powerbi', 'bi']),
  topic('frontend', 'specific', ['react', 'javascript']),
  topic('backend', 'specific', ['java', '.NET', 'C#', 'node.js']),
  topic('age', 'specific', ['quantos anos'], ['experiência']),
  topic('ai', 'specific', ['ia', 'artificial intelligence']),
];

const ids = (question: string, maxResults?: number): readonly string[] =>
  findMatchingTopics(question, TOPICS, maxResults).map((match) => match.id);

describe('normalizeText', () => {
  it('lowercases and removes accents and punctuation', () => {
    assert.equal(normalizeText('Olá, você é o Daniel?'), 'ola voce e o daniel');
  });

  it('keeps technology names that contain symbols', () => {
    assert.equal(normalizeText('C#, C++, .NET, Node.js e CI/CD'), 'csharp cpp dotnet nodejs e cicd');
  });

  it('handles Spanish characters', () => {
    assert.equal(normalizeText('¿Cuántos años tiene?'), 'cuantos anos tiene');
  });

  it('expands uppercase AI but keeps the Portuguese "aí"', () => {
    assert.equal(normalizeText('Ele sabe AI? E aí?'), 'ele sabe artificial intelligence e ai');
  });
});

describe('countWordsOutsideKeywords', () => {
  const greeting = TOPICS.filter((entry) => entry.tier === 'social');

  it('counts the words left after removing the keywords', () => {
    assert.equal(countWordsOutsideKeywords('Oi, ele sabe Docker?', greeting), 3);
  });

  it('returns zero for a bare greeting', () => {
    assert.equal(countWordsOutsideKeywords('Oi! E aí, tudo bem?', greeting), 0);
  });
});

describe('findMatchingTopics', () => {
  it('returns nothing when no keyword matches', () => {
    assert.deepEqual(ids('Qual é a capital da França?'), []);
  });

  it('returns nothing for blank input', () => {
    assert.deepEqual(ids('   ?! '), []);
  });

  it('matches whole words only', () => {
    assert.deepEqual(ids('ele gosta de bibi?'), []);
    assert.deepEqual(ids('ele sabe javascript?'), ['frontend']);
  });

  it('matches simple plurals', () => {
    assert.deepEqual(ids('quais são as skills?'), ['skills']);
  });

  it('matches multi-word keywords', () => {
    assert.deepEqual(ids('O que ele sabe de Power BI?'), ['bi']);
  });

  it('matches keywords written with symbols', () => {
    assert.deepEqual(ids('ele programa em C#?'), ['backend']);
    assert.deepEqual(ids('e Node.js?'), ['backend']);
  });

  it('prefers specific topics over general and social ones', () => {
    assert.deepEqual(ids('oi, o que ele sabe de react?'), ['frontend']);
    assert.deepEqual(ids('oi, o que ele sabe?'), ['skills']);
  });

  it('returns every specific topic mentioned, most hits first', () => {
    assert.deepEqual(ids('ele sabe react e .NET?'), ['frontend', 'backend']);
    assert.deepEqual(ids('java, c# e react'), ['backend', 'frontend']);
  });

  it('limits the number of results', () => {
    assert.equal(ids('react, java e power bi', 2).length, 2);
  });

  it('skips topics that contain an exclude term', () => {
    assert.deepEqual(ids('quantos anos ele tem?'), ['age']);
    assert.deepEqual(ids('quantos anos de experiência?'), []);
  });

  it('does not confuse the Portuguese "aí" with AI', () => {
    assert.deepEqual(ids('e aí, tudo bem?'), ['greeting']);
    assert.deepEqual(ids('O que ele fez aí?'), []);
    assert.deepEqual(ids('ele sabe IA?'), ['ai']);
    assert.deepEqual(ids('Does he know AI?'), ['ai']);
    assert.deepEqual(ids('Ele sabe React e AI?'), ['frontend', 'ai']);
  });
});
