import { Component, inject } from '@angular/core';
import { Button } from '@shared/ui/button/button';
import { CvDownload } from '@shared/ui/cv-download/cv-download';
import { LanguageService } from '@core/services/language/language.service';
import { SITE } from '@core/constants/site.constants';
import { AppIcon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-contact-section',
  imports: [Button, CvDownload, AppIcon],
  template: `
    <section class="section section-lg" aria-labelledby="contact-heading">
      <div class="container-custom flex flex-col items-start gap-8 border-t border-border pt-16">
        <p class="eyebrow">{{ i18n.read('contact.eyebrow') }}</p>
        <h2 id="contact-heading" class="display max-w-2xl">
          {{ i18n.read('contact.titleLine1') }}
          <br class="hidden sm:block" />
          {{ i18n.read('contact.titleLine2') }}
        </h2>
        <p class="body-large max-w-xl text-secondary">
          {{ i18n.read('contact.body') }}
        </p>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <app-button
            size="lg"
            [href]="'mailto:' + email"
            [external]="false"
            class="w-full sm:w-auto"
          >
            {{ email }}
            <app-icon
              name="mail"
              [size]="17"
              class="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </app-button>
        </div>

        <div class="flex flex-wrap items-center gap-x-8 gap-y-3">
          <app-cv-download variant="contact" />
          <a
            [href]="github"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            <app-icon name="github" [size]="17" />
            GitHub
            <app-icon
              name="arrow-up-right"
              [size]="14"
              class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            [href]="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            <app-icon name="linkedin" [size]="17" />
            LinkedIn
            <app-icon
              name="arrow-up-right"
              [size]="14"
              class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ContactSection {
  protected readonly i18n = inject(LanguageService);

  protected readonly email = SITE.email;
  protected readonly github = SITE.socials.github;
  protected readonly linkedin = SITE.socials.linkedin;
}
