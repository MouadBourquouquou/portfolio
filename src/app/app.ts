import { Component, afterNextRender, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteHeader } from '@core/layout/site-header/site-header';
import { SiteFooter } from '@core/layout/site-footer/site-footer';
import { LanguageService } from '@core/services/language/language.service';
import { ThemeService } from '@core/services/theme/theme.service';
import { BackgroundAtmosphere } from '@shared/components/background-atmosphere/background-atmosphere';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter, BackgroundAtmosphere],
  template: `
    <app-background-atmosphere />
    <a href="#content" class="skip-link">{{ i18n.read('accessibility.skipToContent') }}</a>
    <app-site-header />
    <main id="content" class="flex min-h-[calc(100svh-4rem)] flex-col">
      <router-outlet />
    </main>
    <app-site-footer />
  `,
})
export class App {
  private readonly language = inject(LanguageService);
  private readonly theme = inject(ThemeService);

  protected readonly i18n = this.language;

  constructor() {
    afterNextRender(() => {
      this.language.init();
      this.theme.init();
    });
  }
}
