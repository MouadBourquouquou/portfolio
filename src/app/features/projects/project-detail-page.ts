import {
  Component,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScrollRevealService } from '@core/services/animation/scroll-reveal.service';
import { SeoService } from '@core/services/seo/seo.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE, absoluteUrl } from '@core/constants/site.constants';
import { MediaGallery } from '@shared/components/media-gallery/media-gallery';
import type { ProjectMedia } from '@core/models/project.model';
import { AppIcon } from '@shared/ui/icon/icon';
import { getNextProject, getProjectBySlug } from '@data/projects';
import { ARTICLES } from '@data/articles';
import type { Article } from '@core/models/article.model';
import { CaseStudySection } from './case-study-section';
import { NextProject } from './next-project-link';

@Component({
  selector: 'app-project-detail-page',
  imports: [RouterLink, MediaGallery, CaseStudySection, NextProject, AppIcon],
  template: `
    <article class="section section-lg container-custom">
      @if (project(); as project) {
        <nav
          class="flex items-center gap-2 text-sm font-medium text-secondary"
          [attr.aria-label]="i18n.read('caseStudy.projectsNavigation')"
          data-reveal
        >
          <a
            [routerLink]="['/projects']"
            class="group inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <app-icon
              name="arrow-left"
              [size]="15"
              class="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {{ i18n.read('caseStudy.allProjects') }}
          </a>
        </nav>

        <header
          class="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20"
        >
          <div data-reveal>
            @if (project.category; as category) {
              <p class="eyebrow">{{ categoryLabel() }}</p>
            }
            <h1 class="display mt-4">{{ project.title }}</h1>
            @if (project.summary; as summary) {
              <p class="body-large mt-6 max-w-xl text-secondary">{{ summary }}</p>
            }
          </div>

          <dl class="h-fit divide-y divide-border self-end border-y border-border" data-reveal>
            @if (project.role; as role) {
              <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 py-4">
                <dt class="text-xs font-medium uppercase tracking-widest text-secondary">
                  {{ i18n.read('caseStudy.role') }}
                </dt>
                <dd class="text-sm font-medium text-primary">{{ role }}</dd>
              </div>
            }
            @if (project.year; as year) {
              <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 py-4">
                <dt class="text-xs font-medium uppercase tracking-widest text-secondary">
                  {{ i18n.read('caseStudy.year') }}
                </dt>
                <dd class="text-sm font-medium text-primary">{{ year }}</dd>
              </div>
            }
            @if (project.category; as category) {
              <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 py-4">
                <dt class="text-xs font-medium uppercase tracking-widest text-secondary">
                  {{ i18n.read('caseStudy.category') }}
                </dt>
                <dd class="text-sm font-medium text-primary">{{ categoryLabel() }}</dd>
              </div>
            }
            @if (project.tags; as tags) {
              @if (tags.length) {
                <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 py-4">
                  <dt class="text-xs font-medium uppercase tracking-widest text-secondary">
                    {{ i18n.read('caseStudy.technologies') }}
                  </dt>
                  <dd class="text-sm font-medium leading-relaxed text-primary">
                    {{ tags.join(' · ') }}
                  </dd>
                </div>
              }
            }
          </dl>
        </header>

        @if (leadMedia(); as lead) {
          @if (!leadFailed()) {
            <figure
              class="mt-12 overflow-hidden rounded-xl border border-border bg-surface shadow-card lg:mt-16"
              data-reveal
            >
              @if (lead.type === 'image') {
                <img
                  [src]="lead.src"
                  [alt]="lead.alt ?? lead.caption ?? project.title"
                  width="1200"
                  height="750"
                  class="aspect-[16/10] w-full object-cover"
                  loading="eager"
                  decoding="async"
                  (error)="leadFailed.set(true)"
                />
              } @else {
                <video
                  class="aspect-[16/10] w-full object-cover"
                  [poster]="lead.poster"
                  [attr.aria-label]="lead.alt ?? lead.caption ?? project.title"
                  controls
                  playsinline
                  preload="metadata"
                >
                  <source [src]="lead.src" />
                </video>
              }
              @if (lead.caption; as caption) {
                <figcaption class="border-t border-border px-5 py-4 text-sm text-secondary">
                  {{ caption }}
                </figcaption>
              }
            </figure>
          }
        }

        <div class="mt-20 space-y-20 lg:mt-28 lg:space-y-28">
          @if (project.description; as description) {
            <app-case-study-section
              index="01"
              [kicker]="i18n.read('caseStudy.overview')"
              [title]="i18n.read('caseStudy.whatItIs')"
            >
              <p class="body-large text-secondary" data-reveal>{{ description }}</p>
            </app-case-study-section>
          }

          @if (project.problem; as problem) {
            <app-case-study-section
              index="02"
              [kicker]="i18n.read('caseStudy.context')"
              [title]="i18n.read('caseStudy.theProblem')"
            >
              <p class="body-medium text-secondary" data-reveal>{{ problem }}</p>
              @if (project.problemPoints?.length) {
                <ul class="mt-6 space-y-3" data-reveal>
                  @for (point of project.problemPoints; track $index) {
                    <li class="flex gap-3 text-secondary">
                      <span aria-hidden="true" class="text-accent">—</span>
                      <span>{{ point }}</span>
                    </li>
                  }
                </ul>
              }
            </app-case-study-section>
          }

          @if (project.contribution; as contribution) {
            <app-case-study-section
              index="03"
              [kicker]="i18n.read('caseStudy.role')"
              [title]="i18n.read('caseStudy.myContribution')"
            >
              <p class="body-medium text-secondary" data-reveal>{{ contribution }}</p>
              @if (project.contributionPoints?.length) {
                <ul class="mt-6 space-y-3" data-reveal>
                  @for (point of project.contributionPoints; track $index) {
                    <li class="flex gap-3 text-secondary">
                      <span aria-hidden="true" class="text-accent">—</span>
                      <span>{{ point }}</span>
                    </li>
                  }
                </ul>
              }
            </app-case-study-section>
          }

          @if (project.decisions?.length) {
            <app-case-study-section
              index="04"
              [kicker]="i18n.read('caseStudy.decisions')"
              [title]="i18n.read('caseStudy.engineeringDecisions')"
            >
              <ol class="space-y-10" data-reveal>
                @for (decision of project.decisions; track decision.title; let i = $index) {
                  <li class="grid gap-2 sm:grid-cols-[3rem_1fr] sm:gap-6">
                    <span
                      aria-hidden="true"
                      class="font-heading text-xl font-medium text-secondary"
                    >
                      {{ decideNumber(i) }}
                    </span>
                    <div>
                      <h3 class="text-lg font-semibold text-primary">{{ decision.title }}</h3>
                      <p class="mt-2 text-secondary">{{ decision.body }}</p>
                    </div>
                  </li>
                }
              </ol>
            </app-case-study-section>
          }

          @if (project.result; as result) {
            <app-case-study-section
              index="05"
              [kicker]="i18n.read('caseStudy.outcome')"
              [title]="i18n.read('caseStudy.result')"
            >
              <blockquote class="border-s-2 border-accent ps-6" data-reveal>
                <p class="body-large text-primary">{{ result }}</p>
              </blockquote>
            </app-case-study-section>
          }

          @if (project.learnings?.length) {
            <app-case-study-section
              index="06"
              [kicker]="i18n.read('caseStudy.reflection')"
              [title]="i18n.read('caseStudy.learnings')"
            >
              <ol class="space-y-5" data-reveal>
                @for (learning of project.learnings; track $index; let i = $index) {
                  <li class="flex gap-4">
                    <span class="shrink-0 text-sm font-medium text-accent">{{
                      learnNumber(i)
                    }}</span>
                    <span class="text-secondary">{{ learning }}</span>
                  </li>
                }
              </ol>
            </app-case-study-section>
          }

          <app-case-study-section
            index="07"
            [kicker]="i18n.read('caseStudy.media')"
            [title]="i18n.read('caseStudy.screensAndVideo')"
          >
            <app-media-gallery [items]="galleryItems()" />
          </app-case-study-section>

          @if (relatedArticles().length) {
            <app-case-study-section
              index="08"
              [kicker]="i18n.read('blogPage.eyebrow')"
              [title]="i18n.read('blogPage.relatedArticles')"
            >
              <ul class="space-y-4" data-reveal>
                @for (article of relatedArticles(); track article.slug) {
                  <li>
                    <a
                      [routerLink]="['/blog', article.slug]"
                      class="group flex items-center justify-between gap-6 rounded-xl border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover"
                    >
                      <div>
                        <p class="eyebrow">{{ articleCategoryLabel(article) }}</p>
                        <h3
                          class="mt-2 font-heading text-xl font-semibold text-primary transition-colors duration-300 group-hover:text-accent"
                        >
                          {{ article.title }}
                        </h3>
                      </div>
                      <app-icon
                        name="arrow-up-right"
                        [size]="18"
                        class="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </li>
                }
              </ul>
            </app-case-study-section>
          }

          <app-next-project [project]="nextProject()" />
        </div>
      } @else {
        <div class="max-w-3xl" data-reveal>
          <p class="eyebrow">{{ i18n.read('notFound.eyebrow') }}</p>
          <h1 class="display mt-4">{{ i18n.read('notFound.title') }}</h1>
          <p class="body-large mt-6 max-w-xl text-secondary">
            {{ i18n.read('notFound.body') }}
          </p>
          <a
            [routerLink]="['/projects']"
            class="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
          >
            <app-icon name="arrow-left" [size]="15" />
            {{ i18n.read('notFound.back') }}
          </a>
        </div>
      }
    </article>
  `,
})
export class ProjectDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  private readonly reveal = inject(ScrollRevealService);
  private readonly host = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly i18n = inject(LanguageService);

  /** Flips to true when the lead visual fails to load — hides the empty frame. */
  protected readonly leadFailed = signal(false);

  /**
   * Reactive `/projects/:slug` parameter. `initialValue` uses the current route
   * snapshot so the very first render (SSR included) is correct, while later
   * changes to the same route (`/projects/a` → `/projects/b`, back/forward)
   * flow through the signal and recompute every dependent output.
   */
  private readonly currentParamMap = toSignal(this.route.paramMap, {
    initialValue: this.route.snapshot.paramMap,
  });

  protected readonly project = computed(() => {
    const project = getProjectBySlug(this.currentParamMap().get('slug') ?? '');
    return project ? (this.i18n.project(project) ?? project) : null;
  });

  protected readonly categoryLabel = computed(() => {
    const category = this.project()?.category;
    return category ? this.i18n.categoryLabel(category) : '';
  });

  protected readonly nextProject = computed(() => {
    const project = this.project();
    if (!project) {
      return null;
    }
    const next = getNextProject(project.slug);
    return this.i18n.project(next) ?? next;
  });

  /** First media item doubles as the lead/hero visual of the case study. */
  protected readonly leadMedia = computed<ProjectMedia | null>(
    () => this.project()?.media?.[0] ?? null,
  );

  /** Gallery shows everything except the lead visual. */
  protected readonly galleryItems = computed(() =>
    this.leadMedia() ? (this.project()?.media ?? []).slice(1) : [],
  );

  /** blog that link back to this project's case study. */
  protected readonly relatedArticles = computed<Article[]>(() => {
    const project = this.project();
    if (!project) {
      return [];
    }
    return ARTICLES.filter((article) =>
      article.related.some(
        (related) => related.type === 'project' && related.slug === project.slug,
      ),
    ).map((article) => this.i18n.article(article) ?? article);
  });

  protected articleCategoryLabel(article: Article): string {
    return this.i18n.articleCategoryLabel(article.categoryKey);
  }

  protected readonly decideNumber = (index: number): string => String(index + 1).padStart(2, '0');

  protected readonly learnNumber = (index: number): string => String(index + 1).padStart(2, '0');

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

    // Retry the lead visual whenever the route param changes: a failed image
    // from the previous project must not hide the next project's hero.
    effect(() => {
      void this.currentParamMap();
      this.leadFailed.set(false);
    });
  }

  ngOnInit(): void {
    this.setSeo();
  }

  private setSeo(): void {
    const project = this.project();
    if (!project) {
      this.seo.setPage({
        title: `${this.i18n.read('notFound.title')} — ${SITE.name}`,
        description: this.i18n.read('notFound.body'),
        canonicalUrl: `${SITE.url}/projects`,
      });
      return;
    }

    const title = `${project.title} — ${this.categoryLabel()} | ${SITE.name}`;
    const description = project.summary ?? `Case study: ${project.title}.`;
    const canonicalUrl = `${SITE.url}/projects/${project.slug}`;

    const projectImage =
      project.ogImage ?? project.media?.find((item) => item.type === 'image')?.src;
    const ogImage = absoluteUrl(projectImage) ?? absoluteUrl(SITE.defaultOgImage);
    const ogImageAlt = project.ogImageAlt ?? project.title;

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
    });
  }
}
