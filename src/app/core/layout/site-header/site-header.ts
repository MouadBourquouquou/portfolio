import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { PRIMARY_NAV } from '@core/constants/navigation';
import { SITE } from '@core/constants/site.constants';
import { LanguageService } from '@core/services/language/language.service';
import { LanguageToggle } from '@core/layout/language-toggle/language-toggle';
import { ThemeToggle } from '@core/layout/theme-toggle/theme-toggle';
import { AppIcon } from '@shared/ui/icon/icon';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, LanguageToggle, ThemeToggle, AppIcon],
  template: `
    <header
      class="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md transition-colors duration-300"
    >
      <div class="container-custom flex h-16 items-center justify-between gap-4">
        <a
          [routerLink]="['/']"
          [attr.aria-label]="i18n.read('accessibility.backToHomepage')"
          class="truncate font-heading text-lg font-semibold tracking-tight text-primary transition-colors hover:text-accent hover:opacity-100"
        >
          <span class="hidden sm:inline">{{ name }}</span>
          <span class="sm:hidden">{{ shortName }}</span>
        </a>

        <nav
          class="hidden items-center md:flex"
          [attr.aria-label]="i18n.read('accessibility.primaryNavigation')"
        >
          @for (link of nav; track link.route) {
            <a
              [routerLink]="[link.route]"
              routerLinkActive="link-active"
              [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
              class="nav-link px-3 py-2 text-sm font-medium text-primary transition-colors duration-200 hover:text-accent"
            >
              {{ i18n.read('nav.' + link.route.slice(1)) }}
            </a>
          }
        </nav>

        <div class="flex items-center gap-1.5">
          <app-language-toggle />
          <app-theme-toggle />

          <button
            type="button"
            class="inline-flex size-9 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-surface hover:text-accent md:hidden"
            [attr.aria-label]="
              menuOpen()
                ? i18n.read('accessibility.closeMenu')
                : i18n.read('accessibility.openMenu')
            "
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-navigation"
            (click)="toggleMenu()"
          >
            <app-icon [name]="menuOpen() ? 'x' : 'menu'" [size]="18" />
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav
          id="mobile-navigation"
          class="fade-in border-t border-border bg-background md:hidden"
          [attr.aria-label]="i18n.read('accessibility.mobileNavigation')"
        >
          <div class="container-custom flex flex-col py-2">
            @for (link of nav; track link.route) {
              <a
                [routerLink]="[link.route]"
                routerLinkActive="link-active"
                [routerLinkActiveOptions]="{ exact: link.exact ?? false }"
                class="nav-link border-b border-border/50 px-1 py-4 text-base font-medium text-primary transition-colors last:border-b-0 hover:text-accent"
                (click)="menuOpen.set(false)"
              >
                {{ i18n.read('nav.' + link.route.slice(1)) }}
              </a>
            }
          </div>
        </nav>
      }
    </header>
  `,
})
export class SiteHeader {
  private readonly language = inject(LanguageService);

  protected readonly i18n = this.language;

  protected readonly name = SITE.name;
  protected readonly shortName = SITE.shortName;
  protected readonly nav = PRIMARY_NAV;

  readonly menuOpen = signal(false);

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }
}
