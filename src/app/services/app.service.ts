import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppService {

  alert(type: string, message: string, title: string, iconClass: string) {
  let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  let wrapper = document.createElement('div')
  alertPlaceholder?.append(wrapper)
  wrapper.innerHTML = '<div id="alertMessage" class="alert alert-' + type  + ' alert-dismissible  fadeIn fast show" role="alert">'+
  '<span class="bi flex-shrink-0 me-2"><i class="'+ iconClass + '"></i></span>'
  + '<strong>'+title+' </strong>'
   + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

   setTimeout(function(){
    let alertPlaceholder = document.getElementById('alertMessage')
    alertPlaceholder?.remove();
 }, 5000);//wait 2 seconds
}

}

export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
}
