import { Box, Flex, VisuallyHidden } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import type { ChatRole } from './types.ts';
import { useTypewriter } from './useTypewriter.ts';

const blink = keyframes`50% { opacity: 0; }`;

interface MessageBubbleProps {
  readonly role: ChatRole;
  readonly text: string;
  readonly isPending?: boolean;
  /** Types the text out character by character (new bot answers only). */
  readonly animate?: boolean;
  readonly onTypingProgress?: () => void;
  readonly onTypingDone?: () => void;
}

const MessageBubble = ({
  role,
  text,
  isPending = false,
  animate = false,
  onTypingProgress,
  onTypingDone,
}: MessageBubbleProps) => {
  const isUser = role === 'user';
  const visibleText = useTypewriter(text, animate, { onProgress: onTypingProgress, onDone: onTypingDone });
  const isTyping = visibleText.length < text.length;

  return (
    <Flex justify={isUser ? 'flex-end' : 'flex-start'}>
      <Box
        maxW="85%"
        px={3.5}
        py={2.5}
        fontSize="sm"
        lineHeight="1.55"
        whiteSpace="pre-line"
        wordBreak="break-word"
        color={isUser ? 'white' : '#E2E8F0'}
        bg={isUser ? '#3B82F6' : 'rgba(30, 41, 59, 0.8)'}
        border={isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.06)'}
        borderRadius="16px"
        borderBottomRightRadius={isUser ? '4px' : '16px'}
        borderBottomLeftRadius={isUser ? '16px' : '4px'}
        fontStyle={isPending ? 'italic' : 'normal'}
        opacity={isPending ? 0.7 : 1}
      >
        {isTyping ? (
          <>
            {/* Screen readers get the whole answer once, not every typed character. */}
            <VisuallyHidden>{text}</VisuallyHidden>
            <span aria-hidden="true">
              {visibleText}
              <Box as="span" display="inline-block" ml="1px" color="#60A5FA" animation={`${blink} 0.8s step-end infinite`}>
                ▍
              </Box>
            </span>
          </>
        ) : (
          text
        )}
      </Box>
    </Flex>
  );
};

export default MessageBubble;
