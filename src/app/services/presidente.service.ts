import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Categoria } from '../models';

@Injectable({
  providedIn: 'root',
})

export class PresidenteService {
  private apiEndpoint: string;
  private config_name: string
  private config_password: string;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(public http: HttpClient) {
    this.apiEndpoint = environment.serviceEndpoint + '/presidente';
    this.config_name = environment.APP_CONFIG_NAME;
    this.config_password = environment.APP_CONFIG_PASSWORD;

  }

  obtenerPostulacionesEnEspera(idPresidente: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('idPresidente', idPresidente.toString());

    let url = `${this.apiEndpoint + '/revisiones'}`;

    return this.http.get(url, { params }).pipe(
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

  aprobar(idPostulacion: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('idPostulacion', idPostulacion.toString());

    let url = `${this.apiEndpoint + '/aprobar'}`;

    return this.http.post(url, { params }).pipe(
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

  desaprobar(idPostulacion: number): Observable<any> {
    let params: HttpParams = new HttpParams()
      .set('idPostulacion', idPostulacion.toString());

    let url = `${this.apiEndpoint + '/desaprobar'}`;

    return this.http.post(url, { params }).pipe(
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