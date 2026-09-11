import { Component, input } from '@angular/core';

export type TagVariant = 'default' | 'accent';

/**
 * Small meta/tag pill used across cards, timelines, and filters.
 */
@Component({
  selector: 'app-tag',
  template: `
    <span
      [class]="
        variant() === 'accent'
          ? 'border-accent/30 bg-accent/10 text-accent'
          : 'border-border bg-surface text-secondary'
      "
      class="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 hover:border-accent/40"
    >
      <ng-content />
    </span>
  `,
})
export class Tag {
  readonly variant = input<TagVariant>('default');
}
