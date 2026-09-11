import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { gsap } from 'gsap';

export type Gsap = typeof gsap;

/**
 * Central access point for GSAP.
 *
 * GSAP is loaded lazily and only on the browser so that server-side
 * rendering never executes animation code. All animation features (scroll
 * reveal, page transitions) should go through this service.
 */
@Injectable({ providedIn: 'root' })
export class AnimationService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private gsapPromise: Promise<Gsap> | null = null;

  /** True when animations can run (browser only). */
  get enabled(): boolean {
    return this.isBrowser;
  }

  /**
   * Resolves to the GSAP module, or null on the server.
   * The module is fetched once and cached for the lifetime of the app.
   */
  loadGsap(): Promise<Gsap> | null {
    if (!this.isBrowser) {
      return null;
    }
    if (!this.gsapPromise) {
      this.gsapPromise = import('gsap').then((module) => module.default);
    }
    return this.gsapPromise;
  }
}
