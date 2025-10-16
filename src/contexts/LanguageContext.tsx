import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en';

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
    home: 'Home',
    projects: 'Projetos',
    contacts: 'Contatos',
    github: 'GitHub',
    frontendDeveloper: 'Desenvolvedor Front-End',
    headerDescription: 'Olá {greeting}! Tenho {age} anos. Sou uma pessoa focada no meu objetivo, e atualmente meu objetivo é me tornar um desenvolvedor de sucesso. Dedico grande parte do meu tempo para estudar e aprimorar minhas habilidades nessa área, buscando sempre me atualizar sobre as últimas tendências e tecnologias. Meu objetivo é me tornar um profissional competente e capaz de oferecer soluções criativas e eficientes para os desafios que surgirem na área.',
    
    // Projects
    projectsTitle: 'Projetos:',
    technologiesUsed: 'Tecnologias Utilizadas:',
    site: 'Site',
    apk: 'Apk',
    code: 'Código',
    backToTop: 'Voltar ao topo',
    
    // Project descriptions
    exchangeRateDesc: 'Desenvolvido em Flutter, é um projeto que fiz para uso pessoal. O propósito do projeto é acompanhar os valores atuais das conversões das criptomoedas.',
    hubgramDesc: 'Desenvolvido em React, inspirado no Instagram, e com uma série de funcionalidades semelhantes.',
    vetDesc: 'Desenvolvido em Next.js, \'Veterinária Pata Amiga\' é uma empresa fictícia. É um projeto de landing page para uma empresa de Veterinário.',
    miniBlogDesc: 'Projeto feito em React, consiste em um Blog com todas as funcionalidades em react usando o banco de dados do Firebase.',
    memoryGameDesc: 'Este projeto é um jogo da memoria em TypeScript.',
    checklistDesc: 'Este projeto tem funcionalidades como: Adicionar/Remover tarefa e editar o nome da tarefa já criada. Para que isso funcione corretamente, a CheckList está sendo armazenada no seu navegador (LocalStorage) fazendo assim para que não perca os dados salvos.',
    strataDesc: 'O projeto Strata foi desenvolvido com base no design da "HTML5 UP".',
    rangeHotelsDesc: 'A Range Hotels é um projeto responsivo. Compatível com computador, tablet e celular.',
    
    // Contacts
    contactsTitle: 'Contatos:',
    copied: 'Copiado',
    
    // Footer
    technologiesUsedFooter: 'Tecnologias Utilizadas:',
    pageCode: 'Código desta página'
  },
  en: {
    // Header
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    goodEvening: 'Good evening',
    home: 'Home',
    projects: 'Projects',
    contacts: 'Contacts',
    github: 'GitHub',
    frontendDeveloper: 'Front-End Developer',
    headerDescription: 'Hello {greeting}! I am {age} years old. I am a person focused on my goal, and currently my goal is to become a successful developer. I dedicate a large part of my time to studying and improving my skills in this area, always seeking to stay updated on the latest trends and technologies. My goal is to become a competent professional capable of offering creative and efficient solutions to the challenges that arise in the area.',
    
    // Projects
    projectsTitle: 'Projects:',
    technologiesUsed: 'Technologies Used:',
    site: 'Site',
    apk: 'Apk',
    code: 'Code',
    backToTop: 'Back to top',
    
    // Project descriptions
    exchangeRateDesc: 'Developed in Flutter, it is a project I made for personal use. The purpose of the project is to track the current values of cryptocurrency conversions.',
    hubgramDesc: 'Developed in React, inspired by Instagram, and with a series of similar functionalities.',
    vetDesc: 'Developed in Next.js, \'Veterinária Pata Amiga\' is a fictional company. It is a landing page project for a Veterinary company.',
    miniBlogDesc: 'Project made in React, consists of a Blog with all functionalities in react using Firebase database.',
    memoryGameDesc: 'This project is a memory game in TypeScript.',
    checklistDesc: 'This project has functionalities like: Add/Remove task and edit the name of the already created task. For this to work correctly, the CheckList is being stored in your browser (LocalStorage) so you don\'t lose the saved data.',
    strataDesc: 'The Strata project was developed based on the "HTML5 UP" design.',
    rangeHotelsDesc: 'Range Hotels is a responsive project. Compatible with computer, tablet and mobile.',
    
    // Contacts
    contactsTitle: 'Contacts:',
    copied: 'Copied',
    
    // Footer
    technologiesUsedFooter: 'Technologies Used:',
    pageCode: 'Code of this page'
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