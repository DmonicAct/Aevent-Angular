import { OnInit, Component, Input, ViewChild, OnChanges } from "@angular/core";
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

  //public modalRespuestas: Array<String>;
  public isGuardarRespuestas: Boolean;

  constructor(private toastr: ToastrService,
    private router: Router,
    private service: RespuestaCriterioService
  ) {
    
    //this.modalRespuestas = new Array<String>();
    this.respuestas = new Array<RespuestaCriterio>(10);
    this.isGuardarRespuestas = true;
    
  }

  ngOnInit(): void {

  }

  OnGuardar() {
    console.log(this.respuestas);
    this.respuestas.forEach((respuesta,i) => {
      respuesta.idCriterio = this.evaluacion.fase.criterios[i].idCriterio;
      console.log(respuesta);
      this.service.guardarRespuestaCriterio(respuesta).subscribe(
        (response: Response) => {
          if (response.estado != "OK") {
            this.isGuardarRespuestas = false;
          }
        }
      );
    });
    if (this.isGuardarRespuestas) {
      this.toastr.success(`Se han guardado las respuestas correctamente`, 'Aviso', { closeButton: true });
    }
  }

}