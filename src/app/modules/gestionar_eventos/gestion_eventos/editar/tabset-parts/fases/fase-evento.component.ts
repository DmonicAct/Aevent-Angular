import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio,} from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService } from '../../../../../../services/fase.service';
import { CriterioService } from '../../../../../../services/criterio.service';
import { EventoService } from '../../../../../../services/evento.service';
import { ModalDirective } from 'ngx-bootstrap';

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
  public newItem : Fase; //para la nueva fase
  public items : Array<Fase>;
  //public item : Fase;
  public estado: Boolean;
  public idEvento : number;
  public loading: Boolean = false;

  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewFormShownModal') 
  autoNewFormShownModal: ModalDirective;
  @ViewChild('autoNewShownModautoNewFormShownModalal')
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

  public evento: Evento;
  public criterio: Criterio;
  public criterios: Array<Criterio>;
  public fase: Fase;
  public fases: Array<Fase>;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private faseService: FaseService,
              private criterioService: CriterioService,
              ) {
    this.newItem = new Fase;    
    this.items = new Array<Fase>();

    this.criterio = new Criterio;
    this.criterios = new Array<Criterio>();
    this.fase = new Fase;
    this.fases = new Array<Fase>();
  }

    ngOnInit(): void {
    
    }
    
    getFasesPorEvento() {
        /*console.log(this.item.idEvento);
      
      this.faseService.obtenerFases(this.item).subscribe(
        (response: Response) => {
          console.log(response);  
        }
      );*/ 
      
    }

    setEvento(eventoPadre: Evento) {
        this.evento = eventoPadre;
        //console.log(this.evento);
        this.fases = this.evento.fases;
        this.getFasesPorEvento();
    }

    onSelect(fase: Fase){
        this.newItem = fase;
        
        this.criterioService.obtenerCriterios(fase).subscribe(
            (response: Response) => {
                this.criterios = response.resultado;
                console.log(this.criterios);
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
        }else if (this.isNewFormModalShown){
          this.autoNewFormShownModal.hide();
        }else{
          this.autoNewCriterioShownModal.hide();
        }
      }
    
    OnNuevo(){
        if(this.esNuevo){ //Creando criterio
          this.criterio.descripcion = this.descripcionModal;
          this.criterio.idFase = this.newItem;
          let tipoCrit = new TipoCriterio ();
          tipoCrit.idTipoCriterio = 1;
          this.criterio.tipoCriterio = tipoCrit;

          this.criterioService.guardarCriterio(this.criterio).subscribe(
            (response: Response)=>{
              if(response.estado=="OK"){
                console.log(this.criterio.idFase);
                this.toastr.success(`Se ha guardado el criterio con exito`, 'Aviso', {closeButton: true});
                this.onHidden()
              }
            }
          );
        }else{ //editando criterio
          this.criterio.descripcion=this.descripcionModal;
          this.criterio.idFase = this.newItem;

          this.criterioService.guardarCriterio(this.criterio).subscribe(
            (response: Response)=>{
              if(response.estado=="OK"){
                this.toastr.success(`Se ha editado el criterio con éxito`, 'Aviso', {closeButton: true});
                this.onHidden()
              }
            }
          );
        }
    }

    OnAgregarCriterio(){

        this.descripcionModal = "";
    
        this.esNuevo = true;
        this.isNewCriterioModalShown=true;
    }

    OnEditarCriterio(item:Criterio){
      this.criterio = item;
      this.descripcionModal = this.criterio.descripcion;
  
      this.esNuevo = false;
      this.isNewCriterioModalShown=true;
    }

    OnGestionarFases(){
        this.descripcionModal = "";
    
        this.esNuevo = true;
        this.isNewModalShown=true;
    }
    OnAgregarFase(){
      if(this.esNuevo){ //Creando lugar
        let faseNueva = new Fase();
        faseNueva.descripcion = this.descripcionModal;
        faseNueva.idEvento = this.evento;
        console.log(faseNueva, faseNueva.idEvento.idEvento);
        this.faseService.guardarFase(faseNueva).subscribe(
          (response: Response)=>{
            this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', {closeButton: true});
            this.onHidden();
          }
        )
      }
    }
    OnEliminar(fase: Fase){
      this.fase = fase;
      this.fase.idEvento = this.evento;
      this.isDeleteModalShown=true;
    }
    OnConfirmar(){

      this.faseService.eliminarFase(this.fase).subscribe(
        (response: Response)=>{ 
          console.log(response);  
          if(response.estado=="OK"){
            this.toastr.success(`Se ha eliminado la fase con éxito`, 'Aviso', {closeButton: true});
            this.onHidden();      
          }
        }
      );
    }

    OnEliminarCriterio(criterio: Criterio){
      this.criterio = criterio;
      this.criterio.idFase = this.newItem;
      this.isDeleteCriterioModalShown =true;
    }

    OnConfirmarCriterio(){

      this.criterioService.eliminarCriterio(this.criterio).subscribe(
        (response: Response)=>{ 
          console.log(response);  
          if(response.estado=="OK"){
            this.toastr.success(`Se ha eliminado el criterio con éxito`, 'Aviso', {closeButton: true});
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

  OnCrearFormulario(){

  }
}