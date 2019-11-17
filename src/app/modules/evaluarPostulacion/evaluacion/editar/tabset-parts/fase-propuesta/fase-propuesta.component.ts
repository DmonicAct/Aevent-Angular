import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP,} from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService,CriterioService,EventoService,TipoCriterioService} from '../../../../../../services/index';

import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";
import { Evaluacion } from "src/app/models/evaluacion";

@Component({
    selector:'fase-propuesta',
    templateUrl: 'fase-propuesta.template.html',
    styleUrls: ['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit{

  public criterios: Array<Criterio>;

  @Input('item-evaluacion')
  public evaluacion: Evaluacion;


  constructor(private toastr: ToastrService, 
              private router: Router,
              private faseService: FaseService,
              private criterioService: CriterioService,
              private eventoService : EventoService,
              private tipoCriterioService: TipoCriterioService,
              ) {    

  }

    ngOnInit(): void {
      console.log(this.criterios)
    }

}