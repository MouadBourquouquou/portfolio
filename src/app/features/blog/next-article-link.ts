import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Article } from '@core/models/article.model';
import { LanguageService } from '@core/services/language/language.service';
import { AppIcon } from '@shared/ui/icon/icon';

/**
 * "Next note →" affordance shown at the end of an article.
 *
 * The editorial twin of the project case study's "Next project" link: one
 * large link into the next note in reading order.
 */
@Component({
  selector: 'app-next-article-link',
  imports: [RouterLink, AppIcon],
  template: `
    @if (article(); as article) {
      <aside>
        <a
          [routerLink]="['/blog', article.slug]"
          class="group mt-20 block border-t-2 border-primary pt-8 transition-colors duration-300 hover:border-accent lg:pt-12"
        >
          <p class="eyebrow">{{ i18n.read('blogPage.nextArticle') }}</p>
          <div class="mt-6 flex items-end justify-between gap-6">
            <h2 class="section-title">{{ article.title }}</h2>
            <span class="shrink-0 pb-1 text-accent" aria-hidden="true">
              <app-icon
                name="arrow-right"
                [size]="34"
                class="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>
          </div>
          @if (article.excerpt; as excerpt) {
            <p class="mt-3 max-w-xl text-secondary">{{ excerpt }}</p>
          }
        </a>
      </aside>
    }
  `,
})
export class NextArticleLink {
  readonly article = input<Article | null>(null);

  protected readonly i18n = inject(LanguageService);
}
