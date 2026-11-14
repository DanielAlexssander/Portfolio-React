import { Box } from '@chakra-ui/react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import TechSlider from './components/TechSlider';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import ChatbotWidget from './features/chatbot/ChatbotWidget';

function App() {
  return (
    <LanguageProvider>
      <Box 
        w="100%" 
        overflowX="hidden"
        bg="#000"
        minH="100vh"
      >
        <Header />
        <Experience />
        <Projects />
        <TechSlider />
        <Contacts />
        <Footer />
        <ChatbotWidget />
      </Box>
    </LanguageProvider>
  );
}

export default App;
