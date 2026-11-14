import { useRef, useState } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ChatPanel, { CHAT_PANEL_ID } from './ChatPanel';
import { CHAT_TEXTS } from './texts.ts';
import { useChatbot } from './useChatbot.ts';

const PANEL_ANIMATION = {
  initial: { opacity: 0, y: 16, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 16, scale: 0.98 },
  transition: { duration: 0.2 },
} as const;

const ChatbotWidget = () => {
  const { language } = useLanguage();
  const texts = CHAT_TEXTS[language];
  const { messages, isAnswering, send, finishTyping, aiRemaining } = useChatbot(language);
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  return (
    <Box position="fixed" bottom={{ base: 4, md: 6 }} right={{ base: 4, md: 6 }} zIndex={1000}>
      <AnimatePresence>
        {isOpen && (
          <motion.div key="chatbot-panel" {...PANEL_ANIMATION} style={{ position: 'absolute', bottom: '72px', right: 0 }}>
            <ChatPanel
              texts={texts}
              messages={messages}
              isAnswering={isAnswering}
              aiRemaining={aiRemaining}
              onSend={send}
              onTypingDone={finishTyping}
              onClose={close}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <IconButton
        ref={toggleRef}
        aria-label={isOpen ? texts.close : texts.open}
        aria-expanded={isOpen}
        aria-controls={CHAT_PANEL_ID}
        icon={isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        onClick={() => setIsOpen((current) => !current)}
        w="56px"
        h="56px"
        borderRadius="full"
        bg="#3B82F6"
        color="white"
        boxShadow="0 8px 24px rgba(59, 130, 246, 0.35)"
        transition="all 0.2s ease"
        _hover={{ bg: '#2563EB', transform: 'scale(1.05)' }}
        _active={{ bg: '#1D4ED8' }}
      />
    </Box>
  );
};

export default ChatbotWidget;
