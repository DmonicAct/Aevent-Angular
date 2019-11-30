import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Evento, Persona,  Usuario, Fase } from "../models";
import { Evaluacion } from "../models/evaluacion";
import { HttpObserve } from "@angular/common/http/src/client";
import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import { Propuesta } from "../models/propuesta";

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

    guardarComite(evento: Evento):Observable<any>{
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

    guardarEvaluaciones(evaluacion: Evaluacion):Observable<any>{

      /*
      let params:HttpParams = new HttpParams()
      .set('idPropuesta', evaluacion.propuesta.idPropuesta.toString())
      .set('idUsuario', evaluaciones[i].evaluador.idUsuario.toString())
      .set('idFase', evaluaciones[i].fase.idFase.toString());*/
      let url=environment.serviceEndpoint + `/evaluacion`;
      let propuesta: Propuesta = evaluacion.propuesta;
      console.log(propuesta)
      let evaluador: Persona = <Persona>evaluacion.evaluador;
      console.log(evaluador)
      let fase: Fase = evaluacion.fase;
      console.log(fase)

      let params:HttpParams = new HttpParams()
        .set('idUsuario', evaluador.idUsuario.toString())
        .set('idPropuesta', propuesta.idPropuesta.toString())
        .set('idFase', fase.idFase.toString())   
      return this.http.post(url + '','', {params}).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));
      
      //console.log("EVALUACIONES SAVED");
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

    consultarEventoByOrganizador(user:string, pagina:number, registros:number):Observable<any>{
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

    consultarAllEventoByOrganizador(user:string):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('username', user);

        return this.http.get(this.apiEndpoint + '/consultarByOrganizador', {params}).pipe(
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

    consultarAllEventoByPresidente(user:string):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('username', user);

        return this.http.get(this.apiEndpoint + '/presidenteSinPaginacion', {params}).pipe(
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

    consultarEventoByPresidente(user:string, pagina:number, registros:number):Observable<any>{
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

    obtenerPropuestas(idEvento:number, pagina:number, registros:number):Observable<any>{
      //const url = `${this.apiEndpoint}/propuestas/${idEvento}`;
      //console.log("IN OBTENERPROPUESTAS:", idEvento)
      //console.log("IN OBTENERPROPUESTAS:", idEvento)
      //console.log("IN OBTENERPROPUESTAS:", idEvento)
      let params:HttpParams = new HttpParams()      
      .set('idEvento', idEvento.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint + `/propuestas`, {params}).pipe(
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
    obtenerPropuestasPorEvaluador(idEvaluador:number, pagina:number, registros:number):Observable<any>{
      //const url = `${this.apiEndpoint}/propuestas/${idEvento}`;
      let params:HttpParams = new HttpParams()
//      .set('id', idEvento.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());


      return this.http.get(this.apiEndpoint + `/evaluaciones/evaluador/${idEvaluador}`, {params}).pipe(
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

    consultarAllEventoEnabled(pagina:number, registros:number):Observable<any>{
      let url = this.apiEndpoint + '/all';
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());
      console.log(url);
        return this.http.get(url, {params}).pipe(
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

    obtenerEventosOrganizadorActivos(user: string, pagina:number, registros:number):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString())
      .set('username', user);
        return this.http.get(this.apiEndpoint + '/organizadorAndEnabled', {params}).pipe(
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

  obtenerEventosOrganizadorInactivos(user: string, pagina:number, registros:number):Observable<any>{
    let params:HttpParams = new HttpParams()
    .set('pagina', pagina.toString())
    .set('registros', registros.toString())
    .set('username', user);         
      return this.http.get(this.apiEndpoint + '/organizadorAndNotEnabled', {params}).pipe(
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
  setEstadoPorAprobacion(id:number){
    let url = this.apiEndpoint + `/permitir/${id}`;
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