import en from './en.json';
import fr from './fr.json';
import type { SupportedLanguage, Translation } from './translation';

export type { SupportedLanguage, Translation } from './translation';
export type {
  BeatTranslation,
  ExperienceItemTranslation,
  ProjectDecisionTranslation,
  ProjectTranslation,
} from './translation';

export const LANGUAGES: readonly SupportedLanguage[] = ['en', 'fr'];

export const TRANSLATIONS: Record<SupportedLanguage, Translation> = {
  en: en as Translation,
  fr: fr as Translation,
};

/** Maps the raw archive category values in `src/data` to dictionary keys. */
export const CATEGORY_KEYS: Record<string, string> = {
  'Product Development': 'product-development',
  'AI / Computer Vision': 'ai-computer-vision',
  'Full-Stack Development': 'full-stack-development',
  'Web / Platform': 'web-platform',
  'Backend / Full-Stack': 'backend-full-stack',
  'Data / Big Data': 'data-big-data',
  'Algorithms / Optimization': 'algorithms-optimization',
};

/** Maps the raw toolbox category values in `src/data` to dictionary keys. */
export const SKILL_CATEGORY_KEYS: Record<string, string> = {
  Languages: 'languages',
  Frontend: 'frontend',
  Backend: 'backend',
  'AI & Data': 'ai-data',
  Databases: 'databases',
  'Cloud & DevOps': 'cloud-devops',
  'Data & Distributed Systems': 'data-distributed',
};
