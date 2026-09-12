import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { LanguageService } from '@core/services/language/language.service';
import { CvService } from '@core/services/cv/cv.service';
import { AppIcon } from '@shared/ui/icon/icon';
import type { SupportedLanguage } from '@core/i18n';

export type CvDownloadVariant = 'hero' | 'contact' | 'footer';

interface CvOption {
  lang: SupportedLanguage;
  flag: string;
  labelKey: 'downloadCvEnglish' | 'downloadCvFrench';
  available: () => boolean;
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

const OPTIONS = [
  {
    lang: 'en' as const,
    flag: '🇬🇧',
    labelKey: 'downloadCvEnglish' as const,
  },
  {
    lang: 'fr' as const,
    flag: '🇫🇷',
    labelKey: 'downloadCvFrench' as const,
  },
];

/**
 * Download CV chooser.
 *
 * A single trigger that opens a small language menu (English/French CV).
 * Options are hidden when the corresponding file is missing on the server,
 * and the whole control disappears when neither CV is available. Follows the
 * WAI-ARIA menu-button pattern: Escape closes and returns focus, arrow
 * keys move between options, clicking outside or pressing Tab dismisses the
 * menu, and downloading runs through CvService as a same-origin blob save.
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
            'absolute left-0 z-10 flex min-w-44 flex-col gap-0.5 rounded-md border border-border bg-surface p-1 shadow-card fade-in ' +
            menuPosition()
          "
          (keydown)="onMenuKeydown($event)"
        >
          @for (option of options; track option.lang) {
            @if (option.available()) {
              <button
                #menuItem
                type="button"
                role="menuitem"
                class="flex w-full items-center gap-2.5 whitespace-nowrap rounded-sm px-3 py-2 text-left text-sm font-medium text-primary transition-colors hover:bg-background hover:text-accent focus-visible:bg-background focus-visible:text-accent"
                (click)="select(option.lang)"
              >
                <span class="text-base leading-none" aria-hidden="true">{{ option.flag }}</span>
                {{ i18n.read(option.labelKey) }}
              </button>
            }
          }
        </div>
      }
    }
  `,
})
export class CvDownload implements OnInit {
  private readonly cv = inject(CvService);
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);
  protected readonly i18n = inject(LanguageService);

  readonly variant = input<CvDownloadVariant>('hero');

  protected readonly open = signal(false);
  protected readonly visible = computed(() => this.cv.availableEn() || this.cv.availableFr());

  private readonly triggerRef = viewChild.required<ElementRef<HTMLButtonElement>>('trigger');
  protected readonly menuItems = viewChildren<ElementRef<HTMLButtonElement>>('menuItem');

  protected readonly options: CvOption[] = OPTIONS.map((option) => ({
    ...option,
    available:
      option.lang === 'en'
        ? () => this.cv.availableEn()
        : () => this.cv.availableFr(),
  }));

  protected readonly triggerClasses = computed(() => VARIANTS[this.variant()].trigger);
  protected readonly menuPosition = computed(() => VARIANTS[this.variant()].menu);
  protected readonly iconSize = computed(() => VARIANTS[this.variant()].iconSize);
  protected readonly chevronSize = computed(() => VARIANTS[this.variant()].chevronSize);
  protected readonly triggerLabel = computed(() => this.i18n.read('common.downloadCv'));

  ngOnInit(): void {
    this.cv.check();
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

  protected select(lang: SupportedLanguage): void {
    this.close();
    void this.cv.download(lang);
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