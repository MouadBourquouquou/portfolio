import type { Experience } from '@core/models/experience.model';

export const EXPERIENCE: Experience[] = [
  {
    kind: 'professional',
    role: 'Full-Stack Developer · Team Coordinator',
    organization: 'MarocSphere',
    period: { start: 'July 2026', months: 2 },
    summary:
      'End-of-year internship (PFA) building an intelligent tourism platform that supports travelers end to end — from AI-assisted itinerary generation to discovering local artisans and services. Coordinated a four-person student team while contributing across the frontend and backend, participated in database design and integration, and supported deployment and platform verification to ship a reliable, multi-service travel ecosystem.',
    tags: ['Angular', 'Spring Boot', 'PostgreSQL', 'Docker', 'Cloudflare', 'k6'],
  },
  {
    kind: 'professional',
    role: 'Web Maintenance Intern',
    organization: 'Cadi Ayyad University',
    period: { start: 'March 2026', months: 3 },
    summary:
      'Maintained and improved sustainability-oriented university digital platforms — independently updating a university website, collaborating on a sustainability-focused platform, and supporting administration, content, deployment, and system management to keep digital services focused on sustainability and social initiatives running.',
    tags: ['WordPress', 'Next.js', 'Virtualmin'],
  },
  {
    kind: 'leadership',
    role: 'AI Project Coordinator',
    organization: 'EMJE',
    period: { start: 'October 2025', months: 3 },
    summary:
      'Coordinated a four-person team on a computer-vision project for a hospitality-sector client, working through the workflow from dataset preparation and annotation through model training and evaluation to deployment — contributing to data cleaning, annotation, and deployment testing to deliver a deployable solution built around real operational monitoring and security requirements.',
    tags: ['Python', 'YOLOv8', 'Roboflow', 'Google Colab', 'AWS'],
  },
  {
    kind: 'professional',
    role: 'Full-Stack Intern',
    organization: 'EYSI',
    period: { start: 'July 2025', months: 1 },
    summary:
      'Worked in a two-person development team on a property-management platform for syndic operations, contributing mainly to the backend while participating in feature implementation and integration to deliver a functional product ready for operational use within the internship period.',
    tags: ['Laravel', 'React', 'MySQL', 'Git', 'GitHub'],
  },
];
