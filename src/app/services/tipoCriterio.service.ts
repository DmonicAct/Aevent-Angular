import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import {TipoCriterio} from '../models/tipocriterio';
@Injectable({
    providedIn: 'root',
  })

export class TipoCriterioService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/tipocriterios';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
    }

    obtenerTipoCriterio(pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(environment.serviceEndpoint+'/tipoCriterio/activasPaginadas',{params}).pipe(
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

    obtenerTipoCriterios():Observable<any> {
      return this.http.get(environment.serviceEndpoint + '/tipoCriterio/activas').pipe(
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
      return this.http.get(environment.serviceEndpoint+'/tipoCriterio/inactivasPaginadas',{params}).pipe(
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
    return this.http.get(environment.serviceEndpoint + '/tipoCriterio/inactivas').pipe(
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

  guardarTipoCriterio(tipoCriterio: TipoCriterio){
    //let url = `${this.apiEndpoint + '/guardar'}`;

    return this.http.post(this.apiEndpoint, tipoCriterio).pipe(
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