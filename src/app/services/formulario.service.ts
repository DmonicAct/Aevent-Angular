import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Fase, Usuario, FormularioCFP,Pregunta,Seccion,Division,ListaFormulario } from "../models";

@Injectable({
    providedIn: 'root',
  })

export class FormularioService{
    private apiEndpoint: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/formulario';
  
    }
    elimiar(listPregunta:Array<number>,listSeccion:Array<number>,listDivision:Array<number>):Observable<any>{
      let listas = new ListaFormulario();
      listas.listaPregunta = listPregunta;
      listas.listaSeccion = listSeccion;
      listas.listaDivision = listDivision;
      let url =  this.apiEndpoint + `/eliminar`;
      return this.http.post(url,listas).pipe(
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