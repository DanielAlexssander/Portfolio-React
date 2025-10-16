import Header from './components/Header';
import TechSlider from './components/TechSlider';
import Projects from './components/Projects';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import './portfolio.css';

function App() {
  return (
    <div className="all-page">
      <Header />
      <TechSlider />
      <Projects />
      <TechSlider />
      <Contacts />
      <Footer />
    </div>
  );
}

export default App;
