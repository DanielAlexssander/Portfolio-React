import { afterEach, beforeEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import { MAX_QUESTION_LENGTH, resolveAnswer, sanitizeQuestion } from './answer.ts';
import { KNOWLEDGE_TOPICS } from './knowledge/index.ts';
import { findMatchingTopics } from './matcher.ts';
import { CHAT_TEXTS } from './texts.ts';
import { AiLimitReachedError, type AskAi } from './types.ts';
import type { Language } from '../../types/index.ts';

const LANGUAGES: readonly Language[] = ['pt', 'en', 'es'];
const NOV_13_2026 = (): Date => new Date(2026, 10, 13);

const topicIds = (question: string): readonly string[] =>
  findMatchingTopics(question, KNOWLEDGE_TOPICS).map((match) => match.id);

const answerOf = (id: string, language: Language): string => {
  const found = KNOWLEDGE_TOPICS.find((entry) => entry.id === id);
  assert.ok(found, `topic ${id} should exist`);
  return found.answer[language];
};

describe('sanitizeQuestion', () => {
  it('trims and collapses whitespace', () => {
    assert.equal(sanitizeQuestion('  quem   é\n o Daniel?  '), 'quem é o Daniel?');
  });

  it('removes control characters', () => {
    assert.equal(sanitizeQuestion('oi\u0000\u0007 tudo'), 'oi tudo');
  });

  it('limits the length', () => {
    assert.equal(sanitizeQuestion('a'.repeat(500)).length, MAX_QUESTION_LENGTH);
  });
});

describe('knowledge base', () => {
  it('maps the expected questions to the right topic', () => {
    const cases: ReadonlyArray<readonly [string, readonly string[]]> = [
      ['Quem é o Daniel?', ['about']],
      ['Quantos anos ele tem?', ['age']],
      ['Quais são as skills dele?', ['skills']],
      ['O que ele sabe sobre harness?', ['harness']],
      ['O que ele sabe sobre PowerBI?', ['bi']],
      ['Quantos anos de experiência ele tem?', ['experience']],
      ['Ele trabalha com React?', ['frontend']],
      ['Qual o email dele?', ['contact']],
      ['Ele fala inglês?', ['languages']],
      ['Onde ele estudou?', ['education']],
      ['e aí, tudo bem?', ['greeting']],
      ['O que ele fez aí no ONS?', ['experience']],
      ['Quantos anos ele tem e onde trabalha?', ['age']],
      ['How does this chatbot work?', []],
      ['How old is he?', ['age']],
      ['¿Quién es Daniel?', ['about']],
    ];
    for (const [question, expected] of cases) {
      assert.deepEqual(topicIds(question), expected, question);
    }
  });

  it('answers every suggested question in every language', () => {
    for (const language of LANGUAGES) {
      for (const suggestion of CHAT_TEXTS[language].suggestions) {
        assert.notEqual(topicIds(suggestion).length, 0, `${language}: ${suggestion}`);
      }
    }
  });

  it('has unique ids, keywords and answers in every language', () => {
    const uniqueIds = new Set(KNOWLEDGE_TOPICS.map((entry) => entry.id));
    assert.equal(uniqueIds.size, KNOWLEDGE_TOPICS.length);
    for (const entry of KNOWLEDGE_TOPICS) {
      assert.ok(entry.keywords.length > 0, `${entry.id} needs keywords`);
      for (const language of LANGUAGES) {
        assert.ok(entry.answer[language].trim().length > 0, `${entry.id} needs a ${language} answer`);
      }
    }
  });
});

describe('resolveAnswer', () => {
  beforeEach(() => {
    mock.method(console, 'error', () => undefined);
  });

  afterEach(() => {
    mock.restoreAll();
  });

  it('fills in the age', async () => {
    assert.equal(await resolveAnswer('Quantos anos ele tem?', 'pt', { now: NOV_13_2026 }), 'Daniel tem 21 anos.');
  });

  it('answers in the selected language', async () => {
    assert.equal(await resolveAnswer('How old is he?', 'en', { now: NOV_13_2026 }), 'Daniel is 21 years old.');
    assert.equal(await resolveAnswer('¿Cuántos años tiene?', 'es', { now: NOV_13_2026 }), 'Daniel tiene 21 años.');
  });

  it('joins the answers of every topic mentioned', async () => {
    const answer = await resolveAnswer('Ele sabe React e Node?', 'pt');
    assert.ok(answer.includes(answerOf('frontend', 'pt')));
    assert.ok(answer.includes(answerOf('backend', 'pt')));
  });

  it('returns the out-of-scope message when nothing matches and the AI is off', async () => {
    assert.equal(await resolveAnswer('Qual é a capital da França?', 'pt'), CHAT_TEXTS.pt.outOfScope);
  });

  it('does not call the AI when a keyword matches', async () => {
    const askAi = mock.fn(async () => 'IA');
    await resolveAnswer('Quem é o Daniel?', 'pt', { askAi });
    assert.equal(askAi.mock.callCount(), 0);
  });

  it('asks the AI when no keyword matches', async () => {
    const askAi = mock.fn<AskAi>(async () => 'resposta da IA');
    const answer = await resolveAnswer('  Ele sabe Rust? ', 'en', { askAi });
    assert.equal(answer, 'resposta da IA');
    assert.deepEqual(askAi.mock.calls[0]?.arguments, ['Ele sabe Rust?', 'en']);
  });

  it('sends a greeting followed by an unknown question to the AI', async () => {
    const askAi = mock.fn<AskAi>(async () => 'resposta da IA');
    assert.equal(await resolveAnswer('Oi, ele sabe Docker?', 'pt', { askAi }), 'resposta da IA');
    assert.equal(askAi.mock.callCount(), 1);
  });

  it('greets back a bare greeting without calling the AI', async () => {
    const askAi = mock.fn<AskAi>(async () => 'resposta da IA');
    assert.equal(await resolveAnswer('Oi, tudo bem?', 'pt', { askAi }), answerOf('greeting', 'pt'));
    assert.equal(askAi.mock.callCount(), 0);
  });

  it('greets back a greeting with a question when the AI is off', async () => {
    assert.equal(await resolveAnswer('Oi, ele sabe Docker?', 'pt'), answerOf('greeting', 'pt'));
  });

  it('returns the unavailable message when the AI has no answer', async () => {
    const askAi = async (): Promise<string | null> => null;
    assert.equal(await resolveAnswer('Ele sabe Rust?', 'pt', { askAi }), CHAT_TEXTS.pt.unavailable);
  });

  it('returns the unavailable message when the AI throws', async () => {
    const askAi = async (): Promise<string | null> => {
      throw new Error('boom');
    };
    assert.equal(await resolveAnswer('Ele sabe Rust?', 'es', { askAi }), CHAT_TEXTS.es.unavailable);
  });

  it('explains the daily limit when the AI quota is used up', async () => {
    const askAi = async (): Promise<string | null> => {
      throw new AiLimitReachedError();
    };
    for (const language of ['pt', 'en', 'es'] as const) {
      assert.equal(await resolveAnswer('Ele sabe Rust?', language, { askAi }), CHAT_TEXTS[language].limitReached);
    }
  });

  it('keeps answering keyword questions after the AI limit', async () => {
    const askAi = async (): Promise<string | null> => {
      throw new AiLimitReachedError();
    };
    const answer = await resolveAnswer('Quem é o Daniel?', 'pt', { askAi, now: NOV_13_2026 });
    assert.equal(answer, answerOf('about', 'pt').replace('{age}', '21'));
  });

  it('ignores blank questions without calling the AI', async () => {
    const askAi = mock.fn(async () => 'IA');
    assert.equal(await resolveAnswer('   ', 'pt', { askAi }), CHAT_TEXTS.pt.outOfScope);
    assert.equal(askAi.mock.callCount(), 0);
  });
});
