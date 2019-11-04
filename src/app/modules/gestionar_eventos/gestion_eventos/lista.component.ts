import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evento, Paginacion } from '../../../models';
import { EventoService } from '../../../services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';

@Component({
    selector: 'lista-eventos-organizador',
    templateUrl: 'lista.template.html',
    styleUrls: ['lista.template.scss']
})

export class ListaEventosOrganizador implements OnInit {
    public items: Array<Evento>;
    public paginacion: Paginacion;
    public loading: Boolean = false;
    public rolOrga: Boolean;
    constructor(private authService: AeventAuthService,
        private toastr: ToastrService,
        private router: Router,
        private service: EventoService) {
        this.items = new Array<Evento>();
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    }
    flagVer: Boolean;
    ngOnInit(): void {
        this.getEventosOrganizador();
        this.rolOrga = false;
        this.authService.usuario.roles.forEach(element => {
            var aux = '' + element;
            if (aux == 'ROLE_ORGANIZER') this.rolOrga = true;
        });
    }

    getEventosOrganizador() {
        this.service.consultarAllEventoByOrganizador(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
                this.items = response.resultado;
                this.maestroEventoFilter = this.items;
                console.log(this.items);
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

    cambioFiltro(){
        if (this.tipo == "Título"){
            this.numeroTipo = 1;
        }
        if (this.tipo == "Tipo"){
            this.numeroTipo = 2;
        }
        if (this.tipo == "Presidente"){
            this.numeroTipo = 3;
        }
    }

    public itemsFiltro = ["Título","Tipo","Presidente"];

    buscarEvento() {
        this.cambioFiltro();
        if (this.filtro.length > 0) {
            if (this.numeroTipo == 1){
                this.maestroEventoFilter = this.items.filter(
                    item => item.descripcion.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 2){
                this.maestroEventoFilter = this.items.filter(
                    item => item.tipoEvento.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            if (this.numeroTipo == 3){
                this.maestroEventoFilter = this.items.filter(
                    item => item.presidente.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1 ||
                    item.presidente.appaterno.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
                )
            }
            
        } else {
            this.maestroEventoFilter = this.items;
        }
    }
}