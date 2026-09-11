export const SITE = {
  name: 'Mouad Bourquouquou',
  shortName: 'Mouad',
  role: 'Computer Engineering Student · AI & Full-Stack Builder',
  tagline: 'Engineer — Builder — Explorer',
  email: 'mouadbourquouquou@gmail.com',
  socials: {
    github: 'https://github.com/mouadbourquouquou',
    linkedin: 'www.linkedin.com/in/m-bourquouquou',
  },
  defaultTitle: 'Mouad Bourquouquou — Computer Engineering Student',
  defaultDescription:
    'Computer engineering student and full-stack builder, creating products at the intersection of engineering, AI, and design.',
  /** Downloadable resume. Kept in `public/documents/` so it ships with the site. */
  cv: '/documents/Mouad_Bourquouquou_CV.pdf',
  /** Site-wide fallback for Open Graph / Twitter social-sharing images. */
  defaultOgImage: '/images/seo/og-default.png',
  defaultOgImageAlt: 'Mouad Bourquouquou — Computer Engineering Student',
  /** Absolute origin used for canonical URLs and Open Graph links. */
  url: 'https://mouadbourquouquou.com',
} as const;

/** Resolves a site-relative path (or absolute URL) to an absolute URL. */
export function absoluteUrl(path?: string): string | undefined {
  if (!path) {
    return undefined;
  }
  if (/^(https?:)?\/\//i.test(path)) {
    return path;
  }
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}
