import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Fase, Criterio } from "../models";

@Injectable({
    providedIn: 'root',
  })

export class CriterioService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/criterio';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
  
    }
    
    guardarCriterio(criterio: Criterio):Observable<any>{
      
        return this.http.post(this.apiEndpoint, criterio).pipe(
          
          catchError(e => {
            if (e.status == 400) {
              return throwError(e);
            }
            if (e.error.mensaje) {
              console.error(e.error.mensaje);
            }
            return throwError(e);
          })
          );
    }

    obtenerCriterios(fase: Fase):Observable<any>{
        let params:HttpParams = new HttpParams()
        .set('idFase', fase.idFase.toString());
        
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

    eliminarCriterio(criterio:Criterio){
      let url = this.apiEndpoint + `/eliminar/${criterio.idCriterio}`;
      
        console.log(url);
        return this.http.delete(url).pipe(
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
/*
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
*/
}