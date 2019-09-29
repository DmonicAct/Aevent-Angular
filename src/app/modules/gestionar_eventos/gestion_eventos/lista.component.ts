import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
    selector: 'lista-eventos-organizador',
    templateUrl: 'lista.template.html',
    styleUrls: ['lista.template.scss']
  })

  export class ListaEventosOrganizador implements OnInit{
    
    constructor(private toastr: ToastrService, 
      private router: Router){

    }
    ngOnInit(): void {

    }
    OnNuevo(){
      this.router.navigate([`gestionOrganizadorEvento/eventos-organizador/nuevo`]);
    }
  }