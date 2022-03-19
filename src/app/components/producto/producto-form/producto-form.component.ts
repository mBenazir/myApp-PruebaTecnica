import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.model';
import { AppService } from 'src/app/services/app.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {


  //Sección de declaraciones
  producto:Producto = new Producto();


  constructor(private _productoService:ProductoService, private _appService:AppService, private router: Router,
    private routes:ActivatedRoute) {
    this.routes.params.subscribe((params: any)=>{
      this.producto.id = params['id'] == 'nuevo' ? null : params['id'];
    })
   }

  ngOnInit(): void {
    if(this.producto.id){
      this.getProducto();
    }
  }

  save(form:NgForm){
    if(form.invalid){
      this._appService.alert('danger', 'Hay campos que requieren tu atención!', 'Error!', 'fa-solid fa-triangle-exclamation');
    }else{
      if(this.producto.id>0){
        this.updateProducto();
      }else{
        this.createProducto();
      }
    }
  }

  createProducto(){
    const subscription = this._productoService.postProducto(this.producto)
    .subscribe(
      {
        next: (data)=> {
          this.producto = data as Producto;
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

  updateProducto(){
    const subscription = this._productoService.putProducto(this.producto)
    .subscribe(
      {
        next: (data)=> {
          this.producto = data as Producto;
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

  getProducto(){
    const subscription = this._productoService.getProducto(this.producto.id)
    .subscribe(
      {
        next: (data)=> {
          this.producto = data as Producto;
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
