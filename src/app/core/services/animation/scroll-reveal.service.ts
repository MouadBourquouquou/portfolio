import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService, type Gsap } from './animation.service';

export interface RevealRegisterOptions {
  /** Target DOM element(s) to reveal on scroll. */
  targets: gsap.DOMTarget;
  /** Vertical start position as fraction of the viewport height (0-1). */
  start?: number;
  /** Whether to settle into the final state or un-reveal on scroll up. */
  once?: boolean;
  /** Optional stagger in seconds when animating multiple targets. */
  stagger?: number;
}

/**
 * Scroll reveal infrastructure.
 *
 * Elements register with `register()` to be revealed as they enter the
 * viewport. The actual reveal is intentionally neutral (a fade + small
 * upward slide) until page-specific rendering decides otherwise.
 *
 * No elements are registered yet — this simply provides the plumbing that
 * feature pages will consume.
 */
@Injectable({ providedIn: 'root' })
export class ScrollRevealService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly ngZone = inject(NgZone);
  private readonly animation = inject(AnimationService);
  private scrollTrigger: (typeof import('gsap/ScrollTrigger'))['ScrollTrigger'] | null = null;

  /** True when the user prefers reduced motion. */
  private prefersReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /**
   * Registers one or more elements for scroll reveal.
   * SSR-safe no-op on the server.
   */
  register(options: RevealRegisterOptions): void {
    if (!this.isBrowser) {
      return;
    }
    if (this.prefersReducedMotion()) {
      return;
    }
    this.ngZone.runOutsideAngular(async () => {
      const gsap = (await this.animation.loadGsap())!;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (!this.scrollTrigger) {
        this.scrollTrigger = ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
      }
      this.createReveal(gsap, options);
    });
  }

  private createReveal(gsap: Gsap, options: RevealRegisterOptions): void {
    const { targets, start = 0.85, once = true, stagger = 0.08 } = options;
    const startPosition = `${Math.round(start * 100)}%`;

    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 24 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        stagger,
        scrollTrigger: {
          trigger: targets as gsap.DOMTarget,
          start: `top ${startPosition}`,
          once,
        } as never,
      },
    );
  }
}
