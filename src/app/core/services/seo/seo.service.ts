import { DOCUMENT } from '@angular/common';
import { Injectable, RendererFactory2, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import type {
  OpenGraphOptions,
  SeoOptions,
  StructuredDataOptions,
  TwitterCardOptions,
} from '@core/models/seo.model';

/**
 * Central SEO service.
 *
 * Wraps Angular's Title + Meta primitives and adds canonical URLs and
 * JSON-LD structured data. All operations are SSR-safe: updates made during
 * server rendering are serialized into the delivered HTML.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly document = inject(DOCUMENT);

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setCanonical(url: string): void {
    const renderer = this.rendererFactory.createRenderer(null, null);
    const existing = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (existing) {
      existing.setAttribute('href', url);
      return;
    }
    const link = renderer.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  setOpenGraph(options: OpenGraphOptions): void {
    const tags: Array<[string, string]> = [
      ['og:title', options.title],
      ['og:description', options.description ?? ''],
      ['og:type', options.type ?? 'website'],
      ['og:site_name', options.siteName ?? ''],
    ];
    if (options.url) {
      tags.push(['og:url', options.url]);
    }
    if (options.image) {
      tags.push(['og:image', options.image]);
      tags.push(['og:image:alt', options.imageAlt ?? '']);
    }
    for (const [property, content] of tags) {
      this.meta.updateTag({ property, content });
    }
  }

  setTwitterCard(options: TwitterCardOptions): void {
    const tags: Array<[string, string]> = [
      ['twitter:card', options.card ?? 'summary'],
      ['twitter:title', options.title],
      ['twitter:description', options.description ?? ''],
    ];
    if (options.image) {
      tags.push(['twitter:image', options.image]);
    }
    for (const [name, content] of tags) {
      this.meta.updateTag({ name, content });
    }
  }

  setStructuredData(options: StructuredDataOptions): void {
    const { id, data } = options;
    const renderer = this.rendererFactory.createRenderer(null, null);
    this.document.getElementById(id)?.remove();

    const script = renderer.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  /** Convenience wrapper for setting a full page's SEO in one call. */
  setPage(options: SeoOptions): void {
    this.setTitle(options.title);
    if (options.description) {
      this.setDescription(options.description);
    }
    if (options.canonicalUrl) {
      this.setCanonical(options.canonicalUrl);
    }
    if (options.og) {
      this.setOpenGraph(options.og);
    }
    if (options.twitter) {
      this.setTwitterCard(options.twitter);
    }
    if (options.structuredData) {
      this.setStructuredData(options.structuredData);
    }
  }
}
