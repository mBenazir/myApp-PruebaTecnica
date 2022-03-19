import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHoverRow]'
})
export class HoverRowDirective {

  constructor(private el: ElementRef) {

  }

  @HostListener('mouseenter') mouseHover(){

    this.el.nativeElement.style.backgroundColor = "pink"
  }

  @HostListener('mouseleave') mouseNonHover(){

    this.el.nativeElement.style.backgroundColor = null
  }
}
