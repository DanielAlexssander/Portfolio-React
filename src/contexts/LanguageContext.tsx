import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header
    goodMorning: 'Bom dia',
    goodAfternoon: 'Boa tarde',
    goodEvening: 'Boa noite',
    greetingBadge: 'Construindo soluções escaláveis e inteligentes',
    home: 'Home',
    projects: 'Projetos',
    experience: 'Experiência',
    contacts: 'Contatos',
    resume: 'Currículo',
    github: 'GitHub',
    softwareDeveloper: 'Desenvolvedor de Software',
    headerDescription: 'Olá, {greeting}! Tenho {age} anos e sou profissional de desenvolvimento de software com experiência prática em projetos corporativos e atuação em ambiente de equipe, incluindo desenvolvimento de soluções full stack e participação em iniciativas de IA generativa. Busco oportunidades para aplicar e evoluir minhas habilidades técnicas, contribuindo com soluções escaláveis, eficientes e alinhadas às necessidades do negócio.',
    
    // Experience
    experienceTitle: 'Experiência Profissional:',
    onsRole: 'Desenvolvedor de Software',
    onsPeriod: '2024 - 2026',
    onsDescription: 'Desenvolvimento de aplicações corporativas Full Stack utilizando tecnologias modernas de front-end (React, Vite, Angular) e back-end (Node.js, Express, FastAPI, GraphQL, .NET), com foco em soluções escaláveis, responsivas e de fácil manutenção. Participação ativa no desenvolvimento do Tiago, assistente de IA Generativa do ONS, aplicando técnicas de Engenharia de Prompt, Machine Learning, Agentes de IA e automações. Atuação com arquiteturas como Clean Architecture, Design Patterns e práticas orientadas a APIs (OpenAPI/Swagger). Implementação de pipelines CI/CD com GitHub Actions e Azure DevOps, incluindo testes automatizados de acessibilidade com Playwright, axe-core e Lighthouse CI. Experiência com Cloud (AWS, AWS Lambda), bancos de dados relacionais e NoSQL (PostgreSQL, MongoDB, Firebase), e migração de painéis Tableau para Power BI. Trabalho colaborativo em metodologias ágeis (Scrum, Kanban) em equipes multidisciplinares.',
    
    // Workana
    workanaRole: 'Desenvolvedor Freelancer',
    workanaPeriod: '2023 - 2025',
    workanaDescription: 'Desenvolvimento de projetos web Full Stack para clientes, atuando desde a construção de interfaces modernas e responsivas até o desenvolvimento de serviços e APIs back-end. Criação de Landing Pages e aplicações voltadas à captação de leads, com soluções personalizadas conforme os objetivos de cada cliente. Atuação independente realizando levantamento de requisitos, desenvolvimento, ajustes e entrega dentro dos prazos. Gestão de múltiplos projetos com comunicação direta com clientes, garantindo alinhamento de requisitos e cumprimento de prazos. Aplicação de boas práticas para criar soluções eficientes, organizadas e de fácil manutenção.',
    
    // Projects
    projectsTitle: 'Projetos:',
    technologiesUsed: 'Tecnologias Utilizadas:',
    site: 'Site',
    apk: 'Apk',
    code: 'Código',
    backToTop: 'Voltar ao topo',
    searchPlaceholder: 'Pesquisar nome do projeto...',
    allTechnologies: 'Todas as tecnologias',
    
    // Project descriptions
    tiagoOnsDesc: 'Participei do desenvolvimento front-end do Tiago, a plataforma de IA Generativa do ONS. Contribuí para criar uma experiência moderna e intuitiva, facilitando o acesso inteligente a informações e aprimorando a tomada de decisões dos usuários.',
    exchangeRateDesc: 'Desenvolvido em Flutter, é um projeto que fiz para uso pessoal. O propósito do projeto é acompanhar os valores atuais das conversões das criptomoedas.',
    hubgramDesc: 'Desenvolvido em React, inspirado no Instagram, e com uma série de funcionalidades semelhantes.',
    vetDesc: 'Desenvolvido em Next.js, \'Veterinária Pata Amiga\' é uma empresa fictícia. É um projeto de landing page para uma empresa de Veterinário.',
    miniBlogDesc: 'Projeto feito em React, consiste em um Blog com todas as funcionalidades em react usando o banco de dados do Firebase.',
    memoryGameDesc: 'Este projeto é um jogo da memoria em TypeScript.',
    checklistDesc: 'Funcionalidades: Adicionar/Remover tarefas e editar nomes. Dados salvos no LocalStorage do navegador para persistência.',
    strataDesc: 'O projeto Strata foi desenvolvido com base no design da "HTML5 UP".',
    rangeHotelsDesc: 'A Range Hotels é um projeto responsivo. Compatível com computador, tablet e celular.',
    
    // Contacts
    contactsTitle: 'Contatos:',
    copied: 'Copiado',
    contactSubtitle: 'Vamos construir algo incrível juntos',
    
    // Footer
    technologiesUsedFooter: 'Tecnologias Utilizadas:',
    pageCode: 'Código desta página',
    builtWith: 'Feito com'
  },
  en: {
    // Header
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    greetingBadge: 'Building scalable & intelligent solutions',
    home: 'Home',
    projects: 'Projects',
    experience: 'Experience',
    contacts: 'Contacts',
    resume: 'Curriculum',
    github: 'GitHub',
    softwareDeveloper: 'Software Developer',
    headerDescription: 'Hey, {greeting}! I am {age} years old and a software development professional with hands-on experience in corporate projects and team environments, including full stack solution development and participation in generative AI initiatives. I seek opportunities to apply and evolve my technical skills, contributing with scalable, efficient solutions aligned with business needs.',
    
    // Experience
    experienceTitle: 'Professional Experience:',
    onsRole: 'Software Developer',
    onsPeriod: '2024 - 2026',
    onsDescription: 'Full Stack corporate application development using modern front-end (React, Vite, Angular) and back-end (Node.js, Express, FastAPI, GraphQL, .NET) technologies, focused on scalable, responsive, and maintainable solutions. Active participation in developing Tiago, ONS\'s Generative AI assistant, applying Prompt Engineering, Machine Learning, AI Agents, and automation techniques. Experience with Clean Architecture, Design Patterns, and API-oriented practices (OpenAPI/Swagger). Implementation of CI/CD pipelines with GitHub Actions and Azure DevOps, including automated accessibility testing with Playwright, axe-core, and Lighthouse CI. Experience with Cloud (AWS, AWS Lambda), relational and NoSQL databases (PostgreSQL, MongoDB, Firebase), and Tableau to Power BI dashboard migration. Collaborative work using agile methodologies (Scrum, Kanban) in multidisciplinary teams.',
    
    // Workana
    workanaRole: 'Freelance Developer',
    workanaPeriod: '2023 - 2025',
    workanaDescription: 'Full Stack web project development for clients, from building modern and responsive interfaces to developing back-end services and APIs. Creation of Landing Pages and lead capture applications with customized solutions according to each client\'s objectives. Independent work performing requirements gathering, development, adjustments, and delivery within deadlines. Management of multiple projects with direct client communication, ensuring requirements alignment and deadline compliance. Application of best practices to create efficient, organized, and maintainable solutions.',
    
    // Projects
    projectsTitle: 'Projects:',
    technologiesUsed: 'Technologies Used:',
    site: 'Site',
    apk: 'Apk',
    code: 'Code',
    backToTop: 'Back to top',
    searchPlaceholder: 'Search a project...',
    allTechnologies: 'All technologies',
    
    // Project descriptions
    tiagoOnsDesc: 'I participated in the front-end development of Tiago, the ONS Generative AI platform. I contributed to creating a modern and intuitive experience, facilitating intelligent access to information and enhancing user decision-making.',
    exchangeRateDesc: 'Developed in Flutter, it is a project I made for personal use. The purpose of the project is to track the current values of cryptocurrency conversions.',
    hubgramDesc: 'Developed in React, inspired by Instagram, and with a series of similar functionalities.',
    vetDesc: 'Developed in Next.js, \'Veterinária Pata Amiga\' is a fictional company. It is a landing page project for a Veterinary company.',
    miniBlogDesc: 'Project made in React, consists of a Blog with all functionalities in react using Firebase database.',
    memoryGameDesc: 'This project is a memory game in TypeScript.',
    checklistDesc: 'Features: Add/Remove tasks and edit names. Data saved in browser LocalStorage for persistence.',
    strataDesc: 'The Strata project was developed based on the "HTML5 UP" design.',
    rangeHotelsDesc: 'Range Hotels is a responsive project. Compatible with computer, tablet and mobile.',
    
    // Contacts
    contactsTitle: 'Contacts:',
    copied: 'Copied',
    contactSubtitle: 'Let\'s build something amazing together',
    
    // Footer
    technologiesUsedFooter: 'Technologies Used:',
    pageCode: 'Code of this page',
    builtWith: 'Built with'
  },
  es: {
    // Header
    goodMorning: 'Buenos días',
    goodAfternoon: 'Buenas tardes',
    goodEvening: 'Buenas noches',
    greetingBadge: 'Construyendo soluciones escalables e inteligentes',
    home: 'Inicio',
    projects: 'Proyectos',
    experience: 'Experiencia',
    contacts: 'Contactos',
    resume: 'Currículum',
    github: 'GitHub',
    softwareDeveloper: 'Desarrollador de Software',
    headerDescription: 'Hola, {greeting}! Tengo {age} años y soy profesional de desarrollo de software con experiencia práctica en proyectos corporativos y trabajo en equipo, incluyendo desarrollo de soluciones full stack y participación en iniciativas de IA generativa. Busco oportunidades para aplicar y evolucionar mis habilidades técnicas, contribuyendo con soluciones escalables, eficientes y alineadas con las necesidades del negocio.',
    
    // Experience
    experienceTitle: 'Experiencia Profesional:',
    onsRole: 'Desarrollador de Software',
    onsPeriod: '2024 - 2026',
    onsDescription: 'Desarrollo de aplicaciones corporativas Full Stack utilizando tecnologías modernas de front-end (React, Vite, Angular) y back-end (Node.js, Express, FastAPI, GraphQL, .NET), con enfoque en soluciones escalables, responsivas y de fácil mantenimiento. Participación activa en el desarrollo de Tiago, asistente de IA Generativa del ONS, aplicando técnicas de Ingeniería de Prompts, Machine Learning, Agentes de IA y automatizaciones. Trabajo con arquitecturas como Clean Architecture, Design Patterns y prácticas orientadas a APIs (OpenAPI/Swagger). Implementación de pipelines CI/CD con GitHub Actions y Azure DevOps, incluyendo pruebas automatizadas de accesibilidad con Playwright, axe-core y Lighthouse CI. Experiencia con Cloud (AWS, AWS Lambda), bases de datos relacionales y NoSQL (PostgreSQL, MongoDB, Firebase), y migración de paneles Tableau a Power BI. Trabajo colaborativo en metodologías ágiles (Scrum, Kanban) en equipos multidisciplinarios.',
    
    // Workana
    workanaRole: 'Desarrollador Freelance',
    workanaPeriod: '2023 - 2025',
    workanaDescription: 'Desarrollo de proyectos web Full Stack para clientes, desde la construcción de interfaces modernas y responsivas hasta el desarrollo de servicios y APIs back-end. Creación de Landing Pages y aplicaciones orientadas a la captación de leads, con soluciones personalizadas según los objetivos de cada cliente. Trabajo independiente realizando levantamiento de requisitos, desarrollo, ajustes y entrega dentro de los plazos. Gestión de múltiples proyectos con comunicación directa con clientes, garantizando alineación de requisitos y cumplimiento de plazos. Aplicación de buenas prácticas para crear soluciones eficientes, organizadas y de fácil mantenimiento.',
    
    // Projects
    projectsTitle: 'Proyectos:',
    technologiesUsed: 'Tecnologías Utilizadas:',
    site: 'Sitio',
    apk: 'Apk',
    code: 'Código',
    backToTop: 'Volver arriba',
    searchPlaceholder: 'Buscar nombre del proyecto...',
    allTechnologies: 'Todas las tecnologías',
    
    // Project descriptions
    tiagoOnsDesc: 'Participé en el desarrollo front-end de Tiago, la plataforma de IA Generativa del ONS. Contribuí a crear una experiencia moderna e intuitiva, facilitando el acceso inteligente a información y mejorando la toma de decisiones de los usuarios.',
    exchangeRateDesc: 'Desarrollado en Flutter, es un proyecto que hice para uso personal. El propósito del proyecto es seguir los valores actuales de las conversiones de criptomonedas.',
    hubgramDesc: 'Desarrollado en React, inspirado en Instagram, y con una serie de funcionalidades similares.',
    vetDesc: 'Desarrollado en Next.js, \'Veterinária Pata Amiga\' es una empresa ficticia. Es un proyecto de landing page para una empresa veterinaria.',
    miniBlogDesc: 'Proyecto hecho en React, consiste en un Blog con todas las funcionalidades en React usando la base de datos de Firebase.',
    memoryGameDesc: 'Este proyecto es un juego de memoria en TypeScript.',
    checklistDesc: 'Funcionalidades: Agregar/Eliminar tareas y editar nombres. Datos guardados en LocalStorage del navegador para persistencia.',
    strataDesc: 'El proyecto Strata fue desarrollado basado en el diseño de "HTML5 UP".',
    rangeHotelsDesc: 'Range Hotels es un proyecto responsivo. Compatible con computadora, tablet y celular.',
    
    // Contacts
    contactsTitle: 'Contactos:',
    copied: 'Copiado',
    contactSubtitle: 'Construyamos algo increíble juntos',
    
    // Footer
    technologiesUsedFooter: 'Tecnologías Utilizadas:',
    pageCode: 'Código de esta página',
    builtWith: 'Hecho con'
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
