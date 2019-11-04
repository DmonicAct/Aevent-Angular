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
  public descripcionModal : String;
  public esNuevo: Boolean;
  public isDeleteModalShown: Boolean;
  public isModalShown: Boolean;
  public newItem : Fase; //para la nueva categoria
  public items : Array<Fase>;
  //public item : Fase;
  public estado: Boolean;
  
  public idEvento : number;

  public loading: Boolean = false;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  @ViewChild('autoDeleteShownModal') 
  autoDeleteShownModal: ModalDirective;
  @ViewChild('autoNewCriterioShownModal') 
  autoNewCriterioShownModa: ModalDirective;
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
    this.fases = new Array<Fase>();
    this.fase = new Fase;
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
    }

    hideModal(): void {
        if(this.isNewModalShown){
          this.autoNewShownModal.hide();
        }else if(this.isModalShown){
          this.autoShownModal.hide();
        }else if(this.isDeleteModalShown){
          this.autoDeleteShownModal.hide();
        }else{
          this.autoNewCriterioShownModa.hide();
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
            this.toastr.success(`Se ha eliminado la categoría con éxito`, 'Aviso', {closeButton: true});
            this.onHidden();      
          }
        }
      );
    }

}