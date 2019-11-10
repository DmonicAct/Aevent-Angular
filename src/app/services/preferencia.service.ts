import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from "../models";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Preferencia } from "../models/Preferencia";


@Injectable({
    providedIn: 'root',
  })

export class PreferenciaService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/preferencia';
        this.config_name = environment.APP_CONFIG_NAME;
        this.config_password = environment.APP_CONFIG_PASSWORD;
    
      }

    obtenerPreferencias(idUsuario:number,pagina:number,registros:number):Observable<any>{
        //const url = `${this.apiEndpoint}/${idUsuario}`;
        let params:HttpParams = new HttpParams()
        .set('idUsuario', idUsuario.toString())
        .set('pagina', pagina.toString())
        .set('registros', registros.toString());
          
          return this.http.get(this.apiEndpoint + '/propuestas', {params}).pipe(
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

    guardarPreferencia(preferencia:Preferencia):Observable<any>{
      return this.http.post(this.apiEndpoint, preferencia).pipe(
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