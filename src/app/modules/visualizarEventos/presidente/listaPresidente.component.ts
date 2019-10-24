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
      this.getEventosByUsername();

  }
  
  getEventos() {
    this.service.obtenerEventos(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
      }
    );
  }
  
  getEventosByUsername() {
    this.service.obtenerEventosByUsername(this.authService.usuario.username, this.paginacion.pagina, this.paginacion.registros).subscribe(
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

  //cambiar por nueva funcion con paginacion
  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getEventos();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getEventos();
  }
}