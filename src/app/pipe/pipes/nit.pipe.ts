import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nit'
})
export class NitPipe implements PipeTransform {

  transform(text: any): any {
    let ret: string = '';
    ret = text.slice(0,4) + '-' +  text.slice(4, 10) + '-' +  text.slice(10, 13) + '-' +  text.slice(13, 14);
    return ret;
  }

}
