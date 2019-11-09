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
    public cb: Boolean;
    @Output() valueChange = new EventEmitter();
    @Output() nuevoComiteDisp = new EventEmitter();
    
    public listaEvParaAgregar: Array<Persona>;

    @Input('items')
    public items: Array<Persona>;

    public listaNuevoComiteDisp:Array<Persona>;
    
    public tam: number;
    public checks: Array<Boolean>;
    constructor() {
      //this.itemComite = this.itemEventoParent.comite;
      this.listaEvParaAgregar=new Array<Persona>();
      }
  
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;

    ngOnInit() {
      this.tam = this.items.length;
      //console.log(this.tam);
      this.checks= new Array<Boolean>(this.tam);
      for (var i = 0; i < this.tam; i++) {
        this.checks[i] = false;
      }
      this.maestroFiltro = this.items;
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
      this.valueChange.emit(this.listaEvParaAgregar);
      this.nuevoComiteDisp.emit(this.listaNuevoComiteDisp);

    }



    OnAgregarEv(){
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
      this.valueChange.emit(this.listaEvParaAgregar);
      this.nuevoComiteDisp.emit(this.listaNuevoComiteDisp);
    }


    filtro: String;
    filtroPersona: Evento;
    maestroFiltro: Array<Persona>;

    buscarUsuario() {
        if (this.filtro.length > 0) {
          this.maestroFiltro = this.items.filter(
            item => item.nombreCompleto.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
        )
        } else {
            this.maestroFiltro = this.items;
        }
    }
  
}