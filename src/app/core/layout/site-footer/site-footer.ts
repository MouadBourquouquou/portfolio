import { Component } from '@angular/core';
import { SITE } from '@core/constants/site.constants';
import { AppIcon } from '@shared/ui/icon/icon';
import { CvDownload } from '@shared/ui/cv-download/cv-download';

@Component({
  selector: 'app-site-footer',
  imports: [AppIcon, CvDownload],
  template: `
    <footer class="border-t border-border">
      <div
        class="container-custom flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center"
      >
        <p class="text-sm text-secondary">© {{ year }} {{ siteName }}</p>
        <div class="flex items-center gap-6 text-xs text-secondary">
          <app-cv-download variant="footer" />
          <a
            [href]="github"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <app-icon name="github" [size]="16" />
            GitHub
            <app-icon
              name="external-link"
              [size]="13"
              class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
          <a
            [href]="linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <app-icon name="linkedin" [size]="16" />
            LinkedIn
            <app-icon
              name="external-link"
              [size]="13"
              class="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </footer>
  `,
})
export class SiteFooter {
  protected readonly siteName = SITE.name;
  protected readonly github = SITE.socials.github;
  protected readonly linkedin = SITE.socials.linkedin;
  protected readonly year = new Date().getFullYear();
}
