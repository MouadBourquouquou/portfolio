import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { CvService } from '@core/services/cv/cv.service';
import { SITE } from '@core/constants/site.constants';
import { AppIcon } from '@shared/ui/icon/icon';
import type { SupportedLanguage } from '@core/i18n';

export type CvDownloadVariant = 'hero' | 'contact' | 'footer';

interface CvOption {
  lang: SupportedLanguage;
  flag: string;
  labelKey: 'downloadCvEnglish' | 'downloadCvFrench';
  url: string;
}

const VARIANTS = {
  hero: {
    trigger:
      'group inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/20 bg-transparent px-8 py-4 font-body text-base font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-surface focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0',
    menu: 'top-full mt-3',
    iconSize: 17,
    chevronSize: 14,
  },
  contact: {
    trigger:
      'group inline-flex items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-accent focus-visible:text-accent disabled:opacity-50',
    menu: 'top-full mt-3',
    iconSize: 17,
    chevronSize: 14,
  },
  footer: {
    trigger:
      'group inline-flex items-center gap-2 text-xs text-secondary transition-colors hover:text-accent focus-visible:text-accent disabled:opacity-50',
    menu: 'bottom-full mb-3',
    iconSize: 16,
    chevronSize: 14,
  },
} as const;

const OPTIONS: CvOption[] = [
  {
    lang: 'en',
    flag: '🇬🇧',
    labelKey: 'downloadCvEnglish',
    url: SITE.cv.en,
  },
  {
    lang: 'fr',
    flag: '🇫🇷',
    labelKey: 'downloadCvFrench',
    url: SITE.cv.fr,
  },
];

/**
 * Download CV chooser.
 *
 * A single trigger that opens a premium popover offering the English or
 * French CV. Each option is a real same-origin `<a>` with a `download`
 * attribute, so clicking downloads the PDF natively — no blob round-trip,
 * works on every device and survives SSR/hydration untouched. The control
 * is only hidden when no CV path is configured. Follows the WAI-ARIA
 * menu-button pattern: Escape closes and returns focus, arrow keys move
 * between options, and clicking outside or pressing Tab dismisses the menu.
 */
@Component({
  selector: 'app-cv-download',
  imports: [AppIcon],
  styles: [':host { display: inline-flex; position: relative; }'],
  template: `
    @if (visible()) {
      <button
        #trigger
        type="button"
        [class]="triggerClasses()"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        [attr.aria-label]="triggerLabel()"
        (click)="toggle()"
        (keydown)="onTriggerKeydown($event)"
      >
        <app-icon [name]="'download'" [size]="iconSize()" />
        {{ triggerLabel() }}
        <app-icon
          [name]="'chevron-down'"
          [size]="chevronSize()"
          class="transition-transform duration-200"
          [class.rotate-180]="open()"
        />
      </button>

      @if (open()) {
        <div
          role="menu"
          [attr.aria-label]="triggerLabel()"
          [class]="
            'cv-popover absolute left-0 z-20 flex w-56 flex-col gap-1 rounded-2xl border border-border bg-surface p-2 shadow-card ' +
            menuPosition()
          "
          (keydown)="onMenuKeydown($event)"
        >
          @for (option of options; track option.lang) {
            @if (option.url) {
              <a
                #menuItem
                role="menuitem"
                tabindex="-1"
                [href]="option.url"
                [download]="cvFileName(option.lang)"
                (click)="open.set(false)"
                class="group/item flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-background focus-visible:bg-background"
              >
                <span
                  class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background text-lg leading-none"
                  aria-hidden="true"
                >
                  {{ option.flag }}
                </span>
                <span class="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span
                    class="truncate text-sm font-semibold text-primary transition-colors group-hover/item:text-accent"
                  >
                    {{ i18n.read(option.labelKey) }}
                  </span>
                  <span class="text-xs text-secondary">PDF</span>
                </span>
                <app-icon
                  name="download"
                  [size]="15"
                  class="shrink-0 text-secondary transition-colors group-hover/item:text-accent"
                />
              </a>
            }
          }
        </div>
      }
    }
  `,
})
export class CvDownload {
  private readonly cv = inject(CvService);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly i18n = inject(LanguageService);

  readonly variant = input<CvDownloadVariant>('hero');

  protected readonly open = signal(false);
  protected readonly visible = computed(() => this.cv.enabled.en || this.cv.enabled.fr);

  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  protected readonly menuItems = viewChildren<ElementRef<HTMLAnchorElement>>('menuItem');

  protected readonly options = OPTIONS;

  protected readonly triggerClasses = computed(() => VARIANTS[this.variant()].trigger);
  protected readonly menuPosition = computed(() => VARIANTS[this.variant()].menu);
  protected readonly iconSize = computed(() => VARIANTS[this.variant()].iconSize);
  protected readonly chevronSize = computed(() => VARIANTS[this.variant()].chevronSize);
  protected readonly triggerLabel = computed(() => this.i18n.read('common.downloadCv'));

  protected cvFileName(lang: SupportedLanguage): string {
    return this.cv.cvFileName(lang);
  }

  protected toggle(): void {
    if (this.open()) {
      this.close();
      return;
    }
    this.open.set(true);
    setTimeout(() => this.focusItem(0), 0);
  }

  protected close(): void {
    this.open.set(false);
    this.triggerRef().nativeElement.focus();
  }

  protected onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key !== 'ArrowDown') {
      return;
    }
    event.preventDefault();
    if (!this.open()) {
      this.open.set(true);
      setTimeout(() => this.focusItem(0), 0);
    } else {
      this.focusItem(0);
    }
  }

  protected onMenuKeydown(event: KeyboardEvent): void {
    const items = this.menuItems();
    if (items.length === 0) {
      return;
    }
    const active = this.hostRef.nativeElement.ownerDocument.activeElement;
    const current = items.findIndex((ref) => ref.nativeElement === active);
    let next: number;

    switch (event.key) {
      case 'ArrowDown':
        next = current < 0 ? 0 : (current + 1) % items.length;
        break;
      case 'ArrowUp':
        next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = items.length - 1;
        break;
      case 'Space':
      case 'Enter':
        return;
      default:
        return;
    }
    event.preventDefault();
    this.focusItem(next);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: MouseEvent): void {
    if (this.open() && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:focusin', ['$event'])
  protected onDocumentFocusIn(event: FocusEvent): void {
    if (this.open() && !this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.open()) {
      this.close();
    }
  }

  private focusItem(index: number): void {
    const items = this.menuItems();
    if (items.length === 0) {
      return;
    }
    items[Math.min(Math.max(index, 0), items.length - 1)].nativeElement.focus();
  }
}
