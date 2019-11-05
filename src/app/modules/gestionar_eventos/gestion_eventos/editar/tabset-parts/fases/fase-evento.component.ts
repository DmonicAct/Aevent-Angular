import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP,} from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService } from '../../../../../../services/fase.service';
import { CriterioService } from '../../../../../../services/criterio.service';
import { EventoService } from '../../../../../../services/evento.service';
import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";

@Component({
    selector:'fase-evento',
    templateUrl: 'fase-evento.template.html',
    styleUrls: ['fase-evento.template.scss']
})
export class FaseEventoComponent implements OnInit{

  public isNewModalShown: Boolean;
  public isNewCriterioModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public isDeleteCriterioModalShown: Boolean;
  public isModalShown: Boolean;
  public isNewFormModalShown: Boolean;

  public descripcionModal : String;
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
  private utilForm: UtilFormulario;
  public formulario: FormularioCFP;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private faseService: FaseService,
              private criterioService: CriterioService,
              private eventoService : EventoService,
              ) {

    this.criterio = new Criterio;
    this.fase = new Fase; 
    
    this.utilForm = new UtilFormulario();
    this.fase.formulario = new FormularioCFP();
    this.fase.formulario.divisionList = this.utilForm.inicializarFormulario();
  }

    ngOnInit(): void {
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
        
        let tipoCrit = new TipoCriterio ();
        tipoCrit.idTipoCriterio = 1;
        this.criterio.tipoCriterio = tipoCrit;

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

        let tipoCrit = new TipoCriterio ();
        tipoCrit.idTipoCriterio = 1;
        this.criterio.tipoCriterio = tipoCrit;

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

      this.fase = fase;
      this.descripcionModal = "";
  
      this.esNuevo = true;
      this.isNewCriterioModalShown=true;
    }

    OnEditarCriterio(criterio:Criterio,fase:Fase){
      this.fase = fase;
      this.criterio = criterio;
      this.descripcionModal = this.criterio.descripcion;
  
      this.esNuevo = false;
      this.isNewCriterioModalShown=true;
    }

    OnGestionarFases(){
        this.descripcionModal = "";
    
        this.esNuevo = true;
        this.isNewModalShown=true;
    }

    OnGuardarFase(fase: Fase){
        console.log(fase);
        this.faseService.guardarFase(fase).subscribe(
          (response: Response)=>{
            this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', {closeButton: true});
            this.getEventoActualizado();
            this.onHidden();
          }
        )
    }

    OnAgregarFase(evento: Evento){
      if(this.esNuevo){ 
        let faseNueva = new Fase();
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
    
    DetectFin() {
      if (this.item.fechaFin && (this.item.fechaFin.toString() == 'Invalid Date' || this.item.fechaFin.toString() == '')) {
          this.item.fechaFin = new Date();
          this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
          return;
      } /* else {
          if (this.item.fechaFin && this.item.fechaInicio) {
              if (this.item.fechaInicio > this.item.fechaFin) {
                  this.item.fechaFin = new Date();
                  this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
                  return;
              }
          }
      } */
    }

    DetectInicio() {
      if (this.item.fechaInicio && (this.item.fechaInicio.toString() == 'Invalid Date' || this.item.fechaInicio.toString() == '')) {
          this.item.fechaInicio = new Date();
          this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
          return;
      } /* else
          if (this.item.fechaFin && this.item.fechaInicio) {
              if (this.item.fechaInicio > this.item.fechaInicio) {
                  this.item.fechaInicio = new Date();
                  this.toastr.warning('Fecha ingresada no valida', 'Advertencia', { closeButton: true });
                  return;
              }
          } */
    }

    OnCrearFormulario(fase: Fase){
      this.fase = fase;
      this.formulario = fase.formulario;

      console.log(this.formulario);

      if(!this.formulario){
        this.formulario = new FormularioCFP();
        this.formulario.divisionList = this.utilForm.inicializarFormulario();
      }

      this.isNewFormModalShown =true;
    }
}