import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
    providedIn: 'root',
  })

export class UsuarioService{
    private apiEndpoint: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/usuarios';
  
    }

    obtenerUsuarios(pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint, {params}).pipe(
          catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          }));
    }
    obtenerUsuario(id:number):Observable<any>{
      const url = `${this.apiEndpoint}/${id}`;
      return this.http.get(url).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
    }

    eliminarUsuario(id:number):Observable<any>{
      let url = `${this.apiEndpoint}/${id}`;
      return this.http.delete(url).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));;
    }

}