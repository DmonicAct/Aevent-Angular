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
import { Evaluacion } from 'src/app/models/evaluacion';
import { e } from '@angular/core/src/render3';


@Component({
    selector:'asignar-propuestas',
    templateUrl:'asignar-propuestas.template.html',
    styleUrls:['asignar-propuestas.template.scss']
})

export class AsignarPropuestasVer implements OnInit{
    public itemEvento: Evento;
    public itemComite: Array<Usuario>;

    public maestraAgregar: Array<Evaluacion>;
    public maestraQuitar: Array<Evaluacion>;


    public evaluadoresDisponibles: Array<Usuario>;
  
    @Output() savedItem = new EventEmitter<any>();
  /*
    @Input('item-presidente')
    public itemPresidente_parent;
    //Evento de Padre

    */
    @Input('item-evento')
    public itemEventoParent: Evento;
  
  
    @Input('item-comite-propuesta')
    private  comiteElegido: Array<Usuario>;


    @Input('item-propuestas')
    public  propuestasEvento: Array<Propuesta>;
  /*
    @Input('listaEvAgregar')
    public listaEvAgregar:Array<Persona>;
  */

    public propuestasEvento2: Array<Propuesta>;
    //public evaluadoresDisponibles:Array<Persona>;
  
    public loading:boolean;
    public paginacion: Paginacion;
    
    
    
    constructor(
      private servicePersonas: PersonaService,      
      private authService: AeventAuthService,
      private serviceEvento: EventoService,) {
      this.comiteElegido = new Array<Usuario>();
      this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
      this.evaluadoresDisponibles = new Array<Usuario>();
  this.maestraAgregar= new Array<Evaluacion>();
  
      this.itemEvento = new Evento();
      this.itemComite = new Array<Usuario>();
      //console.log(this.itemEventoParent);
      //this.itemComite = this.itemEventoParent.comite;
      }
  
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    
    @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;
  
    ngOnInit() {

      
      
  
      
  
      
      
    }
    onNuevoComiteDisp(nuevoComiteDisp){
      if(nuevoComiteDisp!=undefined){
      for(var i=0;i<nuevoComiteDisp.length;i++){
        var ver=false;

        if(this.maestraAgregar!=undefined){
        for(var j=0;j<this.maestraAgregar.length;j++){
          if(this.maestraAgregar[j].idEvaluacion==nuevoComiteDisp[i].idEvaluacion && this.maestraAgregar[j].idPropuesta==nuevoComiteDisp[i].idEvaluacion)
          ver=true;
        }
        if(!ver){
          let  e1:Evaluacion = new Evaluacion();
          //e1.idEvaluacion=
          this.maestraAgregar.push(nuevoComiteDisp[i]);
        }
      }


      }
    }
    }

    onConfigurar(item){
      let localEvaluadores: Array<Persona> = item.evaluadoresAsignados;
      //this.comiteElegido = this.itemEventoParent.comite;
      console.log("COMITE ELEGIDO",this.comiteElegido);
      console.log("LOCAL",localEvaluadores);
      this.evaluadoresDisponibles=new Array<Usuario>();
      this.evaluadoresDisponibles=Object.assign([],this.comiteElegido);
      //this.evaluadoresDisponibles:Array<Persona> = <Array<Persona>>(this.comiteElegido);
      if(item.evaluadoresAsignados!=undefined){
        for(var i=0;i<localEvaluadores.length;i++){
          var longEvDisponibles = this.evaluadoresDisponibles.length;
          for(var j=0;j<longEvDisponibles; j++){
            if(localEvaluadores[i].idUsuario == this.evaluadoresDisponibles[j].idUsuario){
              this.evaluadoresDisponibles.splice(j, 1)[0];
              break;
            }
          }      
        }
      }
      console.log("FINAL",this.evaluadoresDisponibles);
    }
  
}