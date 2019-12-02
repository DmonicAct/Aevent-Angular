import { OnInit, Component, ViewChild, QueryList, ViewChildren } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Location } from '@angular/common';
import { Propuesta } from "../../../models/propuesta";
import { Postulacion, Evento, Fase, RespuestaFormulario } from "../../../models";
import { PropuestaService } from "../../../services/propuesta.service";
import { EventoService } from "../../../services";
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { DetallePropuestaComponent } from "../../evaluarPostulacion/evaluacion/editar/tabset-parts/detalle-propuesta/detalle-propuesta.component";
import { EdicionPropuestaComponent } from "./detalle-propuesta/detalle-propuesta.component";
import { TabsetComponent } from 'ngx-bootstrap';
import { RespuestaPostulacion } from "src/app/models/respuesta_postulacion";
import { FasePropuestaComponent } from "./fase-propuesta/fase-propuesta.component";
@Component({
    selector: 'edicion-ponencia',
    templateUrl: 'edicionPonencia.template.html',
    styleUrls: ['edicionPonencia.template.scss']
})
export class EdicionPonenciaComponent implements OnInit {
    private sub: any;
    private codigo: number;
    private codigo_propuesta: number;
    /**
     * 
     * Path:
     *  0: Nuevo
     *  1: Edicion
     */
    private path: number;
    private estadoPropuesta: String;
    public propuesta: Propuesta = null;
    private listaRespuestaPostulacion: Array<RespuestaPostulacion>;
    public evento: Evento = null;
    public listaBoolean: Array<Boolean>;
    public listaBoolean_fecha_fase: Array<Boolean>;
    public today: Date;
    @ViewChild('detallePropuesta') detallePropuesta: EdicionPropuestaComponent;
    @ViewChildren('fasePropuesta') fasesPropuestas: QueryList<FasePropuestaComponent>;
    @ViewChild('tabsPropuesta') tabset: TabsetComponent;

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private toastr: ToastrService,
        private router: Router,
        private service: EventoService,
        private servicePropuesta: PropuestaService,
        private authService: AeventAuthService) {
        this.listaRespuestaPostulacion = new Array<RespuestaPostulacion>();
        this.today = new Date();
        this.listaBoolean = new Array<Boolean>();
        this.listaBoolean_fecha_fase = new Array<Boolean>();
    }
    async ngOnInit() {
        this.sub = await this.route.params.subscribe(params => {
            this.path = +params['path'];
            this.codigo = +params['id'];
            switch (this.path) {
                case 0: {
                    this.estadoPropuesta = 'NUEVO';
                    this.ObtenerEvento();
                    break;
                }
                case 1: {
                    this.estadoPropuesta = 'EDICION';
                    this.codigo_propuesta = this.codigo;
                    this.ObtenerPropuesta();
                }
            }
        });
    }
    ObtenerEvento() {
        this.service.obtenerEvento(this.codigo).subscribe(
            (response: Response) => {
                this.evento = response.resultado;
                this.propuesta = new Propuesta();
                this.listaBoolean = new Array<Boolean>();
                this.evento.fases.forEach((e,i)=>{
                    let element: Boolean;
                    if(i==0) element = false;
                    else element = true;        
                    this.listaBoolean.push(element);  
                    
                    let element_date: Boolean;
                    if(this.today>=e.fechaInicial){
                        element_date=false;
                    }else
                        element_date = true;
                    this.listaBoolean_fecha_fase.push(element_date);
                });
            }
        );
    }
    ObtenerPropuesta() {
        let username = this.authService.usuario.username;
        this.servicePropuesta.obtenerPropuesta(this.codigo).subscribe(
            (response: Response) => {
                this.propuesta = response.resultado;
                this.evento = this.propuesta.evento;
                this.listaBoolean = new Array<Boolean>();
                this.codigo_propuesta = this.propuesta.idPropuesta;
                this.obtenerPostulaciones();
            }
        );
    }
    obtenerPostulaciones() {
        this.servicePropuesta.obtenerPostulaciones(this.propuesta.idPropuesta).subscribe(
            (response: Response) => {
                if (response && response.resultado != null) {
                    this.evento.fases.forEach((e,i)=>{
                        let element: Boolean;
                        if(i==0) element = false;
                        else element = true;     
                        this.listaBoolean.push(element);  
                        
                        let element_date: Boolean;
                        if(this.today>=e.fechaInicial){
                            element_date=false;
                        }else
                            element_date = true;
                        this.listaBoolean_fecha_fase.push(element_date);
                    });
                    this.listaRespuestaPostulacion = response.resultado;
                    if(this.listaRespuestaPostulacion.length<this.evento.fases.length){
                        if(this.listaRespuestaPostulacion[this.listaRespuestaPostulacion.length-1].postulacion.estado=='POSTULACION_APROBADA')
                            this.listaBoolean[this.listaRespuestaPostulacion.length] = false;
                    }
                    this.listaRespuestaPostulacion.forEach((e, i) => {
                        if(i!=0){
                            let estado = this.listaRespuestaPostulacion[i-1].postulacion.estado;
                            if(estado == 'POSTULACION_APROBADA'){
                                this.listaBoolean[i] = false;

                            }else{
                                this.listaBoolean[i]= true;
                            }
                        }
                        
                        else
                            this.listaBoolean[i]=false;
                        this.fasesPropuestas.forEach((child) => {
                            child.cargarDatosFormulario(e, i);
                        });
                    });

                }else{
                    this.evento.fases.forEach((e,i)=>{
                        let element: Boolean;
                        if(i==0) element = false;
                        else element = true;     
                        this.listaBoolean.push(element);   
                        
                        let element_date: Boolean;
                        if(this.today>=e.fechaInicial){
                            element_date=false;
                        }else
                            element_date = true;
                        this.listaBoolean_fecha_fase.push(element_date);
                    });
                }
            }
        );
    }
    onGuardar() {
        if (!this.detallePropuesta.getLoading()) {
            this.detallePropuesta.OnGuardarDetalle();


            if (this.estadoPropuesta == "NUEVO") {
                this.tabset.tabs[1].active = true;
                this.estadoPropuesta = 'EDICION';
            }
            let index = 0;
            this.tabset.tabs.forEach((e, i) => {
                if (e.active == true) {
                    index = i;
                }
            });
            if (index > 0) {
                //guardado de fase
                this.fasesPropuestas.forEach((child) => { child.OnGuardarFase(index - 1, this.codigo_propuesta) });
            }
        } else {
            return;
        }

    }
    OnRegresar() {
        this._location.back();
    }
    displayItem(propuesta: Propuesta) {
        this.propuesta = propuesta;
        this.codigo_propuesta = this.propuesta.idPropuesta;
    }
    OnFaseClick(event: any) {
    }
}