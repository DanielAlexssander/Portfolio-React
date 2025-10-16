import { useState, useEffect } from 'react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [age, setAge] = useState(0);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    // Calculate age
    const date = new Date();
    const currentDate = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    
    let myAge = currentYear - 2006;
    if (currentMonth > 8 || (currentMonth === 8 && currentDate >= 16)) {
      myAge = currentYear - 2005;
    }
    setAge(myAge);

    // Set greeting
    const currentHour = date.getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header style={{
      background: 'linear-gradient(180deg, #002d54 0%, #022f5c 37.22%, #000613 100%)'
    }}>
      <nav className="navHeader">
        <button className="navBtn" onClick={toggleNav}>
          <i className={isNavOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>
        <ul className={`ulNav ${isNavOpen ? 'open' : ''}`}>
          <li><a className="aNav" href="#">Home</a></li>
          <li><a className="aNav projects-link" href="#projects">Projetos</a></li>
          <li><a className="aNav contats-link" href="#container-contacts">Contatos</a></li>
          <li><a className="aNav" href="https://github.com/DanielAlexssander">GitHub</a></li>
        </ul>
      </nav>

      <section className="header center" id="home">
        <div className="headerContent">
          <div className="headerContentName">
            <h1>Daniel Alexssander</h1>
            <h2>Desenvolvedor Front-End</h2>
          </div>
          <div className="text-presentation">
            <p>
              Olá <span>{greeting}</span>! Tenho <span>{age}</span> anos. Sou uma pessoa focada no meu
              objetivo, e atualmente meu objetivo é me tornar um desenvolvedor
              de sucesso. Dedico grande parte do meu tempo para estudar e
              aprimorar minhas habilidades nessa área, buscando sempre me
              atualizar sobre as últimas tendências e tecnologias. Meu
              objetivo é me tornar um profissional competente e capaz de
              oferecer soluções criativas e eficientes para os desafios que
              surgirem na área.
            </p>
          </div>
          <div className="projectsBtn">
            <a className="projects-link" href="#projects">Projetos</a>
            <a className="contats-link" href="#container-contacts">Contatos</a>
          </div>
        </div>
        <div>
          <img className="pic-logo" src="/logo.png" alt="" />
        </div>
      </section>
    </header>
  );
};

export default Header;