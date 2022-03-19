import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.model';
import { AppService } from 'src/app/services/app.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(public _productoService: ProductoService, private _appService:AppService) { }

  //Sección de declaraciones
  productos: any = [];
  producto:Producto = new Producto();
  index: number = null;
  hideParent: boolean = false;

  //Inicializando el componente
  ngOnInit(): void {
    this.getProductos()

  }
  //Obteniendo la información de los productos
  getProductos(){
    const subscription = this._productoService.getProductos().subscribe({
      next: (data: {}) =>
      {
        this.productos = data;
      },
      error: (error)=> {
        this._appService.alert('danger', 'Error : ' + error, 'Error al obtener los datos!', 'fa-solid fa-triangle-exclamation');
      },
      complete: () =>{
        subscription.unsubscribe();
      }
    });
  }

  //Método que permitirá eliminar un producto
  deleteProducto(){
    let _this = this;
    const subscription = this._productoService.deleteProducto(this.producto.id)
    .subscribe(
      {
        next: ()=> { },
        error: (error)=> {
          this._appService.alert('danger', 'Error: ' + error, 'Eliminación fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          delete this.productos[this.index];
          this._appService.alert('info', 'Registro eliminado con éxito!', 'Información!', 'fa-solid fa-circle-info');
          subscription.unsubscribe();
        }
      });
  }

  //Método que permitirá obtener el índice de un cliente en la tabla
  setProductInfo(producto: Producto, i:number){
    this.index = i;
    this.producto = producto;
  }

  //Método que permite limpiar el objeto en memoria para eliminar
  unsetProductInfo(){
    this.producto = new Producto();
  }

  showTable(){
    this.hideParent = true;
  }

  hideTable(){
    this.hideParent = false;
  }
}
