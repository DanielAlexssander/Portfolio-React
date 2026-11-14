import { useCallback, useEffect, useRef, useState } from 'react';
import type { Language } from '../../types/index.ts';
import { createAiClient } from './aiClient.ts';
import { resolveAnswer, sanitizeQuestion } from './answer.ts';
import { loadRemaining, saveRemaining, type QuotaStorage } from './quota.ts';
import type { ChatMessage, ChatRole } from './types.ts';

function browserStorage(): QuotaStorage | undefined {
  try {
    return window.localStorage;
  } catch {
    return undefined;
  }
}

type RemainingListener = (remaining: number) => void;
const remainingListeners = new Set<RemainingListener>();

/** `undefined` when VITE_CHATBOT_API_URL is not set: the bot runs on keywords only. */
const askAi = createAiClient(import.meta.env.VITE_CHATBOT_API_URL, {
  onRemaining: (remaining) => {
    saveRemaining(browserStorage(), remaining, new Date());
    remainingListeners.forEach((listener) => listener(remaining));
  },
});

export interface UseChatbotResult {
  readonly messages: readonly ChatMessage[];
  readonly isAnswering: boolean;
  readonly send: (question: string) => void;
  /** Marks a bot answer as already typed, so it is not animated again (e.g. on reopen). */
  readonly finishTyping: (id: string) => void;
  /** AI questions left today, or `null` when the AI is off (keyword-only mode). */
  readonly aiRemaining: number | null;
}

export function useChatbot(language: Language): UseChatbotResult {
  const [messages, setMessages] = useState<readonly ChatMessage[]>([]);
  const [isAnswering, setIsAnswering] = useState(false);
  const lastId = useRef(0);
  const [aiRemaining, setAiRemaining] = useState<number | null>(() =>
    askAi ? loadRemaining(browserStorage(), new Date()) : null,
  );

  useEffect(() => {
    if (!askAi) {
      return undefined;
    }
    remainingListeners.add(setAiRemaining);
    return () => {
      remainingListeners.delete(setAiRemaining);
    };
  }, []);

  const createMessage = useCallback((role: ChatRole, text: string): ChatMessage => {
    lastId.current += 1;
    return { id: `${role}-${lastId.current}`, role, text, isNew: role === 'bot' };
  }, []);

  const finishTyping = useCallback((id: string) => {
    setMessages((current) =>
      current.some((message) => message.id === id && message.isNew)
        ? current.map((message) => (message.id === id ? { ...message, isNew: false } : message))
        : current,
    );
  }, []);

  const send = useCallback(
    (rawQuestion: string) => {
      const question = sanitizeQuestion(rawQuestion);
      if (!question || isAnswering) {
        return;
      }

      setMessages((current) => [...current, createMessage('user', question)]);
      setIsAnswering(true);

      // resolveAnswer never rejects: failures become a friendly message.
      void resolveAnswer(question, language, { askAi })
        .then((answer) => setMessages((current) => [...current, createMessage('bot', answer)]))
        .finally(() => setIsAnswering(false));
    },
    [createMessage, isAnswering, language],
  );

  return { messages, isAnswering, send, finishTyping, aiRemaining };
}
