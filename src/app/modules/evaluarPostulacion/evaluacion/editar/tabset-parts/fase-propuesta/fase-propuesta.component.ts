import { OnInit, Component, Input } from "@angular/core";
import { Criterio, Response } from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { RespuestaCriterioService } from '../../../../../../services/index';

import { Evaluacion } from "src/app/models/evaluacion";
import { RespuestaCriterio } from "src/app/models/respuesta_criterio";

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
    private service: RespuestaCriterioService,
  ) {
    this.isGuardarRespuestas = true;
    this.respuestas = new Array<RespuestaCriterio>();
    this.auxRespuestas = new Array<RespuestaCriterio>();
    this.modalRespuestas = new Array<string>();
    this.evaluacion = new Evaluacion;
  }

  ngOnInit(): void {

  }

  llenarRespuestas(){
    this.respuestas = new Array<RespuestaCriterio>();
    this.evaluacion.fase.criterios.forEach((e) => {
      this.service.obtenerRespuestaCriterio(e.idCriterio).subscribe(
          (response: Response) => {
              if (response.estado == "OK") {
                  if(response.resultado[0]!=null){
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
    this.evaluacion.fase.criterios.forEach((criterio, i) => {
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

      console.log(this.respuestas[i]);
      this.service.guardarRespuestaCriterio(this.respuestas[i]).subscribe(
        (response: Response) => {
          if (response.estado != "OK") {
            this.isGuardarRespuestas = false;
          }
        }
      );
    });

    if (this.isGuardarRespuestas) {
      this.llenarRespuestas();
      this.toastr.success(`Se han guardado las respuestas correctamente`, 'Aviso', { closeButton: true });
    }
  }

}