import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario } from "../models";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Preferencia } from "../models/preferencia";


@Injectable({
  providedIn: 'root',
})

export class PreferenciaService {
  private apiEndpoint: string;
  private config_name: string
  private config_password: string;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient) {
    this.apiEndpoint = environment.serviceEndpoint + '/preferencia';
    this.config_name = environment.APP_CONFIG_NAME;
    this.config_password = environment.APP_CONFIG_PASSWORD;

  }

  obtenerPreferencias(idUsuario: number, pagina: number, registros: number): Observable<any> {
    //const url = `${this.apiEndpoint}/${idUsuario}`;
    let params: HttpParams = new HttpParams()
      .set('idUsuario', idUsuario.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

    return this.http.get(this.apiEndpoint + '/propuestas', { params }).pipe(
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

  guardarPreferencia(preferencia: Preferencia): Observable<any> {
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

  eliminarPreferencia(id: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('id', id.toString())
    return this.http.get(this.apiEndpoint + `/delete/${id}`).pipe(
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

  consultarPreferenciasComite(idPropuesta: number, pagina: number, registros: number): Observable<any> {
    let params: HttpParams = new HttpParams()      
      .set('idPropuesta', idPropuesta.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());
    return this.http.get(this.apiEndpoint + '/propuesta', { params }).pipe(
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


  consultarByUsuarioAndPropuesta(idUsuario: number, idPropuesta: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('idUsuario', idUsuario.toString())
      .set('idPropuesta', idPropuesta.toString())
    return this.http.get(this.apiEndpoint + '/find', { params }).pipe(
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



  obtenerPreferenciasByNombreEvaluador(idEvento:number,idPropuesta:number,nombre:string ,pagina:number, registros:number):Observable<any> {
    let params:HttpParams = new HttpParams()
    .set('idEvento', idEvento.toString())
    .set('idPropuesta', idPropuesta.toString())
    .set('nombre', nombre)
    .set('pagina', pagina.toString())
    .set('registros', registros.toString());

    return this.http.get(this.apiEndpoint+'/filtroByNombre',{params}).pipe(
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

  obtenerPreferenciasByEmailEvaluador(idEvento:number,idPropuesta:number,email:string ,pagina:number, registros:number):Observable<any> {
    let params:HttpParams = new HttpParams()
    .set('idEvento', idEvento.toString())
    .set('idPropuesta', idPropuesta.toString())
    .set('email', email)
    .set('pagina', pagina.toString())
    .set('registros', registros.toString());

    return this.http.get(this.apiEndpoint+'/filtroByEmail',{params}).pipe(
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


  obtenerPreferenciasByUsernameEvaluador(idEvento:number,idPropuesta:number,username:string ,pagina:number, registros:number):Observable<any> {
    let params:HttpParams = new HttpParams()
    .set('idEvento', idEvento.toString())
    .set('idPropuesta', idPropuesta.toString())
    .set('username', username)
    .set('pagina', pagina.toString())
    .set('registros', registros.toString());

    return this.http.get(this.apiEndpoint+'/filtroByUsername',{params}).pipe(
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