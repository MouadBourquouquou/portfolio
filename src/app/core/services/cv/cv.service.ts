import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE } from '@core/constants/site.constants';
import type { SupportedLanguage } from '@core/i18n';

/**
 * Exposes downloadable CVs (English and French) and confirms each file is
 * actually served before any UI links to it.
 *
 * SSR-safe: on the server `available()` stays optimistic (true when at least
 * one CV path is configured) so the rendered HTML includes the "Download CV"
 * affordance. In the browser a HEAD request per language verifies each file;
 * if a file is missing the dropdown option is hidden gracefully and no broken
 * link is exposed.
 */
@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly platformId = inject(PLATFORM_ID);
  private checked = false;

  readonly cvUrl: Record<SupportedLanguage, string> = SITE.cv;

  /** Per-language availability signals. */
  readonly availableEn = signal(Boolean(SITE.cv.en));
  readonly availableFr = signal(Boolean(SITE.cv.fr));

  cvFileName(lang: SupportedLanguage): string {
    return this.cvUrl[lang].split('/').pop() ?? 'CV.pdf';
  }

  /** Verifies CVs are served. Safe to call from any component; runs once. */
  check(): void {
    if (this.checked || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.checked = true;

    for (const lang of ['en', 'fr'] as SupportedLanguage[]) {
      const url = SITE.cv[lang];
      if (!url) {
        continue;
      }
      fetch(url, { method: 'HEAD' })
        .then((response) => {
          if (lang === 'en') {
            this.availableEn.set(response.ok);
          } else {
            this.availableFr.set(response.ok);
          }
        })
        .catch(() => {
          if (lang === 'en') {
            this.availableEn.set(false);
          } else {
            this.availableFr.set(false);
          }
        });
    }
  }

  /**
   * Downloads the CV for the given language as a blob and triggers a
   * same-origin `download`-style save through a temporary anchor.
   * Browser-only; never opens a new tab or navigates away.
   */
  async download(lang: SupportedLanguage): Promise<void> {
    const url = this.cvUrl[lang];
    if (!url || !isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CV request failed (${response.status})`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = this.cvFileName(lang);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error(`[CvService] Unable to download CV (${lang}):`, error);
    }
  }
}
