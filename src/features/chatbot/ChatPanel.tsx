import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties, FormEvent, RefObject } from 'react';
import { Box, Button, Flex, IconButton, Input, ModalContent, Text, useModalContext } from '@chakra-ui/react';
import { Bot, Send, X } from 'lucide-react';
import { MAX_QUESTION_LENGTH } from './answer.ts';
import { DAILY_AI_LIMIT } from './quota.ts';
import MessageBubble from './MessageBubble';
import type { ChatTexts } from './texts.ts';
import type { ChatMessage } from './types.ts';

interface ChatPanelProps {
  readonly compact: boolean;
  readonly inputRef: RefObject<HTMLInputElement | null>;
  readonly texts: ChatTexts;
  readonly messages: readonly ChatMessage[];
  readonly isAnswering: boolean;
  /** AI questions left today; `null` hides the counter (keyword-only mode). */
  readonly aiRemaining: number | null;
  readonly onSend: (question: string) => void;
  readonly onTypingDone: (id: string) => void;
}

const ChatPanel = ({
  compact,
  inputRef,
  texts,
  messages,
  isAnswering,
  aiRemaining,
  onSend,
  onTypingDone,
}: ChatPanelProps) => {
  const [draft, setDraft] = useState('');
  const { onClose } = useModalContext();
  const [viewportStyle, setViewportStyle] = useState<CSSProperties>();
  const listRef = useRef<HTMLDivElement>(null);
  const followLatest = useRef(true);

  useLayoutEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    // Mobile keyboards can shrink or pan the visible area without resizing the layout.
    const fitViewport = () => {
      setViewportStyle(viewport.scale === 1 ? { height: viewport.height, top: viewport.offsetTop } : undefined);
    };
    fitViewport();
    viewport.addEventListener('resize', fitViewport);
    viewport.addEventListener('scroll', fitViewport);
    return () => {
      viewport.removeEventListener('resize', fitViewport);
      viewport.removeEventListener('scroll', fitViewport);
    };
  }, []);

  const hasMessages = messages.length > 0;
  const scrollToBottom = useCallback(() => {
    const list = listRef.current;
    if (list && hasMessages && followLatest.current) {
      list.scrollTop = list.scrollHeight;
    }
  }, [hasMessages]);

  useEffect(scrollToBottom, [messages, isAnswering, scrollToBottom]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let width = list.clientWidth;
    let height = list.clientHeight;
    const trackScroll = () => {
      // Reflow can dispatch a scroll before the resize observer runs.
      if (list.clientWidth === width && list.clientHeight === height) {
        followLatest.current = list.scrollHeight - list.scrollTop - height <= 24;
      }
    };
    const observer = new ResizeObserver(() => {
      width = list.clientWidth;
      height = list.clientHeight;
      scrollToBottom();
    });
    observer.observe(list);
    list.addEventListener('scroll', trackScroll);
    return () => {
      observer.disconnect();
      list.removeEventListener('scroll', trackScroll);
    };
  }, [scrollToBottom]);

  const submit = (question: string, focusInput = true) => {
    if (!question.trim() || isAnswering) {
      return;
    }
    followLatest.current = true;
    onSend(question);
    setDraft('');
    if (focusInput) inputRef.current?.focus({ preventScroll: true });
  };

  const handleSubmit = (event: FormEvent<HTMLDivElement>) => {
    event.preventDefault();
    submit(draft);
  };

  return (
    <ModalContent
      containerProps={{
        style: viewportStyle,
        h: '100dvh',
        w: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        p: compact ? 0 : 6,
      }}
      aria-label={texts.title}
      m={0}
      w="100%"
      maxW={compact ? '100%' : '26rem'}
      h={compact ? '100%' : '36rem'}
      maxH="100%"
      pt="env(safe-area-inset-top)"
      pr="env(safe-area-inset-right)"
      pb="env(safe-area-inset-bottom)"
      pl="env(safe-area-inset-left)"
      bg="#0F172A"
      border={compact ? 0 : '1px solid rgba(59, 130, 246, 0.25)'}
      borderRadius={compact ? 0 : '20px'}
      boxShadow="0 24px 48px rgba(0, 0, 0, 0.5)"
      overflow="hidden"
    >
      <Flex align="center" flexShrink={0} gap={3} px={4} py={2} bg="rgba(30, 41, 59, 0.6)" borderBottom="1px solid rgba(255, 255, 255, 0.06)">
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
          boxSize="44px"
          variant="ghost"
          color="#94A3B8"
          _hover={{ bg: 'rgba(255, 255, 255, 0.06)', color: 'white' }}
          onClick={onClose}
        />
      </Flex>

      <Flex
        ref={listRef}
        role="log"
        aria-live="polite"
        tabIndex={0}
        direction="column"
        gap={3}
        flex="1"
        minH={0}
        overflowY="auto"
        overscrollBehaviorY="contain"
        p={4}
      >
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
                minH={compact ? '36px' : 7}
                maxW="100%"
                whiteSpace="normal"
                variant="outline"
                color="#93C5FD"
                borderColor="rgba(59, 130, 246, 0.35)"
                borderRadius="full"
                fontWeight="500"
                _hover={{ bg: 'rgba(59, 130, 246, 0.12)' }}
                onClick={() => submit(suggestion, !compact)}
              >
                {suggestion}
              </Button>
            ))}
          </Flex>
        )}
      </Flex>

      <Box flexShrink={0} borderTop="1px solid rgba(255, 255, 255, 0.06)">
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
            h="44px"
            minW={0}
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
            boxSize="44px"
            flexShrink={0}
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
    </ModalContent>
  );
};

export default ChatPanel;
