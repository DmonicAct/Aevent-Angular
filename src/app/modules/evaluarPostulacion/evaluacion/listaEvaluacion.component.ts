import { OnInit, Component } from "@angular/core";
import { Evento, Paginacion, Usuario } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { UsuarioService } from  '../../../services'
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
    public item : Evento;
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public evaluaciones: Array<Evaluacion>;
    public propuestas: Array<Propuesta>;
    public loading: Boolean = false;
    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private usuarioService: UsuarioService,
        private router: Router,
        private service: EvaluacionService) {
        this.item = new Evento();
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(){
        this.getEventos();
        console.log(this.authService)
        this.usuarioService.obtenerUsuarioUs(this.authService.usuario.username).subscribe((
            response: Response )=>{
            let usr: Usuario = response.resultado;
            this.service.obtenerPropuestas(usr.idUsuario, this.paginacion.pagina, this.paginacion.registros).subscribe(
                (response: Response) => {
                    this.evaluaciones = response.resultado;
                    console.log(response);
                    }
            )

        });

    }
    public getEventos(){
        
    }

    OnEditar(item: Evento) {
        console.log(item);
        this.router.navigate([`gestionEvaluacionEvento/eventos-postulante/evaluar/${item.idEvento}`]);
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

      filtro: String;
      tipo: String;
      numeroTipo: number;
      eventoFiltro: Evento;
      maestroEventoFilter: Array<Evento>;
      cambioFiltro(){
        if (this.tipo == "Evento"){
            this.numeroTipo = 1;
        }
        if (this.tipo == "Fase"){
            this.numeroTipo = 2;
        }
        if (this.tipo == "Título"){
            this.numeroTipo = 3;
        }
        if (this.tipo == "Postulante"){
            this.numeroTipo = 4;
        }
    }

    public itemsFiltro = ["Evento", "Fase", "Título","Postulante"];

    buscarEvento() {
        this.cambioFiltro();
        if (this.filtro.length > 0) {
            if (this.numeroTipo == 1){
                this.maestroEventoFilter = this.items.filter(
                    item => item.titulo.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 2){
                this.maestroEventoFilter = this.items.filter(
                    item => item.tipoEvento.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 3){
                this.maestroEventoFilter = this.items.filter(
                    item => item.presidente.nombreCompleto.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            
        } else {
            this.maestroEventoFilter = this.items;
        }
    }
      
}