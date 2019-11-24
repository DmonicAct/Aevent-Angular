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
  public tipo:String;
  public numeroTipo:number;
  public loading: boolean;
  public paginacion: Paginacion;
  public paginacionPropuestas: Paginacion;
  public nuevos: Array<Persona>; //Para ver que preferencias agregar
  public quitar: Array<Persona>; //Para ver que preferencias quitar
  public maestraAgregar: Array<Persona>;
  public nuevasPreferencias: Array<Preferencia>;
  public itemsFiltro = ["Nombre", "Usuario", "Correo"];
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
    this.paginacionPropuestas = new Paginacion({ pagina: 1, registros: 10 });
    this.evElegidos = new Array<Persona>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();
    //console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShownEvaluadores = false;

  @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;

  ngOnInit() {

    //this.getEvaluadoresDisponibles();



    //this.loadComite();  
    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();
    this.propuestas = new Array<Propuesta>();
    

  }
  getEvaluadoresDisponibles() {
    this.servicePersonas.obtenerEvaluadoresDisponibles(this.itemEventoParent.idEvento, this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        //       console.log(response.resultado)
        this.evaluadoresDisponibles = response.resultado;
        this.paginacion = response.paginacion;
        //     console.log(response.paginacion)
        //debugger
      }
    )

  }
  
  cambioFiltro(){
    if (this.tipo == "Nombre"){
        this.numeroTipo = 1;
    }
    if (this.tipo == "Usuario"){
        this.numeroTipo = 2;
    }
    if (this.tipo == "Correo"){
        this.numeroTipo = 3;
    }/*
    if (this.tipo == "Codigo"){
        this.numeroTipo = 4;
    }*/
  }

  filtro: String;
  enFiltro: Boolean;
  //eventoFiltro: Evento;
  maestroComiteFilter: Array<Evento>;

  buscarUsuario() {
    this.cambioFiltro();
    //console.log("numTipo: ",this.numeroTipo);
    //console.log("filtro length: ",this.filtro.length);
    //console.log("evaDisp: ",this.evaluadoresDisponibles);
    if (this.filtro.length > 0) {
      if (this.numeroTipo == 1) {
          this.maestroComiteFilter = this.evaluadoresDisponibles.filter(
              item => item.nombreCompleto.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
          )
          console.log("maestroDisp: ",this.maestroComiteFilter);
      }
      if (this.numeroTipo == 2) {
          this.maestroComiteFilter = this.evaluadoresDisponibles.filter(
              item => item.username.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
          )
          console.log("maestro: ",this.maestroComiteFilter);
      }
      if (this.numeroTipo == 3) {
          this.maestroComiteFilter = this.evaluadoresDisponibles.filter(
              item => item.email.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
          )
          console.log("maestroDisp: ",this.maestroComiteFilter);
      }
      

  }
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
    //debugger
    this.maestraAgregar;
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
    this.getEvaluadoresDisponibles();
  }


  ngOnLoad() {

  }
  //FUNCIONA PERO ESCALAR A FUTURO!

  onAgregarEvaluador() {

    //Paso reliminar para poder filtrar las personas del comite de los evaluadoresDisponibles
    this.getEvaluadoresDisponibles();

    this.comiteElegido = this.itemEventoParent.comite;
    /* 
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
    */
    this.isModalShownEvaluadores = true;
  }

  public ver: boolean;
  crearPreferencias() {
    this.ver = true;
    this.serviceEvento.obtenerPropuestas(this.itemEventoParent.idEvento, this.paginacionPropuestas.pagina, this.paginacionPropuestas.registros).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          //console.log("REPONSE OBTENER PROPUESTAS", response.resultado);
          this.propuestas = response.resultado;
          this.nuevasPreferencias = new Array<Preferencia>();
          //Insertar Preferencias
          //debugger
          //console.log("MAESTRA AGREGAR - AGREGAR PREFERENCIAS", this.maestraAgregar)
          for (let persona of this.maestraAgregar) {
            console.log(this.maestraAgregar)
            this.pref = new Preferencia();
            console.log(this.propuestas)
            for (let prop of this.propuestas) {
              this.pref.descripcion = "Sin Determinar";
              this.pref.propuesta = prop;
              this.pref.usuario = persona;
              //console.log("PREFERENCIA A GUARDAR", this.pref)
              this.servicePreferencia.guardarPreferencia(this.pref).subscribe(
                (response: Response) => {
                  if (response.estado == "ERROR") this.ver = false;
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
                  if (response.estado == "OK") {
                    if (this.pref != null) {
                      this.servicePreferencia.eliminarPreferencia(this.pref.id).subscribe(
                        (response: Response) => {
                          if (response.estado == "ERROR") this.ver = false;
                        }
                      );
                    }
                  }
                  else if (response.estado == "ERROR") this.ver = false;
                }
              );
            }
          }
          this.nuevos = new Array<Persona>();
          this.quitar = new Array<Persona>();
          this.maestraAgregar = new Array<Persona>();
          //console.log(response, "gg");
        }
        else this.ver = false;
        if (this.ver == false) this.toastr.error(`Hubo problemas administrando las preferencias`, 'Error', { closeButton: true })
      }
    );
  }

  onGuardarCambiosEvento() {

    for (var i = 0; i < this.quitar.length; i++) {
      var indComite = this.comiteElegido.lastIndexOf(this.quitar[i]);
      if (indComite > -1) {
        this.comiteElegido.splice(indComite, 1);
      }
    }


    if (this.comiteElegido != undefined || this.comiteElegido || this.comiteElegido != null) {
      this.itemEventoParent.comite = this.comiteElegido;
    }


    this.serviceEvento.guardarEvento(this.itemEventoParent).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.comiteElegido = this.itemEventoParent.comite;
          this.crearPreferencias();
          if (this.ver == true) {
            this.toastr.success(`Se ha actualizado la lista de evaluadores del evento con exito`, 'Aviso', { closeButton: true });
            //this.maestraAgregar = new Array<Persona>();
          }
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

  enMaestraAgregar(id) {
    for (var i = 0; i < this.maestraAgregar.length; i++) {
      if (this.maestraAgregar[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }



  enNuevos(id) {
    for (var i = 0; i < this.nuevos.length; i++) {
      if (this.nuevos[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }

  enQuitar(id) {
    for (var i = 0; i < this.quitar.length; i++) {
      if (this.quitar[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }

  estadoRegistro(id) {
    var enNuevos: number = this.enNuevos(id);
    var enQuitar: number = this.enQuitar(id);
    if (enNuevos > -1 && enQuitar == -1)
      return 1;
    else if (enNuevos > -1 && enQuitar > -1)
      return 2;
    else if (enNuevos == -1 && enQuitar == -1)
      return 3;
    else if (enNuevos == -1 && enQuitar > -1)
      return 4;

  }


  OnAceptarEvaluadores() {
    var verFor: boolean;
    //debugger
    //console.log("onaceptar maestra before", this.maestraAgregar)
    for (var i = 0; i < this.evElegidos.length; i++) {
      verFor = false;

      for (var j = 0; j < this.maestraAgregar.length; j++)
        if (this.evElegidos[i].idUsuario == this.maestraAgregar[j].idUsuario)
          verFor = true;
      if (!verFor) {
        this.maestraAgregar.unshift(this.evElegidos[i]);
        if (this.enNuevos(this.evElegidos[i].idUsuario) == -1)
          this.nuevos.push(this.evElegidos[i]);
      }

    }
    //console.log("onaceptar maestra after", this.maestraAgregar)

    for (var i = 0; i < this.maestraAgregar.length; i++) {
      verFor = false;
      for (var j = 0; j < this.comiteElegido.length; j++)
        if (this.maestraAgregar[i].idUsuario == this.comiteElegido[j].idUsuario)
          verFor = true;
      if (!verFor)
        this.comiteElegido.unshift(this.maestraAgregar[i]);

    }
    this.evElegidos = new Array<Persona>();
    this.isModalShownEvaluadores = false;
  }

  OnRetroceder() {
    this._location.back();
  }

  onQuitar(index, i) {
    //console.log(this.nuevos)
    var enNuevos: number = this.enNuevos(index.idUsuario);
    if (enNuevos == -1) {
      if (this.estadoRegistro(index.idUsuario) == 4) {
        var indQuitar = this.quitar.lastIndexOf(index);
        this.quitar.splice(indQuitar, 1);

      } else if (this.estadoRegistro(index.idUsuario) == 3)
        this.quitar.push(index);
    }
    else {
      var ind = this.maestraAgregar.lastIndexOf(index);
      if (ind > -1) {
        this.maestraAgregar.splice(ind, 1);
      }
      this.quitar.push(index);
    }

  }

  onNuevoComiteDisp(nuevoComiteDisp) {
    if (nuevoComiteDisp != undefined) {
      this.evaluadoresDisponibles = <Array<Persona>>nuevoComiteDisp;
      //console.log(this.evaluadoresDisponibles, "evaluadores disponibles");
    }
  }
}