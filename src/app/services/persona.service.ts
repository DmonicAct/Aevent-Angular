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

      return this.http.get(`${environment.serviceEndpoint}/personas/comite/${idEvento}`,{params}).pipe(
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
    obtenerEvaluadoresComiteByNombre(id:number,nombre:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('nombre', nombre)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/nombreComiteLikePaginado',{params}).pipe(
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

    obtenerEvaluadoresComiteByEmail(id:number,email:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('email', email)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/emailComiteLikePaginado',{params}).pipe(
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


    obtenerEvaluadoresComiteByUsername(id:number,username:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('username', username)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/usernameComiteLikePaginado',{params}).pipe(
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








    obtenerEvaluadoresAsignadosAPropuestaByNombre(id:number,nombre:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('nombre', nombre)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/nombreEvaluadoresAsignadosLikePaginado',{params}).pipe(
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

    obtenerEvaluadoresAsignadosAPropuestaByEmail(id:number,email:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('email', email)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/emailEvaluadoresAsignadosLikePaginado',{params}).pipe(
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


    obtenerEvaluadoresAsignadosAPropuestaByUsername(id:number,username:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('username', username)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/usernameEvaluadoresAsignadosLikePaginado',{params}).pipe(
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

    obtenerEvaluadoresDisponiblesAPropuestaByNombre(id:number,nombre:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('nombre', nombre)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/nombreEvaluadoresDisponiblesLikePaginado',{params}).pipe(
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

    obtenerEvaluadoreDisponiblesAPropuestasByEmail(id:number,email:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('email', email)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/emailEvaluadoresDisponiblesLikePaginado',{params}).pipe(
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


    obtenerEvaluadoresDisponiblesAPropuestaByUsername(id:number,username:string ,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('id', id.toString())
      .set('username', username)
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

      return this.http.get(this.apiEndpoint+'/usernameEvaluadoresDisponiblesLikePaginado',{params}).pipe(
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

    obtenerFiltroNombre(nombre:String,enabled:boolean,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('nombre', nombre.toString())
      .set('enabled', enabled.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint + '/filtroNombre', {params}).pipe(
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

    obtenerFiltroEmail(email:String,enabled:boolean,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('email', email.toString())
      .set('enabled', enabled.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint+ '/filtroEmail', {params}).pipe(
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

    obtenerFiltroUsername(username:String,enabled:boolean,pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('username', username.toString())
      .set('enabled', enabled.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

        return this.http.get(this.apiEndpoint+'/filtroUsername', {params}).pipe(
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