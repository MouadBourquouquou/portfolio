import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SITE } from '@core/constants/site.constants';

/**
 * Exposes the downloadable CV and confirms the file is actually served before
 * any UI links to it.
 *
 * SSR-safe: on the server `available()` stays optimistic (true when a CV path
 * is configured) so the rendered HTML includes the "Download CV" affordance.
 * In the browser a single HEAD request verifies the file exists; if it does
 * not (e.g. the PDF has not been dropped into `public/documents/` yet), the
 * button is hidden gracefully and no broken link is exposed.
 */
@Injectable({ providedIn: 'root' })
export class CvService {
  private readonly platformId = inject(PLATFORM_ID);
  private checked = false;

  readonly cvUrl = SITE.cv;
  readonly cvFileName = SITE.cv.split('/').pop() ?? 'CV.pdf';
  readonly available = signal(Boolean(SITE.cv));

  /** Verifies the CV is served. Safe to call from any component; runs once. */
  check(): void {
    if (!SITE.cv || this.checked || !isPlatformBrowser(this.platformId)) {
      return;
    }
    this.checked = true;
    fetch(SITE.cv, { method: 'HEAD' })
      .then((response) => this.available.set(response.ok))
      .catch(() => this.available.set(false));
  }

  /**
   * Downloads the CV as a blob and triggers a same-origin `download`-style save
   * through a temporary anchor. Browser-only; never opens a new tab or navigates
   * away, and it reports (rather than silently failing) if the file is missing.
   * The `href` on the button remains intact, so the link stays valid even before
   * hydration and for copy/right-click behaviors.
   */
  async download(): Promise<void> {
    if (!this.cvUrl || !isPlatformBrowser(this.platformId)) {
      return;
    }
    try {
      const response = await fetch(this.cvUrl);
      if (!response.ok) {
        throw new Error(`CV request failed (${response.status})`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = this.cvFileName;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('[CvService] Unable to download CV:', error);
    }
  }
}