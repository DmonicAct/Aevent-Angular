import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response,} from "../../../../../../models";
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
  public descripcionModal : String;
  public esNuevo: Boolean;

  public newItem : Fase; //para la nueva categoria
  public items : Array<Fase>;
  //public item : Fase;
  public estado: Boolean;
  
  public idEvento : number;

  public loading: Boolean = false;
  //@ViewChild('autoShownModal') 
  //autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  //@ViewChild('autoDeleteShownModal') 
  //autoDeleteShownModal: ModalDirective;
  //Evento de Padre
  @Input('item-evento')
  public item: Evento;
  public evento: Evento;
  public criterio: Criterio;
  public criterios: Array<Criterio>;

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
  }

    ngOnInit(): void {
    }
    
    getFasesPorEvento() {
        /*
      console.log(this.item.idEvento);
      this.service.obtenerFases(this.item).subscribe(
        (response: Response) => {
          console.log(response);
        }
      );*/
    }

    setEvento(eventoPadre: Evento) {
        this.evento = eventoPadre;
        console.log(this.evento);
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
        this.isNewModalShown = false;
      }

    hideModal(): void {
        if(this.isNewModalShown){
          this.autoNewShownModal.hide();
        }/*else if(this.isModalShown){
          this.autoShownModal.hide();
        }else{
          this.autoDeleteShownModal.hide();
        }*/
      }
    
    OnNuevo(){
        if(this.esNuevo){ //Creando lugar
          this.criterio.descripcion = this.descripcionModal;
          this.criterio.fase = this.newItem;
        
          this.criterioService.guardarCriterio(this.criterio).subscribe(
            (response: Response)=>{
              if(response.estado=="OK"){
                this.toastr.success(`Se ha guardado el criterio con exito`, 'Aviso', {closeButton: true});
                this.onHidden()
              }
            }
          );
        }else{ //editando lugar
          this.criterio.descripcion=this.descripcionModal;
          this.criterio.fase = this.newItem;

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
        this.isNewModalShown=true;
    }

}