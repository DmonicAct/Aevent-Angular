import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector:'listaPreferenciasEvaluacion',
    templateUrl:'listaPreferenciasEvaluacion.template.html',
    styleUrls:['listaPreferenciasEvaluacion.template.scss']
})

export class ListaPreferenciasComponent implements OnInit{
    public paginacion: Paginacion;
    constructor() {
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }

    ngOnInit(){
    }
    
    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
 
    }

    OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
 
    }
 
}