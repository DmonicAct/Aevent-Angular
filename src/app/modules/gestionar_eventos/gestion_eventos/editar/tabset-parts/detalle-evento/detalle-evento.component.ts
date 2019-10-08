import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento, Usuario, Persona, TipoEvento } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CategoriaService } from '../../../../../../services';
import { PersonaService} from '../../../../../../services';
import { Categoria, Response } from "src/app/models";
import { TipoEventoServices } from '../../../../../../services';

@Component({
    selector: 'detalle-evento',
    templateUrl: 'detalle-evento.template.html',
    styleUrls: ['detalle-evento.template.scss']
})

export class DetalleEventoConfiguracion implements OnInit {

    loading: Boolean;
    item: Evento;
    public itemsCategorias: Array<Categoria>;
    public itemsPersona: Array<Persona>;
    public itemsTipoEvento: Array<TipoEvento>;

    fechaInicio;
    fechaFin;


    constructor( private service: CategoriaService, private servicePersonas: PersonaService,
        private serviceTipoEvento: TipoEventoServices) {
        this.item = new Evento();
        this.itemsCategorias = new Array<Categoria>();
    };
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShownPresidente = false;
    isModalShownCategorias = false;
    ngOnInit(): void {
        this.obtenerListaCategorias();
        this.obtenerUsuarios();
        this.obtenerTipoEventos();
    }
    datos: boolean = true;
    call: boolean = false;
    fases: boolean = false;
    modalPresidenteCorrecto: boolean = false;

    obtenerListaCategorias(){
        this.service.obtenerCategorias().subscribe(
            (response: Response)=>{
                this.itemsCategorias=response.resultado;
                console.log(this.itemsCategorias);
            }
        );
    }

    obtenerUsuarios(){
        this.servicePersonas.obtenerPersonas().subscribe(
            (response: Response)=>{
                this.itemsPersona=response.resultado;
                console.log(this.itemsPersona);
            }
        );
    }
    

    obtenerTipoEventos(){
        this.serviceTipoEvento.obtenerTipoEventos().subscribe(
            (response: Response)=>{
                this.itemsTipoEvento=response.resultado;
                console.log(this.itemsTipoEvento);
            }
        );
    }

    codEvento = 22;

    verDatos(event) {
        this.datos = true;
        this.call = false;
        this.fases = false;
    }

    verPapers(event) {
        this.datos = false;
        this.call = true;
        this.fases = false;
    }

    verFases(event) {
        this.datos = false;
        this.call = false;
        this.fases = true;
    }


    presidenteSeleccionado: Persona;
    categoriasSeleccionadas = Array<Categoria>();
    categoriaSeleccionada: Categoria;
    tipoDeEventoSeleccionado: TipoEvento;
    unico: Boolean;
    agregarCategoria(){
        this.unico = true;
        for(let cat of this.categoriasSeleccionadas){
            if (this.categoriaSeleccionada == cat){
                this.unico = false;
            }
        }
        if (this.unico){
            this.categoriasSeleccionadas.push(this.categoriaSeleccionada);
        } else {
            
        }
        console.log(this.fechaFin);
        console.log(this.fechaInicio);
    }

}