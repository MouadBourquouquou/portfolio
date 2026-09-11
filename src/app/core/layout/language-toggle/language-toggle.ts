import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { LANGUAGES } from '@core/i18n';

const LABELS: Record<(typeof LANGUAGES)[number], string> = {
  en: 'EN',
  fr: 'FR',
};

const ACCESSIBILITY_KEY: Record<(typeof LANGUAGES)[number], string> = {
  en: 'languageEn',
  fr: 'languageFr',
};

/**
 * Compact language switcher.
 *
 * A two-segment EN/FR control in the header. The active segment uses
 * `aria-pressed` and the localised labels live in the dictionary, so the
 * control is fully accessible in every language. Switching persists in
 * localStorage and updates `<html lang>` through the LanguageService.
 */
@Component({
  selector: 'app-language-toggle',
  imports: [],
  template: `
    <div
      class="flex items-center rounded-full border border-border bg-surface/60 p-0.5"
      [attr.aria-label]="i18n.read('accessibility.languageSelector')"
    >
      @for (code of codes(); track code) {
        <button
          type="button"
          (click)="select(code)"
          [attr.aria-pressed]="i18n.lang() === code"
          [attr.aria-label]="i18n.read('accessibility.' + accessKey(code))"
          [title]="i18n.read('accessibility.' + accessKey(code))"
          class="rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide"
          [class]="
            i18n.lang() === code ? 'bg-accent text-on-accent' : 'text-secondary hover:text-accent'
          "
        >
          {{ label(code) }}
        </button>
      }
    </div>
  `,
})
export class LanguageToggle {
  private readonly language = inject(LanguageService);

  protected readonly i18n = this.language;

  protected readonly codes = computed<(typeof LANGUAGES)[number][]>(() => [...LANGUAGES]);

  protected label(code: (typeof LANGUAGES)[number]): string {
    return LABELS[code];
  }

  protected accessKey(code: (typeof LANGUAGES)[number]): string {
    return ACCESSIBILITY_KEY[code];
  }

  protected select(code: (typeof LANGUAGES)[number]): void {
    this.language.setLang(code);
  }
}
