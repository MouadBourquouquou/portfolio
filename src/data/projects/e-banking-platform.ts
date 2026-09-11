import type { Project } from '@core/models/project.model';

export const E_BANKING_PLATFORM: Project = {
  slug: 'e-banking',
  next: 'recommendation-system',
  title: 'E-Banking Platform',
  summary:
    'A full-stack digital money transfer platform created to practice secure, production-minded software development.',
  description:
    'An academic project that implemented a digital money transfer platform end to end — a Spring Boot backend with an Angular client. The focus was on core banking concerns and the discipline of structured backend development: clear domain boundaries, consistent endpoints, and clean collaboration around a shared repository.',
  category: 'Backend / Full-Stack',
  role: 'Backend Developer',
  tags: ['Spring Boot', 'Angular', 'Git', 'GitHub'],
  order: 4,
  media: [
    {
      type: 'image',
      src: '/images/projects/e-banking/hero.png',
      alt: 'E-banking platform — money transfer dashboard',
      caption: 'A full-stack digital money transfer platform.',
    },
    {
      type: 'image',
      src: '/images/projects/e-banking/dashboard.png',
      label: 'Screens',
      alt: 'E-banking dashboard — user and tariff management',
      caption: 'User and tariff management on Spring Boot.',
    },
  ],
  ogImage: '/images/projects/e-banking/og.png',
  ogImageAlt: 'E-Banking Platform — Spring Boot + Angular',
  problem:
    'Money-transfer software is unforgiving: authorization, validation, and auditability matter in every interaction. The academic brief was to build a full digital transfer platform, which meant exercising the whole stack while keeping the backend — where the real risks live — explicit and correct.',
  problemPoints: [
    'Banking flows require strict validation and clear authorization at every boundary.',
    'A stack-wide platform needs the backend and client to agree on the same data contracts.',
    'Several contributors in one repository made version control discipline a hard requirement.',
  ],
  contribution:
    'My work centered on the backend and on collaboration around the shared repository: user management and tariff management on Spring Boot, supporting the Angular client and the team’s Git/GitHub workflow.',
  contributionPoints: [
    'Backend development on Spring Boot — user management and tariff management.',
    'Modeled the domain entities and endpoints the Angular client consumes.',
    'Collaborated through Git/GitHub with cohesive branches and a shared history.',
  ],
  decisions: [
    {
      title: 'Spring Boot for the backend',
      body: 'Banking logic should be reviewable and predictable. Spring Boot’s layered conventions — controllers, services, persistence — and static typing made the transfer of responsibilities explicit, which matters when every operation is financially sensitive.',
    },
    {
      title: 'Angular for the client',
      body: 'The frontend needed to mirror the backend’s structured data model. Angular’s typed components and services kept the client aligned with the API instead of drifting into ad-hoc data handling.',
    },
  ],
  result:
    'Produced a working academic platform: user and tariff management on a Spring Boot backend with an Angular client — a full-stack money transfer system built as an exercise in structured, production-minded development.',
  learnings: [
    'Banking domains reward explicit data models — understand the entities (users, tariffs, accounts) before writing a single endpoint.',
    'A well-structured Spring Boot service layer makes endpoint work predictable and easy to test.',
    'Working on one shared repository makes branch discipline a collaboration skill, not a formality.',
  ],
};
