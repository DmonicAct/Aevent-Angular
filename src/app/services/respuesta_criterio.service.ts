import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from "../models";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { RespuestaCriterio } from "../models/respuesta_criterio";

@Injectable({
    providedIn: 'root',
  })

  export class RespuestaCriterioService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/respuestaCriterio';
        this.config_name = environment.APP_CONFIG_NAME;
        this.config_password = environment.APP_CONFIG_PASSWORD;
    }

    obtenerRespuestaCriterio(idCriterio:number):Observable<any>{
        //const url = `${this.apiEndpoint}/${idEvaluador}`;    
        let url = this.apiEndpoint + `/${idCriterio}`;
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

    guardarRespuestaCriterio(respuesta:RespuestaCriterio){
      let url = this.apiEndpoint + `/guardar`;
      return this.http.post(url, respuesta).pipe(
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