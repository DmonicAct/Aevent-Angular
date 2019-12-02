import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento, Paginacion, Usuario, Postulacion, Fase, RespuestaFormulario } from '../../../../models'
import { AuthService as AeventAuthService } from '../../../../auth/service/auth.service'
import { EventoService, RespuestaCriterioService } from '../../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../../models';
import { Propuesta } from "src/app/models/propuesta";
import { Evaluacion } from "src/app/models/evaluacion";
import { EvaluacionService } from "src/app/services/evaluacion.service";
import { FaseService } from "src/app/services/fase.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { PropuestaService } from "src/app/services/propuesta.service";
import { PresidenteService } from "src/app/services/presidente.service";
import { RespuestaPostulacion } from "src/app/models/respuesta_postulacion";
import { RespuestaCriterio } from "src/app/models/respuesta_criterio";

@Component({
    selector: 'detalleEvaluacion',
    templateUrl: 'detalle.template.html',
    styleUrls: ['detalle.template.scss']
})

export class DetalleEvaluacionFinal implements OnInit {
    public usr: Usuario;
    public propuesta: Propuesta;
    public postulacion: Postulacion;
    public evaluaciones: Array<Evaluacion>
    public fasesFiltro: Array<Fase>
    public fase: Fase
    public respuestaFormulario: Array<RespuestaFormulario>;
    public respuestaCriterio : Array<RespuestaCriterio>
    private listaRespuestaPostulacion: Array<RespuestaPostulacion>;
    public verEvaluacion : Boolean;
    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private usrService: UsuarioService,
        private router: Router,
        private serviceFase: FaseService,
        private servicePropuesta: PropuestaService,
        private serviceEvaluacion: EvaluacionService,
        private servicePresidente: PresidenteService,
        private serviceRespuestaCriterio: RespuestaCriterioService) {
        this.propuesta = new Propuesta();
        this.postulacion = new Postulacion();
        this.usr = new Usuario();
        this.seleccionado = false;
        this.seleccionadoDetalle = false;
        this.fasesFiltro = [];
        this.items = [];
        this.respuestaFormulario = new Array<RespuestaFormulario>();
        this.respuestaCriterio = new Array<RespuestaCriterio>();
        this.verFormulario = false;         
        this.verEvaluacion = false;   
    }
    ngOnInit() {
        var url = window.location.href;
        var res = url.split("/");
        var id = parseInt(res[res.length - 1]);

        this.servicePropuesta.obtenerPropuesta(id).subscribe(
            (response: Response) => {
                this.propuesta = response.resultado;
                this.servicePropuesta.obtenerPostulaciones(id).subscribe(
                    (response: Response) => {
                        //console.log("Response: ", response.resultado);
                        this.postulacion = response.resultado[0].postulacion;
                        this.serviceEvaluacion.obtenerEvaluacionesPropuesta(id).subscribe(
                            (response: Response) => {
                                this.evaluaciones = response.resultado;
                                this.fase = this.sacarFase(this.evaluaciones,this.postulacion.idFase);
                                this.servicePropuesta.obtenerPostulaciones(this.propuesta.idPropuesta).subscribe(
                                    (response: Response) => {
                                        this.listaRespuestaPostulacion = response.resultado[0].listaFormulario;
                                    }
                                );
                                this.cambioFase();
                            }
                        );
                    }
                );

            }
        );
    }

    sacarFase(lista: Array<Evaluacion>, idFase:number){
        
        let faseAux : Fase;
        faseAux = new Fase;
        lista.forEach(element => {
            if (element.fase.idFase == idFase){
                faseAux =  element.fase;
            }
        });
        return faseAux;
    }

    groupBy(collection, property) {
        var i = 0, val, index,
            values = [], result = [];
        for (; i < collection.length; i++) {
            val = collection[i][property].descripcion;
            index = values.indexOf(val);
            if (index > -1){
                result[index].push(collection[i]);
                
            }
            else {
                this.fasesFiltro.push(collection[i][property]);
                values.push(val);
                result.push([collection[i]]);
            }
        }
        return result;
    }
    
    public lista = [];
    public items = [];
    public seleccionado: Boolean;
    public seleccionadoDetalle: Boolean;
    public evaluacionSeleccionada: Evaluacion;
    public evaGeneral: string;
    public confianza: string;

    cambioFase(){
        this.seleccionado = true;
        this.items = this.evaluaciones.filter(
            item => item.fase.descripcion.toLowerCase().indexOf(this.fase.descripcion.toLowerCase()) > -1
        )    
    }

    OnSeleccionado(item: Evaluacion){
        this.evaluacionSeleccionada = item;
        this.seleccionadoDetalle = true;
        this.confianza = item.nivelConfianza;
        this.evaGeneral = item.evaluacionGeneral;

        this.evaluacionSeleccionada.fase.criterios.forEach((e) => {
            this.serviceRespuestaCriterio.obtenerRespuestaCriterio(e.idCriterio).subscribe(
                (response: Response) => {
                    if (response.estado == "OK") {
                        if (response.resultado[0] != null) {
                            this.respuestaCriterio.push(response.resultado[0]);
                        }
                    }
                }
            );
        });
    }

    OnAprobar(){
        //SE HA CAMBIADO EL SERVICIO Y YA NO VIENE ASÍ, HABLAR CON ALVARO DE COMO VIENE AHORA
        this.servicePresidente.aprobar(this.postulacion.idPostulacion).subscribe(
            (response: Response) => {
                console.log(response);
                this.toastr.success(`Se ha APROBADO con éxito`, 'Aviso', { closeButton: true });
            }
        );
            // para probar a hardcodeo que funciona el aprobar
        /* var aux = 3;
        this.servicePresidente.aprobar(aux).subscribe(
            (response: Response) => {
                console.log(response);
                this.toastr.success(`Se ha APROBADO con éxito`, 'Aviso', { closeButton: true });
            }
        ); */
    }

    OnDesaprobar(){
        //SE HA CAMBIADO EL SERVICIO Y YA NO VIENE ASÍ, HABLAR CON ALVARO DE COMO VIENE AHORA
        this.servicePresidente.desaprobar(this.postulacion.idPostulacion).subscribe(
            (response: Response) => {
                console.log(response);
                this.toastr.success(`Se ha DESAPROBADO con éxito`, 'Aviso', { closeButton: true });
            }
        );
        // para probar a hardcodeo que funciona el desaprobar
        /* var aux = 3;
        this.servicePresidente.desaprobar(aux).subscribe(
            (response: Response) => {
                console.log(response);
                this.toastr.success(`Se ha DESAPROBADO con éxito`, 'Aviso', { closeButton: true });
            }
        ); */
    }

    public verFormulario: Boolean;

    VerFormulario(){
        this.verFormulario = !this.verFormulario;
    }

    VerDetalle(){
        this.verEvaluacion = !this.verEvaluacion;
    }
}