export type ArticleBlock =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; ordered?: boolean; items: string[] }
  | { type: 'code'; title?: string; language?: string; body: string };

export interface ArticleRelated {
  type: 'article' | 'project';
  slug: string;
}

/** A single article in the Blog/blog section. */
export interface Article {
  slug: string;

  /** i18n dictionary key under `blogPage.categories`. */
  categoryKey: string;

  title: string;

  /** Short card + meta description text. */
  excerpt: string;

  readingMinutes: number;

  /** Display-only year on cards. */
  year: string;

  /** ISO dates used for JSON-LD structured data. */
  datePublished: string;
  dateModified: string;

  /** Lead paragraph shown under the article title. */
  intro: string;

  seoTitle: string;
  seoDescription: string;

  /** Optional social-sharing image; falls back to the site-wide default OG. */
  ogImage?: string;
  ogImageAlt?: string;

  /** Optional key-idea callout, rendered right after the intro. */
  keyIdea?: string;

  /** Main body: headings, paragraphs, lists, code, callouts. */
  blocks: ArticleBlock[];

  /** Internal links to other articles or project case studies. */
  related: ArticleRelated[];
}
