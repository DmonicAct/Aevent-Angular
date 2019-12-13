import { Component, OnInit, ViewChild } from '@angular/core'
import { TabsetComponent, TabDirective, CarouselConfig } from 'ngx-bootstrap';
import { DetallePropuestaComponent } from './tabset-parts/detalle-propuesta/detalle-propuesta.component';
import { Evento, Response, Persona, FormularioCFP, Fase, Criterio, RespuestaFormulario } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { FasePropuestaComponent } from './tabset-parts/fase-propuesta/fase-propuesta.component';
import { Evaluacion } from 'src/app/models/evaluacion';
import { EvaluacionService } from 'src/app/services/evaluacion.service';
import { RespuestaCriterioService } from '../../../../services/respuesta_criterio.service';
import { PropuestaService } from '../../../../services/propuesta.service';
import { RespuestaCriterio } from 'src/app/models/respuesta_criterio';
import { ComentarioComponent } from './tabset-parts/comentario-propuesta/comentario.component';
import { Propuesta } from 'src/app/models/propuesta';
import { AuthService as AeventAuthService } from '../../../../auth/service/auth.service';

@Component({
    selector: 'editar-evaluacion',
    templateUrl: 'editarEvaluacion.template.html',
    styleUrls: ['editarEvaluacion.template.scss']
})

export class EditarEvaluacionComponent implements OnInit {
    @ViewChild('tabsDetalle') tabsDetalle: DetallePropuestaComponent;
    @ViewChild(FasePropuestaComponent) tabsFases: FasePropuestaComponent;
    @ViewChild(ComentarioComponent) tabComentario: ComentarioComponent;

    private sub: any;
    public item: Evento = new Evento();
    public itemEvaluacion: Evaluacion;
    public flagEvento: Boolean;
    public codigo: number;
    public respuestaCriterio: Array<RespuestaCriterio>;
    public respuestaFormulario: Array<RespuestaFormulario>;

    constructor(private route: ActivatedRoute,
        private service: EventoService,
        private serviceEvaluacion: EvaluacionService,
        private serviceRespuestaCriterio: RespuestaCriterioService,
        private servicePropuesta: PropuestaService,
        private authService: AeventAuthService
    ) {
        this.respuestaCriterio = new Array<RespuestaCriterio>();
        this.respuestaFormulario = new Array<RespuestaFormulario>();

        this.itemEvaluacion = new Evaluacion();
        this.itemEvaluacion.fase = new Fase();
        this.itemEvaluacion.fase.criterios = new Array<Criterio>();
        this.itemEvaluacion.fase.formulario = new FormularioCFP;

        this.itemEvaluacion.propuesta = new Propuesta();
        this.itemEvaluacion.propuesta.postulante = new Persona();

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

    onSelect(): void {
        this.tabsFases.onSelect();
    }

    onSelectComentario(): void {
        this.tabComentario.onSelect();
    }


    obtenerEvaluacion() {
        console.log(this.codigo);
        let username = this.authService.usuario.username;
        this.serviceEvaluacion.obtenerPropuesta(this.codigo).subscribe(
            (response: Response) => {
                console.log("Response obtenerEvaluacion : ",response);
                this.itemEvaluacion = response.resultado;
                this.itemEvaluacion.fase.criterios.forEach((e) => {
                    this.serviceRespuestaCriterio.obtenerRespuestaCriterio(e.idCriterio,username).subscribe(
                        (response: Response) => {
                            if (response.estado == "OK" && response.resultado) {
                                if (response.resultado[0] != null) {
                                    this.respuestaCriterio.push(response.resultado[0]);
                                }
                            }
                        }
                    );
                });
                /**
                 * 
                 * 
                 * 
                 * Solo asocia a la primera fase que encuentra en el listado
                 */
                this.servicePropuesta.obtenerPostulaciones(this.itemEvaluacion.propuesta.idPropuesta).subscribe(
                    (response: Response) => {
                        console.log("Response obtenerPostulaciones: ", response);
                        this.respuestaFormulario = response.resultado[0].listaFormulario;
                        console.log(this.respuestaFormulario)
                    }
                );
            }
        );
    }
}   