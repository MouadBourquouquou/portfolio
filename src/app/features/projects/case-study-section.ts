import { Component, input } from '@angular/core';

/**
 * Editorial case-study section.
 *
 * Two-column asymmetric layout: a numbered kicker + heading on the left,
 * body content on the right. Body is provided through `<ng-content>` so each
 * section can compose its own structure without duplicating framing markup.
 */
@Component({
  selector: 'app-case-study-section',
  template: `
    <section
      class="grid gap-6 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20 lg:pt-16"
    >
      <div>
        <p class="eyebrow" data-reveal>{{ index() }} / {{ kicker() }}</p>
        <h2 class="section-title mt-3" data-reveal>{{ title() }}</h2>
      </div>
      <div class="max-w-2xl text-secondary">
        <ng-content />
      </div>
    </section>
  `,
})
export class CaseStudySection {
  readonly index = input.required<string>();
  readonly kicker = input.required<string>();
  readonly title = input.required<string>();
}
