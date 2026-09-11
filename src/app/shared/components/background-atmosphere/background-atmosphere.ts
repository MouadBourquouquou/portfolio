import { Component } from '@angular/core';

/**
 * Background atmosphere.
 *
 * A single fixed, behind-content SVG layer (mounted once in the app shell) —
 * the "ideas moving through systems" backdrop. It draws three thin
 * trajectory curves at very low opacity, plus a few small points that drift
 * slowly along them. Pure markup + SMIL (no JavaScript loop, no canvas), so
 * it costs nothing at runtime and causes no layout shift.
 *
 * - pointer-events: none, aria-hidden
 * - adapts to light/dark through the `--atmo-*` tokens
 * - reduced motion: moving dots are hidden, static lines remain
 * - small screens: only one trajectory stays, the rest are removed
 */
@Component({
  selector: 'app-background-atmosphere',
  template: `
    <div class="atmo" aria-hidden="true">
      <svg class="atmo-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="atmo-glow-g" cx="30%" cy="10%" r="65%">
            <stop offset="0%" stop-opacity="1" class="atmo-glow-stop" />
            <stop offset="100%" stop-opacity="0" class="atmo-glow-stop" />
          </radialGradient>
        </defs>

        <circle cx="360" cy="120" r="640" fill="url(#atmo-glow-g)" />

        <path class="atmo-line" d="M -60 720 C 260 640 420 460 640 400" />
        <path class="atmo-line atmo-c" d="M 860 840 C 1060 720 1180 620 1440 560" />
        <path class="atmo-line atmo-c" d="M 760 160 C 980 200 1180 150 1460 250" />

        <circle class="atmo-dot atmo-dot-accent" r="1.8">
          <animateMotion
            path="M -60 720 C 260 640 420 460 640 400"
            dur="42s"
            begin="0s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0.9;0"
            keyTimes="0;0.08;0.9;1"
            dur="42s"
            repeatCount="indefinite"
          />
        </circle>
        <circle class="atmo-dot atmo-dot-soft" r="1.8">
          <animateMotion
            path="M -60 720 C 260 640 420 460 640 400"
            dur="42s"
            begin="21s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.7;0.7;0"
            keyTimes="0;0.08;0.9;1"
            dur="42s"
            repeatCount="indefinite"
          />
        </circle>

        <circle class="atmo-dot atmo-dot-accent atmo-c" r="1.8">
          <animateMotion
            path="M 860 840 C 1060 720 1180 620 1440 560"
            dur="55s"
            begin="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.8;0.8;0"
            keyTimes="0;0.1;0.88;1"
            dur="55s"
            repeatCount="indefinite"
          />
        </circle>
        <circle class="atmo-dot atmo-dot-soft atmo-c" r="1.8">
          <animateMotion
            path="M 760 160 C 980 200 1180 150 1460 250"
            dur="36s"
            begin="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.6;0.6;0"
            keyTimes="0;0.1;0.86;1"
            dur="36s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  `,
})
export class BackgroundAtmosphere {}
