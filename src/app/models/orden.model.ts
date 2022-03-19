import { formatDate } from "../services/app.service";

export class Orden{

    constructor(){
      this.id=null;
      this.idProducto=null;
      this.idCliente=null;
      this.cantidad=null;
      this.fecha = new Date().getDate().toString() + '/' +  (new Date().getMonth()+1).toString() + '/' + new Date().getFullYear().toString();
    }

    id:number=-1;
    idProducto:number=-1;
    idCliente:number=-1;
    cantidad:number=-1;
    fecha:string = ''
}
