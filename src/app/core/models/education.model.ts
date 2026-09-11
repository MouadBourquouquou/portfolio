import type { Period } from './period.model';

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  period: Period;
  focus?: string;
  details?: string[];
}
