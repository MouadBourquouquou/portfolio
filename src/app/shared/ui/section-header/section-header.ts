import { Component, input } from '@angular/core';

export type SectionHeaderAlign = 'left' | 'center' | 'right';

/**
 * Editorial section header: optional eyebrow, a heading, and optional
 * lead description. Used to open every major section consistently.
 */
@Component({
  selector: 'app-section-header',
  template: `
    <header
      [class]="{
        'text-center': align() === 'center',
        'text-right': align() === 'right',
        'mx-auto': align() === 'center',
      }"
      class="max-w-2xl"
    >
      @if (eyebrow(); as label) {
        <p class="mb-3 flex items-center gap-3">
          <span class="inline-block h-px w-6 bg-accent" aria-hidden="true"></span>
          <span class="eyebrow">{{ label }}</span>
        </p>
      }
      <h2 [class]="titleSize()">{{ title() }}</h2>
      @if (description(); as description) {
        <p class="mt-4 text-base text-secondary">{{ description }}</p>
      }
    </header>
  `,
})
export class SectionHeader {
  readonly eyebrow = input<string | null>(null);
  readonly title = input<string>('');
  readonly description = input<string | null>(null);
  readonly align = input<SectionHeaderAlign>('left');
  readonly size = input<'md' | 'lg'>('md');

  protected readonly titleSize = () => (this.size() === 'lg' ? 'display' : 'section-title');
}
