import type { ChatTopic } from '../types.ts';

/**
 * Personal and career topics. Everything here is PUBLIC: it ships in the site bundle
 * and is sent to the AI as context. Never add documents, address, phone or salary.
 */
export const PROFILE_TOPICS: readonly ChatTopic[] = [
  {
    id: 'greeting',
    tier: 'social',
    keywords: [
      'oi', 'ola', 'opa', 'e ai', 'eae', 'tudo bem', 'bom dia', 'boa tarde', 'boa noite', 'quem e voce',
      'hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'who are you',
      'hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'quien eres',
    ],
    answer: {
      pt: 'Olá! Sou o assistente virtual do Daniel. Pergunte sobre experiência, skills, projetos, formação ou contato dele.',
      en: "Hi! I'm Daniel's virtual assistant. Ask me about his experience, skills, projects, education or contact.",
      es: '¡Hola! Soy el asistente virtual de Daniel. Pregúntame sobre su experiencia, habilidades, proyectos, formación o contacto.',
    },
  },
  {
    id: 'about',
    tier: 'general',
    keywords: [
      'quem e o daniel', 'quem e daniel', 'quem e ele', 'sobre o daniel', 'sobre ele', 'fale do daniel',
      'rossinatti', 'perfil', 'resumo', 'biografia', 'bio', 'se apresente',
      'who is daniel', 'who is he', 'about daniel', 'about him', 'tell me about', 'profile', 'summary',
      'quien es daniel', 'quien es el', 'sobre daniel', 'resumen',
    ],
    answer: {
      pt: 'Daniel Rossinatti tem {age} anos e é desenvolvedor de software Full Stack, na área de tecnologia há cerca de 3 a 4 anos. Fez estágio em Desenvolvimento de Software no ONS (Operador Nacional do Sistema Elétrico), na Gerência de Arquitetura de Dados, onde participou do Tiago (assistente de IA generativa do ONS), do widget Insight ONS, de pipelines CI/CD e da migração de Tableau para Power BI. Antes, foi desenvolvedor freelancer Full Stack pela Workana.',
      en: 'Daniel Rossinatti is a {age}-year-old Full Stack software developer with about 3 to 4 years in tech. He was a Software Development intern at ONS (Brazil\'s National Electric System Operator), in the Data Architecture department, where he took part in Tiago (ONS\'s generative AI assistant), the Insight ONS widget, CI/CD pipelines and the Tableau to Power BI migration. Before that, he worked as a Full Stack freelance developer on Workana.',
      es: 'Daniel Rossinatti tiene {age} años y es desarrollador de software Full Stack, con cerca de 3 a 4 años en el área de tecnología. Hizo prácticas en Desarrollo de Software en el ONS (Operador Nacional del Sistema Eléctrico de Brasil), en la Gerencia de Arquitectura de Datos, donde participó en Tiago (asistente de IA generativa del ONS), en el widget Insight ONS, en pipelines CI/CD y en la migración de Tableau a Power BI. Antes trabajó como desarrollador freelance Full Stack en Workana. ',
    },
  },
  {
    id: 'age',
    tier: 'specific',
    keywords: ['idade', 'quantos anos', 'que idade', 'how old', 'age', 'edad', 'cuantos anos', 'que edad'],
    // Only terms about duration ("há quantos anos ele programa?"); "onde trabalha" must keep the age.
    exclude: [
      'experiencia', 'experience', 'trabalhou', 'programa', 'programando', 'carreira', 'career', 'worked',
      'coding',
    ],
    answer: {
      pt: 'Daniel tem {age} anos.',
      en: 'Daniel is {age} years old.',
      es: 'Daniel tiene {age} años.',
    },
  },
  {
    id: 'experience',
    tier: 'general',
    keywords: [
      'experiencia', 'anos de experiencia', 'trabalho', 'trabalhou', 'trabalha', 'emprego', 'empresa',
      'carreira', 'ons', 'operador nacional', 'estagio', 'estagiario', 'freelance', 'freelancer', 'workana',
      'experience', 'work experience', 'where does he work', 'where did he work', 'worked', 'job', 'company',
      'career', 'internship', 'intern',
      'trabajo', 'trabaja', 'practicas', 'pasantia',
    ],
    answer: {
      pt: 'Experiência profissional do Daniel (cerca de 3 a 4 anos na área de tecnologia):\n• ONS — Operador Nacional do Sistema Elétrico (mar/2025 a nov/2026, 1 ano e 9 meses): estágio em Desenvolvimento de Software na Gerência de Arquitetura de Dados, em modelo híbrido. Atuou em várias frentes: soluções Full Stack, o assistente de IA generativa Tiago (com contato direto com o fornecedor, organização de sprints e cards de backlog e participação no código), o widget Insight ONS (iniciativa dele), skills e harness de IA agêntica para o Claude Code, homologação de frameworks React (como Tailwind e Chakra UI), pipelines CI/CD e as migrações de Azure DevOps para GitHub e de Tableau para Power BI. Participava toda semana das reuniões de acompanhamento.\n• Freelancer Full Stack pela Workana (jan/2023 a mar/2025, remoto): landing pages, aplicações web e APIs para clientes, do levantamento de requisitos à entrega. Trabalhou por mais tempo com um cliente fixo de captação de leads, criando interfaces em React para a venda de cursos online.',
      en: "Daniel's professional experience (about 3 to 4 years in tech):\n• ONS — Brazil's National Electric System Operator (Mar 2025 to Nov 2026, 1 year and 9 months): Software Development intern in the Data Architecture department, in a hybrid model. He worked on several fronts: Full Stack solutions, the generative AI assistant Tiago (working directly with the vendor, organizing sprints and backlog cards and contributing to the code), the Insight ONS widget (his own initiative), agentic AI skills and harness for Claude Code, evaluation of React frameworks (such as Tailwind and Chakra UI), CI/CD pipelines and the Azure DevOps to GitHub and Tableau to Power BI migrations. He attended the weekly follow-up meetings.\n• Full Stack freelancer on Workana (Jan 2023 to Mar 2025, remote): landing pages, web applications and APIs for clients, from requirements gathering to delivery. His longest engagement was with a recurring lead generation client, building React interfaces for selling online courses.",
      es: 'Experiencia profesional de Daniel (cerca de 3 a 4 años en el área de tecnología):\n• ONS — Operador Nacional del Sistema Eléctrico de Brasil (mar/2025 a nov/2026, 1 año y 9 meses): prácticas en Desarrollo de Software en la Gerencia de Arquitectura de Datos, en modalidad híbrida. Trabajó en varios frentes: soluciones Full Stack, el asistente de IA generativa Tiago (con contacto directo con el proveedor, organización de sprints y tarjetas de backlog y participación en el código), el widget Insight ONS (iniciativa suya), skills y harness de IA agéntica para Claude Code, homologación de frameworks React (como Tailwind y Chakra UI), pipelines CI/CD y las migraciones de Azure DevOps a GitHub y de Tableau a Power BI. Participaba cada semana en las reuniones de seguimiento.\n• Freelance Full Stack en Workana (ene/2023 a mar/2025, remoto): landing pages, aplicaciones web y APIs para clientes, desde el levantamiento de requisitos hasta la entrega. Su colaboración más larga fue con un cliente fijo de captación de leads, creando interfaces en React para la venta de cursos online.',
    },
  },
  {
    id: 'projects',
    tier: 'specific',
    keywords: [
      'projeto', 'projetos', 'insight', 'insight ons', 'widget', 'mapa de calor', 'heatmap', 'hubgram',
      'mini blog', 'claude', 'codex', 'usage', 'jogo da memoria', 'memory game', 'range hotels', 'strata', 'exchange rate', 'pata amiga',
      'project', 'projects', 'proyecto', 'proyectos',
    ],
    answer: {
      pt: 'Destaques entre os projetos do Daniel:\n• Tiago (ONS): assistente de IA generativa para consultas sobre dados institucionais; Daniel atuou na interface conversacional, no contato com o fornecedor e na organização de sprints e backlog.\n• Insight ONS (iniciativa do Daniel): widget que identifica telas críticas e acompanha o uso das aplicações (cliques, tempo de permanência e navegador), com mapas de calor e capturas de tela, integrável via npm, CDN, Web Components e SharePoint (SPFx).\n• Migrações no ONS: Azure DevOps (TFS) para GitHub e Tableau para Power BI.\n• Skills e harness de IA agêntica para o Claude Code (ONS).\n• Widget de uso do Claude e do Codex: acompanha o consumo (usage) das duas ferramentas de IA.\n• Projetos pessoais: Hubgram (React), Mini Blog (React + Firebase), Exchange Rate (Flutter) e outros. Veja todos na seção Projetos deste site.',
      en: "Highlights among Daniel's projects:\n• Tiago (ONS): generative AI assistant for questions about institutional data; Daniel worked on the conversational interface, with the vendor and on organizing sprints and the backlog.\n• Insight ONS (Daniel's initiative): widget that identifies critical screens and tracks application usage (clicks, time on page and browser), with click heatmaps and screenshots, integrable via npm, CDN, Web Components and SharePoint (SPFx).\n• Migrations at ONS: Azure DevOps (TFS) to GitHub and Tableau to Power BI.\n• Agentic AI skills and harness for Claude Code (ONS).\n• Claude and Codex usage widget: tracks the usage of both AI tools.\n• Personal projects: Hubgram (React), Mini Blog (React + Firebase), Exchange Rate (Flutter) and more. See them all in the Projects section of this site.",
      es: 'Destacados entre los proyectos de Daniel:\n• Tiago (ONS): asistente de IA generativa para consultas sobre datos institucionales; Daniel trabajó en la interfaz conversacional, con el proveedor y en la organización de sprints y backlog.\n• Insight ONS (iniciativa de Daniel): widget que identifica pantallas críticas y sigue el uso de las aplicaciones (clics, tiempo de permanencia y navegador), con mapas de calor y capturas de pantalla, integrable vía npm, CDN, Web Components y SharePoint (SPFx).\n• Migraciones en el ONS: Azure DevOps (TFS) a GitHub y Tableau a Power BI.\n• Skills y harness de IA agéntica para Claude Code (ONS).\n• Widget de uso de Claude y Codex: monitoriza el consumo (usage) de ambas herramientas de IA.\n• Proyectos personales: Hubgram (React), Mini Blog (React + Firebase), Exchange Rate (Flutter) y otros. Míralos todos en la sección Proyectos de este sitio.',
    },
  },
  {
    id: 'education',
    tier: 'specific',
    keywords: [
      'formacao', 'formado', 'faculdade', 'graduacao', 'graduado', 'universidade', 'curso', 'estudou',
      'estuda', 'estudo', 'diploma', 'uninter', 'ads', 'analise e desenvolvimento de sistemas',
      'certificado', 'certificacao', 'certificacoes', 'udemy',
      'education', 'degree', 'college', 'university', 'studied', 'study', 'course', 'certificate',
      'certification', 'formacion', 'universidad', 'estudio', 'titulo', 'certificacion', 'certificaciones',
    ],
    answer: {
      pt: 'Daniel é formado em Análise e Desenvolvimento de Sistemas (ADS) pela Uninter, curso superior EAD concluído em julho de 2026. Também tem certificados da Udemy em React, JavaScript, front-end (HTML, CSS e JS), .NET, PHP e UI Design com Figma.',
      en: 'Daniel holds a degree in Systems Analysis and Development (ADS) from Uninter, an online higher education program completed in July 2026. He also has Udemy certificates in React, JavaScript, front-end (HTML, CSS and JS), .NET, PHP and UI Design with Figma.',
      es: 'Daniel se graduó en Análisis y Desarrollo de Sistemas (ADS) en Uninter, carrera superior a distancia concluida en julio de 2026. También tiene certificados de Udemy en React, JavaScript, front-end (HTML, CSS y JS), .NET, PHP y UI Design con Figma.',
    },
  },
  {
    id: 'languages',
    tier: 'specific',
    keywords: [
      'idioma', 'ingles', 'espanhol', 'lingua',
      'english', 'spanish', 'speak', 'espanol',
    ],
    answer: {
      pt: 'Daniel fala português (nativo), inglês e espanhol (ambos em nível intermediário, B2).',
      en: 'Daniel speaks Portuguese (native), English and Spanish (both intermediate, B2 level).',
      es: 'Daniel habla portugués (nativo), inglés y español (ambos en nivel intermedio, B2).',
    },
  },
  {
    id: 'contact',
    tier: 'specific',
    keywords: [
      'contato', 'contatos', 'email', 'e mail', 'gmail', 'linkedin', 'github', 'whatsapp', 'zap',
      'telefone', 'discord', 'falar com', 'entrar em contato',
      'contact', 'reach', 'phone', 'contacto', 'contactar', 'telefono', 'correo',
    ],
    answer: {
      pt: 'Você pode falar com o Daniel por:\n• E-mail: danielrossinatti15@gmail.com\n• LinkedIn: linkedin.com/in/daniel-rossinatti-667933148\n• GitHub: github.com/DanielAlexssander\nWhatsApp e Discord estão na seção Contatos deste site.',
      en: 'You can reach Daniel at:\n• Email: danielrossinatti15@gmail.com\n• LinkedIn: linkedin.com/in/daniel-rossinatti-667933148\n• GitHub: github.com/DanielAlexssander\nWhatsApp and Discord are in the Contacts section of this site.',
      es: 'Puedes contactar a Daniel por:\n• Correo: danielrossinatti15@gmail.com\n• LinkedIn: linkedin.com/in/daniel-rossinatti-667933148\n• GitHub: github.com/DanielAlexssander\nWhatsApp y Discord están en la sección Contactos de este sitio.',
    },
  },
  {
    id: 'availability',
    tier: 'specific',
    keywords: [
      'disponivel', 'disponibilidade', 'vaga', 'oportunidade', 'contratar', 'contratacao', 'procurando',
      'inicio imediato', 'mudanca', 'mudar de cidade', 'viagem', 'viagens',
      'available', 'availability', 'hire', 'hiring', 'opportunity', 'opening', 'looking for', 'open to work',
      'relocate', 'relocation', 'travel',
      'disponible', 'disponibilidad', 'oportunidad', 'contratacion', 'buscando', 'mudarse',
    ],
    answer: {
      pt: 'Daniel está em busca de novas oportunidades como desenvolvedor, com disponibilidade para início imediato, para viagens e para mudança de cidade. Para conversar sobre uma vaga, use a seção Contatos ou o LinkedIn dele.',
      en: 'Daniel is looking for new developer opportunities and is available to start immediately, to travel and to relocate. To talk about a position, use the Contacts section or his LinkedIn.',
      es: 'Daniel busca nuevas oportunidades como desarrollador, con disponibilidad para empezar de inmediato, para viajar y para mudarse de ciudad. Para hablar sobre una vacante, usa la sección Contactos o su LinkedIn.',
    },
  },
];
