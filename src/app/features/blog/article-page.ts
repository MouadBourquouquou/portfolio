import {
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollRevealService } from '@core/services/animation/scroll-reveal.service';
import { SeoService } from '@core/services/seo/seo.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE, absoluteUrl } from '@core/constants/site.constants';
import { AppIcon } from '@shared/ui/icon/icon';
import { ArticleContent } from '@shared/components/article-content/article-content';
import { getArticleBySlug, getNextArticle } from '@data/articles';
import { getProjectBySlug } from '@data/projects';
import type { Article } from '@core/models/article.model';
import type { Project } from '@core/models/project.model';
import { NextArticleLink } from './next-article-link';

interface RelatedLink {
  route: string[];
  kicker: string;
  title: string;
  summary: string;
}

/**
 * Single article page.
 *
 * SSR-rendered per request (like the project case studies). Handles SEO tags,
 * BlogPosting JSON-LD, the key-idea callout, related articles/projects and a
 * "next note" affordance in reading order.
 */
@Component({
  selector: 'app-article-page',
  imports: [RouterLink, ArticleContent, AppIcon, NextArticleLink],
  template: `
    <article class="section section-lg container-custom">
      @if (article(); as article) {
        <nav
          class="flex items-center gap-2 text-sm font-medium text-secondary"
          [attr.aria-label]="i18n.read('blogPage.backToBlog')"
          data-reveal
        >
          <a
            [routerLink]="['/blog']"
            class="group inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <app-icon
              name="arrow-left"
              [size]="15"
              class="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {{ i18n.read('blogPage.backToBlog') }}
          </a>
        </nav>

        <header class="mt-12 max-w-3xl lg:mt-16" data-reveal>
          <p class="eyebrow">{{ categoryLabel() }}</p>
          <h1 class="display mt-4">{{ article.title }}</h1>

          <div
            class="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium uppercase tracking-widest text-secondary"
          >
            <time [attr.datetime]="article.datePublished">{{ formattedDate() }}</time>
            <span aria-hidden="true" class="text-accent">·</span>
            <span class="inline-flex items-center gap-1.5 normal-case tracking-normal">
              <app-icon name="clock" [size]="14" />
              {{ article.readingMinutes }} {{ i18n.read('blogPage.minRead') }}
            </span>
          </div>

          <p class="body-large mt-8 text-secondary">{{ article.intro }}</p>

          @if (article.keyIdea; as keyIdea) {
            <blockquote class="mt-10 rounded-xl border border-accent/30 bg-accent/10 px-6 py-5">
              <p class="body-medium text-primary">{{ keyIdea }}</p>
            </blockquote>
          }
        </header>

        <div class="mt-12 max-w-3xl lg:mt-16">
          <app-article-content [blocks]="article.blocks" />

          @if (relatedLinks().length) {
            <aside class="mt-20 border-t border-border pt-12" data-reveal>
              <h2 class="section-title">{{ i18n.read('blogPage.relatedArticles') }}</h2>
              <div class="mt-8 grid gap-6 md:grid-cols-2">
                @for (link of relatedLinks(); track link.route.join('/')) {
                  <a
                    [routerLink]="link.route"
                    class="group block rounded-xl border border-border bg-surface p-6 shadow-card transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-card-hover"
                  >
                    <p class="eyebrow">{{ link.kicker }}</p>
                    <h3
                      class="mt-3 font-heading text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-accent"
                    >
                      {{ link.title }}
                    </h3>
                    <p class="mt-2 text-sm leading-relaxed text-secondary">{{ link.summary }}</p>
                  </a>
                }
              </div>
            </aside>
          }

          @if (nextArticle(); as next) {
            <app-next-article-link [article]="next" />
          }
        </div>
      } @else {
        <div class="max-w-3xl" data-reveal>
          <p class="eyebrow">{{ i18n.read('blogPage.eyebrow') }}</p>
          <h1 class="display mt-4">{{ i18n.read('blogPage.notFoundTitle') }}</h1>
          <p class="body-large mt-6 max-w-xl text-secondary">
            {{ i18n.read('blogPage.notFoundBody') }}
          </p>
          <a
            [routerLink]="['/blog']"
            class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            <app-icon name="arrow-left" [size]="15" />
            {{ i18n.read('blogPage.notFoundBack') }}
          </a>
        </div>
      }
    </article>
  `,
})
export class ArticlePage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly reveal = inject(ScrollRevealService);
  private readonly host = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly i18n = inject(LanguageService);

  /**
   * Reactive `/blog/:slug` parameter. `initialValue` uses the current route
   * snapshot so the very first render (SSR included) is correct, while later
   * changes to the same route (`/blog/a` → `/blog/b`, back/forward) flow
   * through the signal and recompute every dependent output.
   */
  private readonly currentParamMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly article = computed<Article | null>(() => {
    const article = getArticleBySlug(this.currentParamMap().get('slug') ?? '');
    return article ? (this.i18n.article(article) ?? article) : null;
  });

  protected readonly categoryLabel = computed(() =>
    this.i18n.articleCategoryLabel(this.article()?.categoryKey),
  );

  protected readonly formattedDate = computed(() => {
    const article = this.article();
    if (!article) {
      return '';
    }
    const formatter = new Intl.DateTimeFormat(this.i18n.lang(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
    return formatter.format(new Date(article.datePublished));
  });

  protected readonly relatedLinks = computed<RelatedLink[]>(() => {
    const article = this.article();
    if (!article) {
      return [];
    }
    return article.related
      .map((related): RelatedLink | null => {
        if (related.type === 'article') {
          const relatedArticle = getArticleBySlug(related.slug);
          if (!relatedArticle) {
            return null;
          }
          const localized = this.i18n.article(relatedArticle) ?? relatedArticle;
          return {
            route: ['/blog', relatedArticle.slug],
            kicker: this.i18n.articleCategoryLabel(relatedArticle.categoryKey),
            title: localized.title,
            summary: localized.excerpt,
          };
        }
        const project = getProjectBySlug(related.slug);
        if (!project) {
          return null;
        }
        const localized: Project = this.i18n.project(project) ?? project;
        return {
          route: ['/projects', project.slug],
          kicker: this.i18n.categoryLabel(project.category),
          title: localized.title,
          summary: localized.summary ?? '',
        };
      })
      .filter((link): link is RelatedLink => link !== null);
  });

  protected readonly nextArticle = computed<Article | null>(() => {
    const article = this.article();
    if (!article) {
      return null;
    }
    const next = getNextArticle(article.slug);
    return this.i18n.article(next) ?? next;
  });

  constructor() {
    afterNextRender(() => {
      const targets = this.host.nativeElement.querySelectorAll('[data-reveal]');
      if (targets.length) {
        this.reveal.register({ targets, stagger: 0.06, start: 0.9 });
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
    const article = this.article();
    if (!article) {
      this.seo.setPage({
        title: `${this.i18n.read('blogPage.notFoundTitle')} — ${SITE.name}`,
        description: this.i18n.read('blogPage.notFoundBody'),
        canonicalUrl: `${SITE.url}/blog`,
      });
      return;
    }

    const title = `${article.seoTitle} | ${SITE.name}`;
    const description = article.excerpt ?? article.seoDescription;
    const canonicalUrl = `${SITE.url}/blog/${article.slug}`;
    const ogImage =
      absoluteUrl(article.ogImage) ?? absoluteUrl(SITE.defaultOgImage);
    const ogImageAlt = article.ogImageAlt ?? (SITE.defaultOgImageAlt || SITE.name);

    this.seo.setPage({
      title,
      description,
      canonicalUrl,
      og: {
        title,
        description,
        type: 'article',
        url: canonicalUrl,
        siteName: SITE.name,
        image: ogImage,
        imageAlt: ogImage ? ogImageAlt : undefined,
      },
      twitter: {
        title,
        description,
        card: ogImage ? 'summary_large_image' : 'summary',
        image: ogImage,
      },
      structuredData: {
        id: 'blog-posting-jsonld',
        data: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.seoDescription,
          inLanguage: this.i18n.lang(),
          datePublished: article.datePublished,
          dateModified: article.dateModified,
          author: { '@type': 'Person', name: SITE.name },
          mainEntityOfPage: `${SITE.url}/blog/${article.slug}`,
        },
      },
    });
  }
}
