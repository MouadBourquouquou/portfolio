import type { Period } from './period.model';

/** A single piece of media attached to a project (image or video). */
export interface ProjectMedia {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string;
  caption?: string;
  /**
   * Editorial grouping label used by the media gallery to organize items
   * (e.g. "Screens", "Architecture", "Workflow", "Pipeline", "Dataset").
   * Items without a label render in a single uniform grid.
   */
  label?: string;
}

/** A named engineering decision with its rationale. */
export interface ProjectDecision {
  title: string;
  body: string;
}

export interface ProjectLinks {
  live?: string;
  github?: string;
}

export interface Project {
  slug: string;
  title: string;

  /** Short one-line summary used on cards and previews. */
  summary?: string;

  /** Longer overview paragraph used in the case study. */
  description?: string;

  year?: string;
  period?: Period;

  /** Technologies involved. */
  tags?: string[];

  /** Portfolio role on the project (e.g. "Full-Stack Developer"). */
  role?: string;

  /** Editorial category used for archive filtering. */
  category?: string;

  /** Licensing/detail image shortcuts kept for backward compatibility. */
  image?: string;
  imageAlt?: string;
  url?: string;
  github?: string;

  /** Case-study media gallery. First item is the preview/hero; the rest are the gallery. */
  media?: ProjectMedia[];

  /** Optional overrides for the social-sharing image on this project's page. */
  ogImage?: string;
  ogImageAlt?: string;

  links?: ProjectLinks;

  /** The problem the project set out to solve. */
  problem?: string;
  problemPoints?: string[];

  /** "My contribution" lead paragraph. */
  contribution?: string;
  contributionPoints?: string[];

  /** Named engineering decisions and why they mattered. */
  decisions?: ProjectDecision[];

  /** Qualitative outcome. No invented metrics. */
  result?: string;
  learnings?: string[];

  featured?: boolean;
  order?: number;

  /** Slug of the suggested next case study. Falls back to reading order when absent. */
  next?: string;
}
