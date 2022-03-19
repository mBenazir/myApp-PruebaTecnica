import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { AppService } from 'src/app/services/app.service';
import { ClienteService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})

export class ClienteFormComponent implements OnInit {

  //Sección de declaraciones
  cliente:Cliente = new Cliente();


  constructor(private _clienteService:ClienteService, private _appService:AppService, private router: Router,
    private routes:ActivatedRoute) {
    this.routes.params.subscribe((params: any)=>{
      this.cliente.id = params['id'] == 'nuevo' ? null : params['id'];
    })
   }

  ngOnInit(): void {
    if(this.cliente.id){
      this.getCliente();
    }
  }

  save(form:NgForm){
    debugger
    if(form.invalid){
      this._appService.alert('danger', 'Hay campos que requieren tu atención!', 'Error!', 'fa-solid fa-triangle-exclamation');
    }else{
      if(this.cliente.id>0){
        this.updateCliente();
      }else{
        this.createCliente();
      }
    }
  }

  createCliente(){
    const subscription = this._clienteService.postCliente(this.cliente)
    .subscribe(
      {
        next: (data)=> {
          this.cliente = data as Cliente;
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

  updateCliente(){
    const subscription = this._clienteService.putCliente(this.cliente)
    .subscribe(
      {
        next: (data)=> {
          this.cliente = data as Cliente;
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

  getCliente(){
    const subscription = this._clienteService.getCliente(this.cliente.id)
    .subscribe(
      {
        next: (data)=> {
          this.cliente = data as Cliente;
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
