import { afterNextRender, DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({ selector: '[appReveal]', standalone: true })
export class RevealDirective {
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
      const node = this.element.nativeElement;
      // Keep initially visible content visible; animate only sections below the fold.
      if (node.getBoundingClientRect().top < window.innerHeight) return;
      node.classList.add('reveal-pending');
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          node.classList.remove('reveal-pending');
          observer.disconnect();
        }
      }, { threshold: 0.08 });
      observer.observe(node);
      // Keyboard users must never focus an invisible section.
      const reveal = (): void => node.classList.remove('reveal-pending');
      node.addEventListener('focusin', reveal);
      this.destroyRef.onDestroy(() => {
        observer.disconnect();
        node.removeEventListener('focusin', reveal);
      });
    });
  }
}
