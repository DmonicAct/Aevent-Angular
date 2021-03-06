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
    selector: 'agregar-evaluador-propuestas',
    templateUrl: './agregar-evaluador-propuestas.component.html',
    styleUrls: ['./agregar-evaluador-propuestas.component.scss']
  })
  export class AgregarEvaluadorPropuesta implements OnInit {
    public cb: Boolean;
    @Output() valueChange = new EventEmitter();
    @Output() nuevoComiteDisp = new EventEmitter();
    
    public listaEvParaAgregar: Array<Persona>;

    @Input('items')
    public items: Array<Persona>;

    @Input('i')
    public posTabla: Number;

    public listaNuevoComiteDisp:Array<Persona>;
    
    public tam: number;
    public checks: Array<Boolean>;
    constructor() {
      //this.itemComite = this.itemEventoParent.comite;
      this.listaEvParaAgregar=new Array<Persona>();
      }
  
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;

    ngOnInit() {
      if(this.items!=undefined){
        this.tam = this.items.length;
        //console.log(this.tam);
        this.checks= new Array<Boolean>(this.tam);
        for (var i = 0; i < this.tam; i++) {
          this.checks[i] = false;
        }
      }
    }

    ngAfterViewInit() {
      jQuery('.full-height-scroll').slimscroll({
          height: '100%'
      });
  }

    OnSelectAll(){
      if(!this.cb){
        for (var i = 0; i < this.tam; i++) {
          this.checks[i] = true;
        }

      }else{
        for (var i = 0; i < this.tam; i++) {
          this.checks[i] = false;
        }

      }

    }

    OnDeselectAll(){

    }
    OnCancel(){
      console.log("Valor de i ", this.posTabla);
      this.valueChange.emit(this.listaEvParaAgregar);
      this.nuevoComiteDisp.emit(this.listaNuevoComiteDisp);

    }



    OnAgregarEv(){
      console.log("Valor de i ", this.posTabla);
      this.listaEvParaAgregar=new Array<Persona>();
      this.listaNuevoComiteDisp=new Array<Persona>();
      for (var i = 0; i < this.tam; i++) {
        if(this.checks[i]){
            this.listaEvParaAgregar.push(this.items[i]);
        }
        else{
          this.listaNuevoComiteDisp.push(this.items[i])
        }
      }
      console.log("in swal: value of listaEvparaagregar",this.listaEvParaAgregar);
      
      this.valueChange.emit(this.listaEvParaAgregar);
      this.nuevoComiteDisp.emit(this.listaEvParaAgregar);
      console.log("in swal: value of nuevo comite");
      console.log(this.nuevoComiteDisp);
    }

  
}