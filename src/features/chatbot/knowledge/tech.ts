import type { ChatTopic } from '../types.ts';

/** Skills and technologies. Levels follow the ones Daniel declared; never inflate them. */
export const TECH_TOPICS: readonly ChatTopic[] = [
  {
    id: 'skills',
    tier: 'general',
    keywords: [
      'skill', 'habilidade', 'competencia', 'tecnologia', 'stack', 'ferramenta', 'linguagens de programacao',
      'o que ele sabe', 'sabe fazer', 'conhecimento', 'domina',
      'technology', 'technologies', 'tech stack', 'tool', 'programming language', 'what does he know',
      'habilidad', 'herramienta', 'lenguajes de programacion', 'que sabe', 'conocimiento',
    ],
    answer: {
      pt: 'Principais skills do Daniel:\n• Front-end: React, Next.js, Angular, Vue.js, TypeScript, Vite, Chakra UI e MUI\n• Back-end: Node.js, Express, FastAPI, .NET, Rust, GraphQL e APIs REST\n• IA: engenharia de prompt, agentes de IA, RAG, LLMs e engenharia de harness\n• Dados e BI: Power BI, DAX, Tableau, PostgreSQL, MongoDB e DynamoDB\n• DevOps e cloud: GitHub Actions, Azure DevOps, AWS (Lambda e API Gateway) e OpenShift\n• Mobile: React Native e Flutter\nPergunte sobre uma tecnologia específica para saber mais.',
      en: "Daniel's main skills:\n• Front-end: React, Next.js, Angular, Vue.js, TypeScript, Vite, Chakra UI and MUI\n• Back-end: Node.js, Express, FastAPI, .NET, Rust, GraphQL and REST APIs\n• AI: prompt engineering, AI agents, RAG, LLMs and harness engineering\n• Data and BI: Power BI, DAX, Tableau, PostgreSQL, MongoDB and DynamoDB\n• DevOps and cloud: GitHub Actions, Azure DevOps, AWS (Lambda and API Gateway) and OpenShift\n• Mobile: React Native and Flutter\nAsk about a specific technology to learn more.",
      es: 'Principales habilidades de Daniel:\n• Front-end: React, Next.js, Angular, Vue.js, TypeScript, Vite, Chakra UI y MUI\n• Back-end: Node.js, Express, FastAPI, .NET, Rust, GraphQL y APIs REST\n• IA: ingeniería de prompts, agentes de IA, RAG, LLMs e ingeniería de harness\n• Datos y BI: Power BI, DAX, Tableau, PostgreSQL, MongoDB y DynamoDB\n• DevOps y cloud: GitHub Actions, Azure DevOps, AWS (Lambda y API Gateway) y OpenShift\n• Mobile: React Native y Flutter\nPregunta por una tecnología específica para saber más.',
    },
  },
  {
    id: 'frontend',
    tier: 'specific',
    keywords: [
      'front end', 'frontend', 'react', 'reactjs', 'nextjs', 'next js', 'angular', 'angularjs', 'vue', 'vuejs',
      'html', 'css', 'javascript', 'js', 'typescript', 'ts', 'vite', 'chakra', 'chakra ui', 'mui', 'material ui',
      'shadcn', 'microfrontend', 'micro frontend', 'interface', 'figma', 'ui design', 'portfolio', 'interfaz',
    ],
    answer: {
      pt: 'No front-end, Daniel tem nível avançado em React, Next.js, Angular, AngularJS, Vue.js, TypeScript, JavaScript, HTML e CSS, além de Vite, Chakra UI, MUI, shadcn, microfrontends e Figma. No ONS, usou React e TypeScript na interface conversacional do Tiago e no widget Insight ONS. Este portfólio também foi feito com React, Vite e Chakra UI.',
      en: 'On the front-end, Daniel has advanced skills in React, Next.js, Angular, AngularJS, Vue.js, TypeScript, JavaScript, HTML and CSS, plus Vite, Chakra UI, MUI, shadcn, microfrontends and Figma. At ONS, he used React and TypeScript in the Tiago conversational interface and in the Insight ONS widget. This portfolio was also built with React, Vite and Chakra UI.',
      es: 'En el front-end, Daniel tiene nivel avanzado en React, Next.js, Angular, AngularJS, Vue.js, TypeScript, JavaScript, HTML y CSS, además de Vite, Chakra UI, MUI, shadcn, microfrontends y Figma. En el ONS, usó React y TypeScript en la interfaz conversacional de Tiago y en el widget Insight ONS. Este portafolio también fue hecho con React, Vite y Chakra UI.',
    },
  },
  {
    id: 'backend',
    tier: 'specific',
    keywords: [
      'back end', 'backend', 'node', 'nodejs', 'express', 'expressjs', 'fastapi', '.net', 'dotnet', 'c#',
      'graphql', 'hotchocolate', 'rust', 'cargo', 'rest api', 'restful', 'api', 'swagger', 'openapi', 'java', 'spring', 'python',
      'php', 'clean architecture', 'design patterns', 'padroes de projeto', 'arquitetura de software',
      'servidor', 'server', 'patrones de diseno',
    ],
    answer: {
      pt: 'No back-end, Daniel tem nível avançado em Node.js, Express, FastAPI, .NET (C#), GraphQL (HotChocolate), APIs REST, Python, Java e Rust, e intermediário em Spring e PHP. Trabalha com Clean Architecture, Design Patterns e documentação de APIs com OpenAPI/Swagger. No ONS, participou do desenvolvimento de serviços e integrações de APIs em soluções corporativas.',
      en: 'On the back-end, Daniel has advanced skills in Node.js, Express, FastAPI, .NET (C#), GraphQL (HotChocolate), REST APIs, Python, Java and Rust, and intermediate skills in Spring and PHP. He works with Clean Architecture, Design Patterns and API documentation with OpenAPI/Swagger. At ONS, he took part in building services and API integrations for corporate solutions.',
      es: 'En el back-end, Daniel tiene nivel avanzado en Node.js, Express, FastAPI, .NET (C#), GraphQL (HotChocolate), APIs REST, Python, Java y Rust, e intermedio en Spring y PHP. Trabaja con Clean Architecture, Design Patterns y documentación de APIs con OpenAPI/Swagger. En el ONS, participó en el desarrollo de servicios e integraciones de APIs en soluciones corporativas.',
    },
  },
  {
    id: 'ai',
    tier: 'specific',
    keywords: [
      'ia', 'inteligencia artificial', 'ia generativa', 'llm', 'prompt', 'engenharia de prompt', 'agentes de ia',
      'agente', 'rag', 'machine learning', 'ml', 'aprendizado de maquina', 'automacao', 'automacoes', 'tiago',
      // No bare "ai": lowercase "ai" is usually the Portuguese "aí". Uppercase "AI" is
      // turned into "artificial intelligence" by normalizeText.
      'artificial intelligence', 'generative ai', 'genai', 'prompt engineering', 'ai agents', 'agent',
      'automation', 'ingenieria de prompts', 'automatizacion', 'aprendizaje automatico',
    ],
    answer: {
      pt: 'Daniel tem experiência prática com IA generativa: no ONS, participou do desenvolvimento do Tiago, assistente de IA generativa que responde perguntas em linguagem natural sobre informações institucionais, atuando na interface conversacional e com engenharia de prompt, agentes de IA e automações. Tem nível avançado em engenharia de prompt, agentes de IA, skills e rules, e intermediário em LLMs, RAG, machine learning, automações com IA e engenharia de harness.',
      en: 'Daniel has hands-on experience with generative AI: at ONS, he took part in building Tiago, a generative AI assistant that answers natural language questions about institutional information, working on the conversational interface and with prompt engineering, AI agents and automation. He has advanced skills in prompt engineering, AI agents, skills and rules, and intermediate skills in LLMs, RAG, machine learning, AI automation and harness engineering.',
      es: 'Daniel tiene experiencia práctica con IA generativa: en el ONS, participó en el desarrollo de Tiago, asistente de IA generativa que responde preguntas en lenguaje natural sobre información institucional, trabajando en la interfaz conversacional y con ingeniería de prompts, agentes de IA y automatizaciones. Tiene nivel avanzado en ingeniería de prompts, agentes de IA, skills y rules, e intermedio en LLMs, RAG, machine learning, automatizaciones con IA e ingeniería de harness.',
    },
  },
  {
    id: 'harness',
    tier: 'specific',
    keywords: [
      'harness', 'engenharia de harness', 'harness engineering', 'ingenieria de harness', 'skills de ia',
      'ia skills', 'ai skills', 'rules', 'agentic',
    ],
    answer: {
      pt: 'Daniel tem nível intermediário em engenharia de harness: a configuração do ambiente em que agentes de IA trabalham, com instruções, skills, rules, ferramentas e automações que guiam o agente. Nesse contexto, tem nível avançado em skills de IA, rules e agentes de IA, e intermediário em LLMs e automações com IA.',
      en: 'Daniel has intermediate skills in harness engineering: setting up the environment AI agents work in, with the instructions, skills, rules, tools and automations that guide the agent. In this area, he has advanced skills in AI skills, rules and AI agents, and intermediate skills in LLMs and AI automation.',
      es: 'Daniel tiene nivel intermedio en ingeniería de harness: la configuración del entorno en el que trabajan los agentes de IA, con instrucciones, skills, rules, herramientas y automatizaciones que guían al agente. En este ámbito, tiene nivel avanzado en skills de IA, rules y agentes de IA, e intermedio en LLMs y automatizaciones con IA.',
    },
  },
  {
    id: 'bi',
    tier: 'specific',
    keywords: [
      'power bi', 'powerbi', 'bi', 'business intelligence', 'dax', 'tableau', 'dashboard', 'painel', 'paineis',
      'relatorio', 'indicadores', 'kpi', 'excel', 'analise de dados', 'data analysis', 'report', 'panel',
      'paneles', 'informe', 'analisis de datos',
    ],
    answer: {
      pt: 'Daniel tem nível avançado em Power BI, DAX e Tableau. No ONS, participou da migração corporativa de painéis do Tableau para o Power BI, atuando nas interfaces e nos dados que os alimentam, em contato com os usuários e apoiando a validação dos relatórios. Também trabalhou com medidas DAX, tabelas calendário para filtros por período, relacionamentos entre tabelas e indicadores de geração de energia em MWmed.',
      en: 'Daniel has advanced skills in Power BI, DAX and Tableau. At ONS, he took part in the corporate migration of dashboards from Tableau to Power BI, working on the interfaces and the data behind them, in contact with users and helping validate the reports. He also worked with DAX measures, calendar tables for date filters, table relationships and power generation indicators in MWmed.',
      es: 'Daniel tiene nivel avanzado en Power BI, DAX y Tableau. En el ONS, participó en la migración corporativa de paneles de Tableau a Power BI, trabajando en las interfaces y en los datos que los alimentan, en contacto con los usuarios y apoyando la validación de los informes. También trabajó con medidas DAX, tablas calendario para filtros por período, relaciones entre tablas e indicadores de generación de energía en MWmed.',
    },
  },
  {
    id: 'devops',
    tier: 'specific',
    keywords: [
      'devops', 'ci/cd', 'ci cd', 'pipeline', 'github actions', 'azure devops', 'tfs', 'aws', 'amazon', 'lambda',
      'api gateway', 'cloud', 'nuvem', 'openshift', 'yaml', 'deploy', 'git', 'versionamento', 'nube',
    ],
    answer: {
      pt: 'Em DevOps e cloud, Daniel tem nível avançado em GitHub Actions, Azure DevOps, pipelines CI/CD, YAML, OpenShift, Git e AWS Lambda, e intermediário em AWS e AWS API Gateway. No ONS, participou da migração do Azure DevOps (TFS) para o GitHub, criando pipelines YAML de deploy para AWS e OpenShift, com testes automatizados e verificações de acessibilidade (Playwright, axe-core e Lighthouse CI).',
      en: 'In DevOps and cloud, Daniel has advanced skills in GitHub Actions, Azure DevOps, CI/CD pipelines, YAML, OpenShift, Git and AWS Lambda, and intermediate skills in AWS and AWS API Gateway. At ONS, he took part in the migration from Azure DevOps (TFS) to GitHub, creating YAML deployment pipelines for AWS and OpenShift, with automated tests and accessibility checks (Playwright, axe-core and Lighthouse CI).',
      es: 'En DevOps y cloud, Daniel tiene nivel avanzado en GitHub Actions, Azure DevOps, pipelines CI/CD, YAML, OpenShift, Git y AWS Lambda, e intermedio en AWS y AWS API Gateway. En el ONS, participó en la migración de Azure DevOps (TFS) a GitHub, creando pipelines YAML de despliegue para AWS y OpenShift, con pruebas automatizadas y verificaciones de accesibilidad (Playwright, axe-core y Lighthouse CI).',
    },
  },
  {
    id: 'databases',
    tier: 'specific',
    keywords: [
      'banco de dados', 'bancos de dados', 'database', 'base de datos', 'bd', 'sql', 'nosql', 'postgresql',
      'postgres', 'mongodb', 'mongo', 'firebase', 'dynamodb', 'oracle',
    ],
    answer: {
      pt: 'Daniel tem nível avançado em SQL, PostgreSQL, Oracle SQL, MongoDB, Firebase e DynamoDB. No ONS, usou PostgreSQL e DynamoDB no Insight ONS e MongoDB no Tiago. Nos projetos freelance, usou Firebase e MongoDB.',
      en: 'Daniel has advanced skills in SQL, PostgreSQL, Oracle SQL, MongoDB, Firebase and DynamoDB. At ONS, he used PostgreSQL and DynamoDB in Insight ONS and MongoDB in Tiago. In freelance projects, he used Firebase and MongoDB.',
      es: 'Daniel tiene nivel avanzado en SQL, PostgreSQL, Oracle SQL, MongoDB, Firebase y DynamoDB. En el ONS, usó PostgreSQL y DynamoDB en Insight ONS y MongoDB en Tiago. En los proyectos freelance, usó Firebase y MongoDB.',
    },
  },
  {
    id: 'mobile',
    tier: 'specific',
    keywords: [
      'mobile', 'app', 'aplicativo', 'celular', 'android', 'react native', 'flutter', 'dart', 'kotlin', 'gradle',
      'aplicacion', 'movil',
    ],
    answer: {
      pt: 'Em mobile, Daniel tem nível avançado em React Native, Flutter, Dart e Android (Gradle e JDK), e básico em Kotlin. No ONS, atuou com o ambiente e o build Android do app Mobile.Tiago, desenvolvido em React Native. Também criou em Flutter um app pessoal para acompanhar a cotação de criptomoedas.',
      en: 'On mobile, Daniel has advanced skills in React Native, Flutter, Dart and Android (Gradle and JDK), and basic Kotlin. At ONS, he worked on the Android environment and build of the Mobile.Tiago app, built with React Native. He also built a personal Flutter app to track cryptocurrency exchange rates.',
      es: 'En mobile, Daniel tiene nivel avanzado en React Native, Flutter, Dart y Android (Gradle y JDK), y básico en Kotlin. En el ONS, trabajó con el entorno y el build Android de la app Mobile.Tiago, desarrollada en React Native. También creó en Flutter una app personal para seguir la cotización de criptomonedas.',
    },
  },
  {
    id: 'testing',
    tier: 'specific',
    keywords: [
      'teste', 'testes automatizados', 'playwright', 'axe', 'axe core', 'lighthouse', 'acessibilidade', 'qa',
      'qualidade', 'e2e', 'test', 'testing', 'accessibility', 'quality', 'prueba', 'pruebas', 'accesibilidad',
      'calidad',
    ],
    answer: {
      pt: 'Daniel tem nível avançado em Playwright, axe-core e Lighthouse CI. No ONS, automatizou testes com Playwright e incluiu verificações automatizadas de acessibilidade nos pipelines CI/CD do GitHub Actions e do Azure DevOps.',
      en: 'Daniel has advanced skills in Playwright, axe-core and Lighthouse CI. At ONS, he automated tests with Playwright and added automated accessibility checks to the CI/CD pipelines in GitHub Actions and Azure DevOps.',
      es: 'Daniel tiene nivel avanzado en Playwright, axe-core y Lighthouse CI. En el ONS, automatizó pruebas con Playwright e incluyó verificaciones automatizadas de accesibilidad en los pipelines CI/CD de GitHub Actions y Azure DevOps.',
    },
  },
];
