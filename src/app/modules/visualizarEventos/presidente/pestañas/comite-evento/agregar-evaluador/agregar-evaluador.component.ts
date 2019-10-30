import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
declare var jQuery: any;


@Component({
    selector: 'agregar-evaluador',
    templateUrl: './agregar-evaluador.component.html',
    styleUrls: ['./agregar-evaluador.component.scss']
  })
  export class AgregarEvaluador implements OnInit {
  
    @Input('items')
    public items: Array<Persona>;
    
    constructor() {
      //this.itemComite = this.itemEventoParent.comite;
      }
  
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    
    ngOnInit() {
  
    }

    ngAfterViewInit() {
      jQuery('.full-height-scroll').slimscroll({
          height: '100%'
      });
  }

  
}