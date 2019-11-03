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
    constructor() {
    }

    ngOnInit(){
    }
}