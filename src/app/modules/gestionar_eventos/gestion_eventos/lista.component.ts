import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evento, Paginacion } from '../../../models';
import { EventoService } from '../../../services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
    selector: 'lista-eventos-organizador',
    templateUrl: 'lista.template.html',
    styleUrls: ['lista.template.scss']
})

export class ListaEventosOrganizador implements OnInit {
    public isNewModalShown: Boolean;
    public descripcionModal: String;
    public items: Array<Evento>;
    public itemsPropios: Array<Evento>;
    public paginacion: Paginacion;
    public loading: Boolean = false;
    public rolOrga: Boolean;
    private eventoDes: Evento;
    private seCambioActivo: Boolean;
    public tipoEvento: String;
    @ViewChild('autoShownModal')
    autoShownModal: ModalDirective;

    constructor(private authService: AeventAuthService,
        private toastr: ToastrService,
        private router: Router,
        private service: EventoService) {
        this.items = new Array<Evento>();
        this.eventoDes = new Evento();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
        this.seCambioActivo = false;
        this.activos = true;
        this.tipoEvento = "Activos";
        this.filtro = "";
    }
    flagVer: Boolean;
    eventosPropios: Array<Boolean>;
    onHidden(): void{
        this.isNewModalShown = false;
    }
    hideModal(): void {
        if (this.isNewModalShown) {
          this.autoShownModal.hide();
        }
      }
    ngOnInit(): void {
        //this.getAllEventos();
        this.getListaActivos();
        this.rolOrga = false;
        this.enFiltro = false;
        this.authService.usuario.roles.forEach(element => {
            var aux = '' + element;
            if (aux == 'ROLE_ORGANIZER') this.rolOrga = true;
        });
    }
    public motivos = ["Finalizado", "Cancelado"];
    public filtroActivo = ["Activos", "Inactivos"];
    public motivoDeshabilitar: string;

