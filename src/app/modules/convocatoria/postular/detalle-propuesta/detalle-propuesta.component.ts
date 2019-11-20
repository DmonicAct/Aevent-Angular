import { OnInit, Component, Input, Output, EventEmitter } from "@angular/core";
import { Propuesta } from "../../../../models/propuesta";
import { Evento, Response } from "../../../../models";
import { ToastrService } from "ngx-toastr";
import { PropuestaService } from "src/app/services/propuesta.service";
import { AuthService as AeventAuthService } from '../../../../auth/service/auth.service';
import { EstadoPropuesta } from "src/app/models/enums/estadoPropuesta";
import { ResponseOptions } from "@angular/http";
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

    @Output() 
    itemCodigo = new EventEmitter<any>();

    constructor(
        private toastr: ToastrService,
        private servicePropuesta: PropuestaService,
        private authService: AeventAuthService){

    }
    ngOnInit(){

    }

    async OnGuardarDetalle(){
        if(!this.propuesta.titulo || this.propuesta.titulo.trim()==""){
            this.toastr.warning('Titulo de propuesta vacío', 'Aviso', {closeButton: true});
            return;
        }
        let username = this.authService.usuario.username;
        let idEvento = this.evento.idEvento;
        if(this.propuesta.idPropuesta==null){
            this.propuesta.estado = EstadoPropuesta.PROPUESTA_BORRADOR;
        }
        await this.servicePropuesta.guardarPropuesta(this.propuesta,username, idEvento).subscribe(
            (response:Response)=>{
                this.toastr.success('Se ha guardado la propuesta con exito', 'Aviso', {closeButton: true});
                this.itemCodigo.emit(response.resultado);
            }
        );
    }
}