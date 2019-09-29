import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Evento,Paginacion } from '../../../models';


@Component({
    selector: 'lista-eventos-organizador',
    templateUrl: 'lista.template.html',
    styleUrls: ['lista.template.scss']
  })

  export class ListaEventosOrganizador implements OnInit{
    public items: Array<Evento>;
    public paginacion: Paginacion;
    constructor(private toastr: ToastrService, 
      private router: Router){
        this.items= new Array<Evento>();
        this.paginacion = new Paginacion({pagina:1,registros:10});
    }
    ngOnInit(): void {

    }
    OnNuevo(){
      this.router.navigate([`gestionOrganizadorEvento/eventos-organizador/nuevo`]);
    }
  }