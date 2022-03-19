import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Orden } from 'src/app/models/orden.model';
import { AppService } from 'src/app/services/app.service';
import { ClienteService } from 'src/app/services/clientes.service';
import { OrdenService } from 'src/app/services/orden.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-orden-form',
  templateUrl: './orden-form.component.html',
  styleUrls: ['./orden-form.component.css']
})

export class OrdenFormComponent implements OnInit {

  //Sección de declaraciones
  orden:Orden = new Orden();
  clientes: any = [];
  productos: any = [];

  constructor(public _productoService: ProductoService, public _clienteService: ClienteService,private _ordenService:OrdenService, private _appService:AppService, private router: Router,
    private routes:ActivatedRoute) {
    this.routes.params.subscribe((params: any)=>{
      this.orden.id = params['id'] == 'nuevo' ? null : params['id'];
    })
   }

  ngOnInit(): void {
    if(this.orden.id){
      this.getOrden();
    }
    this.getClientes();
    this.getProductos();
  }

    //Obteniendo la información de los cliente
    getClientes(){
      const subscription = this._clienteService.getClientes().subscribe({
        next: (data: {}) =>
        {
          this.clientes = data;
        },
        error: (error)=> {
          this._appService.alert('danger', 'Error : ' + error, 'Error al obtener los datos!', 'fa-solid fa-triangle-exclamation');
        },
        complete: () =>{
          subscription.unsubscribe();
        }
      });
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


  save(form:NgForm){
    if(form.invalid){
      this._appService.alert('danger', 'Hay campos que requieren tu atención!', 'Error!', 'fa-solid fa-triangle-exclamation');
    }else{
      if(this.orden.id>0){
        this.updateOrden();
      }else{
        this.createOrden();
      }
    }
  }

  createOrden(){
    const subscription = this._ordenService.postOrden(this.orden)
    .subscribe(
      {
        next: (data)=> {
          this.orden = data as Orden;
        },
        error: (error)=> {
          this._appService.alert('danger', 'Error: '+error, 'Creación fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          this._appService.alert('info', 'Registro creado con éxito!', 'Información!', 'fa-solid fa-circle-info');
          subscription.unsubscribe();
        }
      });
  }

  updateOrden(){
    const subscription = this._ordenService.putOrden(this.orden)
    .subscribe(
      {
        next: (data)=> {
          this.orden = data as Orden;
        },
        error: (error)=> {
          this._appService.alert('danger', 'Error: '+error, 'Actualización fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          this._appService.alert('info', 'Registro actualizado con éxito!', 'Información!', 'fa-solid fa-circle-info');
          subscription.unsubscribe();
        }
      });
  }

  getOrden(){
    const subscription = this._ordenService.getOrden(this.orden.id)
    .subscribe(
      {
        next: (data)=> {
          this.orden = data as Orden;
        },
        error: (error)=> {
          this._appService.alert('danger', 'Error: '+error, 'Obtención de información fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          subscription.unsubscribe();
        }
      });
  }
}
