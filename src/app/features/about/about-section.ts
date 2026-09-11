import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeader } from '@shared/ui/section-header/section-header';
import { LanguageService } from '@core/services/language/language.service';
import { AppIcon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-about-section',
  imports: [RouterLink, SectionHeader, AppIcon],
  template: `
    <section
      class="section container-custom border-t border-border"
      aria-labelledby="about-heading"
    >
      <app-section-header
        [eyebrow]="i18n.read('about.eyebrow')"
        [title]="i18n.read('about.title')"
        [description]="i18n.read('about.description')"
      />

      <ol class="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
        @for (beat of beats(); track beat.number) {
          <li class="flex flex-col gap-3 border-t border-border pt-6">
            <span class="font-heading text-sm font-medium tabular-nums text-accent">
              {{ beat.number }}
            </span>
            <h3 class="font-heading text-2xl font-semibold text-primary">
              {{ beat.title }}
            </h3>
            <p class="max-w-xs text-sm leading-relaxed text-secondary">
              {{ beat.text }}
            </p>
          </li>
        }
      </ol>

      <a
        [routerLink]="['/about']"
        class="group mt-12 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        {{ i18n.read('about.fullStory') }}
        <app-icon
          name="arrow-right"
          [size]="16"
          class="transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </section>
  `,
})
export class AboutSection {
  protected readonly i18n = inject(LanguageService);

  protected readonly beats = computed(() => this.i18n.beats());
}
