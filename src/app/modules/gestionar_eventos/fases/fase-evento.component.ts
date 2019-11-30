import { OnInit, Component, Input, ViewChild } from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP, } from "../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService, CriterioService, EventoService, TipoCriterioService } from '../../../services/index';
import { Location } from '@angular/common';
import { ModalDirective, TabsetComponent } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import Swal from 'sweetalert2'
import { SwalComponent } from "@toverux/ngx-sweetalert2";

@Component({
  selector: 'fase-evento',
  templateUrl: 'fase-evento.template.html',
  styleUrls: ['fase-evento.template.scss']
})
export class FaseEventoComponent implements OnInit {

  public loading: Boolean = false;
  @ViewChild('tabsFase') tabset: TabsetComponent;

  
  @ViewChild('visorCallForPaperSwalOut') private swalViewCFP: SwalComponent;
  @ViewChild('enviarEvento') private swalEnviarEvento: SwalComponent;
  public isNewModalShown: Boolean;
  public isNewCriterioModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public isDeleteCriterioModalShown: Boolean;
  public isModalShown: Boolean;
  public isNewFormModalShown: Boolean;
  public isNewFaseModalShown: Boolean;
  public editCriterioModalShown: Boolean;
  public descripcionFaseModal: String;
  public descripcionModal: String;
  public tipoCriterioModal: TipoCriterio;
  public esNuevo: Boolean;
  public tempDescModal: String;
  @ViewChild('autoEditCriterioShownModal')
  autoEditCriterioShownModal: ModalDirective;
  @ViewChild('autoShownModal')
  autoShownModal: ModalDirective;
  @ViewChild('autoNewFormShownModal')
  autoNewFormShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  @ViewChild('autoDeleteCriterioShownModal')
  autoDeleteCriterioShownModal: ModalDirective;
  @ViewChild('autoDeleteShownModal')
  autoDeleteShownModal: ModalDirective;
  @ViewChild('autoNewCriterioShownModal')
  autoNewCriterioShownModal: ModalDirective;
  @ViewChild('autoNewFaseShownModal')
  autoNewFaseShownModal: ModalDirective;
  //Evento de Padre
  @Input('item-evento')
  public item: Evento;

  public arrayCriterios: Array<Criterio>;
  public criterio: Criterio;
  public fase: Fase;
  public tipoCriterios: Array<TipoCriterio>;
  private utilForm: UtilFormulario;
  public formulario: FormularioCFP;

  private index:number = -1;
  public minDate: Date;
  public maxDate: Date;
  constructor(private toastr: ToastrService,
    private router: Router,
    private faseService: FaseService,
    private criterioService: CriterioService,
    private eventoService: EventoService,
    private tipoCriterioService: TipoCriterioService,
    private _location: Location
  ) {
    this.minDate = new Date();
    this.maxDate = new Date();
   
    this.criterio = new Criterio;
    this.fase = new Fase;
    this.tipoCriterios = new Array<TipoCriterio>();
    this.arrayCriterios = new Array<Criterio>();
    this.utilForm = new UtilFormulario();
    this.fase.formulario = new FormularioCFP();
    this.fase.formulario.divisionList = this.utilForm.inicializarFormulario();

  }

  ngOnInit(): void {
    this.obtenerTipoCriterio();
    
  }
  ngOnChanges(){
    if(this.item.fechaInicio && this.item.fechaFin && this.item.idEvento){
      debugger;
     this.maxDate = new Date(this.item.fechaInicio.toString().substr(0,10));
      this.maxDate.setDate(this.maxDate.getDate() - 1);
      this.minDate.setDate(this.minDate.getDate() + 1);
    }
  }
  obtenerTipoCriterio() {
    this.loading = true;
    this.tipoCriterioService.obtenerTipoCriterios().subscribe(
      (response: Response) => {
        this.tipoCriterios = response.resultado;
        this.loading = false;
       // console.log(this.item.fases[0].criterios);
      }
    );
  }

  getEventoActualizado() {
    this.loading = true;
    this.eventoService.obtenerEvento(this.item.idEvento).subscribe(
      (response: Response) => {
        this.item = response.resultado;
        /* if(this.index!=-1){
            this.tabset.tabs[this.index].active = true;
            this.index = -1;
        } */
        this.loading= false;
      }
    );
  }

