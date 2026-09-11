import type { Period } from './period.model';

export type ExperienceKind = 'professional' | 'leadership';

export interface Experience {
  role: string;
  organization: string;
  location?: string;
  period: Period;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  kind?: ExperienceKind;
}
