import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjListPipe} from './pipes/objlist.pipe';
import { NitPipe } from './pipes/nit.pipe';
import { PhonePipe } from './pipes/phone.pipe'



@NgModule({
  declarations: [
    ObjListPipe,
    NitPipe,
    PhonePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[ObjListPipe, NitPipe, PhonePipe]
})
export class PipesModule { }
