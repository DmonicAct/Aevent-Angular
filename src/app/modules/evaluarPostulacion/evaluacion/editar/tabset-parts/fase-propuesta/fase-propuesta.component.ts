import { OnInit, Component, Input,ViewChild} from "@angular/core";
import { Fase, Evento, Criterio, Response, TipoCriterio, FormularioCFP,} from "../../../../../../models";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FaseService,CriterioService,EventoService,TipoCriterioService} from '../../../../../../services/index';

import { ModalDirective } from 'ngx-bootstrap';
import { UtilFormulario } from 'src/app/util/util_formulario';
import * as moment from 'moment';
import { a } from "@angular/core/src/render3";

@Component({
    selector:'fase-propuesta',
    templateUrl: 'fase-propuesta.template.html',
    styleUrls: ['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit{

  public criterios: Array<Criterio>;


  constructor(private toastr: ToastrService, 
              private router: Router,
              private faseService: FaseService,
              private criterioService: CriterioService,
              private eventoService : EventoService,
              private tipoCriterioService: TipoCriterioService,
              ) {

    this.criterios = new Array<Criterio>();
    
    this.criterios[0] = new Criterio;
    this.criterios[0].descripcion = "¿Cumple con los requisitos?"
    this.criterios[0].idCriterio = 1;
    this.criterios[0].tipoCriterio = new TipoCriterio;
    this.criterios[0].tipoCriterio.idTipoCriterio = 5;

    this.criterios[1] = new Criterio;
    this.criterios[1].descripcion = "¿Cumple con la experiencia necesaria?";
    this.criterios[1].idCriterio = 2;
    this.criterios[1].tipoCriterio = new TipoCriterio;
    this.criterios[1].tipoCriterio.idTipoCriterio = 5;
    
    this.criterios[2] = new Criterio;
    this.criterios[2].descripcion = "¿Sus dotitas?"
    this.criterios[2].idCriterio = 3;
    this.criterios[2].tipoCriterio = new TipoCriterio;
    this.criterios[2].tipoCriterio.idTipoCriterio = 5;

    this.criterios[3] = new Criterio;
    this.criterios[3].descripcion = "¿Que creees que va a pasar?"
    this.criterios[3].idCriterio = 4;
    this.criterios[3].tipoCriterio = new TipoCriterio;
    this.criterios[3].tipoCriterio.idTipoCriterio = 5;

  }

    ngOnInit(): void {
      console.log(this.criterios)
    }

}