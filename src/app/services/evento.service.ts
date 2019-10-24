import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento } from "../models";

@Injectable({
    providedIn: 'root',
  })

export class EventoService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/evento';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
  
    }
    
    guardarEvento(evento: Evento):Observable<any>{
        return this.http.post(this.apiEndpoint, evento).pipe(
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
    
    obtenerEventos(pagina:number, registros:number):Observable<any>{
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
    obtenerEventosByUsername(user:string, pagina:number, registros:number):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('username', user)
      /* .set('pagina', pagina.toString())
      .set('registros', registros.toString()) */;

        return this.http.get(this.apiEndpoint + '/eventos/' + user).pipe(
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
    obtenerEvento(idEvento:number):Observable<any>{
      const url = `${this.apiEndpoint}/${idEvento}`;
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
    eliminarEvento():Observable<any>{
        return null
    }
}