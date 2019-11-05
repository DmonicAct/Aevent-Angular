import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Persona, Usuario } from "../models";

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

    obtenerEventosConvocatoria(pagina:number, registros:number):Observable<any>{
        let params:HttpParams = new HttpParams()
        .set('pagina', pagina.toString())
        .set('registros', registros.toString())        
          return this.http.get(this.apiEndpoint + '', {params}).pipe(
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


    obtenerEventos(usuario: Usuario, pagina:number, registros:number):Observable<any>{
      console.log(usuario);
        let params:HttpParams = new HttpParams()
        .set('pagina', pagina.toString())
        .set('registros', registros.toString())
        .set('username', usuario.username);
        
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

    consultarAllEventoByOrganizador(user:string, pagina:number, registros:number):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('username', user)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint + '/organizador', {params}).pipe(
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

    consultarAllEventoByPresidente(user:string, pagina:number, registros:number):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('username', user)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint + '/presidente', {params}).pipe(
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

    obtenerPropuestas(idEvento:number):Observable<any>{
      const url = `${this.apiEndpoint}/propuestas/${idEvento}`;
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

    consultarAllEventos(user: string, pagina:number, registros:number){
        let params:HttpParams = new HttpParams()
        .set('pagina', pagina.toString())
        .set('registros', registros.toString())
        .set('username', user);
        
          return this.http.get(environment.serviceEndpoint + '/eventos', {params}).pipe(
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