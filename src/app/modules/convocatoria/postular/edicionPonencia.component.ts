import { OnInit, Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Location } from '@angular/common';
import { Propuesta } from "../../../models/propuesta";
import { Postulacion, Evento, Fase } from "../../../models";
import { PropuestaService } from "../../../services/propuesta.service";
import { EventoService } from "../../../services";
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { DetallePropuestaComponent } from "../../evaluarPostulacion/evaluacion/editar/tabset-parts/detalle-propuesta/detalle-propuesta.component";
import { EdicionPropuestaComponent } from "./detalle-propuesta/detalle-propuesta.component";
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
@Component({
    selector:'edicion-ponencia',
    templateUrl:'edicionPonencia.template.html',
    styleUrls:['edicionPonencia.template.scss']
})
export class EdicionPonenciaComponent implements OnInit{
    private sub: any;
    private codigo: number;
    /**
     * 
     * Path:
     *  0: Nuevo
     *  1: Edicion
     */
    private path: number;
    private estadoPropuesta: String;
    private propuesta: Propuesta=null;
    private postulacion: Postulacion;
    private evento:Evento=null;
    @ViewChild('detallePropuesta') detallePropuesta: EdicionPropuestaComponent;
    @ViewChild('tabsFases') tabset: TabsetComponent;
    constructor(
        private _location: Location,  
        private route: ActivatedRoute,
        private toastr: ToastrService, 
        private router: Router,
        private service: EventoService,
        private servicePropuesta: PropuestaService,
        private authService: AeventAuthService){}
    async ngOnInit(){
         this.sub = await this.route.params.subscribe(params => {
            this.path= +params['path'];
            this.codigo = +params['id'];
            switch(this.path){
                case 0: {
                    this.estadoPropuesta = 'NUEVO';
                    this.ObtenerEvento(); 
                    break;
                }
                case 1: {
                    this.estadoPropuesta = 'EDICION';
                    this.ObtenerPropuesta();
                }
            }
          });
          console.log(this.sub);
    }
    ObtenerEvento(){
        this.service.obtenerEvento(this.codigo).subscribe(
            (response:Response)=>{
                this.evento = response.resultado;
                this.propuesta = new Propuesta();
                console.log("EVENTO", this.evento);
            }
        );
    }
    ObtenerPropuesta(){
        let username = this.authService.usuario.username;
        console.log("OBTENER PROPUESTA");
        this.servicePropuesta.obtenerPropuesta(username,this.codigo).subscribe(
            (response:Response)=>{
                this.propuesta = response.resultado;
                this.evento = this.propuesta.evento;
                console.log("PROPUESTA", this.propuesta);
                console.log("EVENTO", this.evento);
            }
        );
    }
    onGuardar(){
        this.detallePropuesta.OnGuardarDetalle();
    }
    OnRegresar(){
        this._location.back();
      }
    OnFaseClick(event:any){
        console.log(event);
    }
}