  onHidden(): void {
    this.isModalShown = false;
    this.isNewModalShown = false;
    this.isDeleteModalShown = false;
    this.isNewCriterioModalShown = false;
    this.isDeleteCriterioModalShown = false;
    this.isNewFormModalShown = false;
    this.isNewFaseModalShown = false;
    this.editCriterioModalShown = false;
   
  }
  onHiddenEditarFase(): void {
    this.isNewFaseModalShown = false;
  }

  hideModal(): void {
    if (this.isNewModalShown) {
      this.autoNewShownModal.hide();
    } else if (this.isModalShown) {
      this.autoShownModal.hide();
    } else if (this.isDeleteModalShown) {
      this.autoDeleteShownModal.hide();
    } else if (this.isDeleteCriterioModalShown) {
      this.autoDeleteCriterioShownModal.hide();
    } else if (this.isNewFormModalShown) {
      this.autoNewFormShownModal.hide();
    } else if (this.isNewCriterioModalShown) {
      this.autoNewCriterioShownModal.hide();
    } else if (this.isNewFaseModalShown){
      this.autoNewFaseShownModal.hide();
    } else if (this.editCriterioModalShown){
      this.autoEditCriterioShownModal.hide();
    }
  }
  onGetCriterios(fase:Fase){
    let index = -1;
    this.tabset.tabs.forEach((e,i)=>{
      if(e.active){
        index = i;
      }
    });
    if(index == -1) return;
    this.criterioService.obtenerCriterios(fase.idFase).subscribe(
      (response:Response)=>{
        this.item.fases[index].criterios = response.resultado;
        if(this.loading) this.loading = false;
      }
    );
  }
  OnNuevo() {
    this.loading = true;
    
    this.tabset.tabs.forEach((e,i)=>{
      if(e.active==true){
        this.index = i;
      }
    });
    if(this.index==-1) return;
    if(!this.tipoCriterioModal || this.tipoCriterioModal.descripcion==""){
      this.toastr.warning(`se debe de elegir un tipo de criterio`, 'Aviso', { closeButton: true });
      return;
    }
    if (this.esNuevo) { //Creando criterio
      this.criterio.descripcion = this.descripcionModal;
      this.criterio.idFase = this.fase.idFase;
      this.criterio.tipoCriterio = this.tipoCriterioModal;
      this.criterio.idCriterio = null;
      console.log('CREANDO CRITERIO');
      console.log(this.criterio);
      this.arrayCriterios.push(this.criterio);
      this.criterioService.guardarCriterio(this.criterio).subscribe(
        (response: Response) => {
          if (response.estado == "OK") {
            this.toastr.success(`Se ha guardado el criterio con exito`, 'Aviso', { closeButton: true });
            this.onHidden(); 
            this.onGetCriterios(this.item.fases[this.index]);
            this.loading = false;
          }
        }
      );
    } else { //editando criterio
      let nuevoCriterio = new Criterio ();
      nuevoCriterio.idCriterio = this.criterio.idCriterio;
      nuevoCriterio.descripcion = this.descripcionModal;
      nuevoCriterio.idFase = this.fase.idFase;
      nuevoCriterio.tipoCriterio = this.tipoCriterioModal;
      this.arrayCriterios.forEach(e=>{
        if (e.idCriterio == nuevoCriterio.idCriterio)
          e.descripcion = nuevoCriterio.descripcion;
      })
      this.criterioService.guardarCriterio(nuevoCriterio).subscribe(
        (response: Response) => {
          if (response.estado == "OK") {
            console.log(this.criterio.idFase);
            this.toastr.success(`Se ha editado el criterio con éxito`, 'Aviso', { closeButton: true });
            this.onHidden();
            this.onGetCriterios(this.item.fases[this.index]);
            this.loading = false;
          }
        }
      );
    }
  }

  OnAgregarCriterio(fase: Fase) {
    

    this.fase = fase;
    this.arrayCriterios = this.fase.criterios;
    this.descripcionModal = "";
    this.tipoCriterioModal = this.tipoCriterios[this.tipoCriterios.length-1];
    this.esNuevo = true;
    this.isNewCriterioModalShown = true;
  }

