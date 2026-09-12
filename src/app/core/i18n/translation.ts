import type { ArticleBlock } from '@core/models/article.model';

export type SupportedLanguage = 'en' | 'fr';

export interface BeatTranslation {
  number: string;
  title: string;
  text: string;
}

export interface ExperienceItemTranslation {
  role: string;
  organization: string;
  summary: string;
}

export interface ProjectDecisionTranslation {
  title: string;
  body: string;
}

/**
 * Translated copy for a single article. All free-text fields are optional
 * overrides; structural fields (`slug`, `categoryKey`) stay in the data file.
 * `blocks` replaces the whole body when provided.
 */
export interface ArticleTranslation {
  title?: string;
  excerpt?: string;
  intro?: string;
  seoTitle?: string;
  seoDescription?: string;
  keyIdea?: string;
  blocks?: ArticleBlock[];
}

/** Translated copy for a single project. All fields are optional overrides. */
export interface ProjectTranslation {
  title?: string;
  summary?: string;
  description?: string;
  role?: string;
  problem?: string;
  problemPoints?: string[];
  contribution?: string;
  contributionPoints?: string[];
  decisions?: ProjectDecisionTranslation[];
  result?: string;
  learnings?: string[];
}

/**
 * Shape of every language dictionary (en/fr).
 *
 * Source-of-truth rule: content that already lives in `src/data/*` (project
 * copy, experience entries) is authored once there and only overridden here
 * for non-English languages; the English dictionary keeps `experience.items`
 * and `projectsData` empty so the data files stay the single English source.
 * Every UI string that is not backed by a data file must exist here in every
 * language, with the English entry matching the current templates verbatim.
 */
export interface Translation {
  meta: {
    home: { title: string; description: string };
    about: { title: string; description: string };
    projects: { title: string; description: string };
    experience: { title: string; description: string };
    contact: { title: string; description: string };
    notFound: { title: string; description: string };
    blog: { title: string; description: string };
  };
  accessibility: {
    skipToContent: string;
    primaryNavigation: string;
    mobileNavigation: string;
    openMenu: string;
    closeMenu: string;
    backToHomepage: string;
    themeToDark: string;
    themeToLight: string;
    languageSelector: string;
    languageEn: string;
    languageFr: string;
    filterProjects: string;
  };
  nav: {
    about: string;
    projects: string;
    experience: string;
    contact: string;
    blog: string;
  };
  common: {
    caseStudy: string;
    featured: string;
    leadership: string;
    present: string;
    videoPreview: string;
    projectImage: string;
    projectVideo: string;
    downloadCv: string;
    downloadCvEnglish: string;
    downloadCvFrench: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    fieldFullStack: string;
    fieldAiData: string;
    fieldCloudDevOps: string;
    intro: string;
    exploreProjects: string;
    getInTouch: string;
    email: string;
  };
  stats: {
    projects: string;
    experiences: string;
    skills: string;
  };
  profile: {
    eyebrow: string;
    tagline: string;
    photoPlaceholder: string;
    role: string;
    technicalFocus: string;
  };
  work: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
  };
  toolbox: {
    eyebrow: string;
    title: string;
    description: string;
    categories: Record<string, string>;
  };
  about: {
    eyebrow: string;
    title: string;
    description: string;
    fullStory: string;
    beats: BeatTranslation[];
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    items: ExperienceItemTranslation[];
  };
  contact: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    body: string;
  };
  projectsPage: {
    eyebrow: string;
    title: string;
    intro: string;
    featured: string;
    supportingProjects: string;
    all: string;
    empty: string;
    letsBuild: string;
    buildCtaTitle: string;
    buildCtaBody: string;
    startConversation: string;
    readTheStory: string;
    readCaseStudy: string;
    nextProject: string;
    categories: Record<string, string>;
  };
  blogPage: {
    eyebrow: string;
    title: string;
    intro: string;
    minRead: string;
    read: string;
    relatedArticles: string;
    nextArticle: string;
    backToBlog: string;
    notFoundTitle: string;
    notFoundBody: string;
    notFoundBack: string;
    categories: Record<string, string>;
  };
  caseStudy: {
    projectsNavigation: string;
    allProjects: string;
    backToAll: string;
    overview: string;
    whatItIs: string;
    context: string;
    theProblem: string;
    role: string;
    myContribution: string;
    decisions: string;
    engineeringDecisions: string;
    outcome: string;
    result: string;
    reflection: string;
    learnings: string;
    media: string;
    screensAndVideo: string;
    year: string;
    category: string;
    technologies: string;
  };
  media: {
    mediaInPreparation: string;
    placeholderBody: string;
  };
  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    back: string;
  };
  projectsData: Record<string, ProjectTranslation>;
  articlesData: Record<string, ArticleTranslation>;
}
