import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<ResolvedTheme, string> = {
  light: '#f7f5f2',
  dark: '#0a0a0a',
};

/**
 * Resolved-theme manager.
 *
 * The active `.dark` class is applied to <html> before first paint by the
 * bootstrap script in index.html; this service is the post-hydration source
 * of truth. It reads the stored/system preference, keeps `resolved` in sync
 * with OS changes, persists manual overrides, and never touches the DOM on
 * the server (SSR-safe).
 *
 * `init()` must run after hydration (see app.ts) so the initial signal value
 * is deterministic for both the server render and client hydration.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** The user's preference: system, or an explicit manual override. */
  readonly preference = signal<ThemePreference>('system');

  /** The theme currently on screen ('light' until initialized). */
  readonly resolved = signal<ResolvedTheme>('light');

  /** True once the browser-side theme state has been adopted. */
  private initialized = false;
  private media: MediaQueryList | null = null;

  /** Initializes browser-side state. Idempotent; safe to call once. */
  init(): void {
    if (!this.isBrowser || this.initialized) {
      return;
    }
    this.initialized = true;

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable — fall back to system */
    }
    this.preference.set(stored === 'light' || stored === 'dark' ? stored : 'system');

    this.media = window.matchMedia('(prefers-color-scheme: dark)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      /* no-op: theme application isn't animated anyway */
    }
    this.media.addEventListener('change', () => this.resolve());
    this.resolve();
  }

  /** Sets a stored preference and re-resolves the active theme. */
  setPreference(preference: ThemePreference): void {
    if (!this.isBrowser) {
      return;
    }
    this.preference.set(preference);
    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch {
      /* storage unavailable */
    }
    this.resolve();
  }

  /** Toggles between light and dark (dropping an implicit system state). */
  toggle(): void {
    this.setPreference(this.resolved() === 'dark' ? 'light' : 'dark');
  }

  private resolve(): void {
    if (this.preference() === 'system') {
      this.apply(this.media?.matches ? 'dark' : 'light');
    } else {
      this.apply(this.preference() === 'dark' ? 'dark' : 'light');
    }
  }

  private apply(theme: ResolvedTheme): void {
    this.resolved.set(theme);
    const root = this.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    this.document
      .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme]);
  }
}
