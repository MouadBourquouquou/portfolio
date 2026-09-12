import { Injectable } from '@angular/core';
import { SITE } from '@core/constants/site.constants';
import type { SupportedLanguage } from '@core/i18n';

/**
 * Exposes the downloadable CVs (English and French).
 *
 * The service is deliberately simple: it only supplies the CV paths and
 * filenames. Downloads are performed natively by the browser through real
 * `href` + `download` anchors rendered by CvDownload, so no blob round-trip
 * (which can silently fail on some mobile browsers) and no HEAD availability
 * check (which could hide the control on a transient failure) are needed.
 * If a path is configured the option is rendered and the file is fetched
 * directly — same-origin, works without JavaScript and on every device.
 */
@Injectable({ providedIn: 'root' })
export class CvService {
  readonly cvUrl: Record<SupportedLanguage, string> = SITE.cv;

  /** Languages that have a CV path configured. */
  readonly enabled: Record<SupportedLanguage, boolean> = {
    en: Boolean(SITE.cv.en),
    fr: Boolean(SITE.cv.fr),
  };

  cvFileName(lang: SupportedLanguage): string {
    return this.cvUrl[lang].split('/').pop() ?? 'CV.pdf';
  }
}
