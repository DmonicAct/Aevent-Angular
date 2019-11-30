import { OnInit, Component, ViewChild, Input, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { Evento, Persona, TipoEvento, Lugar, Categoria, Response, Usuario, Paginacion } from '../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { esLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Location } from '@angular/common';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices, EvaluacionService } from '../../../../../services';
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

  @Input('pag-comite')
  public paginacionComite: Paginacion;


  @Input('item-comite')
  public comiteElegido: Array<Usuario>;

  @Input('listaEvAgregar')
  public listaEvAgregar: Array<Persona>;

  public evaluadoresDisponibles: Array<Persona>;
  public evElegidos: Array<Persona>;
  public tipo: String;
  public numeroTipo: number;
  public loading: boolean;
  public paginacion: Paginacion;
  public paginacionPropuestas: Paginacion;

  public nuevos: Array<Persona>; //Para ver que preferencias agregar
  public quitar: Array<Persona>; //Para ver que preferencias quitar
  public maestraAgregar: Array<Persona>;
  public nuevasPreferencias: Array<Preferencia>;
  public itemsFiltro = ["Nombre", "Usuario", "Correo"];
  public itemsFiltroComite = ["Nombre", "Usuario", "Correo"];
  public pref;
  public propuestas: Array<Propuesta>;
  public comiteFiltrado: Array<Persona>;
  public filtro: String;
  constructor(private toastr: ToastrService,
    private servicePersonas: PersonaService,
    private serviceEvaluacion: EvaluacionService,
    private authService: AeventAuthService,
    private servicePreferencia: PreferenciaService,
    private serviceEvento: EventoService,
    private _location: Location,
    private personaService: PersonaService) {
    this.comiteElegido = new Array<Usuario>();
    this.maestraAgregar = new Array<Persona>();
    this.paginacionPropuestas = new Paginacion({ pagina: 1, registros: 10 });

    this.evElegidos = new Array<Persona>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();
    this.filtro ='';
    //console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;
  isModalShownEvaluadores = false;

  @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;

  ngOnInit() {

    //this.getEvaluadoresDisponibles();

    this.paginacionComite = new Paginacion({ pagina: 1, registros: 10 });

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
  OnPageOptionChangedComite(event) {

  }
  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
    else if (this.tipo == "Usuario") {
      this.numeroTipo = 2;
    }
    else if (this.tipo == "Correo") {
      this.numeroTipo = 3;
    }
    else {
      this.numeroTipo = -1;
    }
    /*
    if (this.tipo == "Codigo"){
        this.numeroTipo = 4;
    }*/
  }

  enFiltro: Boolean;
  public disponibles:Array<Persona>;
  //eventoFiltro: Evento;
  buscarUsuario() {
    this.cambioFiltro();
    //console.log("numTipo: ",this.numeroTipo);
    
    //console.log("evaDisp: ",this.evaluadoresDisponibles);
    if (this.numeroTipo != -1) {
      console.log("filtro length: ", this.filtro.length);
      if (this.filtro.length > 0) {
        if (this.numeroTipo == 1) {
          this.servicePersonas.obtenerEvaluadoresByNombre(this.itemEventoParent.idEvento, this.filtro.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.disponibles = response.resultado;
              this.paginacion = response.paginacion;
              console.log("disponibles: ",this.disponibles);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipo == 2) {
          this.servicePersonas.obtenerEvaluadoresByUsername(this.itemEventoParent.idEvento, this.filtro.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.disponibles = response.resultado;
              this.paginacion = response.paginacion;
              console.log("disponibles: ",this.disponibles);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipo == 3) {
          this.servicePersonas.obtenerEvaluadoresByEmail(this.itemEventoParent.idEvento, this.filtro.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.disponibles = response.resultado;
              this.paginacion = response.paginacion;
              console.log("disponibles: ",this.disponibles);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }


      }
      else {
        this.disponibles = this.evaluadoresDisponibles;
        //console.log("comiteFiltrado: ",this.comiteFiltrado);
      }
    }
  }


  cambioFiltroComite() {
    if (this.tipoComite == "Nombre") {
      this.numeroTipoComite = 1;
    }
    else if (this.tipoComite == "Usuario") {
      this.numeroTipoComite = 2;
    }
    else if (this.tipoComite == "Correo") {
      this.numeroTipoComite = 3;
    }
    else {
      this.numeroTipoComite = -1;
    }
    /*
    if (this.tipo == "Codigo"){
        this.numeroTipo = 4;
    }*/
  }
  public tipoComite:String;
  public numeroTipoComite:number;
  public filtroComite: String;
  public maestroComiteFilter: Array<Persona>;
  buscarUsuarioComite() {
    this.cambioFiltroComite();
    //console.log("numTipo: ",this.numeroTipo);
    
    //console.log("evaDisp: ",this.evaluadoresDisponibles);
    if (this.numeroTipoComite != -1) {
      console.log("filtro length: ", this.filtroComite.length);
      if (this.filtroComite.length > 0) {
        if (this.numeroTipoComite == 1) {
          this.servicePersonas.obtenerEvaluadoresComiteByNombre(this.itemEventoParent.idEvento, this.filtroComite.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.comiteFiltrado = response.resultado;
              this.paginacion = response.paginacion;
              console.log("comiteFiltrado: ",this.comiteFiltrado);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoComite == 2) {
          this.servicePersonas.obtenerEvaluadoresComiteByUsername(this.itemEventoParent.idEvento, this.filtroComite.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.comiteFiltrado = response.resultado;
              this.paginacion = response.paginacion;
              console.log("comiteFiltrado: ",this.comiteFiltrado);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoComite == 3) {
          this.servicePersonas.obtenerEvaluadoresComiteByEmail(this.itemEventoParent.idEvento, this.filtroComite.toString(), this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.comiteFiltrado = response.resultado;
              this.paginacion = response.paginacion;
              console.log("comiteFiltrado: ",this.comiteFiltrado);
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }


      }
      else {
        this.comiteFiltrado = <Array<Persona>>this.comiteElegido;
        //console.log("comiteFiltrado: ",this.comiteFiltrado);
      }
    }
  }

  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getListaActivos();
  }

  obtenerComite() {
    this.personaService.getComite(this.itemEventoParent.idEvento, this.paginacionComite.pagina, this.paginacionComite.registros).subscribe(
      (response: Response) => {
        console.log(response)
        this.comiteElegido = response.resultado;
        this.agregarMaestraComite();
        this.paginacionComite = response.paginacion;
      }
    )

  }

  OnPageChangedComite(event): void {
    this.paginacionComite.pagina = event.page;
    this.obtenerComite();


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



  getListaActivos() {
    this.getEvaluadoresDisponibles();
  }


  ngOnLoad() {

  }
  //FUNCIONA PERO ESCALAR A FUTURO!

  onAgregarEvaluador() {

    //Paso reliminar para poder filtrar las personas del comite de los evaluadoresDisponibles
    this.getEvaluadoresDisponibles();

    //this.comiteElegido = this.itemEventoParent.comite;
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
              this.pref.descripcion = "SIN DETERMINAR";
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
            this.serviceEvaluacion.obtenerPropuestas(persona.idUsuario, 1, 100).subscribe(
              (response: Response) => {
                console.log(response)
                let localProp: Array<Evaluacion> = response.resultado;
                let verProp: Array<boolean> = new Array<boolean>(localProp.length);
                for (var i = 0; i < verProp.length; i++)
                  verProp[i] = false;
                //let posQ1: number;
                for (var j = 0; j < localProp.length; j++) {
                  //console.log("BEFORE DESASIGNAR: ", posQ1)
                  //debugger;
                  if (localProp[j].fase.idEvento == this.itemEventoParent.idEvento && verProp[j] == false) {
                    verProp[j] = true;
                    this.serviceEvaluacion.desasignarEvaluadorPropuesta(<number>localProp[j].idEvaluacion).subscribe(
                      (response: Response) => {
                        console.log(response.resultado)
                      }
                    )
                  }
                }
              }
            )
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

  actualizarQuitar() {
    for (var i = 0; i < this.nuevos.length; i++) {
      var pos = this.enQuitar(this.nuevos[i].idUsuario);
      if (pos != -1) {//si está en quitar...
        this.quitar.splice(pos, 1);
      }
    }
  }

  actualizarComiteEvento() {
    //se agrega los de MaestraAgregar
    for (var i = 0; i < this.maestraAgregar.length; i++) {
      this.comiteOrig.push(this.maestraAgregar[i]);
    }

    //se quita lo de quitar
    for (var i = 0; i < this.quitar.length; i++) {
      var pos = this.enComiteOriginal(this.quitar[i].idUsuario);
      if (pos != -1)
        this.comiteOrig.splice(pos, 1);
    }

  }

  public comiteOrig: Array<Persona>;
  onGuardarCambiosEvento() {
    //debugger;
    /*
    for (var i = 0; i < this.quitar.length; i++) {
      var indComite = this.enComite(this.quitar[i].idUsuario);
      if (indComite > -1) {
        this.comiteElegido.splice(indComite, 1);
      }
    }
    */
    //debugger;
    this.comiteOrig = Object.assign([], this.itemEventoParent.comite);
    this.actualizarQuitar();

    //debugger;
    if (this.comiteElegido != undefined || this.comiteElegido || this.comiteElegido != null) {
      //this.itemEventoParent.comite = this.comiteElegido;
      this.actualizarComiteEvento();


      this.itemEventoParent.comite = this.comiteOrig;
    }

    this.serviceEvento.guardarEvento(this.itemEventoParent).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.comiteElegido = this.itemEventoParent.comite;
          this.crearPreferencias();
          if (this.ver == true) {
            this.toastr.success(`Se ha actualizado la lista de evaluadores del evento con exito`, 'Aviso', { closeButton: true });
            this.paginacionComite.pagina = 1;
            this.paginacionComite.registros = 10;
            this.obtenerComite();
            console.log(this.nuevos)
            console.log(this.quitar)
            console.log(this.maestraAgregar)
            //this.maestraAgregar = new Array<Persona>();
          }
          else this.toastr.error(`Error al guardar el comité, contacteal administrador del Sistema`, 'Error', { closeButton: true });
        }
      }
    );
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

  agregarMaestraComite() {
    for (var i = 0; i < this.maestraAgregar.length; i++) {
      /*
      this.enComite(this.maestraAgregar[i].idUsuario)
      verFor = false;
      for (var j = 0; j < this.comiteElegido.length; j++)
        if (this.maestraAgregar[i].idUsuario == this.comiteElegido[j].idUsuario)
          verFor = true;*/
      if (this.enComite(this.maestraAgregar[i].idUsuario) == -1)
        this.comiteElegido.unshift(this.maestraAgregar[i]);
    }
  }


  OnAceptarEvaluadores() {
    //var verFor: boolean;    
    //Agrega a maestra y nuevos en caso no estén
    for (var i = 0; i < this.evElegidos.length; i++) {
      if (this.enMaestraAgregar(this.evElegidos[i].idUsuario) == -1)
        this.maestraAgregar.unshift(this.evElegidos[i]);
      if (this.enNuevos(this.evElegidos[i].idUsuario) == -1)
        this.nuevos.push(this.evElegidos[i]);
    }
    //agregas la maestra a comite
    this.agregarMaestraComite();
    //evElegidos nuevo    
    this.evElegidos = new Array<Persona>();
    this.isModalShownEvaluadores = false;
  }

  OnRetroceder() {
    this._location.back();
  }

  ElegirEvaluador(data, i) {//agrega o quita de evElegidos
    //debugger
    this.maestraAgregar;
    //var verComite = false;
    var pos = this.enEvElegidos(data.idUsuario)
    if (pos == -1) {/*
      for (var j = 0; j < this.evElegidos.length; j++) {
        if (data.idUsuario == this.evElegidos[j].idUsuario) {
          verComite = true;
          break;
        }

      }*/
      /*if (!verComite)*/ this.evElegidos.push(data);
    }
    else this.evElegidos.splice(pos, 1);


  }

  onQuitar(index, i) {
    //console.log(this.nuevos)
    var enNuevos: number = this.enNuevos(index.idUsuario);
    if (enNuevos == -1) {//SI NO ESTA EN NUEVOS ENTONCES SE AGREGA A QUITAR
      if (this.estadoRegistro(index.idUsuario) == 4) {//4==NO EN NUEVOS PERO SI EN QUITAR
        var indQuitar = this.enQuitar(index.idUsuario);
        this.quitar.splice(indQuitar, 1);

      } else if (this.estadoRegistro(index.idUsuario) == 3)//3= NO EN NUEVOS Y N O EN QUITAR
        this.quitar.push(index);
    }
    else {//SI ESTA EN NUEVOS
      var ind = this.enMaestraAgregar(index.idUsuario)
      //var ind = this.maestraAgregar.lastIndexOf(index);
      if (ind > -1) {//si está en maestraAgregar
        this.maestraAgregar.splice(ind, 1);
      }
      if (this.enQuitar(index.idUsuario) == -1)
        this.quitar.push(index);//necesario para el tema de visualización
      //MAESTRA nunca tendrá algo mas alla de lo que se agregué pero quitar si tendrá una recopilación de lo que se quitó de maestra
    }

  }

  /*  FUNCIONES DE BUSQUEDA  */
  enComite(id) {

    for (var i = 0; i < this.comiteElegido.length; i++) {
      if (this.comiteElegido[i].idUsuario == id) {
        return i;
      }
    }
    return -1;
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

  enComiteOriginal(id) {

    for (var i = 0; i < this.comiteOrig.length; i++) {
      if (this.comiteOrig[i].idUsuario == id) {
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

}