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
 
  ngOnInit(): void {
      

  }
  
}