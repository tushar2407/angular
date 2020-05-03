import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
/// Rednerer2 Is highly useful to adapt the eserver to platform on which the render is being done
@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el : ElementRef,
    private renderer: Renderer2) { }
    @HostListener('mouseenter') onmouseenter(){
      this.renderer.addClass(this.el.nativeElement,'highlight');
    }
    @HostListener('mouseleave') onmouseleave(){
      this.renderer.removeClass(this.el.nativeElement,'highlight');
    }
}
