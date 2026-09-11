import { Component, inject } from '@angular/core';
import { SectionHeader } from '@shared/ui/section-header/section-header';
import { LanguageService } from '@core/services/language/language.service';
import { SKILLS } from '@data/skills';

const CATEGORY_ORDER = [
  'Languages',
  'Frontend',
  'Backend',
  'AI & Data',
  'Databases',
  'Cloud & DevOps',
  'Data & Distributed Systems',
];

@Component({
  selector: 'app-toolbox-section',
  imports: [SectionHeader],
  template: `
    <section
      class="section section-sm container-custom border-t border-border"
      aria-labelledby="toolbox-heading"
    >
      <app-section-header
        [eyebrow]="i18n.read('toolbox.eyebrow')"
        [title]="i18n.read('toolbox.title')"
        [description]="i18n.read('toolbox.description')"
      />

      <dl class="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        @for (category of categories; track category) {
          <div>
            <dt class="eyebrow mb-5">{{ i18n.skillCategoryLabel(category) }}</dt>
            <dd class="m-0">
              <ul class="flex flex-col gap-3">
                @for (skill of byCategory()[category]; track skill.name) {
                  <li class="text-sm leading-relaxed text-secondary">
                    {{ skill.name }}
                  </li>
                }
              </ul>
            </dd>
          </div>
        }
      </dl>
    </section>
  `,
})
export class ToolboxSection {
  protected readonly i18n = inject(LanguageService);

  protected readonly categories = CATEGORY_ORDER;

  protected readonly byCategory = () =>
    SKILLS.reduce<Record<string, typeof SKILLS>>((groups, skill) => {
      (groups[skill.category] ??= []).push(skill);
      return groups;
    }, {});
}
