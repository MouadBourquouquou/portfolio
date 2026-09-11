import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project, ProjectMedia } from '@core/models/project.model';
import { LanguageService } from '@core/services/language/language.service';
import { Tag } from '@shared/ui/tag/tag';
import { AppIcon } from '@shared/ui/icon/icon';

/**
 * Flagship project feature — a large case-study preview.
 *
 * Media resolves from the project's own data (`media[0]`) so the homepage and
 * archive never hardcode assets; an explicit `media` input can still override.
 * Without approved media a refined typographic placeholder fills the visual
 * area. The heading level is configurable so the component fits both the
 * homepage (h3) and the archive (h2) hierarchy. Depth comes from a soft
 * elevation on the media frame and restrained hover motion.
 */
@Component({
  selector: 'app-featured-project',
  imports: [RouterLink, Tag, AppIcon],
  template: `
    <article class="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-center">
      <a
        [routerLink]="['/projects', project().slug]"
        class="group relative block aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface shadow-card transition-all duration-300 ease-out hover:border-accent/30 hover:shadow-card-hover focus-visible:outline-2"
      >
        @if (previewMedia(); as media) {
          @if (media.type === 'image' && !mediaFailed()) {
            <img
              [src]="media.src"
              [alt]="media.alt ?? project().title"
              width="1200"
              height="750"
              class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
              decoding="async"
              (error)="mediaFailed.set(true)"
            />
          } @else if (media.type === 'video') {
            <video
              class="h-full w-full object-cover"
              [poster]="media.poster"
              [attr.aria-label]="media.alt ?? media.caption ?? project().title"
              muted
              loop
              playsinline
              preload="metadata"
            >
              <source [src]="media.src" />
            </video>
          }
        }
        @if (!previewMedia() || (previewMedia()?.type === 'image' && mediaFailed())) {
          <div
            class="media-texture flex h-full w-full items-center justify-center bg-surface"
            aria-hidden="true"
          >
            <span
              class="select-none font-heading text-[7rem] font-medium leading-none text-primary/10"
            >
              {{ initial() }}
            </span>
          </div>
        }

        <span
          class="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-widest text-secondary backdrop-blur-sm"
          aria-hidden="true"
        >
          {{ i18n.read('common.caseStudy') }}
        </span>
      </a>

      <div class="flex flex-col gap-6 lg:gap-8">
        <p class="eyebrow">
          {{ featuredLabel() }}
        </p>

        <div class="flex flex-col gap-3">
          @if (headingLevel() === 'h2') {
            <h2 class="font-heading text-4xl font-semibold leading-[1.1] text-primary lg:text-5xl">
              {{ project().title }}
            </h2>
          } @else {
            <h3 class="font-heading text-4xl font-semibold leading-[1.1] text-primary lg:text-5xl">
              {{ project().title }}
            </h3>
          }

          <div
            class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium uppercase tracking-widest text-secondary"
          >
            @if (project().role; as role) {
              <span>{{ role }}</span>
            }
            @if (project().role && project().year) {
              <span class="size-1 rounded-full bg-accent" aria-hidden="true"></span>
            }
            @if (project().year; as year) {
              <time>
                <app-icon name="calendar" [size]="13" />
                <span class="ml-1.5">{{ year }}</span>
              </time>
            }
          </div>
        </div>

        @if (project().summary; as summary) {
          <p class="body-medium max-w-md text-secondary">{{ summary }}</p>
        }

        @if (project().tags?.length) {
          <div class="flex flex-wrap gap-2">
            @for (tag of project().tags; track tag) {
              <app-tag variant="accent">{{ tag }}</app-tag>
            }
          </div>
        }

        <a
          [routerLink]="['/projects', project().slug]"
          class="group/link inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          {{ i18n.read('projectsPage.readCaseStudy') }}
          <app-icon
            name="arrow-right"
            [size]="16"
            class="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </a>
      </div>
    </article>
  `,
})
export class FeaturedProject {
  protected readonly i18n = inject(LanguageService);

  readonly project = input.required<Project>();
  readonly media = input<ProjectMedia | null>(null);
  readonly headingLevel = input<'h2' | 'h3'>('h3');

  /** Flips to true when the preview image fails — restores the placeholder. */
  protected readonly mediaFailed = signal(false);

  /** Resolves the preview to the explicit input, else the project's own media. */
  protected readonly previewMedia = computed<ProjectMedia | null>(
    () => this.media() ?? this.project().media?.[0] ?? null,
  );

  /** Flagship label for the single featured project. */
  protected readonly featuredLabel = computed(() => this.i18n.read('projectsPage.featured'));

  protected readonly initial = computed(() => this.project().title.charAt(0).toUpperCase());
}
