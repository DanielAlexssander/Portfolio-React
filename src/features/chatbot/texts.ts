import type { Language } from '../../types/index.ts';

export interface ChatTexts {
  readonly title: string;
  readonly subtitle: string;
  readonly greeting: string;
  readonly placeholder: string;
  readonly send: string;
  readonly open: string;
  readonly close: string;
  readonly typing: string;
  readonly outOfScope: string;
  readonly unavailable: string;
  /** Shown when the visitor used up today's AI questions (keyword answers keep working). */
  readonly limitReached: string;
  /** Counter under the input. `{remaining}` and `{limit}` are replaced. */
  readonly aiQuota: string;
  readonly suggestions: readonly string[];
}

export const CHAT_TEXTS: Readonly<Record<Language, ChatTexts>> = {
  pt: {
    title: 'Assistente do Daniel',
    subtitle: 'Respostas sobre experiência, skills e projetos',
    greeting:
      'Olá! Sou o assistente virtual do Daniel. Pergunte sobre experiência, skills, projetos, formação ou contato dele.',
    placeholder: 'Pergunte algo sobre o Daniel...',
    send: 'Enviar pergunta',
    open: 'Abrir assistente',
    close: 'Fechar assistente',
    typing: 'Pensando...',
    outOfScope:
      'Desculpe, não respondo esse tipo de pergunta. Só falo sobre o Daniel: experiência, skills, projetos, formação e contato.',
    unavailable:
      'Não consegui responder agora. Tente perguntar sobre experiência, skills, projetos, formação ou contato do Daniel.',
    limitReached:
      'Você atingiu o limite de perguntas livres de hoje. Ainda respondo sobre experiência, skills, projetos, formação e contato do Daniel, ou fale com ele pela seção Contatos.',
    aiQuota: '{remaining} de {limit} perguntas para a IA (fora de escopo básicos) livres hoje',
    suggestions: ['Quem é o Daniel?', 'Quantos anos ele tem?', 'Quais são as skills dele?', 'O que ele sabe de Power BI?'],
  },
  en: {
    title: "Daniel's Assistant",
    subtitle: 'Answers about experience, skills and projects',
    greeting:
      "Hi! I'm Daniel's virtual assistant. Ask me about his experience, skills, projects, education or contact.",
    placeholder: 'Ask something about Daniel...',
    send: 'Send question',
    open: 'Open assistant',
    close: 'Close assistant',
    typing: 'Thinking...',
    outOfScope:
      "Sorry, I don't answer that kind of question. I only talk about Daniel: experience, skills, projects, education and contact.",
    unavailable:
      "I couldn't answer right now. Try asking about Daniel's experience, skills, projects, education or contact.",
    limitReached:
      "You've reached today's limit of open questions. I can still answer about Daniel's experience, skills, projects, education and contact, or reach him through the Contacts section.",
    aiQuota: '{remaining} of {limit} open questions left today',
    suggestions: ['Who is Daniel?', 'How old is he?', 'What are his skills?', 'What does he know about Power BI?'],
  },
  es: {
    title: 'Asistente de Daniel',
    subtitle: 'Respuestas sobre experiencia, habilidades y proyectos',
    greeting:
      '¡Hola! Soy el asistente virtual de Daniel. Pregúntame sobre su experiencia, habilidades, proyectos, formación o contacto.',
    placeholder: 'Pregunta algo sobre Daniel...',
    send: 'Enviar pregunta',
    open: 'Abrir asistente',
    close: 'Cerrar asistente',
    typing: 'Pensando...',
    outOfScope:
      'Lo siento, no respondo ese tipo de preguntas. Solo hablo sobre Daniel: experiencia, habilidades, proyectos, formación y contacto.',
    unavailable:
      'No pude responder ahora. Intenta preguntar sobre la experiencia, habilidades, proyectos, formación o contacto de Daniel.',
    limitReached:
      'Alcanzaste el límite de preguntas libres de hoy. Aún respondo sobre la experiencia, habilidades, proyectos, formación y contacto de Daniel, o contáctalo en la sección Contactos.',
    aiQuota: '{remaining} de {limit} preguntas libres hoy',
    suggestions: ['¿Quién es Daniel?', '¿Cuántos años tiene?', '¿Cuáles son sus habilidades?', '¿Qué sabe de Power BI?'],
  },
};
