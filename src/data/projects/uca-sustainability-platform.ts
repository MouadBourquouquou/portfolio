import type { Project } from '@core/models/project.model';

export const UCA_SUSTAINABILITY_PLATFORM: Project = {
  slug: 'uca-sustainability',
  next: 'e-banking',
  title: 'UCA Sustainability Platform',
  summary:
    'Maintenance and improvement of sustainability-focused university web platforms during an internship at Cadi Ayyad University.',
  description:
    'An internship at Cadi Ayyad University focused on keeping sustainability-oriented digital platforms healthy. The work combined independent updates to a university website, collaboration on a platform dedicated to sustainability, and support across administration, content, deployment, and system management.',
  year: '',
  period: { start: 'March 2026', months: 3 },
  category: 'Web / Platform',
  role: 'Web Maintenance Intern',
  tags: ['WordPress', 'Next.js', 'Virtualmin'],
  order: 3,
  media: [
    {
      type: 'image',
      src: '/images/projects/uca-sustainability/hero.png',
      alt: 'UCA sustainability platform — university digital services',
      caption: 'Sustainability-focused university web platforms.',
    },
    {
      type: 'image',
      src: '/images/projects/uca-sustainability/dashboard.png',
      label: 'Screens',
      alt: 'Sustainability platform content and administration view',
      caption: 'Content, deployment, and administration in one workflow.',
    },
  ],
  ogImage: '/images/projects/uca-sustainability/og.png',
  ogImageAlt: 'UCA Sustainability Platform — web maintenance',
  problem:
    'University platforms tied to sustainability and social initiatives need continuous upkeep — from content updates and administration to deployment and server management. The internship was about keeping those services running and improving them where it mattered.',
  problemPoints: [
    'Live platforms require regular content, administration, and maintenance work to stay trustworthy.',
    'Deployment and hosting administration need care so services remain available.',
  ],
  contribution:
    'Maintained and improved sustainability-oriented university digital platforms — independently updating a university website, collaborating on a sustainability-focused platform, and supporting administration, content, deployment, and system management.',
  contributionPoints: [
    'Independently updated a university website.',
    'Collaborated on a sustainability-focused web platform.',
    'Supported administration, content, deployment, and system management.',
  ],
  decisions: [
    {
      title: 'WordPress for the university website',
      body: 'For a content-driven university site, WordPress provided a maintainable and widely understood publishing foundation, keeping content and update work straightforward.',
    },
    {
      title: 'Next.js for the sustainability platform',
      body: 'The sustainability-focused platform benefits from a modern React-based framework with strong SSR and static generation options for performant, shareable pages.',
    },
    {
      title: 'Virtualmin for hosting administration',
      body: 'Managing the hosting side through Virtualmin kept domain, backup, and server administration explicit and reproducible for the teams responsible.',
    },
  ],
  result:
    'Helped keep the university’s sustainability-focused digital services running — with a university website updated independently and a sustainability platform maintained through collaboration.',
  learnings: [
    'Most of the work on live platforms is disciplined upkeep — content, deployment, and administration are the real workload.',
    'Choosing tools for maintainability matters as much as choosing them for features.',
  ],
};
