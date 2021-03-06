import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
  import {Categoria} from '../models/categoria';
import {Lugar} from '../models/lugar';
@Injectable({
    providedIn: 'root',
  })

export class LugarService{
    private apiEndpoint: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/lugar';
  
    }

    obtenerLugares():Observable<any> {
        return this.http.get(this.apiEndpoint + '/activas').pipe(
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

    obtenerLugarPaginado(pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint+'/activasPaginadas',{params}).pipe(
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

    obtenerTodosInactivos():Observable<any> {
      return this.http.get(this.apiEndpoint +'/inactivas').pipe(
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

  obtenerListaInactivos(pagina:number, registros:number):Observable<any> {
    let params:HttpParams = new HttpParams()
    .set('pagina', pagina.toString())
    .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/inactivasPaginadas',{params}).pipe(
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

    obtenerLugar():Observable<any> {
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

  guardarLugar(lugar: Lugar){
    let url = `${this.apiEndpoint + '/guardar'}`;

    return this.http.post(url, lugar).pipe(
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

  eliminarLugar(lugar: Lugar){
   let url = `${this.apiEndpoint + '/eliminar'}`;
    return this.http.post(url, lugar).pipe(
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

  obtenerFiltradoNombre(descripcion:string,enabled:boolean,pagina:number, registros:number):Observable<any> {
    let params:HttpParams = new HttpParams()
    .set('descripcion', descripcion)
    .set('enabled', enabled.toString())
    .set('pagina', pagina.toString())
    .set('registros', registros.toString());

    let url = `${this.apiEndpoint + '/filtroNombre'}`;

      return this.http.get(url, {params}).pipe(
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