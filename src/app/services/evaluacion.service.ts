import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario} from "../models";
import { catchError } from "rxjs/operators";
import { throwError, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Evaluacion } from "../models/evaluacion";

@Injectable({
    providedIn: 'root',
  })

  export class EvaluacionService{
    private apiEndpoint: string;
    private config_name: string
    private config_password: string;

    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(public http: HttpClient) {
        this.apiEndpoint = environment.serviceEndpoint + '/evaluaciones';
        this.config_name = environment.APP_CONFIG_NAME;
        this.config_password = environment.APP_CONFIG_PASSWORD;
    }

    obtenerPropuestas(idEvaluador:number,pagina:number, registros:number):Observable<any>{
      let params:HttpParams = new HttpParams()
      .set('idUsuario', idEvaluador.toString())
      .set('pagina', pagina.toString())
      .set('registros', registros.toString());
        //const url = `${this.apiEndpoint}/${idEvaluador}`;     
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


    desasignarEvaluadorPropuesta(idEvaluacion:number):Observable<any>{
      console.log(idEvaluacion)
      let params:HttpParams = new HttpParams()
      .set('idEvaluacion', idEvaluacion.toString());

      let url= environment.serviceEndpoint + `/evaluacion/desasignar` + `/${idEvaluacion}`;
        //const url = `${this.apiEndpoint}/${idEvaluador}`;     
          return this.http.get(url).pipe(
            catchError(e => {
              if (e.status == 400) {
                return throwError(e);
              }
              if (e.status == 500) {
                console.log("CACHED ERROR! VALUES: ", idEvaluacion)
              }
              if (e.error.mensaje) {
                console.error(e.error.mensaje);
              }
              return throwError(e);
            }));

    }

    obtenerPropuesta(idEvaluacion:number):Observable<any>{
        //const url = `${this.apiEndpoint}/${idEvaluador}`;    
        let url = this.apiEndpoint + `/${idEvaluacion}`;
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

    guardarRespuestaCriterio(evaluacion:Evaluacion){
      let url = this.apiEndpoint + `/guardar`;
      return this.http.post(url, evaluacion).pipe(
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


    obtenerEvaluacionesPropuesta(idPropuesta: number){
      let params:HttpParams = new HttpParams()
      .set('idPropuesta', idPropuesta.toString());     
          return this.http.get(this.apiEndpoint + '/propuesta', {params}).pipe(
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