import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.model';
import { AppService } from 'src/app/services/app.service';
import { ClienteService } from 'src/app/services/clientes.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  constructor(public _clienteService: ClienteService, private _appService:AppService) { }

  //Sección de declaraciones
  clientes: any = [];
  cliente:Cliente = new Cliente();
  index: number = null;
  hideParent: boolean = false;

  //Inicializando el componente
  ngOnInit(): void {
    this.getClientes()

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

  //Método que permitirá eliminar un cliente
  deleteCliente(){
    let _this = this;
    const subscription = this._clienteService.deleteCliente(this.cliente.id)
    .subscribe(
      {
        next: ()=> {},
        error: (error)=> {
          this._appService.alert('danger', 'Error: ' + error, 'Eliminación fallida!', 'fa-solid fa-triangle-exclamation');
        },
        complete: ()=> {
          delete this.clientes[this.index];
          this._appService.alert('info', 'Registro eliminado con éxito!', 'Información!', 'fa-solid fa-circle-info');
          subscription.unsubscribe();
        }
      });
  }
  //Método que permitirá obtener el índice de un cliente en la tabla
  setClientInfo(cliente: Cliente, i:number){
    this.index = i;
    this.cliente = cliente;
  }
//Método que permite limpiar el objeto en memoria para eliminar
  unsetClientInfo(cliente: Cliente){
    this.cliente = new Cliente();
  }

  showTable(){
    this.hideParent = true;
  }

  hideTable(){
    this.hideParent = false;
  }
}
