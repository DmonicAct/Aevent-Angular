import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario, Persona, Role } from '../../models';
import {environment} from '../../../environments/environment';
import { BaseLoginProvider } from 'angular-6-social-login/entities/base-login-provider';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authiEndpoint: string;
  private config_name: string
  private config_password: string;
  private _usuario: Usuario;
  private _persona: Persona;
  private _token: string;

  constructor(private http: HttpClient,
              private toastr: ToastrService, ) { 
    this.authiEndpoint = environment.serviceAuthEndpoint;
    this.config_name = environment.APP_CONFIG_NAME;
    this.config_password = environment.APP_CONFIG_PASSWORD;
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get persona():Persona{
    if (this._persona != null) {
      return this._persona;
    } else if (this._persona == null && sessionStorage.getItem('persona') != null) {
      this._persona = JSON.parse(sessionStorage.getItem('persona')) as Persona;
      return this._persona;
    }
    return new Persona();
  }
  login(usuario: Usuario): Observable<any> {
    const urlEndpoint = this.authiEndpoint;

    const credenciales = btoa(this.config_name + ':' + this.config_password);

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders }).pipe(
      
      catchError(e => {
        switch(e.status){
           case 400:
              //this.toastr.warning('Usuario o clave incorrectas!', 'Aviso', {closeButton: true});
              console.error(e.error.mensaje);
              return throwError(e);
          case 401:
              this.toastr.warning('No se pudo ingresar, el usuario ' + usuario.username + ' ha sido deshabilitado, contactar con Administracion', 'Aviso', {closeButton: true});
              console.error(e.error.mensaje);
              return throwError(e);
          case 0:
              this.toastr.warning('No se pudo realizar conexión con el servidor, contactar con Administracion', 'Aviso', {closeButton: true});
              console.error(e.error.mensaje);
              return throwError(e);
        }
      }));;
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._persona = new Persona();
    this._persona.username = payload.user_name;
    this._persona.apmaterno =  payload.apmaterno_usuario;
    this._persona.appaterno = payload.appaterno_usuario;
    this._persona.nombre = payload.nombre_usuario; 

    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
    sessionStorage.setItem('persona', JSON.stringify(this._persona));
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }

  hasRole(role: Role): boolean {
    if (this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  logout(): void {
    this._token = null;
    this._usuario = null;
    this._persona = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
