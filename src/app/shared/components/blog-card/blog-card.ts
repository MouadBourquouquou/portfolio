import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Article } from '@core/models/article.model';
import { LanguageService } from '@core/services/language/language.service';
import { AppIcon } from '@shared/ui/icon/icon';

/**
 * Blog note card.
 *
 * Visual sibling of the project card: same resting frame (border, surface,
 * shadow-card), same hover lift and focus-within behaviour. No images, so the
 * reading time + "Read →" footer carries the interaction affordance.
 */
@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, AppIcon],
  template: `
    @if (article(); as article) {
      <article
        class="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition-all duration-300 ease-out focus-within:-translate-y-1 focus-within:shadow-card-hover hover:-translate-y-1 hover:shadow-card-hover"
      >
        <div class="flex flex-1 flex-col gap-3">
          <div class="flex items-start justify-between gap-4">
            @if (article.categoryKey; as categoryKey) {
              <p class="eyebrow">{{ categoryLabel(categoryKey) }}</p>
            }
            <time
              [attr.datetime]="article.year"
              class="mt-0.5 shrink-0 text-xs font-medium uppercase tracking-widest text-secondary"
            >
              {{ article.year }}
            </time>
          </div>

          <a
            [routerLink]="['/blog', article.slug]"
            class="group/title inline-flex items-center gap-2 text-primary"
          >
            <h3
              class="font-heading text-2xl font-semibold leading-snug transition-colors duration-300 group-hover/title:text-accent"
            >
              {{ article.title }}
            </h3>
            <app-icon
              name="arrow-up-right"
              [size]="18"
              class="hidden transition-transform duration-300 group-hover/title:translate-x-0.5 group-hover/title:-translate-y-0.5 sm:inline-flex"
            />
          </a>

          <p class="text-sm leading-relaxed text-secondary">{{ article.excerpt }}</p>

          <div class="mt-auto flex items-center justify-between gap-3 pt-4">
            <a
              [routerLink]="['/blog', article.slug]"
              class="group/link inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
            >
              {{ readLabel() }}
              <app-icon
                name="arrow-right"
                [size]="16"
                class="transition-transform duration-300 group-hover/link:translate-x-1"
              />
            </a>
            <span
              class="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-secondary"
            >
              <app-icon name="clock" [size]="14" />
              {{ article.readingMinutes }} {{ minReadLabel() }}
            </span>
          </div>
        </div>
      </article>
    }
  `,
})
export class BlogCard {
  readonly article = input<Article | null>(null);

  protected readonly i18n = inject(LanguageService);

  protected readonly readLabel = computed(() => this.i18n.read('blogPage.read'));

  protected readonly minReadLabel = computed(() => this.i18n.read('blogPage.minRead'));

  protected categoryLabel(categoryKey: string): string {
    return this.i18n.articleCategoryLabel(categoryKey);
  }
}
