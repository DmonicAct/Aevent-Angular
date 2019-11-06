import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Propuesta } from "src/app/models/propuesta";
import { Evaluacion } from "src/app/models/evaluacion";
import { EvaluacionService } from "src/app/services/evaluacion.service";
@Component({
    selector:'lista-evaluacion',
    templateUrl:'listaEvaluacion.template.html',
    styleUrls:['listaEvaluacion.template.scss']
})

export class ListaEvaluacionComponent implements OnInit{
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public propuestas: Array<Evaluacion>;
    public loading: Boolean = false;
    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private router: Router,
        private service: EvaluacionService) {
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(){
        this.getEventos();
        this.service.obtenerPropuestas(3, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.propuestas = response.resultado;
                console.log(response);
              }
        )
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