import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(text: string): unknown {
    let ret: string = '';
    ret = text.slice(0,4) + '-' +  text.slice(4, 8);
    return ret;
  }

}
