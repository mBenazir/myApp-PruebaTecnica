import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objlist',
  pure: false
})
export class ObjListPipe implements PipeTransform {

  transform(value: any): any {
    let obj = [];
    for(let o in value){
      obj.push(o);
    }
    return obj;
  }

}