  OnEditarCriterio(criterio: Criterio, fase: Fase) {

    this.fase = fase;
    this.criterio = criterio;

    this.descripcionModal = this.criterio.descripcion;
    this.tipoCriterioModal = new TipoCriterio();
    this.tipoCriterioModal = this.criterio.tipoCriterio;

    this.esNuevo = false;
    this.editCriterioModalShown = true;
  }
  OnEditarFase(fase: Fase){
    this.isNewFaseModalShown = true;
    this.esNuevo = false;
    this.tempDescModal = fase.descripcion;

  }
  OnGestionarFases() {
    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown = true;
  }
  fechaHoy: Date;
  OnGuardarFase(fase_out:Fase) {//en el formulario grande de fase, donde va CFP ya esta validado el nombre de la fase
    let index = -1;
    let fase: Fase;
    this.tabset.tabs.forEach((e,i)=>{
      if(e.active){
        index = i;
      }
    });
    if(index==-1){
      return;
    }
    fase = this.item.fases[index];
    if(!fase.fechaFin)
      fase.fechaFin = fase_out.fechaFin;
    if(!fase.fechaInicial)
      fase.fechaInicial = fase_out.fechaInicial;
    this.fechaHoy = new Date();


    if (!fase.fechaFin) {
      this.toastr.warning(`Se debe de seleccionar una fecha para el fin de evento`, 'Aviso', { closeButton: true });
      return;
    }
    if (!fase.fechaInicial) {
      this.toastr.warning(`Se debe de seleccionar una fecha para el inicio de evento`, 'Aviso', { closeButton: true });
      return;
    }
    if (fase.fechaFin < fase.fechaInicial) {
      this.toastr.warning(`La fecha de fin de fase no puede ser menos a la de inicio de fase`, 'Aviso', { closeButton: true });
      return;
    }
    if (fase.fechaInicial < this.fechaHoy) {
      this.toastr.warning(`La fecha inicial no puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
      return;
    }
    if (fase.fechaFin < this.fechaHoy) {
      this.toastr.warning(`La fecha final no puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
      return;
    }
    if (!fase.formulario) {
      this.toastr.warning(`Se necesita agregar un informe Call for Paper`, 'Aviso', { closeButton: true });
      return;
    }
    if(index!=0){
      let fechaInicio : Date;
      let fechaFin: Date;
      fechaInicio = this.item.fases[index-1].fechaInicial;
      fechaFin = this.item.fases[index-1].fechaFin;

   /*    fase.fechaInicial = moment(fase.fechaInicial).toDate();
      fase.fechaFin = moment(fase.fechaFin).toDate(); */

      if((fase.fechaInicial <= fechaInicio && fase.fechaInicial >= fechaInicio) ||
          (fase.fechaInicial <= fechaFin && fase.fechaFin >= fechaFin)){
            this.toastr.warning("Las fechas dentro de la fase: " + this.item.fases[index].descripcion + " interfieren con la fase anterior","Aviso",{closeButton:true});
            return;
      }
      
    }
    fase.fase_guardada = true;
    this.faseService.guardarFase(fase).subscribe(
      (response: Response) => {
        let fase: Fase = response.resultado;
        this.item.fases[index].fechaInicial=moment(fase.fechaInicial).toDate();
        this.item.fases[index].fechaFin=moment(fase.fechaFin).toDate();
        this.item.fases[index].formulario=fase.formulario;
        this.item.fases[index].criterios= fase.criterios;
        this.item.fases[index].fase_guardada = fase.fase_guardada;
        this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', { closeButton: true });

        this.onHidden();
      }
    );

    //this.fase.criterios = itemsCriterios;
    /**
     * Fin del parche ...
     */
  }
  OnCancelar() {
    this._location.back();
  }
  OnAgregarFase(evento: Evento) { // En el boton de gestiongar fase (solo se guarda el nombre de la fase)
    let flag = 0;
    if (this.esNuevo) {
      let faseNueva = new Fase();

      evento.fases.forEach(element => {
        if (element.descripcion == this.descripcionModal) {
          this.toastr.warning(`Ya exise una fase con ese título, inserte un título nuevo`, 'Aviso', { closeButton: true });
          flag = 1;
          return;
        }
      });
      if (flag == 1) {
        flag = 0;
        return;
      }
      if (!this.descripcionModal) {
        this.toastr.warning(`Se necesita colocar un nombre a la fase`, 'Aviso', { closeButton: true });
        return;
      }
      if (this.descripcionModal.length > 255) {
        this.toastr.warning(`Se necesita ingresar un nombre a la fase menor a 255 caracteres`, 'Aviso', { closeButton: true });
        return;
      }
      faseNueva.descripcion = this.descripcionModal;
      faseNueva.idEvento = evento.idEvento;
      this.faseService.guardarFase(faseNueva).subscribe(
        (response: Response) => {
          this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', { closeButton: true });
          this.descripcionModal = "";
          this.getEventoActualizado();
        }
      )
    }else{ //modificar fase
      let faseNueva = new Fase();

      evento.fases.forEach(element => {
        if (element.descripcion == this.tempDescModal) { // encontro la se
            faseNueva = element;
            faseNueva.descripcion = this.descripcionFaseModal;
          return;
        }
    });
    this.faseService.guardarFase(faseNueva).subscribe(
      (response: Response) => {
        this.toastr.success(`Se ha actualizado la fase con exito`, 'Aviso', { closeButton: true });
        this.getEventoActualizado();
        this.onHiddenEditarFase();  
      }
    )
    

  }
}

  OnEliminar(fase: Fase, evento: Evento) {
    this.fase = fase;
    this.fase.idEvento = evento.idEvento;
    this.isDeleteModalShown = true;
  }

  OnConfirmar() {
    this.faseService.eliminarFase(this.fase).subscribe(
      (response: Response) => {
        console.log(response);
        if (response.estado == "OK") {
          this.toastr.success(`Se ha eliminado la fase con éxito`, 'Aviso', { closeButton: true });
          this.getEventoActualizado();
          this.isDeleteModalShown = false;
        }
      }
    );
  }

  OnEliminarCriterio(criterio: Criterio, fase: Fase) {
    this.criterio = criterio;
    this.criterio.idFase = fase.idFase;

    this.isDeleteCriterioModalShown = true;
  }

  OnConfirmarCriterio() {
    let index = -1;
    this.tabset.tabs.forEach((e,i)=>{
      if(e.active)
        index = i;
    });
    if(index==-1) return;
    this.criterioService.eliminarCriterio(this.criterio).subscribe(
      (response: Response) => {
        console.log(response);
        if (response.estado == "OK") {
          this.toastr.success(`Se ha eliminado el criterio con éxito`, 'Aviso', { closeButton: true });
          this.onGetCriterios(this.item.fases[index]);
          this.onHidden();
        }
      }
    );
  }

  DetectFin(fase: Fase) {
    if (fase.fechaFin && (fase.fechaFin.toString() == 'Invalid Date' || fase.fechaFin.toString() == '')) {
      fase.fechaFin = new Date();
      this.toastr.warning('Fecha ingresada no valida', 'Aviso', { closeButton: true });
      return;
    }
  }

  DetectInicio(fase: Fase) {
    if (fase.fechaInicial && (fase.fechaInicial.toString() == 'Invalid Date' || fase.fechaInicial.toString() == '')) {
      fase.fechaInicial = new Date();
      this.toastr.warning('Fecha ingresada no valida', 'Aviso', { closeButton: true });
      return;
    }
  }

  OnCrearFormulario(fase: Fase) {
    this.fase = fase;
    this.fase.idEvento = this.item.idEvento;
    this.formulario = fase.formulario;



    if (!this.formulario) {
      this.formulario = new FormularioCFP();
      this.formulario.divisionList = this.utilForm.inicializarFormulario();
    }

    this.isNewFormModalShown = true;
  }
  test(fase:Fase){
    if(fase.formulario){
      this.swalViewCFP.title = fase.formulario.titulo?fase.formulario.titulo:"";
      this.swalViewCFP.show();
    }
  }
  OnEnviarPresidente(){
    let str = "";
    this.item.fases.forEach((e,i)=>{
      if(e.idFase!=null){
        str+= e.descripcion + ", ";
      }
    });
    if(str!=""){
      str.slice(0,str.length-2);
      this.toastr.warning("Las fases " +str+ " no han sido guardadas","Aviso",{closeButton:true});
      return;
    }
    this.swalEnviarEvento.show();
  }
  OnFinalizarEnvio(){
    console.log("show show");
  }
 
}