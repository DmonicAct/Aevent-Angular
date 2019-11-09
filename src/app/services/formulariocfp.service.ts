import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Fase, Usuario, FormularioCFP } from "../models";

@Injectable({
    providedIn: 'root',
  })

export class FormularioCFPService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/formularioCFP';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
  
    }
    
    guardarFormulario(formulario: FormularioCFP):Observable<any>{
        return this.http.post(this.apiEndpoint, formulario).pipe(
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