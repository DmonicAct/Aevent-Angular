import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
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
    public itemsLugar: Array<Lugar>;
    public fechaInicio: Date;
    public fechaFin: Date;

    //Evento de Padre
    @Input('item-evento')
    public item: Evento;
    constructor(
        private authService: AeventAuthService,
        private _location: Location,
        private localeService: BsLocaleService,
        private service: CategoriaService,
        private servicePersonas: PersonaService,
        private serviceEvento: EventoService,
        private serviceTipoEvento: TipoEventoServices,
        private serviceLugar: LugarService,
        private toastr: ToastrService) {
        //this.item = new Evento();
        this.itemsCategorias = new Array<Categoria>();
        this.itemsLugar = new Array<Lugar>();
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
        this.obtenerListaLugar();
        /* console.log(this.item.idEvento);
        if(this.item.idEvento!=null){
            this.categoriasSeleccionadas = this.item.categorias;
            console.log(this.categoriaSeleccionada);
            console.log(this.item.presidente);
        } */
    }
    public datos: boolean = true;
    public call: boolean = false;
    public fases: boolean = false;
    public modalPresidenteCorrecto: boolean = false;

    obtenerListaLugar() {
        this.serviceLugar.obtenerLugares().subscribe(
            (response: Response) => {
                this.itemsLugar = response.resultado;
            }
        );
    }
    obtenerListaCategorias() {
        this.service.obtenerCategorias().subscribe(
            (response: Response) => {
                this.itemsCategorias = response.resultado;
            }
        );
    }

    obtenerUsuarios() {
        this.servicePersonas.obtenerPersonas().subscribe(
            (response: Response) => {
                this.itemsPersona = response.resultado;
            }
        );
    }


    obtenerTipoEventos() {
        this.serviceTipoEvento.obtenerTipoEventos().subscribe(
            (response: Response) => {
                this.itemsTipoEvento = response.resultado;
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
        for (let cat of this.item.categorias) {
            if (this.categoriaSeleccionada == cat) {
                this.unico = false;
            }
        }
        if (this.unico) {
            this.item.categorias.push(this.categoriaSeleccionada);
            //this.categoriasSeleccionadas.push(this.categoriaSeleccionada);
        } else {

        }
    }
    onEliminarCategoria(index: number) {
        this.categoriasSeleccionadas.splice(index, 1)[0];
    }
    onGuardar() {
       // this.item.categorias = this.categoriasSeleccionadas;
        this.item.organizador = this.authService.persona;
        this.item.enabled = false;
        this.serviceEvento.guardarEvento(this.item).subscribe(
            (response: Response) => {
                this.item = response.resultado;
                this.item.fechaInicio = this.item.fechaInicio = moment(this.item.fechaInicio).toDate();
                this.item.fechaFin = this.item.fechaFin = moment(this.item.fechaFin).toDate();
                this.toastr.success(`Se ha guardado con exito`, 'Aviso', { closeButton: true });
            }
        );

    }
    onCancelar() {
        this._location.back();
    }
    DetectFin() {
        if (this.item.fechaFin && (this.item.fechaFin.toString() == 'Invalid Date' || this.item.fechaFin.toString() == '')) {
            this.item.fechaFin = new Date();
            this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
            return;
        } /* else {
            if (this.item.fechaFin && this.item.fechaInicio) {
                if (this.item.fechaInicio > this.item.fechaFin) {
                    this.item.fechaFin = new Date();
                    this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
                    return;
                }
            }
        } */
    }
    DetectInicio() {
        if (this.item.fechaInicio && (this.item.fechaInicio.toString() == 'Invalid Date' || this.item.fechaInicio.toString() == '')) {
            this.item.fechaInicio = new Date();
            this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
            return;
        } /* else
            if (this.item.fechaFin && this.item.fechaInicio) {
                if (this.item.fechaInicio > this.item.fechaInicio) {
                    this.item.fechaInicio = new Date();
                    this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
                    return;
                }
            } */
    }
}