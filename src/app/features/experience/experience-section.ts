import { Component, computed, inject } from '@angular/core';
import { SectionHeader } from '@shared/ui/section-header/section-header';
import { TimelineItem } from '@shared/components/timeline-item/timeline-item';
import { LanguageService } from '@core/services/language/language.service';
import type { Experience } from '@core/models/experience.model';
import { EXPERIENCE } from '@data/experience';

@Component({
  selector: 'app-experience-section',
  imports: [SectionHeader, TimelineItem],
  template: `
    <section
      class="section container-custom border-t border-border"
      aria-labelledby="experience-heading"
    >
      <app-section-header
        [eyebrow]="i18n.read('experience.eyebrow')"
        [title]="i18n.read('experience.title')"
        [description]="i18n.read('experience.description')"
      />

      <ol class="mt-14 flex flex-col gap-12">
        @for (item of experience(); track $index) {
          <li class="group">
            <app-timeline-item
              [item]="item"
              [marker]="item.kind === 'leadership' ? 'outline' : 'solid'"
              [last]="$last"
            />
          </li>
        }
      </ol>
    </section>
  `,
})
export class ExperienceSection {
  protected readonly i18n = inject(LanguageService);

  protected readonly experience = computed<Experience[]>(() =>
    EXPERIENCE.map((item, index) => (this.i18n.experienceItem(index) ?? item) as Experience),
  );
}
