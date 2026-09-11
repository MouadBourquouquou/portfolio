import {
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BlogCard } from '@shared/components/blog-card/blog-card';
import { ScrollRevealService } from '@core/services/animation/scroll-reveal.service';
import { SeoService } from '@core/services/seo/seo.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE, absoluteUrl } from '@core/constants/site.constants';
import { ARTICLES } from '@data/articles';
import type { Article } from '@core/models/article.model';

/**
 * Blog / blog listing.
 *
 * Renders every article in reading order. Prerendered at build time; content
 * switches language through the shared LanguageService.
 */
@Component({
  selector: 'app-blog-page',
  imports: [BlogCard],
  template: `
    <section id="blog" class="section section-lg container-custom">
      <div class="max-w-2xl" data-reveal>
        <p class="eyebrow">{{ i18n.read('blogPage.eyebrow') }}</p>
        <h1 class="display mt-4">{{ i18n.read('blogPage.title') }}</h1>
        <p class="body-large mt-6 max-w-xl text-secondary">
          {{ i18n.read('blogPage.intro') }}
        </p>
      </div>

      <div class="mt-12 grid gap-10 md:grid-cols-2 lg:mt-16" data-reveal>
        @for (article of articles(); track article.slug) {
          <app-blog-card [article]="article" />
        }
      </div>
    </section>
  `,
})
export class BlogPage {
  private readonly seo = inject(SeoService);
  private readonly reveal = inject(ScrollRevealService);
  private readonly host = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly i18n = inject(LanguageService);

  protected readonly articles = computed<Article[]>(() =>
    ARTICLES.map((article) => this.i18n.article(article) ?? article),
  );

  constructor() {
    afterNextRender(() => {
      const targets = this.host.nativeElement.querySelectorAll('[data-reveal]');
      if (targets.length) {
        this.reveal.register({ targets, stagger: 0.07, start: 0.85 });
      }
    });

    effect(() => {
      this.i18n.lang();
      if (isPlatformBrowser(this.platformId)) {
        this.setSeo();
      }
    });
  }

  ngOnInit(): void {
    this.setSeo();
  }

  private setSeo(): void {
    const title = this.i18n.read('meta.blog.title');
    const description = this.i18n.read('meta.blog.description');
    const ogImage = absoluteUrl(SITE.defaultOgImage);
    this.seo.setPage({
      title,
      description,
      canonicalUrl: `${SITE.url}/blog`,
      og: {
        title,
        description,
        type: 'website',
        url: `${SITE.url}/blog`,
        siteName: SITE.name,
        image: ogImage,
        imageAlt: ogImage ? SITE.defaultOgImageAlt || SITE.name : undefined,
      },
      twitter: {
        title,
        description,
        card: ogImage ? 'summary_large_image' : 'summary',
        image: ogImage,
      },
    });
  }
}
