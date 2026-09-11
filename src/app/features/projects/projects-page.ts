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
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Project } from '@core/models/project.model';
import { FeaturedProject } from '@shared/components/featured-project/featured-project';
import { ProjectCard } from '@shared/components/project-card/project-card';
import { ScrollRevealService } from '@core/services/animation/scroll-reveal.service';
import { SeoService } from '@core/services/seo/seo.service';
import { LanguageService } from '@core/services/language/language.service';
import { SITE, absoluteUrl } from '@core/constants/site.constants';
import { AppIcon } from '@shared/ui/icon/icon';
import { PROJECT_CATEGORIES, getFeaturedProject, getSupportingProjects } from '@data/projects';

type ProjectFilter = string | null;

@Component({
  selector: 'app-projects-page',
  imports: [RouterLink, FeaturedProject, ProjectCard, AppIcon],
  template: `
    <section id="projects" class="section section-lg container-custom">
      <div class="max-w-2xl" data-reveal>
        <p class="eyebrow">{{ i18n.read('projectsPage.eyebrow') }}</p>
        <h1 class="display mt-4">{{ i18n.read('projectsPage.title') }}</h1>
        <p class="body-large mt-6 max-w-xl text-secondary">
          {{ i18n.read('projectsPage.intro') }}
        </p>
      </div>

      @if (featured(); as featuredProject) {
        <div class="mt-16 lg:mt-24" data-reveal>
          <app-featured-project [project]="featuredProject" headingLevel="h2" />
        </div>
      }

      <div class="mt-16 lg:mt-24">
        <div class="flex flex-wrap items-end justify-between gap-4" data-reveal>
          <h2 class="section-title">{{ i18n.read('projectsPage.supportingProjects') }}</h2>
        </div>

        @if (filterOptions().length > 1) {
          <div
            class="mt-8 flex flex-wrap gap-x-8 gap-y-3"
            role="group"
            [attr.aria-label]="i18n.read('accessibility.filterProjects')"
            data-reveal
          >
            @for (option of filterOptions(); track $index) {
              <button
                type="button"
                (click)="setFilter(option)"
                [attr.aria-pressed]="activeFilter() === option"
                class="pb-1 text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary"
                [class.text-accent]="activeFilter() === option"
                [class.border-b]="activeFilter() === option"
                [class.border-accent]="activeFilter() === option"
                [class.text-secondary]="activeFilter() !== option"
              >
                {{ filterLabel(option) }}
              </button>
            }
          </div>
        }

        <div class="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3" data-reveal>
          @for (project of filtered(); track project.slug) {
            <app-project-card [project]="project" tagDisplay="list" />
          } @empty {
            <p class="text-secondary">{{ i18n.read('projectsPage.empty') }}</p>
          }
        </div>
      </div>

      <aside
        class="mt-20 rounded-xl border border-border bg-surface p-8 shadow-card lg:mt-28 lg:p-14"
        data-reveal
      >
        <div class="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div class="max-w-xl">
            <p class="eyebrow">{{ i18n.read('projectsPage.letsBuild') }}</p>
            <h2 class="section-title mt-3">{{ i18n.read('projectsPage.buildCtaTitle') }}</h2>
            <p class="mt-4 text-secondary">
              {{ i18n.read('projectsPage.buildCtaBody') }}
            </p>
          </div>
          <a
            [routerLink]="['/contact']"
            class="group inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-hover"
          >
            {{ i18n.read('projectsPage.startConversation') }}
            <app-icon
              name="arrow-right"
              [size]="16"
              class="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </aside>
    </section>
  `,
})
export class ProjectsPage {
  private readonly seo = inject(SeoService);
  private readonly reveal = inject(ScrollRevealService);
  private readonly host = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly i18n = inject(LanguageService);

  protected readonly featured = computed(() => {
    const project = getFeaturedProject();
    return project ? this.localize(project) : null;
  });

  protected readonly filterOptions = computed<ProjectFilter[]>(() => [null, ...PROJECT_CATEGORIES]);

  protected readonly activeFilter = signal<ProjectFilter>(null);

  protected readonly filtered = computed(() => {
    const category = this.activeFilter();
    const supporting = getSupportingProjects().map((project) => this.localize(project));
    if (!category) {
      return supporting;
    }
    return supporting.filter((project) => project.category === category);
  });

  protected filterLabel(option: ProjectFilter): string {
    if (option === null) {
      return this.i18n.read('projectsPage.all');
    }
    return this.i18n.categoryLabel(option);
  }

  protected setFilter(category: ProjectFilter): void {
    this.activeFilter.set(category);
  }

  private localize(project: Project): Project {
    return this.i18n.project(project) ?? project;
  }

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
    const title = this.i18n.read('meta.projects.title');
    const description = this.i18n.read('meta.projects.description');
    const ogImage = absoluteUrl(SITE.defaultOgImage);
    this.seo.setPage({
      title,
      description,
      canonicalUrl: `${SITE.url}/projects`,
      og: {
        title,
        description,
        type: 'website',
        url: `${SITE.url}/projects`,
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
