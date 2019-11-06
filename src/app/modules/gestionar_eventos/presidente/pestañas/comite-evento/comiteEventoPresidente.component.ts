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
import { SwalComponent } from '@toverux/ngx-sweetalert2';
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


  @Input('item-comite')
  public  comiteElegido: Array<Usuario>;

  @Input('listaEvAgregar')
  public listaEvAgregar:Array<Persona>;

  public evaluadoresDisponibles:Array<Persona>;

  public loading:boolean;

  
  
  
  constructor(
    private servicePersonas: PersonaService,
    private authService: AeventAuthService,
    private serviceEvento: EventoService,) {
    this.comiteElegido = new Array<Usuario>();
    

    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();
    console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
    }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  
  @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;

  ngOnInit() {
    this.servicePersonas.obtenerPersonas().subscribe(
      (response: Response) => {
        this.evaluadoresDisponibles = response.resultado;
        console.log(response);
        console.log("EvaluadoresDisponibles");
      }
    );

    

    
    
  }

  ngOnLoad(){

  }
  onAgregarEvaluador(){
    console.log(this.listaEvAgregar); 
    //debugger
    this.comiteElegido = this.itemEventoParent.comite;
    console.log("before",this.evaluadoresDisponibles);
    console.log("before: comite Elegido",this.comiteElegido);
    if(this.comiteElegido!=undefined){
    for(var i=0;i<this.comiteElegido.length;i++){
        var longEvDisponibles = this.evaluadoresDisponibles.length;
        for(var j=0;j<longEvDisponibles; j++){
          if(this.evaluadoresDisponibles[j].idUsuario == this.comiteElegido[i].idUsuario){
            this.evaluadoresDisponibles.splice(j, 1)[0];
            break;
          }
        }      
      }
    }


  }


  onGuardarCambiosEvento(){    
    this.itemEventoParent.comite=this.listaEvAgregar;
    console.log(this.itemEventoParent);
    this.serviceEvento.guardarEvento(this.itemEventoParent).subscribe(
      (response: Response) => {        
        console.log(response);
        console.log("EVENTO SAVED");
      }
    );



  }

  getList(items){
    console.log("Items:", items);
    var lista = <Array<Persona>> items;
    this.swalComponent.nativeSwal.close();
    //Agregamos los evaluadores escogidos
    for(var p=0; p<lista.length;p++){

      this.comiteElegido.push(lista[p]);
    }
    
    console.log(this.comiteElegido,"ss");
    this.listaEvAgregar = <Array<Persona>> this.comiteElegido;

    
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
  
  onQuitar(index,i){ 
    
    console.log(index);
    console.log(i);
    console.log(this.evaluadoresDisponibles);
    console.log(this.comiteElegido[index]);
    var usr = <Usuario>index;
    this.evaluadoresDisponibles.push(<Persona>(this.comiteElegido[i]));
    console.log(this.evaluadoresDisponibles);
    this.comiteElegido.splice(i, 1)[0];

  }

  onNuevoComiteDisp(nuevoComiteDisp){
    if(nuevoComiteDisp!=undefined){
      this.evaluadoresDisponibles=<Array<Persona>>nuevoComiteDisp;  
      console.log(this.evaluadoresDisponibles,"evaluadores disponibles");
    }
  }
}