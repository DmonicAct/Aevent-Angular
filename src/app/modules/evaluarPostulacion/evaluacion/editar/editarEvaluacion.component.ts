import { Component, OnInit, ViewChild } from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { DetallePropuestaComponent } from './tabset-parts/detalle-propuesta/detalle-propuesta.component';
import { Evento, Response, Persona, FormularioCFP, Fase, Criterio } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { FasePropuestaComponent } from './tabset-parts/fase-propuesta/fase-propuesta.component';
import { Evaluacion } from 'src/app/models/evaluacion';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { RespuestaCriterioService } from '../../../../services/respuesta_criterio.service'
import { RespuestaCriterio } from 'src/app/models/respuesta_criterio';

@Component({
    selector: 'editar-evaluacion',
    templateUrl: 'editarEvaluacion.template.html',
    styleUrls: ['editarEvaluacion.template.scss']
})

export class EditarEvaluacionComponent implements OnInit {
    @ViewChild('tabsDetalle') tabsDetalle: DetallePropuestaComponent;
    @ViewChild('tabsFase') tabsFases: FasePropuestaComponent;

    private sub: any;
    public item: Evento = new Evento();
    public itemEvaluacion: Evaluacion;
    public flagEvento: Boolean;
    public codigo: number;
    public respuestaCriterio: Array<RespuestaCriterio>
    constructor(private route: ActivatedRoute,
        private service: EventoService,
        private serviceEvaluacion: EvaluacionService,
        private serviceRespuestaCriterio: RespuestaCriterioService) {
        this.respuestaCriterio = new Array<RespuestaCriterio>();

        this.itemEvaluacion = new Evaluacion();
        this.itemEvaluacion.fase = new Fase();
        this.itemEvaluacion.fase.criterios = new Array<Criterio>();
        this.itemEvaluacion.fase.formulario = new FormularioCFP;

        this.item.idEvento = null;
        this.sub = this.route.params.subscribe(params => {
            this.codigo = +params['id'];
            if (this.codigo) {
                this.obtenerEvaluacion();
            } else {
                this.flagEvento = true;
            }
        });
    }
    ngOnInit() {

    }

    async obtenerEvaluacion() {

        await this.serviceEvaluacion.obtenerPropuesta(this.codigo).subscribe(
            (response: Response) => {
                this.itemEvaluacion = response.resultado;
                console.log('Evaluación Obtenida', response);
                this.itemEvaluacion.fase.criterios.forEach((e) => {
                    this.serviceRespuestaCriterio.obtenerRespuestaCriterio(e.idCriterio).subscribe(
                        (response: Response) => {
                            if (response.estado == "OK") {
                                this.respuestaCriterio.push(response.resultado[0]);
                            }
                        }
                    );
                });
                console.log(this.respuestaCriterio);
            }
        );
    }
}   