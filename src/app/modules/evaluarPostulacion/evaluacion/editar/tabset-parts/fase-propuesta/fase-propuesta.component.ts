import { OnInit, Component, Input, ViewChild,OnChanges } from "@angular/core";
import { Criterio, Response } from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { RespuestaCriterioService, EvaluacionService } from '../../../../../../services/index';
import { ModalDirective } from 'ngx-bootstrap';
import { Evaluacion } from "src/app/models/evaluacion";
import { RespuestaCriterio } from "src/app/models/respuesta_criterio";
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';

@Component({
  selector: 'fase-propuesta',
  templateUrl: 'fase-propuesta.template.html',
  styleUrls: ['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit , OnChanges{

  public criterios: Array<Criterio>;
  public isConfirmModalShown: Boolean;
  public loading:Boolean = false;
  @Input('item-evaluacion')
  public evaluacion: Evaluacion;
  @Input('item-respuesta')
  public respuestas: Array<RespuestaCriterio>;
  @ViewChild('autoConfirmShownModal')
  autoConfirmShownModal: ModalDirective;

  public modalRespuestas: Array<string>;
  public isGuardarRespuestas: Boolean;
  public isCriterioVacio: Boolean;
  public onTerminar: Boolean;
  public auxRespuestas: Array<RespuestaCriterio>;

  constructor(private toastr: ToastrService,
    private service: RespuestaCriterioService,
    private serviceEvaluacion: EvaluacionService,
    private authService: AeventAuthService
  ) {
    this.isCriterioVacio = false;
    this.isGuardarRespuestas = true;
    this.onTerminar = false;
    this.respuestas = new Array<RespuestaCriterio>();
    this.auxRespuestas = new Array<RespuestaCriterio>();
    this.modalRespuestas = new Array<string>();
    this.evaluacion = new Evaluacion;
  }

  ngOnInit(): void {

  }

  onHidden(): void {
    this.isConfirmModalShown = false;
  }

  hideModal(): void {
    if (this.isConfirmModalShown) {
      this.autoConfirmShownModal.hide();
    }
  }
  ngOnChanges() {
      this.onSelect();
  }
  OnConfirmar() {
    this.evaluacion.estado = "EVALUACION_CORREGIDA";

    console.log(this.evaluacion);

    this.serviceEvaluacion.guardarRespuestaCriterio(this.evaluacion).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.toastr.success(`Se ha enviado la evaluación correctamente`, 'Aviso', { closeButton: true });
          this.onHidden();
        }
      }
    );
  }
  OnTerminar() {
    this.onTerminar = true;
    this.OnGuardar();

    this.modalRespuestas.forEach(respuesta => {
      console.log(respuesta);
      if (!respuesta) {
        this.isCriterioVacio = true;
      }
    });

    if (this.isCriterioVacio) {
      this.toastr.warning('No es posible enviar la evaluación con criterios vacíos', 'Aviso', { closeButton: true });
      this.isCriterioVacio = false;
    } else if (this.evaluacion.comentarioPresidente == "") {
      this.toastr.warning('No es posible enviar la evaluación sin un comentario', 'Aviso', { closeButton: true });
      this.isCriterioVacio = false;
    } else if (this.evaluacion.evaluacionGeneral == "") {
      this.toastr.warning('No es posible enviar la evaluación sin la evaluacion general', 'Aviso', { closeButton: true });
      this.isCriterioVacio = false;  
    } else if (this.evaluacion.nivelConfianza == "") {
      this.toastr.warning('No es posible enviar la evaluación sin un nivel de confianza', 'Aviso', { closeButton: true });
      this.isCriterioVacio = false;
    } else {
      this.isConfirmModalShown = true;
    }
  }
  llenarRespuestas() {
    this.respuestas = new Array<RespuestaCriterio>();
    let username = this.authService.usuario.username;
    debugger;
    this.evaluacion.fase.criterios.forEach((e) => {
      this.service.obtenerRespuestaCriterio(e.idCriterio,username).subscribe(
        (response: Response) => {
          console.log("LLENAR RESPUESTAS:",response);
          if (response.estado == "OK") {
            if (response.resultado[0] != null) {
              this.respuestas.push(response.resultado[0]);
            }
          }
        }
      );
    });
    this.onSelect();
  }

  onSelect() {
    this.respuestas.sort(function (a, b) { return a.idCriterio - b.idCriterio });

    this.respuestas.forEach((respuesta, i) => {
      this.modalRespuestas[i] = respuesta.respuesta;
    });
  }

  OnGuardar() {
    let flag:Boolean = false;
    
    console.log("Respuestas antes de guardar:",this.respuestas);
    this.evaluacion.fase.criterios.forEach((criterio, i)=>{
      if (this.respuestas[i] != null) {
        if (this.respuestas[i].idRespuestaCriterio != null) {
          this.respuestas[i].idCriterio = criterio.idCriterio;
          this.respuestas[i].respuesta = this.modalRespuestas[i];
        } else {
          this.respuestas[i].idCriterio = criterio.idCriterio;
          this.respuestas[i].respuesta = this.modalRespuestas[i];
        }
      } else {
        this.respuestas[i] = new RespuestaCriterio;
        this.respuestas[i].idCriterio = criterio.idCriterio;
        this.respuestas[i].respuesta = this.modalRespuestas[i];
      }
    });
    let username = this.authService.usuario.username;
    this.loading = true;
    this.service.guardarRespuestaCriterio_test(this.respuestas,username).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.respuestas = response.resultado;
          console.log(this.respuestas);
          /* this.isGuardarRespuestas = false; */
         // this.llenarRespuestas();
          this.toastr.success(`Se han guardado las respuestas correctamente`, 'Aviso', { closeButton: true });
          this.onTerminar = false;
          this.loading = false;
        }
      }
    );
    /* this.evaluacion.fase.criterios.forEach((criterio, i) => {
      
      console.log(this.respuestas[i]);
      if(!flag)
        this.service.guardarRespuestaCriterio(this.respuestas[i],username).subscribe(
          (response: Response) => {
            if (response.estado != "OK") {
              this.respuestas[i] = response.resultado;
              this.modalRespuestas[i] = response.resultado;
              this.isGuardarRespuestas = false;
              flag = true;
            }
          }
        );
    }); */

    /* if (this.isGuardarRespuestas) {
      this.llenarRespuestas();
      if (!this.onTerminar) {
        this.toastr.success(`Se han guardado las respuestas correctamente`, 'Aviso', { closeButton: true });
      }
    }
    this.onTerminar = false; */
  }

}