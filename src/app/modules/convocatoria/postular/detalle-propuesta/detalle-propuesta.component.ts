import { OnInit, Component, Input } from "@angular/core";
import { Propuesta } from "../../../../models/propuesta";
import { Evento, Response } from "../../../../models";
import { ToastrService } from "ngx-toastr";
import { PropuestaService } from "src/app/services/propuesta.service";
import { AuthService as AeventAuthService } from '../../../../auth/service/auth.service';
import { EstadoPropuesta } from "src/app/models/enums/estadoPropuesta";
@Component({
    selector:'detalle-propuesta',
    templateUrl:'detalle-propuesta.template.html',
    styleUrls:['detalle-propuesta.template.scss']
})
export class EdicionPropuestaComponent implements OnInit{
    @Input('propuesta')
    public propuesta: Propuesta;
    
    @Input('evento')
    public evento: Evento;


    constructor(
        private toastr: ToastrService,
        private servicePropuesta: PropuestaService,
        private authService: AeventAuthService){

    }
    ngOnInit(){

    }

    OnGuardarDetalle(){
        if(!this.propuesta.titulo || this.propuesta.titulo.trim()==""){
            this.toastr.warning('Titulo de propuesta vacío', 'Aviso', {closeButton: true});
            return;
        }
        if(!this.propuesta.descripcion || this.propuesta.descripcion.trim()==""){
            this.toastr.warning('Descripción de propuesta vacío', 'Aviso', {closeButton: true});
            return;
        }
        if(!this.propuesta.conocimiento_previo || this.propuesta.conocimiento_previo.trim()==""){
            this.propuesta.conocimiento_previo = "NINGUNO";
        }
        if(!this.propuesta.cantidad_sesiones || this.propuesta.cantidad_sesiones>10){
            this.propuesta.cantidad_sesiones=10;
        }
        console.log(this.propuesta);
        let username = this.authService.usuario.username;
        let idEvento = this.evento.idEvento;
        if(this.propuesta.idPropuesta==null){
            this.propuesta.estado = EstadoPropuesta.PROPUESTA_BORRADOR;
        }
        this.servicePropuesta.guardarPropuesta(this.propuesta,username, idEvento).subscribe(
            (response:Response)=>{
                this.toastr.success('Se ha guardado la propuesta con exito', 'Aviso', {closeButton: true});
            }
        );
    }
}