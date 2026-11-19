import { useRef } from 'react';
import { IconButton, Modal, ModalOverlay, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import ChatPanel from './ChatPanel';
import { CHAT_TEXTS } from './texts.ts';
import { useChatbot } from './useChatbot.ts';

const ChatbotWidget = () => {
  const { language } = useLanguage();
  const texts = CHAT_TEXTS[language];
  const { messages, isAnswering, send, finishTyping, aiRemaining } = useChatbot(language);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [hasRoomForPanel] = useMediaQuery('(min-width: 48em) and (min-height: 30em)');
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <IconButton
        ref={toggleRef}
        position="fixed"
        bottom={{ base: 'calc(1rem + env(safe-area-inset-bottom))', md: 6 }}
        right={{ base: 'calc(1rem + env(safe-area-inset-right))', md: 6 }}
        zIndex={1000}
        visibility={isOpen ? 'hidden' : 'visible'}
        aria-label={texts.open}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        icon={<MessageCircle size={24} />}
        onClick={onOpen}
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        preserveScrollBarGap={false}
        allowPinchZoom
        initialFocusRef={hasRoomForPanel ? inputRef : undefined}
        finalFocusRef={toggleRef}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg="blackAlpha.500" />
        <ChatPanel
          compact={!hasRoomForPanel}
          inputRef={inputRef}
          texts={texts}
          messages={messages}
          isAnswering={isAnswering}
          aiRemaining={aiRemaining}
          onSend={send}
          onTypingDone={finishTyping}
        />
      </Modal>
    </>
  );
};

export default ChatbotWidget;
