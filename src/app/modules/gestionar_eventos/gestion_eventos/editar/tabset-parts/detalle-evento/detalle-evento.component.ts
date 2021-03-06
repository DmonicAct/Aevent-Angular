import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario, FormularioCFP, Paginacion } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices, UsuarioService } from '../../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
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
    public check: Array<Boolean>;
    public itemPresidente;
    public paginacion: Paginacion;
    nombrePresidente: String;

    @Output() savedItem = new EventEmitter<any>();
    @Output() savedData = new EventEmitter<Evento>();
    //Evento de Padre
    @Input('item-evento')
    public item: Evento;

    public minDate: Date;
    public maxDate: Date;
    constructor(
        private router: Router,
        private authService: AeventAuthService,
        private _location: Location,
        private localeService: BsLocaleService,
        private service: CategoriaService,
        private servicePersonas: PersonaService,
        private serviceUsuario: UsuarioService,
        private serviceEvento: EventoService,
        private serviceTipoEvento: TipoEventoServices,
        private serviceLugar: LugarService,
        private toastr: ToastrService) {
        //this.item = new Evento();
        this.minDate = new Date();
        this.maxDate = new Date();
        this.minDate.setDate(this.minDate.getDate() + 1);
        console.log(this.minDate);
        this.itemsCategorias = new Array<Categoria>();
        this.itemsLugar = new Array<Lugar>();
        this.itemPresidente = new Persona();
        defineLocale('es', esLocale);
        this.localeService.use('es');
        this.nombrePresidente = "";
        this.enFiltro = false;
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
        this.nombreUsuario = "";
        this.filtro = "";
        this.loading = false;
    };
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShownPresidente = false;
    isModalShownCategorias = false;
    ngOnInit(): void {
        this.obtenerListaCategorias();
        this.obtenerTipoEventos();
        this.obtenerListaLugar();
        this.getListaActivos();
        this.obtenerUsuarios();
        this.buscarUsuario();
    }
    public datos: boolean = true;
    public call: boolean = false;
    public fases: boolean = false;
    public modalPresidenteCorrecto: boolean = false;


    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
        this.getListaActivos();
    }

    OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
        this.getListaActivos();
    }


    getAllUsuariosActivos() {
        this.loading = true;
        this.serviceUsuario.obtenerTodosUsuariosActivos().subscribe(
            (response: Response) => {
                this.loading = false;
                this.itemsPersona = response.resultado;
                this.maestroUsuariosFilter = this.itemsPersona;
            }
        );
    }

    getListaActivos() {
        this.loading = true;
        this.serviceUsuario.obtenerUsuariosActivos(this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.loading =false;
                this.itemsPersona = response.resultado;
                this.paginacion = response.paginacion;
                this.maestroUsuariosFilter = this.itemsPersona;
                this.selected = new Array<String>(this.itemsPersona.length).fill("");
            }
        );
    }

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
        this.loading = true;
        this.servicePersonas.obtenerPersonas().subscribe(
            (response: Response) => {
                this.loading = false;
                this.itemsPersona = response.resultado;
                this.maestroUsuariosFilter = this.itemsPersona;

                this.check = Array<Boolean>(this.itemsPersona.length);
                this.check.forEach(element => {
                    element = false;
                });
                if (this.item && this.item.presidente) {

                    for (let i = 0; i < this.itemsPersona.length; i++) {
                        if (this.itemsPersona[i].idUsuario == this.item.presidente.idUsuario) {
                            /* this.item.presidente.fullName = this.itemsPersona[i].nombre + ' ' + this.itemsPersona[i].appaterno + ' ' + this.itemsPersona[i].apmaterno ;
                            this.check[i] = true; */
                            this.nombrePresidente = this.item.presidente.nombreCompleto;
                            break;
                        }
                    }
                } else {
                    this.item.presidente = new Persona;
                }


            }
        );
    }


    obtenerTipoEventos() {
        this.loading = true;
        this.serviceTipoEvento.obtenerTipoEventos().subscribe(
            (response: Response) => {
                this.loading = false;
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
        if (!this.categoriaSeleccionada || this.categoriaSeleccionada.codigo == null) {
            return;
        }
        for (let cat of this.item.categorias) {
            if (this.categoriaSeleccionada == cat) {
                this.unico = false;
                break;
            }
        }
        if (this.unico) {
            this.item.categorias.push(this.categoriaSeleccionada);
        } else {

        }
    }
    onEliminarCategoria(index: number) {
        this.item.categorias.splice(index, 1)[0];
    }
    fechaHoy: Date;
    OnGuardar() {
        this.fechaHoy = new Date();
        if (!this.item.titulo) {
            this.toastr.warning(`Se necesita colocar un Título`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.tipoEvento) {
            this.toastr.warning(`Se necesita colocar un Tipo de Evento`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.descripcion) {
            this.toastr.warning(`Se necesita colocar una Descripcion`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.lugar) {
            this.toastr.warning(`Se necesita colocar un Lugar`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.fechaFin) {
            this.toastr.warning(`Se debe de seleccionar una fecha para el fin de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.fechaInicio) {
            this.toastr.warning(`Se debe de seleccionar una fecha para el inicio de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.item.fechaFin < this.item.fechaInicio) {
            this.toastr.warning(`La fecha de fin de evento no puede ser menos a la de inicio de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.item.fechaInicio < this.fechaHoy || this.item.fechaFin < this.fechaHoy) {
            this.toastr.warning(`Ninguna fecha puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.item.presidente) {
            this.toastr.warning(`Se necesita seleccionr un Presidente`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.item.categorias.length == 0) {
            this.toastr.warning(`Se necesita colocar al menos una Categoría`, 'Aviso', { closeButton: true });
            return;
        }

        this.item.organizador = this.authService.persona;
        this.item.enabled = true;
        //this.item.formulario==null ||
        //this.item.formulario.idFormularioFCP == null;
        let evento = JSON.parse(JSON.stringify(this.item));
        this.loading = true;
        this.serviceEvento.guardarEvento(evento).subscribe(
            (response: Response) => {
                this.loading= false;
                this.item.idEvento = response.resultado.idEvento;
                this.item.fechaInicio = response.resultado.fechaInicio;
                this.item.fechaFin = response.resultado.fechaFin;
                this.item.fechaInicio = moment(this.item.fechaInicio).toDate();
                this.item.fechaFin = moment(this.item.fechaFin).toDate();
                this.toastr.success(`Se ha guardado con éxito`, 'Aviso', { closeButton: true });
                for (let i = 0; i < this.itemsPersona.length; i++) {
                    if (this.itemsPersona[i].idUsuario == this.item.presidente.idUsuario) {
                        this.item.presidente.fullName = this.itemsPersona[i].nombre + ' ' + this.itemsPersona[i].appaterno + ' ' + this.itemsPersona[i].apmaterno;
                        break;
                    }
                }
                this.savedItem.emit(false);
                this.router.navigate([`Eventos/MisEventos/organizador/editar/${this.item.idEvento}`]);
           /*      this.savedData.emit(this.item); */
            }
        );

    }
    OnCancelar() {
        this._location.back();
    }
    DetectFin() {
        if (this.item.fechaFin && (this.item.fechaFin.toString() == 'Invalid Date' || this.item.fechaFin.toString() == '')) {
            this.item.fechaFin = new Date();
            this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
            return;
        }
    }
    DetectInicio() {
        if (this.item.fechaInicio && (this.item.fechaInicio.toString() == 'Invalid Date' || this.item.fechaInicio.toString() == '')) {
            this.item.fechaInicio = new Date();
            this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
            return;
        }
    }

    hideModalPresidente() {
        this.autoShownModal.hide();
    }

    OnAgregarPresidente() {
        this.isModalShownPresidente = true;
    }

    OnHiddenPresidente(): void {
        this.isModalShownPresidente = false;
    }

    ElegirPresidente(data, i) {

        this.item.presidente = data;
        this.toastr.success(this.item.presidente.nombreCompleto + ' seleccionado como presidente', 'Aviso', { closeButton: true });
        this.nombrePresidente = this.item.presidente.nombreCompleto;
        this.selected = new Array<String>(this.itemsPersona.length).fill("");
        this.selected[i] = "{background-color: lightblue}";
    }

    OnAceptarPresidente() {
        this.isModalShownPresidente = false;
    }

    filtro: String;
    tipo: String;
    numeroTipo: number;
    nombreUsuario: String;
    maestroUsuariosFilter: Array<Persona>;
    enFiltro: Boolean;
    selected: Array<String>;

    cambioFiltro() {
        if (this.tipo == "Nombre") {
            this.numeroTipo = 1;
        }
        if (this.tipo == "Usuario") {
            this.numeroTipo = 2;
        }
        if (this.tipo == "Email") {
            this.numeroTipo = 3;
        }
    }

    public itemsFiltro = ["Nombre", "Usuario", "Email"];

    buscarUsuario() {
        this.cambioFiltro();
        if (this.filtro.length > 0) {
            if (this.enFiltro == false) {
                this.getAllUsuariosActivos();
            }
            this.enFiltro = true;
            if (this.numeroTipo == 1) {
                this.maestroUsuariosFilter = this.itemsPersona.filter(
                    item => item.nombreCompleto.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 2) {
                this.maestroUsuariosFilter = this.itemsPersona.filter(
                    item => item.username.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )

            }
            if (this.numeroTipo == 3) {
                this.maestroUsuariosFilter = this.itemsPersona.filter(
                    item => item.email.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
        } else {
            if (this.enFiltro == true) {
                this.enFiltro = false;
                this.getListaActivos();
            }
            this.maestroUsuariosFilter = this.itemsPersona;
        }

    }

}