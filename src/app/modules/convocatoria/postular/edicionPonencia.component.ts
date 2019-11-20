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
    private propuesta: Propuesta = null;
    private listaRespuestaPostulacion: Array<RespuestaPostulacion>;
    private evento: Evento = null;
    @ViewChild('detallePropuesta') detallePropuesta: EdicionPropuestaComponent;
    @ViewChildren('fasePropuesta') fasesPropuestas:QueryList<FasePropuestaComponent>;
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
            }
        );
    }
    ObtenerPropuesta() {
        let username = this.authService.usuario.username;
        this.servicePropuesta.obtenerPropuesta(this.codigo).subscribe(
            (response: Response) => {
                this.propuesta = response.resultado;
                this.evento = this.propuesta.evento;
                this.codigo_propuesta = this.propuesta.idPropuesta;
                this.obtenerPostulaciones();
            }
        );
    }
    obtenerPostulaciones() {
        this.servicePropuesta.obtenerPostulaciones(this.propuesta.idPropuesta).subscribe(
            (response: Response) => {
                if (response && response.resultado != null) {
                    /* this.listaRespuestaPostulacion = response.resultado; */
                    console.log(response);
                }
            }
        );
    }
    onGuardar() {
        this.detallePropuesta.OnGuardarDetalle();
        if(this.estadoPropuesta=="NUEVO"){
            this.tabset.tabs[1].active = true;
            this.estadoPropuesta = 'EDICION';
        }
        let index = 0;
        this.tabset.tabs.forEach((e,i)=>{
            if(e.active==true){
                index = i;
            }
        });
        if(index>0){
            //guardado de fase
            this.fasesPropuestas.forEach((child) => { child.OnGuardarFase(index - 1,this.codigo_propuesta) });
        }
        
    }
    OnRegresar() {
        this._location.back();
    }
    displayItem(propuesta: Propuesta){
        this.propuesta = propuesta;
        this.codigo_propuesta = this.propuesta.idPropuesta;
    }
    OnFaseClick(event: any) {
    }
}