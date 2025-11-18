import { Box } from '@chakra-ui/react';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import TechSlider from './components/TechSlider';
import Projects from './components/Projects';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

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
        <TechSlider />
        <Projects />
        <TechSlider />
        <Contacts />
        <Footer />
      </Box>
    </LanguageProvider>
  );
}

export default App;
