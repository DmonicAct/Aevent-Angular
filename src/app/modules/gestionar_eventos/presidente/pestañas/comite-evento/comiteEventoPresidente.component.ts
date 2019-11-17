import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario, Paginacion } from '../../../../../models'
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
  public evElegidos: Array<Persona>;
  public loading: boolean;
  public paginacion: Paginacion;
  public nuevos: Array<Persona>; //Para ver que preferencias agregar
  public quitar: Array<Persona>; //Para ver que preferencias quitar
  public maestraAgregar: Array<Persona>;
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
    this.maestraAgregar = new Array<Persona>();
    this.evElegidos = new Array<Persona>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();
    console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShownEvaluadores = false;

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
    //HARDCODEADO WTF

  }


  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getListaActivos();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getListaActivos();
  }

  OnHiddenPresidente(): void {
    this.isModalShownEvaluadores = false;
  }

  hideModalPresidente() {
    this.autoShownModal.hide();
  }

  ElegirEvaluador(data, i) {
    var verComite = false;
    var pos = this.enEvElegidos(data.idUsuario)
    if (pos == -1) {
      for (var j = 0; j < this.evElegidos.length; j++) {
        if (data.idUsuario == this.evElegidos[j].idUsuario) {
          verComite = true;
          break;
        }

      }
      if (!verComite) this.evElegidos.push(data);
    }
    else this.evElegidos.splice(pos, 1);


  }

  getListaActivos() {
    /*
    this.serviceUsuario.obtenerUsuariosActivos(this.paginacion.pagina, this.paginacion.registros).subscribe(
        (response: Response) => {
            this.itemsPersona = response.resultado;
            this.paginacion = response.paginacion;
            this.maestroUsuariosFilter = this.itemsPersona;
            this.selected = new Array<String>(this.itemsPersona.length).fill("");
        }
    );
    */
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
    this.isModalShownEvaluadores = true;
  }
  public ver: boolean;
  crearPreferencias() {
    this.ver = true;
    this.serviceEvento.obtenerPropuestas(this.itemEventoParent.idEvento, this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        if (response.estado = "OK") {
          this.propuestas = response.resultado;
          this.nuevasPreferencias = new Array<Preferencia>();
          //Insertar Preferencias
          for (let persona of this.nuevos) {
            this.pref = new Preferencia();
            for (let prop of this.propuestas) {
              this.pref.descripcion = "Sin Determinar";
              this.pref.propuesta = prop;
              this.pref.usuario = persona;
              this.servicePreferencia.guardarPreferencia(this.pref).subscribe(
                (response: Response) => {
                  if (response.estado = "ERROR") this.ver = false;
                }
              );
            }
          }
          for (let persona of this.quitar) {
            this.pref = new Preferencia();
            for (let prop of this.propuestas) {
              this.servicePreferencia.consultarByUsuarioAndPropuesta(persona.idUsuario, prop.idPropuesta.valueOf()).subscribe(
                (response: Response) => {
                  this.pref = response.resultado;
                  if (response.estado = "OK") {
                    if (this.pref != null) {
                      this.servicePreferencia.eliminarPreferencia(this.pref.id).subscribe(
                        (response: Response) => {
                          if (response.estado = "ERROR") this.ver = false;
                        }
                      );
                    }
                  }
                  else if (response.estado = "ERROR") this.ver = false;
                }
              );
            }
          }
          this.nuevos = new Array<Persona>();
          this.quitar = new Array<Persona>();
          //console.log(response, "gg");
        }
        else this.ver = false;
      }
    );
  }

  onGuardarCambiosEvento() {
    if (this.listaEvAgregar != undefined || this.listaEvAgregar || this.listaEvAgregar != null) {
      this.itemEventoParent.comite = this.listaEvAgregar;
    }
    this.serviceEvento.guardarEvento(this.itemEventoParent).subscribe(
      (response: Response) => {
        if (response.estado = "OK") {
          this.comiteElegido = this.itemEventoParent.comite;
          this.crearPreferencias();
          if (this.ver == true)
            this.toastr.success(`Se ha actualizado la lista de evaluadores del evento con exito`, 'Aviso', { closeButton: true });
          else this.toastr.error(`Error al guardar el comité, contacteal administrador del Sistema`, 'Error', { closeButton: true });
        }
      }
    );
  }
  enEvElegidos(id) {
    for (var i = 0; i < this.evElegidos.length; i++) {
      if (this.evElegidos[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }


  OnAceptarEvaluadores() {
    var verFor: boolean;
    for (var i = 0; i < this.evElegidos.length; i++) {
      verFor = false;
      console.log("onaceptar maestra before",this.maestraAgregar)
      for (var j = 0; j < this.maestraAgregar.length; j++)
        if (this.evElegidos[i].idUsuario == this.maestraAgregar[j].idUsuario)
          verFor = true;
      if (!verFor)
        this.maestraAgregar.unshift(this.evElegidos[i]);

    }
    console.log("onaceptar maestra after",this.maestraAgregar)
    for (var i = 0; i < this.maestraAgregar.length; i++)
      this.comiteElegido.unshift(this.evElegidos[i]);
    this.evElegidos = new Array<Persona>();
    this.isModalShownEvaluadores = false;
  }







  getList(items) {
    console.log("Items:", items);
    var lista = <Array<Persona>>items;
    //this.swalComponent.nativeSwal.close();
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