import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento, Paginacion, Usuario } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Propuesta } from "src/app/models/propuesta";
import { Evaluacion } from "src/app/models/evaluacion";
import { EvaluacionService } from "src/app/services/evaluacion.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { EditarEvaluacionComponent } from "./editar/editarEvaluacion.component";
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
    public usr: Usuario;
    public propuestas: Array<Propuesta>;
    public loading: Boolean = false;

    @ViewChild('EditarEvaluacionComponent')
    element: EditarEvaluacionComponent;


    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private usrService: UsuarioService,
        private router: Router,
        private service: EvaluacionService) {
        this.item = new Evento();
        this.usr= new Usuario();
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    ngOnInit(){
        this.getEventos();
        this.usrService.obtenerUsuarioUs(this.authService.usuario.username).subscribe(
            (response:Response)=>{
                this.usr = response.resultado;
                console.log(this.usr)
                this.service.obtenerPropuestas(this.usr.idUsuario, this.paginacion.pagina, this.paginacion.registros).subscribe(
                    (response: Response) => {
                        this.evaluaciones = response.resultado;
                        console.log(response);
                      }
                )
            }
        )
     
    }
    public getEventos(){
        
    }

    OnEditar(item: Evaluacion) {
            this.router.navigate([`gestionEvaluacionEvento/eventos-postulante/evaluar/${item.idEvaluacion}`]);
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