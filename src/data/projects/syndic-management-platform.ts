import type { Project } from '@core/models/project.model';

export const SYNDIC_MANAGEMENT_PLATFORM: Project = {
  slug: 'syndic',
  next: 'uca-sustainability',
  title: 'Syndic Management Platform',
  summary:
    'A property-management platform for syndic operations, built with a two-person team during an internship at EYSI.',
  description:
    'A web platform supporting the day-to-day administration of shared residential buildings for syndic operations. Built in a two-person team, it combined a Laravel backend with a React frontend on MySQL, versioned through Git and GitHub, and aimed to give syndic operations a single functional tool by the end of the internship.',
  year: '',
  period: { start: 'July 2025', months: 1 },
  category: 'Full-Stack Development',
  role: 'Full-Stack Intern',
  tags: ['Laravel', 'React', 'MySQL', 'Git', 'GitHub'],
  order: 2,
  media: [
    {
      type: 'image',
      src: '/images/projects/syndic/hero.png',
      alt: 'Syndic management platform — property administration dashboard',
      caption: 'A property-management platform for syndic operations.',
    },
    {
      type: 'image',
      src: '/images/projects/syndic/interface.png',
      label: 'Screens',
      alt: 'Syndic platform interface — building and unit records',
      caption: 'Building, unit, and record administration.',
    },
  ],
  ogImage: '/images/projects/syndic/og.png',
  ogImageAlt: 'Syndic Management Platform — Laravel + React',
  problem:
    'Syndic operations run on scattered records and manual follow-up. The internship brief was to build a platform that could support those operations, which meant covering real functionality — not just a prototype — within a short internship window.',
  problemPoints: [
    'Building a functional product in a short internship meant prioritizing core features over breadth.',
    'Working as a two-person team across both codebases required a shared, disciplined workflow.',
  ],
  contribution:
    'Worked in a two-person development team on the platform, contributing mainly to the backend while participating in feature implementation and integration to deliver a product ready for operational use within the internship period.',
  contributionPoints: [
    'Contributed mainly to the Laravel backend, supported by a MySQL database.',
    'Participated in feature implementation and integration across the stack.',
    'Kept the work versioned and reviewable through Git and GitHub.',
  ],
  decisions: [
    {
      title: 'Laravel for the backend',
      body: 'A property-management platform centers on real domain entities — buildings, units, the parties and records involved. Laravel provided a structured MVC foundation with an ORM and clear routing that kept the scope manageable for a small team in a short window.',
    },
    {
      title: 'React for the interface',
      body: 'The operations surface benefits from a component-based frontend that stays consistent as the team adds screens. React gave us a straightforward way to share UI pieces across the platform.',
    },
    {
      title: 'Git and GitHub for a shared workflow',
      body: 'Two people on one codebase need review points and a dependable record of changes. Branch-based work on GitHub kept integration cheap and the shared history readable.',
    },
  ],
  result:
    'Delivered a functional property-management platform for syndic operations, built by the two-person team and ready for operational use within the internship period.',
  learnings: [
    'A short internship rewards a tight scope: the valuable skill is choosing which features actually support the operation.',
    'In a two-person team, branch discipline and a clean shared history are what keep integration cheap.',
  ],
};
