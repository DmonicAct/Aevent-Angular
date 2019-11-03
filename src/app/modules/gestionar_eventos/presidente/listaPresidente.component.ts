import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evento, Paginacion } from '../../../models';
import { EventoService } from 'src/app/services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';


@Component({
  selector: 'lista-eventos-presidente',
  templateUrl: 'listaPresidente.template.html',
  styleUrls: ['listaPresidente.template.scss']
})

export class ListaEventosPresidente implements OnInit {
  public items: Array<Evento>;
  public paginacion: Paginacion;
  public loading: Boolean = false;
  constructor(private toastr: ToastrService,
    private authService: AeventAuthService,
    private router: Router,
    private service: EventoService) {
    this.items = new Array<Evento>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
  }
  flagVer: Boolean;
  ngOnInit(): void {
      this.getEventosPresidente();

  }
  
  OnOrganizador(){
    this.router.navigate([`Eventos/MisEventos/organizador`]);
  }

  getEventosPresidente() {
    this.service.consultarAllEventoByPresidente(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
        this.maestroEventoFilter = this.items;
      }
    );
  }
  OnEditar(item : Evento){
    this.router.navigate([`Eventos/MisEventos/presidente/ver/${item.idEvento}`]);
  }

  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getEventosPresidente();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getEventosPresidente();
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
    }

    public itemsFiltro = ["Título","Tipo"];

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
            
        } else {
            this.maestroEventoFilter = this.items;
        }
    }
}