import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {TipoEvento} from '../models/tipoevento';
@Injectable({
    providedIn: 'root',
  })

export class TipoEventoServices{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/tipoEvento';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
    }

    obtenerTipoEvento(pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint+'/paginacion',{params}).pipe(
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

    obtenerTipoEventos():Observable<any> {
      return this.http.get(this.apiEndpoint).pipe(
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

  guardarTipoEvento(tipoEvento: TipoEvento){
    let url = `${this.apiEndpoint + '/guardar'}`;

    return this.http.post(url, tipoEvento).pipe(
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

  eliminarCategoria(tipoEvento: TipoEvento){
   let url = `${this.apiEndpoint + '/eliminar'}`;
    return this.http.post(url, tipoEvento).pipe(
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

}