    activos: Boolean;
    cambioTipoEvento() {
        this.activos = !this.activos;
        this.seCambioActivo = true;
        this.buscarEvento();
    }
    cargarLista() {
        if (this.activos) {
            this.getListaActivos();
        } else {
            this.getListaInactivos();
        }
    }
    compFechas(a: Evento, b: Evento) {
        let fechaA: Date = new Date(a.fechaInicio);
        //console.log(fechaA.getTime())
        let fechaB: Date = new Date(b.fechaInicio);
        //console.log(fechaB.getTime())
        return fechaB.getTime() - fechaA.getTime();
    }
    getListaActivos() {

        this.service.obtenerEventosOrganizadorActivos(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                
                
                this.items = response.resultado;
                this.items.sort((a, b) => this.compFechas(a, b));
                this.paginacion = response.paginacion;
                this.maestroEventoFilter = this.items;
                
                this.buscarEvento();
            }
        );
    }

    getListaInactivos() {
        this.service.obtenerEventosOrganizadorInactivos(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.items = response.resultado;
                this.items.sort((a, b) => this.compFechas(a, b));
                this.paginacion = response.paginacion;
                this.maestroEventoFilter = this.items;
                this.buscarEvento();
            }
        );
    }



    getAllEventos() {
        this.service.consultarAllEventos(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.items = response.resultado;
                this.maestroEventoFilter = this.items;
                //this.eventosPropios = new Array<Boolean>(this.items.length);
                for (var i = 0; i < this.items.length; i++) {
                    this.eventosPropios.push(false);
                }
            }
        );
    }

    getEventosOrganizador() {
        this.service.consultarEventoByOrganizador(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.items = response.resultado;
                this.maestroEventoFilter = this.items;
                console.log(this.maestroEventoFilter);
            }
        );
    }

    getAllEventosOrganizador() {
        this.service.consultarAllEventoByOrganizador(this.authService.usuario.username).subscribe(
            (response: Response) => {
                this.items = response.resultado;
                this.maestroEventoFilter = this.items;
            }
        );
    }

    OnPresidente() {
        this.router.navigate([`Eventos/MisEventos/presidente`]);
    }

    OnNuevo() {
        this.router.navigate([`Eventos/MisEventos/organizador/nuevo`]);
    }

    OnEditar(item: Evento) {
        this.router.navigate([`Eventos/MisEventos/organizador/editar/${item.idEvento}`]);
    }

    OnVer(item: Evento) {
        this.router.navigate([`Eventos/MisEventos/organizador/editar/${item.idEvento}`]);
    }
    /*OnHabilitar(item:Evento){   NO HAY OPCION DE HABILITAR EVENTO DE NUEVO, LO GUARDO POR SIACASO
        item.enabled = true;
        this.service.guardarEvento(item).subscribe(
            (response: Response) => {
                if (response.estado == "OK") {
                    this.toastr.success(`Se ha habilitado el evento con exito`, 'Aviso', { closeButton: true });
                    if (this.activos) {
                        this.getListaActivos();
                    } else {
                        this.getListaInactivos();
                    }
                }
            }
        );
    }*/
    OnMotivoDeshabilitar(item: Evento){
        this.isNewModalShown = true;
        this.eventoDes = item;

    }
    OnDeshabilitar(item: Evento) {
        item.motivoFin = this.motivoDeshabilitar; 
        item.enabled = false;
        item.estadoEvento = "EVENTO_CANCELADO";
        this.service.guardarEvento(item).subscribe(
            (response: Response) => {
                if (response.estado == "OK") {
                    this.toastr.success(`Se ha deshabilitado el evento con exito`, 'Aviso', { closeButton: true });
                    if (this.activos) {
                        this.getListaActivos();
                    } else {
                        this.getListaInactivos();
                    }
                    this.onHidden();
                }


            }
        );
    }



    OnPageChanged(event): void {
        this.paginacion.pagina = event.page;
        this.getEventosOrganizador();
    }

    OnPageOptionChanged(event): void {
        this.paginacion.registros = event.rows;
        this.paginacion.pagina = 1;
        this.getEventosOrganizador();
    }
    filtro: String;
    tipo: String;
    numeroTipo: number;
    eventoFiltro: Evento;
    maestroEventoFilter: Array<Evento>;

    cambioFiltro() {
        if (this.tipo == "Título") {
            this.numeroTipo = 1;
        }
        if (this.tipo == "Tipo") {
            this.numeroTipo = 2;
        }
        if (this.tipo == "Presidente") {
            this.numeroTipo = 3;
        }
        if (this.tipo == "Motivo") {
            this.numeroTipo = 4;
        }
        
    }

    public itemsFiltro = ["Título", "Tipo", "Presidente"];
    public itemsFiltroInactivo = ["Título", "Tipo", "Presidente", "Motivo"];
    enFiltro: Boolean;


    buscarEvento() {
        this.cambioFiltro();
        //console.log(this.filtro.length);
        if (this.filtro.length > 0) {
            if (this.enFiltro == false) {
                this.getAllEventosOrganizador();
            }
            this.enFiltro = true;
            if (this.numeroTipo == 1) {
                this.maestroEventoFilter = this.items.filter(
                    item => item.titulo.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 2) {
                this.maestroEventoFilter = this.items.filter(
                    item => item.tipoEvento.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 3) {
                this.maestroEventoFilter = this.items.filter(
                    item => item.presidente.nombreCompleto.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 4) {
                this.maestroEventoFilter = this.items.filter(
                    item => item.motivoFin.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }

        } else {
            if (this.seCambioActivo == true) { 
                if (this.activos) {
                    this.getListaActivos();
                } else {
                    this.getListaInactivos();
                }
                this.seCambioActivo = false;
            }
            this.enFiltro = false;
            this.maestroEventoFilter = this.items;

        }
    }
    OnRowClick(i:number,item:any) {
    }
    OnBuscar(){
        
    }
}