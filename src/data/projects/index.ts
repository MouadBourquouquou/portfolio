import type { Project } from '@core/models/project.model';
import { MAROCSPHERE } from './marocsphere';
import { AI_SURVEILLANCE_SYSTEM } from './ai-surveillance-system';
import { SYNDIC_MANAGEMENT_PLATFORM } from './syndic-management-platform';
import { UCA_SUSTAINABILITY_PLATFORM } from './uca-sustainability-platform';
import { E_BANKING_PLATFORM } from './e-banking-platform';
import { RECOMMENDATION_SYSTEM } from './recommendation-system';
import { CARPOOL_OPTIMIZATION } from './carpool-optimization';

/** Archive order: the single flagship, then professional work, then academic work. */
export const PROJECTS: Project[] = [
  MAROCSPHERE,
  AI_SURVEILLANCE_SYSTEM,
  SYNDIC_MANAGEMENT_PLATFORM,
  UCA_SUSTAINABILITY_PLATFORM,
  E_BANKING_PLATFORM,
  RECOMMENDATION_SYSTEM,
  CARPOOL_OPTIMIZATION,
];

export const PROJECT_CATEGORIES: string[] = Array.from(
  new Set(
    PROJECTS.map((project) => project.category).filter((category): category is string =>
      Boolean(category),
    ),
  ),
);

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProject(): Project | undefined {
  return PROJECTS.find((project) => project.featured);
}

export function getSupportingProjects(): Project[] {
  return PROJECTS.filter((project) => !project.featured).sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
}

/**
 * The next suggested case study. Honors an explicit `next` slug on the project
 * when present; otherwise falls back to reading order, wrapping to the flagship.
 */
export function getNextProject(slug: string): Project {
  const current = PROJECTS.find((project) => project.slug === slug);
  if (current?.next) {
    const suggested = PROJECTS.find((project) => project.slug === current.next);
    if (suggested) {
      return suggested;
    }
  }
  const index = PROJECTS.findIndex((project) => project.slug === slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}
