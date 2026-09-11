import { Component, computed, inject } from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { AppIcon } from '@shared/ui/icon/icon';

/**
 * Compact theme toggle.
 *
 * A small icon button in the header: shows the moon in light mode (click to
 * go dark) and the sun in dark mode (click to go light). System preference is
 * the default and is honoured until the user makes an explicit choice;
 * choices persist in localStorage. The icon is driven by the `resolved`
 * signal, which stays at its deterministic initial value through hydration
 * and only updates once the ThemeService initialises on the client.
 */
@Component({
  selector: 'app-theme-toggle',
  imports: [AppIcon],
  template: `
    <button
      type="button"
      (click)="toggle()"
      [attr.aria-label]="label()"
      [title]="label()"
      class="inline-flex size-9 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-surface hover:text-accent"
    >
      @if (resolved() === 'dark') {
        <app-icon name="sun" [size]="17" />
      } @else {
        <app-icon name="moon" [size]="17" />
      }
    </button>
  `,
})
export class ThemeToggle {
  private readonly language = inject(LanguageService);
  private readonly theme = inject(ThemeService);

  protected readonly i18n = this.language;
  protected readonly resolved = this.theme.resolved;

  protected readonly label = computed(() =>
    this.theme.resolved() === 'dark'
      ? this.language.read('accessibility.themeToLight')
      : this.language.read('accessibility.themeToDark'),
  );

  protected toggle(): void {
    this.theme.toggle();
  }
}
