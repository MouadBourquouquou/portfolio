import { AfterViewInit, Directive, ElementRef, inject, input } from '@angular/core';
import { ScrollRevealService } from '@core/services/animation/scroll-reveal.service';

/**
 * Attribute directive that registers an element for scroll reveal.
 *
 * Usage:
 *   <div appScrollReveal>…</div>
 *   <div appScrollReveal [revealStart]="0.9" [revealOnce]="false">…</div>
 */
@Directive({
  selector: '[appScrollReveal]',
})
export class ScrollRevealDirective implements AfterViewInit {
  readonly revealStart = input<number>(0.85);
  readonly revealOnce = input<boolean>(true);

  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly reveal = inject(ScrollRevealService);

  ngAfterViewInit(): void {
    this.reveal.register({
      targets: this.element.nativeElement,
      start: this.revealStart(),
      once: this.revealOnce(),
    });
  }
}
