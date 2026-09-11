import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Project } from '@core/models/project.model';
import { LanguageService } from '@core/services/language/language.service';
import { AppIcon } from '@shared/ui/icon/icon';

/**
 * "Next project →" affordance shown at the end of a case study.
 *
 * A large editorial link into the next case study in reading order.
 */
@Component({
  selector: 'app-next-project',
  imports: [RouterLink, AppIcon],
  template: `
    @if (project(); as project) {
      <aside>
        <a
          [routerLink]="['/projects', project.slug]"
          class="group block border-t-2 border-primary pt-8 transition-colors duration-300 hover:border-accent lg:pt-12"
        >
          <p class="eyebrow">{{ i18n.read('projectsPage.nextProject') }}</p>
          <div class="mt-6 flex items-end justify-between gap-6">
            <h2 class="section-title">{{ project.title }}</h2>
            <span class="shrink-0 pb-1 text-accent" aria-hidden="true">
              <app-icon
                name="arrow-right"
                [size]="34"
                class="transition-transform duration-300 group-hover:translate-x-1.5"
              />
            </span>
          </div>
          @if (project.summary; as summary) {
            <p class="mt-3 max-w-xl text-secondary">{{ summary }}</p>
          }
        </a>
      </aside>
    }
  `,
})
export class NextProject {
  readonly project = input<Project | null>(null);

  protected readonly i18n = inject(LanguageService);
}
