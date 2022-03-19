import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { getUrlEndpoint } from 'src/app/misc/misc';
import { Orden } from '../models/orden.model';

@Injectable({
  providedIn: 'root'
})

export class OrdenService {
  private urlEndpoint: string = getUrlEndpoint('ordenes');
  private httpHeader = new HttpHeaders({'Content-Type' : 'application/json'});
  constructor(private http: HttpClient) {
  }

   // HttpClient API get() method => Fetch employee
  getOrdenes(): Observable<Orden[]> {
    return this.http
    .get<Orden[]>(this.urlEndpoint)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  getOrden(idOrden: number): Observable<Orden>{
  return this.http.get<Orden>(this.urlEndpoint + "/" + idOrden)
  .pipe( map( (data: any) => {
    return data;
  } ));
  }

  putOrden(orden: Orden):Observable<Orden>{
    let body = JSON.stringify(orden);
    return this.http.put<Orden>(
        this.urlEndpoint+ "/" + orden.id,
        body,
        {headers: this.httpHeader }
    )
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  postOrden(orden: Orden):Observable<Orden>{
    let body = JSON.stringify(orden);
    return this.http.post<Orden>(this.urlEndpoint, body, {headers: this.httpHeader})
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

  deleteOrden(id: number):Observable<any>{
    return this.http.delete<any>(this.urlEndpoint+ "/" + id)
    .pipe( map( (data: any) => {
      return data;
    } ));
  }

}
