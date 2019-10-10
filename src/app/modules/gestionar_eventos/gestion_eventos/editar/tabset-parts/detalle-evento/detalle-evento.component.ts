import { OnInit, Component, ViewChild, Input } from "@angular/core";
import { Evento, Persona, TipoEvento } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CategoriaService } from '../../../../../../services';
import { PersonaService } from '../../../../../../services';
import { Categoria, Response } from "src/app/models";
import { TipoEventoServices } from '../../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { EventoService } from "src/app/services/evento.service";
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
@Component({
    selector: 'detalle-evento',
    templateUrl: 'detalle-evento.template.html',
    styleUrls: ['detalle-evento.template.scss']
})

export class DetalleEventoConfiguracion implements OnInit {
    public loading: Boolean;
    public itemsCategorias: Array<Categoria>;
    public itemsPersona: Array<Persona>;
    public itemsTipoEvento: Array<TipoEvento>;

    public fechaInicio: Date;
    public fechaFin: Date;

    //Evento de Padre
    @Input('item-evento')
    public item: Evento;
    constructor(private authService: AeventAuthService,
     //   private _location: Location,  
        private localeService: BsLocaleService,
        private service: CategoriaService,
        private servicePersonas: PersonaService,
        private serviceEvento: EventoService,
        private serviceTipoEvento: TipoEventoServices,
        private toastr: ToastrService) {
        //this.item = new Evento();
        this.itemsCategorias = new Array<Categoria>();
        defineLocale('es', esLocale);
        this.localeService.use('es');
    };
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShownPresidente = false;
    isModalShownCategorias = false;

    ngOnInit(): void {
        this.obtenerListaCategorias();
        this.obtenerUsuarios();
        this.obtenerTipoEventos();
    }
    public datos: boolean = true;
    public call: boolean = false;
    public fases: boolean = false;
    public modalPresidenteCorrecto: boolean = false;

    obtenerListaCategorias() {
        this.service.obtenerCategorias().subscribe(
            (response: Response) => {
                this.itemsCategorias = response.resultado;
                console.log(this.itemsCategorias);
            }
        );
    }

    obtenerUsuarios() {
        this.servicePersonas.obtenerPersonas().subscribe(
            (response: Response) => {
                this.itemsPersona = response.resultado;
                console.log(this.itemsPersona);
            }
        );
    }


    obtenerTipoEventos() {
        this.serviceTipoEvento.obtenerTipoEventos().subscribe(
            (response: Response) => {
                this.itemsTipoEvento = response.resultado;
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
    agregarCategoria() {
        this.unico = true;
        for (let cat of this.categoriasSeleccionadas) {
            if (this.categoriaSeleccionada == cat) {
                this.unico = false;
            }
        }
        if (this.unico) {
            this.categoriasSeleccionadas.push(this.categoriaSeleccionada);
        } else {

        }
        console.log(this.fechaFin);
        console.log(this.fechaInicio);
    }
    onEliminarCategoria(index: number) {
        this.categoriasSeleccionadas.splice(index, 1)[0];
    }
    onGuardar() {
        this.item.categorias = this.categoriasSeleccionadas;
        this.item.organizador = this.authService.persona;
        console.log(this.item);
        this.serviceEvento.guardarEvento(this.item).subscribe(
            (response: Response)=>{
                console.log(response.resultado);
                this.item = response.resultado;
                this.item.fechaInicio = this.item.fechaInicio = moment(this.item.fechaInicio).toDate();
                this.item.fechaFin = this.item.fechaFin = moment(this.item.fechaFin).toDate();
                this.toastr.success(`Se ha guardado con exito`, 'Aviso', {closeButton: true});
            }
        );

    }
    onCancelar() {
        //this._location.back();
    }
    DetectChange() {

    }
}