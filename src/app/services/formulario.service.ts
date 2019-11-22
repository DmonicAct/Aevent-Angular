import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Fase, Usuario, FormularioCFP } from "../models";

@Injectable({
    providedIn: 'root',
  })

export class FormularioService{
    private apiEndpoint: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/formulario';
  
    }

    eliminarPregunta(idPregunta:number){
      let url =  this.apiEndpoint + `/pregunta/${idPregunta}`;
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
    eliminarSeccion(idSeccion:number){
      let url =  this.apiEndpoint + `/seccion/${idSeccion}`;
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
    eliminarDivision(idSeccion){
      let url =  this.apiEndpoint + `/division/${idSeccion}`;
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
}