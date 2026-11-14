import { useCallback, useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { Box, Button, Flex, IconButton, Input, Text } from '@chakra-ui/react';
import { Bot, Send, X } from 'lucide-react';
import { MAX_QUESTION_LENGTH } from './answer.ts';
import { DAILY_AI_LIMIT } from './quota.ts';
import MessageBubble from './MessageBubble';
import type { ChatTexts } from './texts.ts';
import type { ChatMessage } from './types.ts';

export const CHAT_PANEL_ID = 'chatbot-panel';

interface ChatPanelProps {
  readonly texts: ChatTexts;
  readonly messages: readonly ChatMessage[];
  readonly isAnswering: boolean;
  /** AI questions left today; `null` hides the counter (keyword-only mode). */
  readonly aiRemaining: number | null;
  readonly onSend: (question: string) => void;
  readonly onTypingDone: (id: string) => void;
  readonly onClose: () => void;
}

const ChatPanel = ({
  texts,
  messages,
  isAnswering,
  aiRemaining,
  onSend,
  onTypingDone,
  onClose,
}: ChatPanelProps) => {
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const scrollToBottom = useCallback(() => {
    const list = listRef.current;
    if (list) {
      list.scrollTop = list.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [messages, isAnswering, scrollToBottom]);

  const submit = (question: string) => {
    if (!question.trim() || isAnswering) {
      return;
    }
    onSend(question);
    setDraft('');
    inputRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    submit(draft);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <Flex
      id={CHAT_PANEL_ID}
      role="dialog"
      aria-label={texts.title}
      direction="column"
      w="min(380px, calc(100vw - 32px))"
      h="min(540px, calc(100dvh - 120px))"
      bg="#0F172A"
      border="1px solid rgba(59, 130, 246, 0.25)"
      borderRadius="20px"
      boxShadow="0 24px 48px rgba(0, 0, 0, 0.5)"
      overflow="hidden"
      onKeyDown={handleKeyDown}
    >
      <Flex align="center" gap={3} px={4} py={3} bg="rgba(30, 41, 59, 0.6)" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
        <Flex align="center" justify="center" w="36px" h="36px" flexShrink={0} borderRadius="full" bg="rgba(59, 130, 246, 0.15)" color="#60A5FA">
          <Bot size={20} aria-hidden="true" />
        </Flex>
        <Box flex="1" minW={0}>
          <Text color="white" fontWeight="600" fontFamily="'Space Grotesk', sans-serif" noOfLines={1}>
            {texts.title}
          </Text>
          <Text color="#64748B" fontSize="xs" noOfLines={1}>
            {texts.subtitle}
          </Text>
        </Box>
        <IconButton
          aria-label={texts.close}
          icon={<X size={18} />}
          size="sm"
          variant="ghost"
          color="#94A3B8"
          _hover={{ bg: 'rgba(255, 255, 255, 0.06)', color: 'white' }}
          onClick={onClose}
        />
      </Flex>

      <Flex ref={listRef} role="log" aria-live="polite" direction="column" gap={3} flex="1" overflowY="auto" px={4} py={4}>
        <MessageBubble role="bot" text={texts.greeting} />
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            text={message.text}
            animate={message.isNew}
            onTypingProgress={scrollToBottom}
            onTypingDone={() => onTypingDone(message.id)}
          />
        ))}
        {isAnswering && <MessageBubble role="bot" text={texts.typing} isPending />}
        {messages.length === 0 && (
          <Flex wrap="wrap" gap={2}>
            {texts.suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                size="xs"
                variant="outline"
                color="#93C5FD"
                borderColor="rgba(59, 130, 246, 0.35)"
                borderRadius="full"
                fontWeight="500"
                _hover={{ bg: 'rgba(59, 130, 246, 0.12)' }}
                onClick={() => submit(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </Flex>
        )}
      </Flex>

      <Box borderTop="1px solid rgba(255, 255, 255, 0.06)">
        <Flex as="form" onSubmit={handleSubmit} gap={2} px={3} pt={3} pb={aiRemaining === null ? 3 : 1}>
          <Input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={texts.placeholder}
            aria-label={texts.placeholder}
            maxLength={MAX_QUESTION_LENGTH}
            autoComplete="off"
            size="md"
            color="white"
            bg="rgba(30, 41, 59, 0.6)"
            border="1px solid rgba(255, 255, 255, 0.08)"
            borderRadius="12px"
            _placeholder={{ color: '#64748B' }}
            _hover={{ borderColor: 'rgba(59, 130, 246, 0.35)' }}
            _focusVisible={{ borderColor: '#3B82F6', boxShadow: '0 0 0 1px #3B82F6' }}
          />
          <IconButton
            type="submit"
            aria-label={texts.send}
            icon={<Send size={18} />}
            isDisabled={!draft.trim() || isAnswering}
            bg="#3B82F6"
            color="white"
            borderRadius="12px"
            _hover={{ bg: '#2563EB' }}
            _active={{ bg: '#1D4ED8' }}
          />
        </Flex>
        {aiRemaining !== null && (
          <Text
            px={3}
            pb={2}
            fontSize="2xs"
            textAlign="right"
            color={aiRemaining === 0 ? '#F87171' : '#64748B'}
            aria-live="polite"
          >
            {texts.aiQuota
              .replace('{remaining}', String(aiRemaining))
              .replace('{limit}', String(DAILY_AI_LIMIT))}
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default ChatPanel;
