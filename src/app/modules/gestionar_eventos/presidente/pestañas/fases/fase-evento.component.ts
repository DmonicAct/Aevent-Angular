import { OnInit, Component, Input, ViewChild } from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP, } from "../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService, CriterioService, EventoService, TipoCriterioService } from '../../../../../services/index';

import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";

@Component({
  selector: 'fase-evento-presidente',
  templateUrl: 'fase-evento.template.html',
  styleUrls: ['fase-evento.template.scss']
})
export class FaseEventoPresidente implements OnInit {

  public loading: Boolean = false;

  public isNewModalShown: Boolean;
  public isNewCriterioModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public isDeleteCriterioModalShown: Boolean;
  public isModalShown: Boolean;
  public isNewFormModalShown: Boolean;

  public descripcionModal: String;
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
  public tempDescModal: String;
  public arrayCriterios: Array<Criterio>;
  constructor(private toastr: ToastrService,
    private router: Router,
    private faseService: FaseService,
    private criterioService: CriterioService,
    private eventoService: EventoService,
    private tipoCriterioService: TipoCriterioService,
  ) {
    this.criterio = new Criterio;
    this.fase = new Fase;
    this.tipoCriterios = new Array<TipoCriterio>();
    this.arrayCriterios = new Array<Criterio>();
    this.utilForm = new UtilFormulario();
    this.fase.formulario = new FormularioCFP();
    this.fase.formulario.divisionList = this.utilForm.inicializarFormulario();
  }

  ngOnInit(): void {
    //console.log("Evento: ", this.item);
    this.obtenerTipoCriterio();
  }

  obtenerTipoCriterio() {
    this.tipoCriterioService.obtenerTipoCriterios().subscribe(
      (response: Response) => {
        this.tipoCriterios = response.resultado;
        //console.log(this.tipoCriterios);
      }
    );
  }

  getEventoActualizado() {
    this.eventoService.obtenerEvento(this.item.idEvento).subscribe(
      (response: Response) => {
        this.item = response.resultado;
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
    }
  }

  OnNuevo() {
    if (this.esNuevo) { //Creando criterio
      this.criterio.descripcion = this.descripcionModal;
      this.criterio.idFase = this.fase.idFase;
      this.criterio.tipoCriterio = this.tipoCriterioModal;
      this.criterio.idCriterio = null;
      this.arrayCriterios.push(this.criterio);
      console.log('CREANDO CRITERIO');
      console.log(this.criterio.idFase);

      this.criterioService.guardarCriterio(this.criterio).subscribe(
        (response: Response) => {
          if (response.estado == "OK") {
            this.toastr.success(`Se ha guardado el criterio con exito`, 'Aviso', { closeButton: true });
            this.getEventoActualizado();
            this.onHidden()
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
            this.getEventoActualizado();
            this.onHidden()
          }
        }
      );
    }
  }

  OnAgregarCriterio(fase: Fase) {
    console.log(fase)

    this.fase = fase;
    this.arrayCriterios = this.fase.criterios;
    this.descripcionModal = "";
    this.tipoCriterioModal = new TipoCriterio();

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
    this.isModalShown = true;
  }

  OnGestionarFases() {
    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown = true;
  }

  OnGuardarFase(fase: Fase) {
    console.log(fase);
    this.faseService.guardarFase(fase).subscribe(
      (response: Response) => {
        this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', { closeButton: true });
        this.getEventoActualizado();
        this.onHidden();
      }
    )
  }

  OnAgregarFase(evento: Evento) {
    if (this.esNuevo) {
      let faseNueva = new Fase();
      faseNueva.descripcion = this.descripcionModal;
      faseNueva.idEvento = evento.idEvento;
      this.faseService.guardarFase(faseNueva).subscribe(
        (response: Response) => {
          this.toastr.success(`Se ha guardado la fase con exito`, 'Aviso', { closeButton: true });
          this.getEventoActualizado();
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
    this.criterioService.eliminarCriterio(this.criterio).subscribe(
      (response: Response) => {
        console.log(response);
        if (response.estado == "OK") {
          this.toastr.success(`Se ha eliminado el criterio con éxito`, 'Aviso', { closeButton: true });
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

  OnCrearFormulario(fase: Fase) {
    this.fase = fase;
    this.formulario = fase.formulario;

    console.log(this.formulario);

    if (!this.formulario) {
      this.formulario = new FormularioCFP();
      this.formulario.divisionList = this.utilForm.inicializarFormulario();
    }

    this.isNewFormModalShown = true;
  }
}