import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
@Component({
    selector:'lista-evaluacion',
    templateUrl:'listaEvaluacion.template.html',
    styleUrls:['listaEvaluacion.template.scss']
})

export class ListaEvaluacionComponent implements OnInit{
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public loading: Boolean = false;
    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private router: Router,
        private service: EventoService) {
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(){
        this.getEventos();
    }
    public getEventos(){
        
    }
    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
        //this.getLista();
      }
    
      OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
        //this.getLista();
      }
}