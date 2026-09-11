/**
 * Shared animation tokens shared by the animation services.
 * Mirrors the motion tokens declared in src/styles.css.
 */
export const TRANSITION = {
  duration: 450,
  ease: 'expo.out',
  enterOffset: 16,
  exitOffset: -16,
} as const;

export const REVEAL = {
  duration: 0.85,
  ease: 'power2.out',
  y: 24,
  stagger: 0.08,
} as const;
