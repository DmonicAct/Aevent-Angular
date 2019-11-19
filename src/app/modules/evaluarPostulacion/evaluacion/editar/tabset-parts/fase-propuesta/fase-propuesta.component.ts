import { OnInit, Component, Input, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP, } from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { RespuestaCriterioService } from '../../../../../../services/index';

import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";
import { Evaluacion } from "src/app/models/evaluacion";
import { RespuestaCriterio } from "src/app/models/respuesta_criterio";
import { stringify } from "querystring";
import { ifStmt } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'fase-propuesta',
  templateUrl: 'fase-propuesta.template.html',
  styleUrls: ['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit {

  public criterios: Array<Criterio>;

  @Input('item-evaluacion')
  public evaluacion: Evaluacion;
  @Input('item-respuesta')
  public respuestas: Array<RespuestaCriterio>;

  public modalRespuestas: Array<string>;
  public isGuardarRespuestas: Boolean;
  public auxRespuestas: Array<RespuestaCriterio>;

  constructor(private toastr: ToastrService,
    private router: Router,
    private service: RespuestaCriterioService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.isGuardarRespuestas = true;
    this.respuestas = new Array<RespuestaCriterio>();
    this.auxRespuestas = new Array<RespuestaCriterio>();
    this.modalRespuestas = new Array<string>();
    this.evaluacion = new Evaluacion;
  }

  ngOnInit(): void {

  }

  onSelect() {
    this.respuestas.sort(function (a, b) { return a.idCriterio - b.idCriterio });

    this.respuestas.forEach((respuesta, i) => {
        this.modalRespuestas[i] = respuesta.respuesta;
    });
  }

  OnGuardar() {
    this.evaluacion.fase.criterios.forEach((criterio,i) => {
      if(this.respuestas[i]==null){
        this.respuestas[i]= new RespuestaCriterio;
      }
      this.respuestas[i].idCriterio = criterio.idCriterio;
      this.respuestas[i].respuesta = this.modalRespuestas[i];

      this.service.guardarRespuestaCriterio(this.respuestas[i]).subscribe(
        (response: Response) => {
          if (response.estado != "OK") {
            this.isGuardarRespuestas = false;
          }
        }
      );
    });
    /*
    this.respuestas.forEach((respuesta, i) => {
      if (respuesta == null) { 
        //IF NUEVO
        respuesta = new RespuestaCriterio;
        respuesta.idCriterio = this.evaluacion.fase.criterios[i].idCriterio;
        respuesta.respuesta = this.modalRespuestas[i];
      } else {
        //IF EDITANDO
        respuesta.idCriterio = this.evaluacion.fase.criterios[i].idCriterio;
        respuesta.respuesta = this.modalRespuestas[i];
      }

      this.service.guardarRespuestaCriterio(respuesta).subscribe(
        (response: Response) => {
          if (response.estado != "OK") {
            this.isGuardarRespuestas = false;
          }
        }
      );
    });*/

    if (this.isGuardarRespuestas) {
      this.toastr.success(`Se han guardado las respuestas correctamente`, 'Aviso', { closeButton: true });
    }
  }

}