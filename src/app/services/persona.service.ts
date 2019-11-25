import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Persona } from '../models';


@Injectable({
    providedIn: 'root',
  })

export class PersonaService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/personas';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
  
    }

    obtenerPersonas():Observable<any> {

        return this.http.get(this.apiEndpoint).pipe(
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

    getComite(idEvento:number,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(`${environment.serviceEndpoint}/persona/comite/${idEvento}`,{params}).pipe(
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


    obtenerEvaluadoresDisponibles(idEvento:number,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(`${environment.serviceEndpoint}/persona/evaluadoresDisponibles/${idEvento}`,{params}).pipe(
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

    obtenerEvaluadoresByNombre(id:number,nombre:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('nombre', nombre)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/nombreLikePaginado',{params}).pipe(
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

    obtenerEvaluadoresByEmail(id:number,email:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('email', email)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/emailLikePaginado',{params}).pipe(
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


    obtenerEvaluadoresByUsername(id:number,username:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('username', username)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/usernameLikePaginado',{params}).pipe(
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