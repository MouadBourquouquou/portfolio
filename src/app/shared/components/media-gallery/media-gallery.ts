import { Component, computed, inject, input, signal } from '@angular/core';
import type { ProjectMedia } from '@core/models/project.model';
import { LanguageService } from '@core/services/language/language.service';

interface MediaGroup {
  label: string | null;
  items: ProjectMedia[];
}

/**
 * Reusable media gallery for case studies.
 *
 * Accepts an array of `ProjectMedia` (image or video with optional
 * caption/alt). Items are grouped under their `label` (e.g. "Screens",
 * "Architecture", "Workflow") when labels are present, otherwise they render
 * as a single uniform grid. When no media is present an elegant, clearly
 * marked placeholder is shown so the section still reads as a designed space
 * — and never breaks when real imagery is added later.
 */
@Component({
  selector: 'app-media-gallery',
  template: `
    <div>
      @if (items().length) {
        @for (group of groups(); track group) {
          <div class="mb-10 last:mb-0">
            @if (group.label; as label) {
              <p class="eyebrow mb-4">{{ label }}</p>
            }
            <div [class]="group.label ? 'grid gap-8 lg:grid-cols-2' : 'grid gap-8'">
              @for (item of group.items; track $index) {
                <figure
                  class="overflow-hidden rounded-xl border border-border bg-surface shadow-card"
                >
                  @if (item.type === 'image') {
                    @if (!isFailed(item.src)) {
                      <img
                        [src]="item.src"
                        [alt]="item.alt ?? item.caption ?? i18n.read('common.projectImage')"
                        width="1200"
                        height="750"
                        class="aspect-[16/10] w-full object-cover"
                        loading="lazy"
                        decoding="async"
                        (error)="markFailed(item.src)"
                      />
                    } @else {
                      <div
                        class="media-texture flex aspect-[16/10] w-full items-center justify-center bg-surface"
                        aria-hidden="true"
                      >
                        <span
                          class="select-none font-heading text-6xl font-medium leading-none text-primary/10"
                        >
                          M
                        </span>
                      </div>
                    }
                  } @else {
                    <video
                      class="aspect-[16/10] w-full object-cover"
                      [poster]="item.poster"
                      [attr.aria-label]="
                        item.alt ?? item.caption ?? i18n.read('common.projectVideo')
                      "
                      controls
                      playsinline
                      preload="metadata"
                    >
                      <source [src]="item.src" />
                    </video>
                  }
                  @if (item.caption; as caption) {
                    <figcaption class="border-t border-border px-5 py-4 text-sm text-secondary">
                      {{ caption }}
                    </figcaption>
                  }
                </figure>
              }
            </div>
          </div>
        }
      } @else {
        <div class="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div
            class="media-texture flex aspect-[16/10] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-surface shadow-card"
            aria-hidden="true"
          >
            <span class="font-heading text-6xl font-medium text-primary/10">M</span>
          </div>
          <div class="max-w-md">
            <p class="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {{ i18n.read('media.mediaInPreparation') }}
            </p>
            <p class="mt-4 text-sm leading-relaxed text-secondary">
              {{ i18n.read('media.placeholderBody') }}
            </p>
          </div>
        </div>
      }
    </div>
  `,
})
export class MediaGallery {
  readonly items = input<ProjectMedia[]>([]);

  protected readonly i18n = inject(LanguageService);

  /** Sources that failed to load — replaced by the placeholder individually. */
  private readonly failedSrcs = signal<Set<string>>(new Set());

  protected readonly isFailed = (src: string): boolean => this.failedSrcs().has(src);

  protected readonly markFailed = (src: string): void => {
    this.failedSrcs.update((set) => {
      const next = new Set(set);
      next.add(src);
      return next;
    });
  };

  /** Groups media by label, keeping unlabeled items first. */
  protected readonly groups = computed<MediaGroup[]>(() => {
    const items = this.items();
    if (!items.length) {
      return [];
    }
    const byLabel = new Map<string, ProjectMedia[]>();
    const unlabeled: ProjectMedia[] = [];
    for (const item of items) {
      if (item.label) {
        const bucket = byLabel.get(item.label) ?? [];
        bucket.push(item);
        byLabel.set(item.label, bucket);
      } else {
        unlabeled.push(item);
      }
    }
    const groups: MediaGroup[] = [];
    if (unlabeled.length) {
      groups.push({ label: null, items: unlabeled });
    }
    for (const [label, groupItems] of byLabel) {
      groups.push({ label, items: groupItems });
    }
    return groups;
  });
}
