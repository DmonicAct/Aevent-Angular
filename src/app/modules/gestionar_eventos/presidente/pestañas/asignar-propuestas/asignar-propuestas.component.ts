import { Component, OnInit, ViewChild, EventEmitter, Input, Output, ɵConsole } from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { Evento, Response, Persona, FormularioCFP, Division, Usuario, Paginacion, Fase } from '../../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaService, CategoriaService, LugarService, EventoService, TipoEventoServices, EvaluacionService } from '../../../../../services';
import { DetalleEventoVer } from '.././detalle-evento/detalleEventoPresidente.component';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ComiteEventoVer } from '.././comite-evento/comiteEventoPresidente.component';
import { Location } from '@angular/common';
import { AuthService as AeventAuthService } from '../../../../../auth/service/auth.service';

import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { Propuesta } from 'src/app/models/propuesta';
import { Evaluacion } from 'src/app/models/evaluacion';
import { e } from '@angular/core/src/render3';
import { PreferenciaService } from 'src/app/services/preferencia.service';
import { Preferencia } from 'src/app/models/preferencia';


@Component({
  selector: 'asignar-propuestas',
  templateUrl: 'asignar-propuestas.template.html',
  styleUrls: ['asignar-propuestas.template.scss']
})

export class AsignarPropuestasVer implements OnInit {
  public itemEvento: Evento;
  public itemComite: Array<Usuario>;

  public posTabla: number;

  public maestraAgregar: Array<Evaluacion>;
  public maestraQuitar: Array<Evaluacion>;

  public propElegida: Propuesta;


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
  private comiteElegido: Array<Usuario>;


  @Input('item-propuestas')
  public propuestasEvento: Array<Propuesta>;

  @Input('item-pag')
  public pagPropuestas: Paginacion;
  /*
    @Input('listaEvAgregar')
    public listaEvAgregar:Array<Persona>;
  */
  public listaEvaluadoresDisponibles:Array<Persona>;
  public propuestasEvento2: Array<Propuesta>;
  //public evaluadoresDisponibles:Array<Persona>;

  public loading: boolean;
  //public paginacion: Paginacion;

  public isModalShownPropuestaDetalle: boolean;
  public isModalShownEvaluadores: boolean;
  public paginacionComite: Paginacion;
  //public paginacionPropuestas: Paginacion;
  public paginacionEval: Paginacion;
  public actualPropuesta: Propuesta;
  public prefComite: Array<Preferencia>;
  public nuevos: Array<Persona>;
  public quitar: Array<Persona>;
  public maestraAgregarProp: Array<Persona>;
  public evElegidos: Array<Persona>;
  public itemsFiltroEvaluadoresAsignados = ["Nombre", "Usuario", "Correo"];
  public itemsFiltroEvaluadoresDisponibles= ["Nombre", "Usuario", "Correo"];

