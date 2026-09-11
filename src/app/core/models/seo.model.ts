export interface OpenGraphOptions {
  title: string;
  description?: string;
  type?: 'website' | 'article' | 'profile';
  url?: string;
  image?: string;
  imageAlt?: string;
  siteName?: string;
}

export interface TwitterCardOptions {
  title: string;
  description?: string;
  card?: 'summary' | 'summary_large_image';
  image?: string;
}

export interface StructuredDataOptions {
  /** Unique id used as the DOM id for the <script> tag. */
  id: string;
  data: Record<string, unknown> | Record<string, unknown>[];
}

export interface SeoOptions {
  title: string;
  description?: string;
  canonicalUrl?: string;
  og?: OpenGraphOptions;
  twitter?: TwitterCardOptions;
  structuredData?: StructuredDataOptions;
}
