import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP,} from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService,CriterioService,EventoService,TipoCriterioService} from '../../../../../../services/index';

import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";

@Component({
    selector:'fase-evento-organizador',
    templateUrl: 'fase-evento.template.html',
    styleUrls: ['fase-evento.template.scss']
})
export class FaseEventoComponent implements OnInit{

  public loading:Boolean = false;

  public isNewModalShown: Boolean;
  public isNewCriterioModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public isDeleteCriterioModalShown: Boolean;
  public isModalShown: Boolean;
  public isNewFormModalShown: Boolean;

  public descripcionModal : String;
  public tipoCriterioModal: TipoCriterio;
  public esNuevo: Boolean;

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
  
  //Evento de Padre
  @Input('item-evento')
  public item: Evento;

  public criterio: Criterio;
  public fase: Fase;
  public tipoCriterios: Array<TipoCriterio>;
  private utilForm: UtilFormulario;
  public formulario: FormularioCFP;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private faseService: FaseService,
              private criterioService: CriterioService,
              private eventoService : EventoService,
              private tipoCriterioService: TipoCriterioService,
              ) {

    this.criterio = new Criterio;
    this.fase = new Fase; 
    this.tipoCriterios = new Array<TipoCriterio>();

    this.utilForm = new UtilFormulario();
    this.fase.formulario = new FormularioCFP();
    this.fase.formulario.divisionList = this.utilForm.inicializarFormulario();
  }

    ngOnInit(): void {
      this.obtenerTipoCriterio();
    }

    obtenerTipoCriterio(){
      this.tipoCriterioService.obtenerTipoCriterios().subscribe(
        (response: Response) => {
            this.tipoCriterios = response.resultado;
            console.log(this.tipoCriterios);
        }
      );
    }
    
    getEventoActualizado() {      
      this.eventoService.obtenerEvento(this.item.idEvento).subscribe(
        (response: Response)=>{
            this.item=response.resultado;
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
    }

    hideModal(): void {
      if(this.isNewModalShown){
        this.autoNewShownModal.hide();
      }else if(this.isModalShown){
        this.autoShownModal.hide();
      }else if(this.isDeleteModalShown){
        this.autoDeleteShownModal.hide();
      }else if(this.isDeleteCriterioModalShown){
        this.autoDeleteCriterioShownModal.hide();
      }else if(this.isNewFormModalShown){
        this.autoNewFormShownModal.hide();
      }else if(this.isNewCriterioModalShown){
        this.autoNewCriterioShownModal.hide();
      }
    }
    
    OnNuevo(){
      if(this.esNuevo){ //Creando criterio
        this.criterio.descripcion = this.descripcionModal;
        this.criterio.idFase = this.fase;
        this.criterio.tipoCriterio = this.tipoCriterioModal;

        console.log('CREANDO CRITERIO');
        console.log(this.criterio.idFase);

        this.criterioService.guardarCriterio(this.criterio).subscribe(
          (response: Response)=>{
            if(response.estado=="OK"){
              this.toastr.success(`Se ha guardado el criterio con exito`, 'Aviso', {closeButton: true});
              this.getEventoActualizado();
              this.onHidden()
            }
          }
        );
      }else{ //editando criterio
        this.criterio.descripcion=this.descripcionModal;
        this.criterio.idFase = this.fase;
        this.criterio.tipoCriterio = this.tipoCriterioModal;

        console.log('EDITANDO CRITERIO');
        console.log(this.criterio.idFase);
        
        this.criterioService.guardarCriterio(this.criterio).subscribe(
          (response: Response)=>{
            if(response.estado=="OK"){
              console.log(this.criterio.idFase);
              this.toastr.success(`Se ha editado el criterio con éxito`, 'Aviso', {closeButton: true});
              this.getEventoActualizado();
              this.onHidden()
            }
          }
        );
      }
    }

    OnAgregarCriterio(fase:Fase){
      console.log(fase)
    
      this.fase = fase;
      this.descripcionModal = "";
      this.tipoCriterioModal = new TipoCriterio();
  
      this.esNuevo = true;
      this.isNewCriterioModalShown=true;
    }

    OnEditarCriterio(criterio:Criterio,fase:Fase){
      this.fase = fase;
      this.criterio = criterio;
      this.descripcionModal = this.criterio.descripcion;
      this.tipoCriterioModal = this.criterio.tipoCriterio;
  
      this.esNuevo = false;
      this.isModalShown=true;
    }

    OnGestionarFases(){
        this.descripcionModal = "";
    
        this.esNuevo = true;
        this.isNewModalShown=true;
    }
    fechaHoy: Date;
    
    OnGuardarFase(fase: Fase){//en el formulario grande de fase, donde va CFP ya esta validado el nombre de la fase
        let fechaFin = new Date(fase.fechaFin);
        let fechaInicial = new Date(fase.fechaInicial)
        fase.fechaFin = fechaFin;
        fase.fechaInicial = fechaInicial;
        this.fechaHoy = new Date();
  
        
        if(!fase.fechaFin){
          this.toastr.warning(`Se debe de seleccionar una fecha para el fin de evento`, 'Aviso', { closeButton: true });
          return;
      }
        if(!fase.fechaInicial){
          this.toastr.warning(`Se debe de seleccionar una fecha para el inicio de evento`, 'Aviso', { closeButton: true });
          return;
      }
      if(fase.fechaFin<fase.fechaInicial){
          this.toastr.warning(`La fecha de fin de evento no puede ser menos a la de inicio de evento`, 'Aviso', { closeButton: true });
          return;
      }
      if(fase.fechaInicial<this.fechaHoy  ){
          this.toastr.warning(`La fecha inicial no puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
          return;
      }
      if(fase.fechaFin<this.fechaHoy ){
        this.toastr.warning(`La fecha final no puede ser menor al día de hoy`, 'Aviso', { closeButton: true });
        return;
    }
      if (!fase.formulario){
        this.toastr.warning(`Se necesita agregar un informe Call for Paper`, 'Aviso', { closeButton: true });
          return;
      }
        this.faseService.guardarFase(fase).subscribe(
          (response: Response)=>{
            this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', {closeButton: true});
            this.getEventoActualizado();
            this.onHidden();
          }
        )
    }

    OnAgregarFase(evento: Evento){ // En el boton de gestiongar fase (solo se guarda el nombre de la fase)
      if(this.esNuevo){ 
        let faseNueva = new Fase();
        if(!this.descripcionModal){
          this.toastr.warning(`Se necesita colocar un nombre a la fase`, 'Aviso', { closeButton: true });
          return;
        }
        if(this.descripcionModal.length > 255){
          this.toastr.warning(`Se necesita ingresar un nombre a la fase menor a 255 caracteres`, 'Aviso', { closeButton: true });
          return;
        }
        faseNueva.descripcion = this.descripcionModal;
        faseNueva.idEvento = evento.idEvento;
        this.faseService.guardarFase(faseNueva).subscribe(
          (response: Response)=>{
            this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', {closeButton: true});
            this.getEventoActualizado();
          }
        )
      }
    }

    OnEliminar(fase: Fase,evento: Evento){
      this.fase = fase;
      this.fase.idEvento = evento.idEvento;
      this.isDeleteModalShown=true;
    }

    OnConfirmar(){
    this.faseService.eliminarFase(this.fase).subscribe(
        (response: Response)=>{ 
          console.log(response);  
          if(response.estado=="OK"){
            this.toastr.success(`Se ha eliminado la fase con éxito`, 'Aviso', {closeButton: true});
            this.getEventoActualizado();
            this.isDeleteModalShown = false;
          }
        }
      );
    }

    OnEliminarCriterio(criterio: Criterio,fase: Fase){
      this.criterio = criterio;
      this.criterio.idFase = fase;

      this.isDeleteCriterioModalShown =true;
    }

    OnConfirmarCriterio(){
      this.criterioService.eliminarCriterio(this.criterio).subscribe(
        (response: Response)=>{ 
          console.log(response);  
          if(response.estado=="OK"){
            this.toastr.success(`Se ha eliminado el criterio con éxito`, 'Aviso', {closeButton: true});
            this.getEventoActualizado();
            this.onHidden();      
          }
        }
      );
    }
    
    DetectFin(fase: Fase) {
      if (fase.fechaFin && (fase.fechaFin.toString() == 'Invalid Date' || fase.fechaFin.toString() == '')) {
          fase.fechaFin = new Date();
          this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
          return;
      }
    }

    DetectInicio(fase: Fase) {
        if (fase.fechaInicial && (fase.fechaInicial.toString() == 'Invalid Date' || fase.fechaInicial.toString() == '')) {
            fase.fechaInicial = new Date();
            this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
            return;
        }
    }

    OnCrearFormulario(fase: Fase){
      this.fase = fase;
      this.fase.idEvento = this.item.idEvento;
      this.formulario = fase.formulario;
        
     

      if(!this.formulario){
        this.formulario = new FormularioCFP();
        this.formulario.divisionList = this.utilForm.inicializarFormulario();
      }

      this.isNewFormModalShown =true;
    }
}