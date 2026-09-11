import type { Article } from '@core/models/article.model';
import { GIT_WORKFLOW } from './git-workflow';
import { GIT_AND_GITHUB } from './git-and-github';
import { DOCKER_EXPLAINED } from './docker-explained';
import { ALGORITHM_COMPLEXITY } from './algorithm-complexity';

export { GIT_WORKFLOW, GIT_AND_GITHUB, DOCKER_EXPLAINED, ALGORITHM_COMPLEXITY };

export const ARTICLES: Article[] = [
  GIT_WORKFLOW,
  GIT_AND_GITHUB,
  DOCKER_EXPLAINED,
  ALGORITHM_COMPLEXITY,
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}

/** The next note in reading order, wrapping around to the first. */
export function getNextArticle(slug: string): Article {
  const index = ARTICLES.findIndex((article) => article.slug === slug);
  return ARTICLES[(index + 1) % ARTICLES.length];
}
