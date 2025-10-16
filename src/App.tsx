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
      <Box>
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
