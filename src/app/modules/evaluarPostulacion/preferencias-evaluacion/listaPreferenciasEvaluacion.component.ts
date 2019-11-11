import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Preferencia } from "src/app/models/preferencia";
import { PreferenciaService } from "src/app/services/preferencia.service";

@Component({
    selector:'listaPreferenciasEvaluacion',
    templateUrl:'listaPreferenciasEvaluacion.template.html',
    styleUrls:['listaPreferenciasEvaluacion.template.scss']
})

export class ListaPreferenciasComponent implements OnInit{

    public loading: Boolean = false;

    private authService: AeventAuthService;
    public paginacion: Paginacion;
    public preferencias:  Array<Preferencia>;
    private toastr: ToastrService;
    constructor(
        private service: PreferenciaService
        ) {
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }

    ngOnInit(){        
        this.service.obtenerPreferencias(4,this.paginacion.pagina,this.paginacion.registros).subscribe(
            (response: Response) => {
                this.preferencias = response.resultado;
                console.log(response);
                console.log(this.authService.usuario.idUsuario);
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

    OnGuardar(){
        
        for(let pref of this.preferencias){
            this.service.guardarPreferencia(pref).subscribe(
                (response: Response) => {
                    //this.toastr.success(`Se ha guardado con exito`, 'Aviso', { closeButton: true });
                }
            );
        }
    }
 
}