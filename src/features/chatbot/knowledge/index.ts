import type { ChatTopic } from '../types.ts';
import { PROFILE_TOPICS } from './profile.ts';
import { TECH_TOPICS } from './tech.ts';

/** Single source of truth for the keyword bot and for the AI context (chatbot-worker). */
export const KNOWLEDGE_TOPICS: readonly ChatTopic[] = [...PROFILE_TOPICS, ...TECH_TOPICS];