  constructor(
    private servicePreferencia: PreferenciaService,
    private serviceEvaluacion: EvaluacionService,
    private servicePersonas: PersonaService,
    private authService: AeventAuthService,
    private toastr: ToastrService,
    private _location: Location,
    private serviceEvento: EventoService, ) {
    this.comiteElegido = new Array<Usuario>();
    //this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    this.paginacionEval = new Paginacion({ pagina: 1, registros: 10 });
    this.paginacionComite = new Paginacion({ pagina: 1, registros: 10 });
    //this.pagPropuestas = new Paginacion({ pagina: 1, registros: 10 });
    this.evaluadoresDisponibles = new Array<Usuario>();
    this.maestraAgregar = new Array<Evaluacion>();
    this.prefComite = new Array<Preferencia>();
    this.isModalShownEvaluadores = false;
    this.isModalShownPropuestaDetalle = false;

    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();
    this.maestraAgregarProp = new Array<Persona>();
    this.evElegidos = new Array<Persona>();


    this.propElegida = new Propuesta();
    this.itemEvento = new Evento();
    this.itemComite = new Array<Usuario>();

    this.actualPropuesta = new Propuesta();

    this.filtroEvaluadoresAsignados= '';
    this.filtroEvaluadoresDisponibles = '';


    //console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;

  ngOnInit() {
    this.pagPropuestas = new Paginacion({ pagina: 1, registros: 10 });
  }

  cambioFiltroEvaluadoresAsignados() {
    if (this.tipoEvaluadoresAsignados == "Nombre") {
      this.numeroTipoEvaluadoresAsignados = 1;
    }
    else if (this.tipoEvaluadoresAsignados == "Usuario") {
      this.numeroTipoEvaluadoresAsignados = 2;
    }
    else if (this.tipoEvaluadoresAsignados == "Correo") {
      this.numeroTipoEvaluadoresAsignados = 3;
    }
    else {
      this.numeroTipoEvaluadoresAsignados = -1;
    }
    /*
    if (this.tipo == "Codigo"){
        this.numeroTipo = 4;
    }*/
  }
  public tipoEvaluadoresAsignados:String;
  public numeroTipoEvaluadoresAsignados:number;
  public evAsignadosFiltrados:Array<Persona>;
  public filtroEvaluadoresAsignados:String;
  enFiltro: Boolean;
  //eventoFiltro: Evento;
  public maestroEvaluadoresAsignados: Array<Persona>;
  buscarUsuarioEvaluadoresAsignados() {
    this.cambioFiltroEvaluadoresAsignados();
    //console.log("numTipo: ",this.numeroTipo);
    
    //console.log("evaDisp: ",this.evaluadoresDisponibles);
    if (this.numeroTipoEvaluadoresAsignados != -1) {
      console.log("filtro length: ", this.filtroEvaluadoresAsignados.length);
      if (this.filtroEvaluadoresAsignados.length > 0) {
        if (this.numeroTipoEvaluadoresAsignados == 1) {
          this.servicePersonas.obtenerEvaluadoresAsignadosAPropuestaByNombre(this.propElegida.idPropuesta, this.filtroEvaluadoresAsignados.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.evAsignadosFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Asignados: ",this.evAsignadosFiltrados);
              this.propElegida.evaluadoresAsignados=this.evAsignadosFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoEvaluadoresAsignados == 2) {
          this.servicePersonas.obtenerEvaluadoresAsignadosAPropuestaByUsername(this.propElegida.idPropuesta, this.filtroEvaluadoresAsignados.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.evAsignadosFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Asignados: ",this.evAsignadosFiltrados);
              this.propElegida.evaluadoresAsignados=this.evAsignadosFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoEvaluadoresAsignados == 3) {
          this.servicePersonas.obtenerEvaluadoresAsignadosAPropuestaByEmail(this.propElegida.idPropuesta, this.filtroEvaluadoresAsignados.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.evAsignadosFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Asignados: ",this.evAsignadosFiltrados);
              this.propElegida.evaluadoresAsignados=this.evAsignadosFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }


      }
      else {
        this.propElegida.evaluadoresAsignados = this.evalOriginales;
        //console.log("comiteFiltrado: ",this.comiteFiltrado);
      }
    }
  }



  cambioFiltroEvaluadoresDisponibles() {
    if (this.tipoEvaluadoresDisponibles == "Nombre") {
      this.numeroTipoEvaluadoresDisponibles = 1;
    }
    else if (this.tipoEvaluadoresDisponibles == "Usuario") {
      this.numeroTipoEvaluadoresDisponibles = 2;
    }
    else if (this.tipoEvaluadoresDisponibles == "Correo") {
      this.numeroTipoEvaluadoresDisponibles = 3;
    }
    else {
      this.numeroTipoEvaluadoresDisponibles = -1;
    }
    /*
    if (this.tipo == "Codigo"){
        this.numeroTipo = 4;
    }*/
  }
  public tipoEvaluadoresDisponibles:String;
  public numeroTipoEvaluadoresDisponibles:number;
  public prefDisponiblesFiltrados:Array<Preferencia>;
  public filtroEvaluadoresDisponibles:String;
  enFiltroEvaluadoresDisponibles: Boolean;
  public maestraEvaluadoresDisponibles: Array<Persona>;
  //eventoFiltro: Evento;
  buscarUsuarioEvaluadoresDisponibles() {
    this.cambioFiltroEvaluadoresDisponibles();
    //console.log("numTipo: ",this.numeroTipo);
    
    //console.log("evaDisp: ",this.evaluadoresDisponibles);
    if (this.numeroTipoEvaluadoresDisponibles != -1) {
      console.log("filtro length: ", this.filtroEvaluadoresDisponibles.length);
      if (this.filtroEvaluadoresDisponibles.length > 0) {
        if (this.numeroTipoEvaluadoresDisponibles == 1) {
          this.servicePreferencia.obtenerPreferenciasByNombreEvaluador(this.itemEventoParent.idEvento,this.propElegida.idPropuesta, this.filtroEvaluadoresDisponibles.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.prefDisponiblesFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Disp: ",this.prefDisponiblesFiltrados);
              this.prefComite = this.prefDisponiblesFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoEvaluadoresDisponibles == 2) {
          this.servicePreferencia.obtenerPreferenciasByUsernameEvaluador(this.itemEventoParent.idEvento,this.propElegida.idPropuesta, this.filtroEvaluadoresDisponibles.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.prefDisponiblesFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Disp: ",this.prefDisponiblesFiltrados);
              this.prefComite = this.prefDisponiblesFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }
        if (this.numeroTipoEvaluadoresDisponibles == 3) {
          this.servicePreferencia.obtenerPreferenciasByEmailEvaluador(this.itemEventoParent.idEvento,this.propElegida.idPropuesta, this.filtroEvaluadoresDisponibles.toString(), this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
            (response: Response) => {
              //       console.log(response.resultado)
              this.prefDisponiblesFiltrados = response.resultado;
              this.paginacionEval = response.paginacion;
              console.log("evaluadores Disp: ",this.prefDisponiblesFiltrados);
              this.prefComite = this.prefDisponiblesFiltrados;
              //     console.log(response.paginacion)
              //debugger
            }
          )
        }


      }
      else {
        this.prefComite = this.prefOriginales;
        //console.log("comiteFiltrado: ",this.comiteFiltrado);
      }
    }
  }


  getList(valueChange) {
    var lista = <Array<Persona>>valueChange;
    this.swalComponent.nativeSwal.close();
    if (valueChange != undefined) {
      //Agregamos los evaluadores escogidos
      for (var p = 0; p < lista.length; p++) {

        this.propuestasEvento[this.posTabla].evaluadoresAsignados.push(lista[p]);
      }

    }
  }

  actualizarQuitar() {
    for (var i = 0; i < this.nuevos.length; i++) {
      var pos = this.enQuitar(this.nuevos[i].idUsuario);
      if (pos != -1) {//si está en quitar...
        this.quitar.splice(pos, 1);
      }
    }
  }

  actualizarEvalProp() {
    //se agrega los de MaestraAgregar
    for (var i = 0; i < this.maestraAgregarProp.length; i++) {
      this.evalOrig.push(this.maestraAgregarProp[i]);
    }

    //se quita lo de quitar
    for (var i = 0; i < this.quitar.length; i++) {
      var pos = this.enEvalOrig(this.quitar[i].idUsuario);
      if (pos != -1)
        this.evalOrig.splice(pos, 1);
    }

  }
public evalOrig:Array<Persona>;
  public ver: boolean;
  onGuardarCambiosPropuestas() {
    //this.itemEventoParent.comite=this.listaEvAgregar;
    //console.log(this.itemEventoParent);
    this.ver = false;
    this.evalOrig = Object.assign([], this.propElegida.evaluadoresAsignados);
    this.actualizarQuitar();
    this.actualizarEvalProp();
    
    console.log("MAESTRAAA ", this.maestraAgregar)
    for (var i = 0; i < this.maestraAgregar.length; i++) {
      console.log(this.maestraAgregar[i])
      if (!this.ver) {
        this.serviceEvento.guardarEvaluaciones(this.maestraAgregar[i]).subscribe(
          (response: Response) => {
            if (response.estado == "ERROR") {
              this.ver = true;
            }
            console.log(response);
            console.log("EVALUACIONES GUARDADAS");
          }
        );
      }
    }
    if (!this.ver) {
      this.toastr.success('Evaluadores asignados', 'Aviso', { closeButton: true });

    } else {
      this.toastr.warning('Error al asignar evaluadores', 'Error', { closeButton: true });
    }



  }
  getMinFecha(fases: Array<Fase>): Fase {
    //return null;
    // let fechaBase: string='1990-10-10';
    let fechaBase: string = '2050-10-10';
    let fechaMin = new Date(fechaBase);
    let faseMin = new Fase();
    //console.log("Fecha Min! ", fechaMin);

    for (var i = 0; i < fases.length; i++) {
      let fechaLocalFin: Date = new Date(fases[i].fechaFin);
      //console.log("fechaLocalFin: ", fechaLocalFin);
      //console.log("fechaMin: ", fechaMin);
      if (fechaMin > fechaLocalFin) {
        fechaMin = fechaLocalFin;
        faseMin = fases[i];
      }
    }
    console.log("fechaMin FINAL: ", fechaMin);
    return faseMin;
  }







  public posQ: number;
  OnGuardarEvaluadores() {
    //quitar
    for (var i = 0; i < this.quitar.length; i++) {
      var indComite = this.enPropElegida(this.quitar[i].idUsuario)
      if (indComite > -1) {
        this.propElegida.evaluadoresAsignados.splice(indComite, 1);
      }
    }
    //debugger;
    for (var i = 0; i < this.maestraAgregarProp.length; i++) {
      //console.log(this.propElegida.evaluadoresAsignados[i])
      if (!this.ver) {
        let evalProp: Evaluacion = new Evaluacion();
        evalProp.propuesta = this.propElegida;
        evalProp.evaluador = this.maestraAgregarProp[i];
        evalProp.fase = new Fase();
        evalProp.fase = Object.assign([], this.asignarFase(this.itemEventoParent.fases));
        this.serviceEvento.guardarEvaluaciones(evalProp).subscribe(
          (response: Response) => {
            if (response.estado == "ERROR") {
              this.ver = true;
            }
            console.log(response);
            console.log("EVALUACIONES GUARDADAS");
          }
        );
      }
    }
    console.log("HERE WE GOOO")
    for (var i = 0; i < this.quitar.length; i++) {
      //console.log(this.propElegida.evaluadoresAsignados[i])
      if (!this.ver) {
        let evalProp: Evaluacion = new Evaluacion();
        evalProp.propuesta = this.propElegida;
        evalProp.evaluador = this.quitar[i];
        evalProp.fase = new Fase();
        if (this.enNuevos(this.quitar[i].idUsuario) == -1) {

          evalProp.fase = Object.assign([], this.asignarFase(this.itemEventoParent.fases));
          this.serviceEvaluacion.obtenerPropuestas(evalProp.evaluador.idUsuario, 1, 50).subscribe(
            (response: Response) => {
              console.log(response)
              let localProp: Array<Evaluacion> = response.resultado;
              let posQ1: number;
              for (var j = 0; j < localProp.length; j++) {
                if (localProp[j].propuesta.idPropuesta == evalProp.propuesta.idPropuesta) {
                  posQ1 = <number>localProp[j].idEvaluacion;
                  break;
                }
              }
              let evQuitar: Evaluacion = new Evaluacion();
              //evQuitar.idEvaluacion=this.posQ;
              console.log("BEFORE DESASIGNAR: ", posQ1)
              this.serviceEvaluacion.desasignarEvaluadorPropuesta(posQ1).subscribe(
                (response: Response) => {
                  console.log(response.resultado)
                }
              )
            }
          )
        }

      }
    }

    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();
    this.maestraAgregarProp = new Array<Persona>();





    if (!this.ver) {
      this.toastr.success('Evaluadores asignados', 'Aviso', { closeButton: true });
      this.isModalShownPropuestaDetalle = false;

    } else {
      this.toastr.warning('Error al asignar evaluadores', 'Error', { closeButton: true });
    }
    this.pagPropuestas.pagina = 1;
    this.pagPropuestas.registros = 10;
    //this.getPropuestas();



  }

  getPropuestas() {
    this.serviceEvento.obtenerPropuestas(this.itemEventoParent.idEvento, this.pagPropuestas.pagina, this.pagPropuestas.registros).subscribe(
      (response: Response) => {
        this.propuestasEvento = response.resultado;
        this.pagPropuestas = response.paginacion;



        /*
        for(var i=0;i<this.item.comite.length;i++){
            this.comite1.push(this.item.comite[i]);
            this.comite2.push(this.item.comite[i]);
        }*/
        //console.log(response);
        //console.log("EvaluadoresDisponibles");
      }
    );

  }

  OnAceptarEvaluadores() {
    //var verFor: boolean;
    //console.log("GG DEBUGER XD")
    //debugger

    if (this.propElegida.evaluadoresAsignados.length + this.evElegidos.length > 10) {
      this.toastr.warning('No se puede tener más de 10 usuarios en una propuesta!', 'Error', { closeButton: true });
      return;
    }


    console.log(this.propElegida.evaluadoresAsignados)
    console.log(this.evElegidos)
    for (var i = 0; i < this.evElegidos.length; i++) {
      //verFor = false;
      if (this.enMaestraAgregarProp(this.evElegidos[i].idUsuario) == -1)
        this.maestraAgregarProp.unshift(this.evElegidos[i]);
      if (this.enNuevos(this.evElegidos[i].idUsuario) == -1)
        this.nuevos.push(this.evElegidos[i]);
      let verQuitar:number = this.enQuitar(this.evElegidos[i].idUsuario);
        if(verQuitar!=-1)
        this.quitar.splice(verQuitar,1);
    }
    //debugger;
    for (var i = 0; i < this.maestraAgregarProp.length; i++) {
      //verFor = false;
      //for (var j = 0; j < this.propElegida.evaluadoresAsignados.length; j++)
        if (this.enPropElegida(this.maestraAgregarProp[i].idUsuario) == -1)
          this.propElegida.evaluadoresAsignados.unshift(this.maestraAgregarProp[i]);
    }
    this.evElegidos = new Array<Persona>();
    this.isModalShownEvaluadores = false;
  }


  getMaxFecha(fases: Array<Fase>): Fase {
    let fechaBase: string = '1990-10-10';
    let fechaMax = new Date(fechaBase);
    let faseMax = new Fase();
    //console.log("Fecha Min! ", fechaMin);

    for (var i = 0; i < fases.length; i++) {
      let fechaLocalFin: Date = new Date(fases[i].fechaFin);
      //console.log("fechaLocalFin: ", fechaLocalFin);
      //console.log("fechaMin: ", fechaMin);
      if (fechaMax < fechaLocalFin) {
        fechaMax = fechaLocalFin;
        faseMax = fases[i];
      }
    }
    //console.log("fechaMin FINAL: ", fechaMin);
    return faseMax;

  }


  asignarFase(fases: Array<Fase>): Fase {
    let fechaActual: Date = new Date();
    //console.log("Fecha Actual: ",fechaActual);
    //console.log("Fechas en el Evento!")
    let faseMin: Fase = this.getMinFecha(fases);
    //console.log(fases);
    //console.log("faseMin");    
    //console.log(faseMin);
    let fechaAux: Date = new Date(faseMin.fechaFin);
    if (fechaActual < fechaAux)
      return faseMin;
    let faseMax: Fase = this.getMaxFecha(fases);
    //console.log("faseMax");
    //console.log(faseMax);
    fechaAux = new Date(faseMax.fechaInicial);
    if (fechaActual > fechaAux)
      return faseMin;


    for (var i = 0; i < fases.length; i++) {
      let fechaLocalInicial: Date = new Date(fases[i].fechaInicial);
      let fechaLocalFin: Date = new Date(fases[i].fechaFin);
      if (fechaActual >= fechaLocalInicial && fechaActual <= fechaLocalFin) {
        //console.log("AND THE FASE IS!!")
        //console.log(fases[i])
        return fases[i];

      }
    }
    return faseMin;

  }

  onNuevoComiteDisp(nuevoComiteDisp) {
    if (nuevoComiteDisp != undefined) {
      console.log("onNuevoComiteDisp", nuevoComiteDisp);
      for (var i = 0; i < nuevoComiteDisp.length; i++) {
        var ver = false;//ya esta en maestra agreagar

        if (this.maestraAgregar != undefined) {
          for (var j = 0; j < this.maestraAgregar.length; j++) {
            if (this.maestraAgregar[j].propuesta.idPropuesta == this.actualPropuesta.idPropuesta && this.maestraAgregar[j].evaluador.idUsuario == nuevoComiteDisp[i].idUsuario) {
              ver = true;
              break;
            }
          }
          if (!ver) {
            let e1: Evaluacion = new Evaluacion();
            e1.evaluador = Object.assign([], nuevoComiteDisp[i]);
            e1.propuesta = Object.assign([], this.actualPropuesta);
            e1.estado = 'ASIGNADO';
            e1.fase = new Fase();
            e1.fase = Object.assign([], this.asignarFase(this.itemEventoParent.fases));

            //e1.
            //e1.idEvaluacion=
            this.maestraAgregar.push(e1);
            //console.log("Evaluacion Agregada", e1);
          }
        }
      }
      //console.log("Evaluaciones Finales luego de SWAL", this.maestraAgregar);
    }
  }
  OnHiddenPropuestaDetalle() {
    this.propElegida.evaluadoresAsignados = this.evalOriginales;
    this.isModalShownPropuestaDetalle = false;
    this.maestraAgregarProp = new Array<Persona>();
    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();
  }
  hideModalPropuestaDetalle() {
    this.propElegida.evaluadoresAsignados = this.evalOriginales;
    this.autoShownModal.hide();
    this.maestraAgregarProp = new Array<Persona>();
    this.nuevos = new Array<Persona>();
    this.quitar = new Array<Persona>();
  }
  public evalOriginales: Array<Persona>;
  onAgregarEvaluadores(item, i) {
    //this.propElegida = Object.assign([], item);
    this.propElegida = item;
    this.maestroEvaluadoresAsignados = this.propElegida.evaluadoresAsignados;
    this.evalOriginales = new Array<Persona>();
    this.evalOriginales = Object.assign([], this.propElegida.evaluadoresAsignados);
    //console.log("PROPELEGIDA", this.propElegida)
    this.isModalShownPropuestaDetalle = true;

  }

  onConfigurar(item, posTablaLocal) {
    let localEvaluadores: Array<Persona> = item.evaluadoresAsignados;
    this.posTabla = posTablaLocal;
    this.actualPropuesta = item;
    //this.comiteElegido = this.itemEventoParent.comite;
    //console.log("onConfigurar - COMITE ELEGIDO",this.comiteElegido);
    //console.log("onConfigurar - LOCAL",localEvaluadores);
    this.evaluadoresDisponibles = new Array<Usuario>();
    this.evaluadoresDisponibles = Object.assign([], this.comiteElegido);
    //this.evaluadoresDisponibles:Array<Persona> = <Array<Persona>>(this.comiteElegido);
    if (item.evaluadoresAsignados != undefined && this.evaluadoresDisponibles != undefined) {
      for (var i = 0; i < localEvaluadores.length; i++) {
        var longEvDisponibles = this.evaluadoresDisponibles.length;
        for (var j = 0; j < longEvDisponibles; j++) {
          if (localEvaluadores[i].idUsuario == this.evaluadoresDisponibles[j].idUsuario /*|| item.postulante.idUsuario == this.evaluadoresDisponibles[j].idUsuario*/) {
            this.evaluadoresDisponibles.splice(j, 1)[0];
            break;
          }
        }
      }
      console.log(this.evaluadoresDisponibles)
      var longEvDisponibles = this.evaluadoresDisponibles.length;
      for (var j = 0; j < longEvDisponibles; j++) {

        if (item.postulante.idUsuario == this.evaluadoresDisponibles[j].idUsuario) {
          this.evaluadoresDisponibles.splice(j, 1)[0];
          break;
        }


      }
      console.log(this.evaluadoresDisponibles)
    }
    //console.log("onConfigurar - FINAL",this.evaluadoresDisponibles);
  }

  OnRetroceder() {
    this._location.back();
  }



  //MODAL
  getEvaluadoresDisponibles() {
    this.servicePersonas.obtenerEvaluadoresDisponibles(this.itemEventoParent.idEvento, this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
      (response: Response) => {
        //       console.log(response.resultado)
        this.evaluadoresDisponibles = response.resultado;
        this.paginacionEval = response.paginacion;
        console.log(response.paginacion)
        //debugger
      }
    )

  }

  onQuitar(index, i) {
    //debugger;
    //console.log("ON QUITAR!!")
    
    var enNuevos: number = this.enNuevos(index.idUsuario);
    //console.log(enNuevos)
    if (enNuevos == -1) {
      if (this.estadoRegistro(index.idUsuario) == 4) {
        //var indQuitar = this.quitar.lastIndexOf(index);
        var indQuitar = this.enQuitar(index.idUsuario);
        this.quitar.splice(indQuitar, 1);

      } else if (this.estadoRegistro(index.idUsuario) == 3)
        this.quitar.push(index);
    }
    else {
      //var ind = this.maestraAgregarProp.lastIndexOf(index);
      var ind= this.enMaestraAgregarProp(index.idUsuario);
      //console.log(ind)
      //console.log(this.enQuitar(index.idUsuario))
      if (ind > -1) {
        this.maestraAgregarProp.splice(ind, 1);
      }
      if(this.enQuitar(index.idUsuario)==-1)
            this.quitar.push(index);
    }

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


  getEstadoPropuesta(item: Propuesta) {
    return item.evaluadoresAsignados.length;
  }

  getListaActivos() {
    this.onAsignarNuevosEvaluadores();
  }

  OnPageChanged(event): void {
    this.paginacionEval.pagina = event.page;
    this.getListaActivos();
  }

  OnPageOptionChanged(event): void {
    this.paginacionEval.registros = event.rows;
    this.paginacionEval.pagina = 1;
    this.getListaActivos();
  }
  OnHiddenEvaluadores() {
    this.isModalShownEvaluadores = false;
  }
public prefOriginales:Array<Preferencia>;
  onAsignarNuevosEvaluadores() {
    this.servicePreferencia.consultarPreferenciasComite(<number>this.propElegida.idPropuesta, this.paginacionEval.pagina, this.paginacionEval.registros).subscribe(
      (response: Response) => {
        console.log(response);
        this.prefComite = new Array<Preferencia>();
        this.prefComite = response.resultado;
        this.prefOriginales = this.prefComite;
        this.paginacionEval = response.paginacion;
        this.isModalShownEvaluadores = true;
      }
    )

  }


  hideModalPresidente() {
    this.autoShownModal.hide();
  }

  OnPageChangedPropuesta(event) {
    this.pagPropuestas.pagina = event.page;
    this.getPropuestas();

  }

  OnPageOptionChangedPropuesta(event) {
    this.pagPropuestas.registros = event.rows;
    this.pagPropuestas.pagina = 1;
    this.getPropuestas();

  }

  ElegirEvaluador(data, i) {
    if (this.enPropuesta(data.usuario.idUsuario) == -1) {
      var pos = this.enEvElegidos(data.usuario.idUsuario);
      if (pos == -1)
        this.evElegidos.push(data.usuario);
      else
        this.evElegidos.splice(pos, 1);
    }

  }
  /*BUSQUEDA*/
  enEvElegidos(id) {
    for (var i = 0; i < this.evElegidos.length; i++) {
      if (this.evElegidos[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }
  enEvalOrig(id){
    for (var i = 0; i < this.evalOrig.length; i++) {
      if (this.evalOrig[i].idUsuario == id) {
        return i;
      }
    }
    return -1;


  }

  /*
    enMaestraAgregar(id) {
      for (var i = 0; i < this.maestraAgregarProp.length; i++) {
        if (this.maestraAgregarProp[i].idUsuario == id) {
          return i;
        }
      }
      return -1;
    }*/
  enMaestraAgregarProp(id) {
    for (var i = 0; i < this.maestraAgregarProp.length; i++) {
      if (this.maestraAgregarProp[i].idUsuario == id) {
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

  enPropElegida(id) {
    for (var i = 0; i < this.propElegida.evaluadoresAsignados.length; i++) {
      if (this.propElegida.evaluadoresAsignados[i].idUsuario == id) {
        return i;
      }
    }
    return -1;
  }

  enPropuesta(id) {
    for (var i = 0; i < this.evalOriginales.length; i++) {
      if (this.evalOriginales[i].idUsuario == id) {
        return i;
      }
    }
    if (this.propElegida.postulante.idUsuario == id)
      return 50;
    return -1;

  }

}