import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Preferencia } from "src/app/models/Preferencia";
import { PreferenciaService } from "src/app/services/preferencia.service";

@Component({
    selector:'listaPreferenciasEvaluacion',
    templateUrl:'listaPreferenciasEvaluacion.template.html',
    styleUrls:['listaPreferenciasEvaluacion.template.scss']
})

export class ListaPreferenciasComponent implements OnInit{
    private authService: AeventAuthService;
    public paginacion: Paginacion;
    public preferencias:  Array<Preferencia>;
    constructor(
        private service: PreferenciaService
        ) {
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }

    ngOnInit(){        
        this.service.obtenerPreferencias(4).subscribe(
            (response: Response) => {
                this.preferencias = response.resultado;
                console.log(response);
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
        
    }
 
}