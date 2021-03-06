import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario } from '../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AuthService as AeventAuthService } from '../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
@Component({
    selector: 'detalleEventoPresidente',
    templateUrl: 'detalleEventoPresidente.template.html',
    styleUrls: ['detalleEventoPresidente.template.scss']
})

export class DetalleEventoVer implements OnInit {
    public loading: Boolean;
    public itemsCategorias: Array<Categoria>;
    public itemsPersona: Array<Persona>;
    public itemsTipoEvento: Array<TipoEvento>;
    public itemsLugar: Array<Lugar>;
    public fechaInicio: Date;
    public fechaFin: Date;
    
    public itemPresidente;

    @Output() savedItem = new EventEmitter<any>();

    @Input('item-presidente')
    public itemPresidente_parent;
    //Evento de Padre
    @Input('item-evento')
    public item: Evento;
    constructor(
        private authService: AeventAuthService,
        private _location: Location,
        private localeService: BsLocaleService,
        private router: Router,
        private service: CategoriaService,
        private servicePersonas: PersonaService,
        private serviceEvento: EventoService,
        private serviceTipoEvento: TipoEventoServices,
        private serviceLugar: LugarService,
        private toastr: ToastrService) {
        //this.item = new Evento();
        this.itemsCategorias = new Array<Categoria>();
        this.itemsLugar = new Array<Lugar>();
        this.itemPresidente = new Persona();
        defineLocale('es', esLocale);
        this.localeService.use('es');
        //console.log();
    };
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShownPresidente = false;
    isModalShownCategorias = false;
    ngOnInit(): void {
        this.obtenerListaCategorias();
        this.obtenerTipoEventos();
        this.obtenerListaLugar();
		this.obtenerUsuarios();
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
        //console.log(this.itemPresidente.idUsuario);
        this.servicePersonas.obtenerPersonas().subscribe(
            (response: Response) => {
                this.itemsPersona = response.resultado;
                this.itemsPersona.map((i) => { 
                    i.fullName = i.nombre + ' ' + i.appaterno + ' ' + i.apmaterno ; return i; 
                });
                if(this.item && this.item.presidente){
                    for(let i=0;i<this.itemsPersona.length;i++){
                        if(this.itemsPersona[i].idUsuario==this.item.presidente.idUsuario){
                            this.item.presidente.fullName = this.itemsPersona[i].nombre + ' ' + this.itemsPersona[i].appaterno + ' ' + this.itemsPersona[i].apmaterno ;
                            break;
                        }
                    }
                }
                
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
                break;
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

    onRetroceder(){
        this.router.navigate([`Eventos/MisEventos/presidente`]);
    }
    fechaHoy: Date;



    onGuardar() {
        this.fechaHoy = new Date();
        if(!this.item.titulo){
            this.toastr.warning(`Se necesita colocar un Título`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.tipoEvento){
            this.toastr.warning(`Se necesita colocar un Tipo de Evento`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.descripcion){
            this.toastr.warning(`Se necesita colocar una Descripcion`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.lugar){
            this.toastr.warning(`Se necesita colocar un Lugar`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.fechaFin){
            this.toastr.warning(`Se debe de seleccionar una fecha para el fin de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.fechaInicio){
            this.toastr.warning(`Se debe de seleccionar una fecha para el inicio de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if(this.item.fechaFin<this.item.fechaInicio){
            this.toastr.warning(`La fecha de fin de evento no puede ser menos a la de inicio de evento`, 'Aviso', { closeButton: true });
            return;
        }
        if(this.item.fechaInicio<this.fechaHoy ||this.item.fechaFin<this.fechaHoy ){
            this.toastr.warning(`Ninguna fecha puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.item.presidente){
            this.toastr.warning(`Se necesita seleccionr un Presidente`, 'Aviso', { closeButton: true });
            return;
        }
        if(this.item.categorias.length == 0){
            this.toastr.warning(`Se necesita colocar al menos una Categoría`, 'Aviso', { closeButton: true });
            return;
        }
        //this.item.presidente= this.itemPresidente;
        this.item.organizador = this.authService.persona;
        this.item.enabled = false;
        console.log(this.item);
        this.serviceEvento.guardarEvento(this.item).subscribe(
            (response: Response) => {
                this.item = response.resultado;
                this.item.fechaInicio = this.item.fechaInicio = moment(this.item.fechaInicio).toDate();
                this.item.fechaFin = this.item.fechaFin = moment(this.item.fechaFin).toDate();
                this.toastr.success(`Se ha guardado con éxito`, 'Aviso', { closeButton: true });
                for(let i=0;i<this.itemsPersona.length;i++){
                    if(this.itemsPersona[i].idUsuario==this.item.presidente.idUsuario){
                        this.item.presidente.fullName = this.itemsPersona[i].nombre + ' ' + this.itemsPersona[i].appaterno + ' ' + this.itemsPersona[i].apmaterno ;
                        break;
                    }
                }
                this.savedItem.emit(false);
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