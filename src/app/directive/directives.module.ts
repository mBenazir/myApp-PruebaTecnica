import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverRowDirective } from './directives/hover-row.directive';
import { MyRouterLinkDirective } from './directives/my-router-link.directive';



@NgModule({
  declarations: [
    HoverRowDirective,
    MyRouterLinkDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HoverRowDirective,
    MyRouterLinkDirective
  ]
})
export class DirectivesModule { }
