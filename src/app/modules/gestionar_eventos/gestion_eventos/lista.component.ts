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
  constructor( private authService: AeventAuthService,
    private toastr: ToastrService,
    private router: Router,
    private service: EventoService) {
    this.items = new Array<Evento>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
  }
  flagVer: Boolean;
  ngOnInit(): void {
      this.getEventosOrganizador();
  }
 
  getEventosOrganizador() {
    this.service.consultarAllEventoByOrganizador(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
      }
    );
  }
  
  OnNuevo() {
    this.router.navigate([`gestionOrganizadorEvento/eventos-organizador/nuevo`]);
  }
 
  OnEditar(item : Evento){
    this.router.navigate([`gestionOrganizadorEvento/eventos-organizador/editar/${item.idEvento}`]);
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
}