import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Presentational button shell.
 *
 * Renders as an <a> for internal `route` or external `href` links; the
 * content slot is projected unconditionally so the label survives SSR.
 * When neither `route` nor `href` is given (style-guide demos) it degrades
 * to a non-navigating anchor with `role="button"` and stays keyboard
 * focusable. External links open in a new tab unless `external` is false
 * (used for in-page anchors and mailto links).
 */
@Component({
  selector: 'app-button',
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="route() ?? null"
      [href]="route() ? null : href()"
      [class]="classes()"
      [attr.aria-label]="ariaLabel()"
      [attr.target]="opensExternal() ? '_blank' : null"
      [attr.rel]="opensExternal() ? 'noopener noreferrer' : null"
      [attr.role]="noNavigation() ? 'button' : null"
      [attr.tabindex]="noNavigation() ? 0 : null"
      [attr.download]="download() ?? null"
    >
      <ng-content />
    </a>
  `,
})
export class Button {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly route = input<string | null>(null);
  readonly href = input<string | null>(null);
  readonly external = input(true);
  readonly ariaLabel = input<string | null>(null);
  /** Optional filename for the `download` attribute on external links. */
  readonly download = input<string | null>(null);

  protected readonly classes = computed(() => {
    const base =
      'group inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0';
    const size = this.sizeClasses()[this.size()];
    const variant = this.variantClasses()[this.variant()];
    return `${base} ${size} ${variant}`;
  });

  protected readonly opensExternal = computed(
    () => !this.route() && this.external() && Boolean(this.href()),
  );
  protected readonly noNavigation = computed(() => !this.route() && !this.href());

  private readonly sizeClasses = () =>
    ({
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    }) as const;
  private readonly variantClasses = () =>
    ({
      primary: 'bg-accent text-on-accent hover:bg-accent-hover active:bg-accent-hover',
      secondary:
        'border border-primary/20 bg-transparent text-primary hover:border-primary hover:bg-surface',
    }) as const;
}
