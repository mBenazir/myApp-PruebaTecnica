import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMyRouterLink]'
})
export class MyRouterLinkDirective {

  constructor(private el: ElementRef) {
  }

  @Input("appMyRouterLink") link: string = '';

  @HostListener('mouseenter') mouseHover(){

    this.el.nativeElement.style.backgroundColor = "pink"
  }

  @HostListener('mouseenter') mouseNonHover(){
    this.redirecTo(this.link);
  }

  private redirecTo(url: string){
    window.location.href = url;
  }
}
