import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnimationService, type Gsap } from './animation.service';
import { TRANSITION } from '@shared/animations/transitions';

export type TransitionPhase = 'idle' | 'out' | 'in';

/**
 * Page transition architecture.
 *
 * Provides the hooks for a coordinated exit (out) and intro (in) phase around
 * route changes. Transitions are intentionally NOT wired to the router yet —
 * the app shell will coordinate `runExit`/`runIntro` with navigation events
 * once page-specific transition styling has been defined. All methods are
 * SSR-safe no-ops on the server.
 */
@Injectable({ providedIn: 'root' })
export class PageTransitionService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly animation = inject(AnimationService);

  private phase: TransitionPhase = 'idle';
  private exitDuration = TRANSITION.duration;

  /** Current transition phase, useful for styling aborted transitions. */
  get currentPhase(): TransitionPhase {
    return this.phase;
  }

  /** Runs the outgoing transition against the provided element. */
  async runExit(host?: HTMLElement): Promise<void> {
    if (!this.isBrowser || !host) {
      return;
    }
    this.phase = 'out';
    const gsap = await this.animation.loadGsap();
    if (!gsap) {
      return;
    }
    await this.defaultExit(gsap, host);
    this.phase = 'idle';
  }

  /** Runs the incoming transition against the provided element. */
  async runIntro(host?: HTMLElement): Promise<void> {
    if (!this.isBrowser || !host) {
      return;
    }
    this.phase = 'in';
    const gsap = await this.animation.loadGsap();
    if (!gsap) {
      return;
    }
    await this.defaultIntro(gsap, host);
    this.phase = 'idle';
  }

  private async defaultExit(gsap: Gsap, host: HTMLElement): Promise<void> {
    await gsap.to(host, {
      autoAlpha: 0,
      y: TRANSITION.exitOffset,
      duration: this.exitDuration / 1000,
      ease: TRANSITION.ease,
    });
  }

  private async defaultIntro(gsap: Gsap, host: HTMLElement): Promise<void> {
    await gsap.fromTo(
      host,
      { autoAlpha: 0, y: TRANSITION.enterOffset },
      {
        autoAlpha: 1,
        y: 0,
        duration: this.exitDuration / 1000,
        ease: TRANSITION.ease,
      },
    );
  }
}
