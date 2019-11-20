import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evento, Paginacion } from '../../../models';
import { EventoService } from 'src/app/services/evento.service';
import { Estado, Response } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';


@Component({
  selector: 'lista-eventos',
  templateUrl: 'listaEventos.template.html',
  styleUrls: ['listaEventos.template.scss']
})

export class ListaEventos implements OnInit {
  public items: Array<Evento>;
  public paginacion: Paginacion;
  public loading: Boolean = false;
  constructor(private authService: AeventAuthService,
    private toastr: ToastrService,
    private router: Router,
    private serviceEvento: EventoService) {
    this.items = new Array<Evento>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
  }
  ngOnInit(): void {
    this.getEventosConvocatoria();

  }

  getEventosConvocatoria() {
    this.serviceEvento.consultarAllEventoEnabled(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
        this.paginacion = response.paginacion;
      }
    );
  }

  OnPostular(item: Evento) {
    this.router.navigate([`convocatoria/lista-eventos/postular/${item.idEvento}`]);
  }
  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getEventosConvocatoria();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getEventosConvocatoria();
  }

  OnRowClick(i:number,item:any) {
  }
}