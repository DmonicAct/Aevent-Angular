import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable,throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { Persona } from '../models';


@Injectable({
    providedIn: 'root',
  })

export class UsuarioService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  
    constructor(public http: HttpClient) {
      this.apiEndpoint = environment.serviceEndpoint + '/usuarios';
      this.config_name = environment.APP_CONFIG_NAME;
      this.config_password = environment.APP_CONFIG_PASSWORD;
  
    }

    obtenerUsuarios(pagina:number, registros:number):Observable<any> {
      let params:HttpParams = new HttpParams()
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());

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
    obtenerUsuario(id:number):Observable<any>{
      const url = `${this.apiEndpoint}/${id}`;
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

    eliminarUsuario(id:number):Observable<any>{
      let url = `${this.apiEndpoint}/${id}`;
      return this.http.delete(url).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));;
    }

    autenticarUsuarioGoogle(usuario: Usuario):Observable<any>{
      let email = usuario.username;
      const credenciales = btoa(this.config_name + ':' + this.config_password);

      let url = `${this.apiEndpoint}/email/${email}`;
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      });
      return this.http.get(url).pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          if (e.error.mensaje) {
            console.error(e.error.mensaje);
          }
          return throwError(e);
        }));;
      
    }

    validarEmail(email: string):Observable<any> {
      const url = `${this.apiEndpoint}/email/${email}`;
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


    guardarUsuario(usuario:Persona){
      const credenciales = btoa(this.config_name + ':' + this.config_password);
      const httpHeaders = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + credenciales
      });

      return this.http.post(this.apiEndpoint, usuario,{ headers: httpHeaders }).pipe(
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