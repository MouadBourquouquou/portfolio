import type { Skill } from '@core/models/skill.model';

export const SKILLS: Skill[] = [
  { name: 'Java', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'PHP', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'C / C++', category: 'Languages' },
  { name: 'SQL', category: 'Languages' },

  { name: 'Angular', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'HTML / CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },

  { name: 'Spring Boot', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'JEE', category: 'Backend' },

  { name: 'Machine Learning', category: 'AI & Data' },
  { name: 'Computer Vision', category: 'AI & Data' },
  { name: 'OpenCV', category: 'AI & Data' },
  { name: 'YOLOv8', category: 'AI & Data' },
  { name: 'Data Analysis', category: 'AI & Data' },

  { name: 'MySQL', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },

  { name: 'Docker', category: 'Cloud & DevOps' },
  { name: 'Cloudflare', category: 'Cloud & DevOps' },
  { name: 'AWS', category: 'Cloud & DevOps' },
  { name: 'Git / GitHub', category: 'Cloud & DevOps' },
  { name: 'Linux / Unix', category: 'Cloud & DevOps' },

  { name: 'Apache Spark', category: 'Data & Distributed Systems' },
  { name: 'Apache Flink', category: 'Data & Distributed Systems' },
];
