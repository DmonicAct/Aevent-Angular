import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from "src/app/models";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EventoService } from "src/app/services";

@Component({
    selector: 'lista-ponencia',
    templateUrl: 'listaPonencia.template.html',
    styleUrls: ['listaPonencia.template.scss']
})
export class ListaPonenciaComponent implements OnInit {
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public loading: Boolean = false;
    constructor(
        private toastr: ToastrService,
        private router: Router,
        private serviceEvento: EventoService) {
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(): void {
       this.obtenerPostulaciones();
    }
    obtenerPostulaciones(){

    }
    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
        this.obtenerPostulaciones();
    }

    OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
        this.obtenerPostulaciones();
    }

}