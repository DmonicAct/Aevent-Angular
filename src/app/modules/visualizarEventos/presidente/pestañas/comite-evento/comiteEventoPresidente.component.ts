import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario } from '../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../services';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { AuthService as AeventAuthService } from '../../../../../auth/service/auth.service';
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'comiteEventoPresidente',
  templateUrl: './comiteEventoPresidente.component.html',
  styleUrls: ['./comiteEventoPresidente.component.scss']
})
export class ComiteEventoVer implements OnInit {
  public itemEvento: Evento;
  public itemComite: Array<Usuario>;

  @Output() savedItem = new EventEmitter<any>();

  @Input('item-presidente')
  public itemPresidente_parent;
  //Evento de Padre
  @Input('item-evento')
  public itemEventoParent: Evento;
  
  constructor(
    private servicePersonas: PersonaService,
    private serviceEvento: EventoService,) { 

    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();
    console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
    }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  
  ngOnInit() {
    
  }
  onAgregarEvaluador(){


  }

  onAgregar(){
    /*this.serviceEvento.obtenerEvento(this.item.idEvento).subscribe(
      (response: Response) => {
          this.itemEvento = response.resultado;
          this.itemComite = this.itemEvento.comite;
          this.itemComite.map((i) => { 
              i.fullName = i.nombre + ' ' + i.appaterno + ' ' + i.apmaterno ; return i; 
          });
          if(this.item && this.item.presidente){
              for(let i=0;i<this.itemsPersona.length;i++){
                  if(this.itemsPersona[i].idUsuario==this.item.presidente.idUsuario){
                      this.item.presidente.fullName = this.itemsPersona[i].nombre + ' ' + this.itemsPersona[i].appaterno + ' ' + this.itemsPersona[i].apmaterno ;
                      break;
                  }
              }
          }
          
      }
  );*/
  }
  
  onQuitar(){}
}