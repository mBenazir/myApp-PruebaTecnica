import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from 'src/app/models/orden.model';
import { AppService } from 'src/app/services/app.service';
import { OrdenService } from 'src/app/services/orden.service';
@Component({
  selector: 'app-ordenes',
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent implements OnInit {

  constructor(public _ordenService: OrdenService, private _appService:AppService) { }

  //Sección de declaraciones
  ordenes: any = [];
  orden:Orden = new Orden();
  index: number = null;
  hideParent: boolean = false;

  //Inicializando el componente
  ngOnInit(): void {
    this.getOrdenes()

  }

  //Obteniendo la información de los orden
  getOrdenes(){
    const subscription = this._ordenService.getOrdenes().subscribe({
      next: (data: {}) =>
      {
        this.ordenes = data;
      },
      error: (error)=> {
        this._appService.alert('danger', 'Error : ' + error, 'Error al obtener los datos!', 'fa-solid fa-triangle-exclamation');
      },
      complete: () =>{
        subscription.unsubscribe();
      }
    });
  }

  //Método que permitirá eliminar un orden
  deleteOrden(){
    let _this = this;
    const subscription = this._ordenService.deleteOrden(this.orden.id)
    .subscribe(
      {
        next: ()=> {},
        error: (error)=> {
          this._appService.alert('danger', 'Error: ' + error, 'Eliminación fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          delete this.ordenes[this.index];
          this._appService.alert('info', 'Registro eliminado con éxito!', 'Información!', 'fa-solid fa-circle-info');
          subscription.unsubscribe();
        }
      });
  }
  //Método que permitirá obtener el índice de un orden en la tabla
  setOrdenInfo(orden: Orden, i:number){
    this.index = i;
    this.orden = orden;
  }
//Método que permite limpiar el objeto en memoria para eliminar
  unsetOrdenInfo(orden: Orden){
    this.orden = new Orden();
  }

  showTable(){
    this.hideParent = true;
  }

  hideTable(){
    this.hideParent = false;
  }
}
