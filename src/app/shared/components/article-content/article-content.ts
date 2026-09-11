import { Component, input } from '@angular/core';
import type { ArticleBlock } from '@core/models/article.model';

/**
 * Renders an article's body from typed blocks.
 *
 * Headings, paragraphs, lists, callouts and code blocks share the site's
 * editorial rhythm; code blocks render in a bordered, syntax-free surface so
 * they stay readable in both themes without a highlighting dependency.
 */
@Component({
  selector: 'app-article-content',
  template: `
    @for (block of blocks(); track $index) {
      @switch (block.type) {
        @case ('heading') {
          <h2 class="mt-14 font-heading text-2xl font-semibold text-primary">
            {{ block.text }}
          </h2>
        }
        @case ('paragraph') {
          <p class="mt-6 leading-7 text-secondary">{{ block.text }}</p>
        }
        @case ('callout') {
          <blockquote
            class="mt-8 rounded-xl border border-accent/30 bg-accent/10 px-6 py-5 text-primary"
          >
            <p class="body-medium">{{ block.text }}</p>
          </blockquote>
        }
        @case ('list') {
          @if (block.ordered) {
            <ol class="mt-6 space-y-3">
              @for (item of block.items; track $index; let i = $index) {
                <li class="flex gap-4 text-secondary">
                  <span class="shrink-0 text-sm font-medium text-accent">{{ i + 1 }}</span>
                  <span>{{ item }}</span>
                </li>
              }
            </ol>
          } @else {
            <ul class="mt-6 space-y-3">
              @for (item of block.items; track $index) {
                <li class="flex gap-3 text-secondary">
                  <span aria-hidden="true" class="shrink-0 text-accent">—</span>
                  <span>{{ item }}</span>
                </li>
              }
            </ul>
          }
        }
        @case ('code') {
          <figure class="mt-8 overflow-hidden rounded-xl border border-border bg-background">
            @if (block.title) {
              <figcaption
                class="border-b border-border px-5 py-3 text-xs font-semibold uppercase tracking-widest text-secondary"
              >
                {{ block.title }}
              </figcaption>
            }
            <pre
              class="overflow-x-auto p-5 font-mono text-[0.8125rem] leading-relaxed text-primary"
            ><code>{{ block.body }}</code></pre>
          </figure>
        }
      }
    }
  `,
})
export class ArticleContent {
  readonly blocks = input<ArticleBlock[]>([]);
}
