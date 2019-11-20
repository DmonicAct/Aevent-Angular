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
    private apiEndpointPropuesta: string;
    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/postulacion';
        this.apiEndpointPropuesta = environment.serviceEndpoint + '/propuesta';
    }


    obtenerListaPropuesta(Username: string,pagina:number, registros:number):Observable<any>{
        let params:HttpParams = new HttpParams()
        .set('pagina', pagina.toString())
        .set('registros', registros.toString());
        let url=this.apiEndpoint + `/propuesta/${Username}`;
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

    obtenerPostulaciones(idPropuesta: Number):Observable<any>{
        let url=this.apiEndpoint+'/all'+ `/${idPropuesta}`;
        console.log(url);
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
    obtenerPropuesta(idPropuesta:number):Observable<any>{
        let url=this.apiEndpointPropuesta + `/${idPropuesta}`;
        console.log(url);
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
    obtenerPropuestaUsuarioEvento(username:string, idEvento:number):Observable<any>{
        let url=this.apiEndpointPropuesta + `/${username}/${idEvento}`;
        console.log(url);
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
    guardarPostulacion(postulacion: RespuestaPostulacion, username:string):Observable<any>{
        let url=this.apiEndpoint + `/${username}`;
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

    guardarPropuesta(propuesta: Propuesta, username:string, idEvento:number):Observable<any>{
        let url=this.apiEndpoint + `/propuesta/${username}/${idEvento}`;
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

    existePostulacion(username:string, idEvento:number):Observable<any>{
        let url=this.apiEndpoint + `/exists/${username}/${idEvento}`;
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
    existePropuesta(username:string,idEvento:number):Observable<any>{
        let url=this.apiEndpointPropuesta + `/exists/${username}/${idEvento}`;
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