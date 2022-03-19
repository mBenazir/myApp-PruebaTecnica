import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { getUrlEndpoint } from 'src/app/misc/misc';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})

export class ClienteService {
  private urlEndpoint: string = getUrlEndpoint('clientes');
  private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {
  }

   // HttpClient API get() method => Fetch employee
  getClientes(): Observable<Cliente[]> {
    return this.http
    .get<Cliente[]>(this.urlEndpoint)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  getCliente(idCliente: number): Observable<Cliente>{
  return this.http.get<Cliente>(this.urlEndpoint + "/" + idCliente)
  .pipe( map( (data: any) => {
    return data;
  } ));
  }

  putCliente(cliente: Cliente):Observable<Cliente>{
    let body = JSON.stringify(cliente);
    return this.http.put<Cliente>(
        this.urlEndpoint+ "/" + cliente.id,
        body,
        {headers: this.httpHeader }
    )
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  postCliente(cliente: Cliente):Observable<Cliente>{
    let body = JSON.stringify(cliente);
    return this.http.post<Cliente>(this.urlEndpoint, body, {headers: this.httpHeader})
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  deleteCliente(id: number):Observable<any>{
    return this.http.delete<any>(this.urlEndpoint+ "/" + id)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

}
