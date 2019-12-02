import { OnInit, Component, Input } from "@angular/core";
import { Criterio, Response } from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EvaluacionService } from '../../../../../../services/index';

import { Evaluacion } from "src/app/models/evaluacion";


@Component({
  selector: 'comentario',
  templateUrl: 'comentario.template.html',
  styleUrls: ['comentario.template.scss']
})
export class ComentarioComponent implements OnInit {

  public criterios: Array<Criterio>;

  @Input('item-evaluacion')
  public evaluacion: Evaluacion;

  public modalComentarioPresidente: string;
  public modalComentarioParticipante: string;
  public itemNivelDeConfianza: Array<String>;
  public itemEvaluacionGeneral: Array<String>;

  constructor(private toastr: ToastrService,
    private router: Router,
    private service: EvaluacionService,
  ) {
    this.evaluacion = new Evaluacion;
    this.itemNivelDeConfianza = ['1 (Bajo)','2','3','4','5 (Alto)'];
    this.itemEvaluacionGeneral = ['1 (Bajo)','2','3','4','5 (Alto)'];
  }

  ngOnInit(): void {

  }

  onSelect() {
    console.log('Comentarios :',this.evaluacion);
    this.modalComentarioParticipante = this.evaluacion.comentarioParticipante;
    this.modalComentarioPresidente = this.evaluacion.comentarioPresidente;
  }

  OnGuardar() {

    this.evaluacion.comentarioPresidente = this.modalComentarioPresidente;
    this.evaluacion.comentarioParticipante = this.modalComentarioParticipante;

    this.service.guardarRespuestaCriterio(this.evaluacion).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.toastr.success(`Se han guardado los comentarios correctamente`, 'Aviso', { closeButton: true });
        }
      }
    );

  }
}