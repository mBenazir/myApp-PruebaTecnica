import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { getUrlEndpoint } from 'src/app/misc/misc';
import { Producto } from '../models/producto.model';
@Injectable({
  providedIn: 'root'
})

export class ProductoService {
  private urlEndpoint: string = getUrlEndpoint('productos');
  private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {
  }

   // HttpClient API get() method => Fetch employee
  getProductos(): Observable<Producto[]> {
    return this.http
    .get<Producto[]>(this.urlEndpoint)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  getProducto(idProducto: number): Observable<Producto>{
  return this.http.get<Producto>(this.urlEndpoint + "/" + idProducto)
  .pipe( map( (data: any) => {
    return data;
  } ));
  }

  putProducto(Producto: Producto):Observable<Producto>{
    let body = JSON.stringify(Producto);
    return this.http.put<Producto>(
        this.urlEndpoint+ "/" + Producto.id,
        body,
        {headers: this.httpHeader }
    )
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  postProducto(Producto: Producto):Observable<Producto>{
    let body = JSON.stringify(Producto);
    return this.http.post<Producto>(this.urlEndpoint, body, {headers: this.httpHeader})
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  deleteProducto(id: number):Observable<any>{
    return this.http.delete<any>(this.urlEndpoint+ "/" + id)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }
}
