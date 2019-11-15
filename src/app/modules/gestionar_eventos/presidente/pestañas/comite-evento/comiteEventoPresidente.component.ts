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
import { Preferencia } from "src/app/models/preferencia";
import { Evaluacion } from "src/app/models/evaluacion";
import { PreferenciaService } from "src/app/services/preferencia.service";
import { Propuesta } from "src/app/models/propuesta";
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
  public comiteElegido: Array<Usuario>;

  @Input('listaEvAgregar')
  public listaEvAgregar: Array<Persona>;

  public evaluadoresDisponibles: Array<Persona>;

  public loading: boolean;

  public nuevos: Array<Persona>; //Para ver que preferencias agregar
  public quitar: Array<Persona>; //Para ver que preferencias quitar

  public nuevasPreferencias: Array<Preferencia>;
  public pref;
  public propuestas: Array<Propuesta>;
  constructor(private toastr: ToastrService,
    private servicePersonas: PersonaService,
    private authService: AeventAuthService,
    private servicePreferencia: PreferenciaService,
    private serviceEvento: EventoService,
    private _location: Location) {
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

    //this.loadComite();    

    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();

    this.propuestas = new Array<Propuesta>();
    this.serviceEvento.obtenerPropuestas(1, 1, 10).subscribe(
      (response: Response) => {
        this.propuestas = response.resultado;
        console.log(response, "gg");
      }
    );
  }
  /*
    async loadComite(){
      this.comiteElegido = await  this.waitComite();
  
      return this.comiteElegido;
  
    }
  
    waitComite(){
      while(1){
        if(this.itemEventoParent!=undefined && this.comiteElegido!=undefined)break;
  
      }
      console.log("ENDED");
      return this.itemEventoParent.comite;
    }
  */


  ngOnLoad() {

  }
  //FUNCIONA PERO ESCALAR A FUTURO!
  onAgregarEvaluador() {
    //Paso reliminar para poder filtrar las personas del comite de los evaluadoresDisponibles
    console.log("onAgregarEvaluador", this.listaEvAgregar);
    console.log("comiteElegido", this.comiteElegido);
    //debugger
    this.comiteElegido = this.itemEventoParent.comite;
    console.log("before: evaluadoresDisponibles", this.evaluadoresDisponibles);
    console.log("before: comite Elegido", this.comiteElegido);
    if (this.comiteElegido != undefined) {
      for (var i = 0; i < this.comiteElegido.length; i++) {
        var longEvDisponibles = this.evaluadoresDisponibles.length;
        for (var j = 0; j < longEvDisponibles; j++) {
          if (this.evaluadoresDisponibles[j].idUsuario == this.comiteElegido[i].idUsuario) {
            this.evaluadoresDisponibles.splice(j, 1)[0];
            break;
          }
        }
      }
    }
  }


  onGuardarCambiosEvento() {
    //  console.log("itemEventoParent", this.itemEventoParent);
    //console.log("listaEvAgregar", this.listaEvAgregar);
    //console.log("itemcomite", this.itemComite);
    if (this.listaEvAgregar != undefined || this.listaEvAgregar || this.listaEvAgregar != null) {
      //console.log("INSIDE THIS STUFF")
      this.itemEventoParent.comite = this.listaEvAgregar;
    }
    //    else this.itemEventoParent.comite = this.comiteElegido;
    //console.log(this.itemEventoParent);
    this.serviceEvento.guardarEvento(this.itemEventoParent).subscribe(
      (response: Response) => {
        this.comiteElegido = this.itemEventoParent.comite;
      //  console.log(response);
        //console.log("EVENTO SAVED");

        this.toastr.success(`Se ha actualizado la lista de evaluadores del evento con exito`, 'Aviso', { closeButton: true });

      }
    );
    this.nuevasPreferencias = new Array<Preferencia>();
    //Insertar Preferencias
    for (let persona of this.nuevos) {
      this.pref = new Preferencia();
      //console.log("entrando a nuevos", this.propuestas);
      for (let prop of this.propuestas) {
        //console.log("prop", prop);
        this.pref.descripcion = "Sin Determinar";
        this.pref.propuesta = prop;
        this.pref.usuario = persona;
        this.servicePreferencia.guardarPreferencia(this.pref).subscribe(
          (response: Response) => {
            //this.toastr.success(`Se ha guardado con exito`, 'Aviso', { closeButton: true });
          }
        );
        //console.log("insert preferencia");
      }
    }

    for (let persona of this.quitar) {
      this.pref = new Preferencia();
      for (let prop of this.propuestas) {
        //console.log("prop",prop)
        //console.log("persona",persona.idUsuario)
        //console.log("prop.idPropuesta number ", prop.idPropuesta)
        //console.log("prop.idPropuesta number ", <number>prop.idPropuesta)

        this.servicePreferencia.consultarByUsuarioAndPropuesta(persona.idUsuario, prop.idPropuesta.valueOf()).subscribe(
          (response: Response) => {
            this.pref = response.resultado;
            //  console.log("preferencia", this.pref);

            if (this.pref != null) {
              this.servicePreferencia.eliminarPreferencia(this.pref.id).subscribe(
                (response: Response) => {
                  console.log("delete preferencia",response);
                }
              );

            }

          }
        );

      }

    }

    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();

  }

  getList(items) {
    console.log("Items:", items);
    var lista = <Array<Persona>>items;
    this.swalComponent.nativeSwal.close();
    //Agregamos los evaluadores escogidos
    for (var p = 0; p < lista.length; p++) {

      this.comiteElegido.push(lista[p]);

      //Para preferencias
      if (this.quitar.includes(lista[p])) {
        var ind = this.quitar.lastIndexOf(lista[p]);
        this.quitar.splice(ind, 1);
      }
      else {
        this.nuevos.push(lista[p]);
      }
    }

    console.log("nuevos", this.nuevos);
    console.log("quitar", this.quitar);


    console.log(this.comiteElegido, "ss");
    this.listaEvAgregar = <Array<Persona>>this.comiteElegido;


  }

  OnRetroceder() {
    this._location.back();
  }

  onAgregar() {
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

  onQuitar(index, i) {

    //console.log("onQuitar index",index);
    //console.log("onQuitar i",i);
    //console.log("onQuitar evaluadoresDisponibles (BEFORE)",this.evaluadoresDisponibles);
    //console.log("onQuitar comiteElegido[i]",this.comiteElegido[i]);
    var usr = <Usuario>index;
    this.evaluadoresDisponibles.push(<Persona>(this.comiteElegido[i]));
    //console.log("onQuitar evaluadoresDisponibles (AFTER)",this.evaluadoresDisponibles);
    this.comiteElegido.splice(i, 1)[0];
    //console.log("onQuitar comiteElegido",this.comiteElegido);
    //console.log("nuevos before",this.nuevos);
    //console.log("quitar before",this.quitar);
    this.listaEvAgregar = <Array<Persona>>this.comiteElegido;
    if (this.nuevos.includes(index)) {
      var ind = this.nuevos.lastIndexOf(index);
      this.nuevos.splice(ind, 1);
    }
    else {
      this.quitar.push(index);
    }
    //console.log("nuevos", this.nuevos);
    //console.log("quitar", this.quitar);
  }

  onNuevoComiteDisp(nuevoComiteDisp) {
    if (nuevoComiteDisp != undefined) {
      this.evaluadoresDisponibles = <Array<Persona>>nuevoComiteDisp;
      console.log(this.evaluadoresDisponibles, "evaluadores disponibles");
    }
  }
}