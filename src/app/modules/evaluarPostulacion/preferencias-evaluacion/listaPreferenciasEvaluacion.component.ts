import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion, Usuario } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Preferencia } from "src/app/models/preferencia";
import { PreferenciaService } from "src/app/services/preferencia.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector:'listaPreferenciasEvaluacion',
    templateUrl:'listaPreferenciasEvaluacion.template.html',
    styleUrls:['listaPreferenciasEvaluacion.template.scss']
})

export class ListaPreferenciasComponent implements OnInit{

    public loading: Boolean = false;

    
    public paginacion: Paginacion;
    public preferencias:  Array<Preferencia>;
    public usr: Usuario;
    
    constructor(
        private toastr: ToastrService,
        private authService: AeventAuthService,
        private service: PreferenciaService,
        private usrService: UsuarioService,
        ) {
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
        this.usr=new Usuario();
    }

    ngOnInit(){   
        
        this.usrService.obtenerUsuarioUs(this.authService.usuario.username).subscribe(
            (response:Response)=>{
                this.usr = response.resultado;
                console.log("USR",this.usr)
                this.service.obtenerPreferencias(this.usr.idUsuario,this.paginacion.pagina,this.paginacion.registros).subscribe(
                    (response: Response) => {
                        this.preferencias = response.resultado;
                        console.log(response);
                        console.log(this.authService.usuario.idUsuario);
                      }
                )
            }
        )
  
    }
    
    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
 
    }

    OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
 
    }
public ver:boolean;
    OnGuardar(){
        this.ver=false;
        for(let pref of this.preferencias){
            this.service.guardarPreferencia(pref).subscribe(
                (response: Response) => {
                    if(response.estado!="OK")this.ver=true;
                    
                        
                    
                }
            );
        }
        if(!this.ver)
            this.toastr.success(`Se ha guardado con éxito`, 'Aviso', { closeButton: true });
        else
            this.toastr.warning(`Se ha guardado con éxito`, 'Error', { closeButton: true });
    }
 
}