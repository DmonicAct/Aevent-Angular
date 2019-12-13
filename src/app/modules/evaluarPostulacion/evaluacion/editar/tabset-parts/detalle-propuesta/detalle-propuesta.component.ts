import { OnInit, Component, Input,AfterViewInit, OnChanges } from "@angular/core";
import { Division, RespuestaFormulario, TipoSeccion, Fase, Postulacion, Response } from "../../../../../../models";
import { RespuestaPostulacion } from "../../../../../../models/respuesta_postulacion";
import { TabDirective } from "ngx-bootstrap";
import { PropuestaService } from "../../../../../../services/propuesta.service";
import { EstadoPropuesta } from "src/app/models/enums/estadoPropuesta";
import { AuthService as AeventAuthService } from '../../../../../../auth/service/auth.service';
import { ToastrService } from "ngx-toastr";
import { estadoPostulacion } from "src/app/models/enums/estadoPostulacion";
declare var jQuery: any;

@Component({
  selector: 'detalle-propuesta',
  templateUrl: 'detalle-propuesta.template.html',
  styleUrls: ['detalle-propuesta.template.scss']
})

export class DetallePropuestaComponent implements AfterViewInit, OnChanges{

  @Input('item-division')
  public items: Array<Division>;

  @Input('item-respuesta')
  public respuestas: Array<RespuestaFormulario>;

  public respuestaPostulacion: RespuestaPostulacion;

  //public now_date: String = new Date().toISOString();
  public itemsRepuesta: RespuestaFormulario[][] = [];

  public postulacion: Postulacion;
  public seleccionados: any[];
  public loading: Boolean = false;
  public acumulador: number;

  constructor(
    private toastr: ToastrService
  ) {
    this.postulacion = new Postulacion();

  }

  ngOnChanges() {
    console.log("ITEMS",this.items);
    console.log(this.respuestas);

    if(this.items && this.items.length>0)
      this.acumulador = 0;
      this.items.forEach((d, i) => {
        let conjuntoRpta = new Array<RespuestaFormulario>();
        d.seccionList.forEach((s,j)=>{
          s.preguntaList.forEach((p, k) => {
            let respuesta = new RespuestaFormulario();
            //respuesta.idFormulario = this.idFormulario;
            respuesta.idDivision = d.idDivision;
            respuesta.idSeccion = s.idSeccion;
            respuesta.idPregunta = p.idPregunta;
            respuesta.tipoPregunta = TipoSeccion.PREGUNTA_ABIERTA;
            respuesta.respuesta = this.respuestas[this.acumulador].respuesta;
            this.acumulador = this.acumulador + 1;
            conjuntoRpta.push(respuesta);
          });
        });
        this.itemsRepuesta.push(conjuntoRpta);
      });
  }

  ngAfterViewInit() {
    jQuery('.full-height-scroll').slimscroll({
      height: '100%'
    });
  }
}