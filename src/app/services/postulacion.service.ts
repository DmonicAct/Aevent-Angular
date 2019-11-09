import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from '../models/categoria';
import { Postulacion } from '../models/postulacion';
import { RespuestaFormulario } from '../models/respuesta_formulario';
import { respuestaPostulacion } from '../models/respuesta_postulacion';
@Injectable({
    providedIn: 'root',
})

export class LugarService {
    private apiEndpoint: string;

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/postulacion';

    }
/* 
    obtenerPostulaciones(pagina:number, registros:number):Observable{
        
    }
    validarPostulacion():Observable{
        
    }
    guardarPostulacion(respuesta: RespuestaFormulario):Observable{
        let url 
        return this.http.post(url, {params}).pipe(
            catchError(e => {
                if (e.status == 400) {
                return throwError(e);
                }
                if (e.error.mensaje) {
                console.error(e.error.mensaje);
                }
                return throwError(e);
            }));
    } */
}