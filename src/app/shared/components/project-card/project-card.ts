import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project, ProjectMedia } from '@core/models/project.model';
import { LanguageService } from '@core/services/language/language.service';
import { Tag } from '@shared/ui/tag/tag';
import { AppIcon } from '@shared/ui/icon/icon';

export type ProjectCardTagDisplay = 'pills' | 'list';

/**
 * Supporting project card.
 *
 * Rests flush (borders + optional field quietness); on hover it lifts -4px,
 * deepens its shadow and scales the media 1.03x. Keyboard focus on the
 * embedded links receives the same lift/shadow via `focus-within`. Without an
 * approved image a typographic watermark fills the frame.
 */
@Component({
  selector: 'app-project-card',
  imports: [RouterLink, Tag, AppIcon],
  template: `
    @if (project(); as project) {
      <article
        class="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out focus-within:-translate-y-1 focus-within:shadow-card-hover hover:-translate-y-1 hover:shadow-card-hover"
      >
        <a
          [routerLink]="detailRoute()"
          class="relative block aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-background transition-colors duration-300 group-hover:border-accent/30"
        >
          @if (previewImage(); as image) {
            @if (!imageFailed()) {
              <img
                [src]="image.src"
                [alt]="image.alt ?? project.title"
                width="1200"
                height="750"
                class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
                (error)="imageFailed.set(true)"
              />
            }
          }
          @if (!previewImage() || imageFailed()) {
            <span
              aria-hidden="true"
              class="media-texture flex h-full w-full items-center justify-center font-heading text-6xl font-medium text-primary/10 select-none"
            >
              {{ initial(project) }}
            </span>
          }
        </a>

        <div class="flex flex-1 flex-col gap-3 pt-5">
          <div class="flex items-start justify-between gap-4">
            @if (project.category; as category) {
              <p class="eyebrow">{{ category }}</p>
            }
            @if (project.year; as year) {
              <time
                class="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-widest text-secondary"
              >
                {{ year }}
              </time>
            }
          </div>

          <a
            [routerLink]="detailRoute()"
            class="group/title inline-flex items-center gap-2 text-primary"
          >
            <h3
              class="font-heading text-2xl font-semibold leading-snug transition-colors duration-300 group-hover/title:text-accent"
            >
              {{ project.title }}
            </h3>
            <app-icon
              name="arrow-up-right"
              [size]="18"
              class="hidden transition-transform duration-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 sm:inline-flex"
            />
          </a>

          @if (project.summary; as summary) {
            <p class="text-sm leading-relaxed text-secondary">{{ summary }}</p>
          }

          @if (showTags()) {
            @if (project.tags; as tags) {
              @if (tags.length) {
                @if (tagDisplay() === 'list') {
                  <p class="text-xs font-medium uppercase tracking-wider text-secondary">
                    {{ tags.join(' · ') }}
                  </p>
                } @else {
                  <div class="flex flex-wrap gap-2">
                    @for (tag of tags; track tag) {
                      <app-tag>{{ tag }}</app-tag>
                    }
                  </div>
                }
              }
            }
          }

          <div class="mt-auto flex items-center justify-between gap-3 pt-4">
            <a
              [routerLink]="detailRoute()"
              class="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {{ resolvedLinkLabel() }}
              <app-icon
                name="arrow-right"
                [size]="16"
                class="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
            @if (project.role; as role) {
              <span class="text-xs uppercase tracking-widest text-secondary">{{ role }}</span>
            }
          </div>
        </div>
      </article>
    }
  `,
})
export class ProjectCard {
  readonly project = input<Project | null>(null);
  readonly detailRouteOverride = input<string[] | null>(null);
  readonly showTags = input(true);
  readonly tagDisplay = input<ProjectCardTagDisplay>('pills');
  readonly linkLabel = input('');

  protected readonly i18n = inject(LanguageService);

  /** Flips to true when the preview image fails to load — keeps the placeholder. */
  protected readonly imageFailed = signal(false);

  /** Localized link label with a raw input override. */
  protected readonly resolvedLinkLabel = computed(
    () => this.linkLabel() || this.i18n.read('projectsPage.readCaseStudy'),
  );

  protected readonly detailRoute = computed(() => {
    const project = this.project();
    if (!project) {
      return [];
    }
    return this.detailRouteOverride() ?? ['/projects', project.slug];
  });

  /** First image in project media, else a video poster, else legacy image. */
  protected readonly previewImage = computed<ProjectMedia | null>(() => {
    const project = this.project();
    if (!project) {
      return null;
    }
    const imageItem = project.media?.find((item) => item.type === 'image');
    if (imageItem) {
      return imageItem;
    }
    const poster = project.media?.find((item) => item.type === 'video' && item.poster);
    if (poster) {
      return {
        type: 'image',
        src: poster.poster!,
        alt: `${poster.alt ?? project.title} — video preview`,
      };
    }
    if (project.image) {
      return { type: 'image', src: project.image, alt: project.imageAlt ?? project.title };
    }
    return null;
  });

  protected readonly initial = (project: Project): string => project.title.charAt(0).toUpperCase();
}
