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

  public propuestasEvento2: Array<Propuesta>;
  //public evaluadoresDisponibles:Array<Persona>;

  public loading: boolean;
  public paginacion: Paginacion;

  public isModalShownPropuestaDetalle: boolean;
  public isModalShownEvaluadores: boolean;
  public paginacionComite: Paginacion;
  public paginacionEval: Paginacion;
  public actualPropuesta: Propuesta;
  public prefComite: Array<Preferencia>;
  public nuevos: Array<Persona>;
  public quitar: Array<Persona>;
  public maestraAgregarProp: Array<Persona>;
  public evElegidos: Array<Persona>;


  constructor(
    private servicePreferencia: PreferenciaService,
    private serviceEvaluacion: EvaluacionService,
    private servicePersonas: PersonaService,
    private authService: AeventAuthService,
    private toastr: ToastrService,
    private _location: Location,
    private serviceEvento: EventoService, ) {
    this.comiteElegido = new Array<Usuario>();
    this.paginacion = new Paginacion({ pagina: 1, registros: 10 });
    this.paginacionEval = new Paginacion({ pagina: 1, registros: 10 });
    this.paginacionComite = new Paginacion({ pagina: 1, registros: 10 });
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
    //console.log(this.itemEventoParent);
    //this.itemComite = this.itemEventoParent.comite;
  }

  @ViewChild('autoShownModal') autoShownModal: ModalDirective;

  @ViewChild(`visorAgregarEvaluador`) private swalComponent: SwalComponent;

  ngOnInit() {
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

  public ver: boolean;
  onGuardarCambiosPropuestas() {
    //this.itemEventoParent.comite=this.listaEvAgregar;
    //console.log(this.itemEventoParent);
    this.ver = false;
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
    //console.log("fechaMin FINAL: ", fechaMin);
    return faseMin;
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
  ElegirEvaluador(data, i) {
    if (this.enPropuesta(data.usuario.idUsuario) == -1) {
      var pos = this.enEvElegidos(data.usuario.idUsuario);
      if (pos == -1)
        this.evElegidos.push(data.usuario);
      else
        this.evElegidos.splice(pos, 1);
    }

  }




  enPropuesta(id) {
    for (var i = 0; i < this.evalOriginales.length; i++) {
      if (this.evalOriginales[i].idUsuario == id) {
        return i;
      }
    }
    return -1;

  }
  public posQ:number;
  OnGuardarEvaluadores() {
    for (var i = 0; i < this.quitar.length; i++) {
      var indComite = this.propElegida.evaluadoresAsignados.lastIndexOf(this.quitar[i]);
      if (indComite > -1) {
        this.propElegida.evaluadoresAsignados.splice(indComite, 1);
      }
    }



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

        evalProp.fase = Object.assign([], this.asignarFase(this.itemEventoParent.fases));
        this.serviceEvaluacion.obtenerPropuestas(evalProp.evaluador.idUsuario, 1, 50).subscribe(
          (response: Response) => {
            console.log(response)
            let localProp :Array<Evaluacion> = response.resultado;
            let  posQ1:number;
            for(var j=0;j<localProp.length;j++){
              if(localProp[j].propuesta.idPropuesta==evalProp.propuesta.idPropuesta){
              posQ1=<number>localProp[j].idEvaluacion;
              break;
              }
            }
            let evQuitar: Evaluacion = new Evaluacion();
              //evQuitar.idEvaluacion=this.posQ;
              console.log("BEFORE DESASIGNAR: ", posQ1)
              this.serviceEvaluacion.desasignarEvaluadorPropuesta(posQ1).subscribe(
                (response:Response)=>{
                  console.log(response.resultado)
                }
              )
          }
        )

      }
    }





    if (!this.ver) {
      this.toastr.success('Evaluadores asignados', 'Aviso', { closeButton: true });
      this.isModalShownPropuestaDetalle = false;

    } else {
      this.toastr.warning('Error al asignar evaluadores', 'Error', { closeButton: true });
    }



  }

  OnAceptarEvaluadores() {
    var verFor: boolean;

    for (var i = 0; i < this.evElegidos.length; i++) {
      verFor = false;

      for (var j = 0; j < this.maestraAgregarProp.length; j++)
        if (this.evElegidos[i].idUsuario == this.maestraAgregarProp[j].idUsuario)
          verFor = true;
      if (!verFor) {
        this.maestraAgregarProp.unshift(this.evElegidos[i]);
        if (this.enNuevos(this.evElegidos[i].idUsuario) == -1)
          this.nuevos.push(this.evElegidos[i]);
      }

    }
    //debugger;
    for (var i = 0; i < this.maestraAgregarProp.length; i++) {
      verFor = false;
      for (var j = 0; j < this.propElegida.evaluadoresAsignados.length; j++)
        if (this.maestraAgregarProp[i].idUsuario == this.propElegida.evaluadoresAsignados[j].idUsuario)
          verFor = true;
      if (!verFor)
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
    this.propElegida = item;
    this.evalOriginales = new Array<Persona>();
    this.evalOriginales = Object.assign([], this.propElegida.evaluadoresAsignados);
    console.log("PROPELEGIDA", this.propElegida)
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
      var ind = this.maestraAgregarProp.lastIndexOf(index);
      if (ind > -1) {
        this.maestraAgregarProp.splice(ind, 1);
      }
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
    this.getEvaluadoresDisponibles();
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
  OnHiddenEvaluadores() {
    this.isModalShownEvaluadores = false;
  }

  onAsignarNuevosEvaluadores() {
    this.servicePreferencia.consultarPreferenciasComite(<number>this.propElegida.idPropuesta, this.paginacionComite.pagina, this.paginacionComite.registros).subscribe(
      (response: Response) => {
        console.log(response);
        this.prefComite = response.resultado;
        this.paginacionEval = response.paginacion;
        this.isModalShownEvaluadores = true;
      }
    )

  }


  hideModalPresidente() {
    this.autoShownModal.hide();
  }

}