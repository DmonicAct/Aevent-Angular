import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from "src/app/models";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { EventoService } from "src/app/services";
import { Estado, Response } from '../../../models';
import { PropuestaService } from "src/app/services/propuesta.service";
import { Propuesta } from "src/app/models/propuesta";
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
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
        private serviceEvento: EventoService,
        private authService: AeventAuthService,
        private servicePropuesta: PropuestaService) {
        this.items = new Array<Propuesta>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(): void {
       this.obtenerPostulaciones();
    }
    obtenerPostulaciones(){
        this.servicePropuesta.obtenerListaPropuesta(this.authService.usuario.username,this.paginacion.pagina,this.paginacion.registros).subscribe(
            (response:Response)=>{
                this.items = response.resultado;
                this.paginacion = response.paginacion;
            }
        );
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
    OnEditar(item:Propuesta){
        this.router.navigate([`convocatoria/lista-ponencia/ver-postulacion/1/${item.idPropuesta}`]);
    }
    OnRowClick(i:number,item:any) {
    }
}