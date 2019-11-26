import { OnInit, Component, Input } from "@angular/core";
import { Division, RespuestaFormulario } from '../../../../../models'

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'detallecfp',
  templateUrl: 'detallecfp.template.html',
  styleUrls: ['detallecfp.template.scss']
})

export class DetalleCFPComponent implements OnInit {

  @Input('item-division')
  public items: Array<Division>;
  public acumulador :number;

  @Input('item-respuesta')
  public respuesta: Array<RespuestaFormulario>;

  constructor(private toastr: ToastrService,
  ) {
    this.items = new Array<Division>();
    this.respuesta = new Array<RespuestaFormulario>();
    this.acumulador = 0;

    this.respuesta.forEach(element => {
      element.respuesta = "";
    });
  }

  ngOnInit(): void {

  }

  onFunction(){
    console.log('entra a funcion');
    this.acumulador = this.acumulador + 1 ;
  }
}