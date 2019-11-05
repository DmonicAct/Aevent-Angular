import {Component, OnInit,ViewChild,EventEmitter,Input,Output} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { Evento, Response, Persona, FormularioCFP, Division, Usuario, Paginacion } from '../../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices } from '../../../../../services';
import { DetalleEventoVer } from '.././detalle-evento/detalleEventoPresidente.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ComiteEventoVer } from '.././comite-evento/comiteEventoPresidente.component';

import { VerFormatoPresidente} from '.././call-for-papers-view/verFormato.component';
import { AuthService as AeventAuthService } from '../../../../../auth/service/auth.service';

import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Propuesta } from 'src/app/models/propuesta';


@Component({
    selector:'asignar-propuestas',
    templateUrl:'asignar-propuestas.template.html',
    styleUrls:['asignar-propuestas.template.scss']
})

export class AsignarPropuestasVer implements OnInit{
    public itemEvento: Evento;
    public itemComite: Array<Usuario>;
  
    @Output() savedItem = new EventEmitter<any>();
  /*
    @Input('item-presidente')
    public itemPresidente_parent;
    //Evento de Padre

    */
    @Input('item-evento')
    public itemEventoParent: Evento;
  
  
    @Input('item-comite')
    public  comiteElegido: Array<Usuario>;


    @Input('item-propuestas')
    public  propuestasEvento: Array<Propuesta>;
  /*
    @Input('listaEvAgregar')
    public listaEvAgregar:Array<Persona>;
  */

    public propuestasEvento2: Array<Propuesta>;
    public evaluadoresDisponibles:Array<Persona>;
  
    public loading:boolean;
    public paginacion: Paginacion;
    
    
    
    constructor(
      private servicePersonas: PersonaService,      
      private authService: AeventAuthService,
      private serviceEvento: EventoService,) {
      this.comiteElegido = new Array<Usuario>();
      this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
  
  
      this.itemEvento = new Evento();
      this.itemComite = new Array<Usuario>();
      //console.log(this.itemEventoParent);
      //this.itemComite = this.itemEventoParent.comite;
      }
  
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    
    @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;
  
    ngOnInit() {
      
  
      
  
      
      
    }
  
}