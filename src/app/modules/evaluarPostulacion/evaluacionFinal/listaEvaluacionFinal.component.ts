import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento, Paginacion, Usuario, Postulacion } from '../../../models'
import {AuthService as AeventAuthService} from  '../../../auth/service/auth.service'
import { EventoService } from  '../../../services'
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Estado, Response } from '../../../models';
import { Propuesta } from "src/app/models/propuesta";
import { Evaluacion } from "src/app/models/evaluacion";
import { EvaluacionService } from "src/app/services/evaluacion.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { DetalleEvaluacionFinal } from "./detalles/detalle.component";
import { PresidenteService } from "src/app/services/presidente.service";
import { PostulacionPropuestaRequest } from "src/app/models/postulacionPropuestaRequest";
@Component({
    selector:'listaEvaluacionFinal',
    templateUrl:'listaEvaluacionFinal.template.html',
    styleUrls:['listaEvaluacionFinal.template.scss']
})

export class ListaEvaluacionFinalComponent implements OnInit{
    public item : Evento;
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public respuesta: PostulacionPropuestaRequest;
    public propuestas: Array<Propuesta>;
    public postulaciones: Array<Postulacion>;
    public usr: Usuario;
    public loading: Boolean = false;

    @ViewChild('DetalleEvaluacionFinal')
    element: DetalleEvaluacionFinal;


    constructor(private toastr: ToastrService,
        private authService: AeventAuthService,
        private usrService: UsuarioService,
        private router: Router,
        private service: EvaluacionService,
        private servicePresidente: PresidenteService) {
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
                this.servicePresidente.obtenerPostulacionesEnEspera(this.usr.idUsuario).subscribe(
                    (response: Response) => {
                        this.respuesta = response.resultado;
                        this.propuestas = this.respuesta.propuesta;
                        this.postulaciones = this.respuesta.postulacion;
                      }
                )
            }
        )
     
    }
    public getEventos(){
        
    }

    OnEvaluar(item: Propuesta) {
        this.router.navigate([`gestionEvaluacionEvento/evaluacion-final/lista/evaluar/${item.idPropuesta}`]);
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
        if (this.tipo == "Título"){
            this.numeroTipo = 2;
        }
        if (this.tipo == "Postulante"){
            this.numeroTipo = 3;
        }
    }

    public itemsFiltro = ["Evento", "Título","Postulante"];

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
    OnRowClick(i:number,item:any) {
    }
      
}