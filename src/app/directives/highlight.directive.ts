import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @HostBinding('style.transform') transform = '';
  @HostBinding('style.box-shadow') boxShadow = '';
  @HostBinding('style.transition') transition = 'transform 0.2s ease, box-shadow 0.2s ease';

  @HostListener('mouseenter') onMouseEnter(): void {
    this.transform = 'translateY(-6px)';
    this.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.2)';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.transform = '';
    this.boxShadow = '';
  }
}
