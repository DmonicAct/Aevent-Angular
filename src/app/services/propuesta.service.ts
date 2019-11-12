import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { RespuestaPostulacion } from "../models/respuesta_postulacion";
import { Propuesta } from "../models/propuesta";


@Injectable({
    providedIn: 'root',
  })
export class PropuestaService{
    private apiEndpoint: string;

    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/postulacion';
    }


    obtenerListaPropuesta(idUsuario:number,pagina:number, registros:number):Observable<any>{
        let params:HttpParams = new HttpParams()
        .set('pagina', pagina.toString())
        .set('registros', registros.toString());
        let url=this.apiEndpoint + `/${idUsuario}`;
        return this.http.get(url,{params}).pipe(
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

    obtenerPostulacion(idPostulacion: number):Observable<any>{
        return null;
    }
    obtenerPropuesta(idPropuesta: number):Observable<any>{
        return null;
    }
    guardarPostulacion(postulacion: RespuestaPostulacion):Observable<any>{
        let url=this.apiEndpoint;
        return this.http.post(url,postulacion).pipe(
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

    guardarPropuesta(propuesta: Propuesta):Observable<any>{
        let url=this.apiEndpoint + `/postulacion`;
        return this.http.post(url,propuesta).pipe(
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

    existePostulacion(idUsuario:number, idEvento:number):Observable<any>{
        let url=this.apiEndpoint + `/exists/${idUsuario}/${idEvento}`;
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
}