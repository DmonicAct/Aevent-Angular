import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { DetallePropuestaComponent } from './tabset-parts/detalle-propuesta/detalle-propuesta.component';
import { Evento, Response, Persona, FormularioCFP, Fase } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { FasePropuestaComponent } from './tabset-parts/fase-propuesta/fase-propuesta.component';
import { Evaluacion } from 'src/app/models/evaluacion';
import { EvaluacionService } from 'src/app/services/evaluacion.service';

@Component({
    selector:'editar-evaluacion',
    templateUrl: 'editarEvaluacion.template.html',
    styleUrls:['editarEvaluacion.template.scss']
})

export class EditarEvaluacionComponent implements OnInit{
  @ViewChild('tabsDetalle') tabsDetalle: DetallePropuestaComponent;
  @ViewChild('tabsFase') tabsFases: FasePropuestaComponent;

    private sub: any;
    public item: Evento = new Evento();
    public itemEvaluacion: Evaluacion;
    public flagEvento:Boolean;
    public codigo:number;
    constructor(private route: ActivatedRoute,
        private service: EventoService,
        private serviceEvaluacion: EvaluacionService){

        this.item.idEvento = null;
        this.sub = this.route.params.subscribe(params => {
            this.codigo = +params['id'];
           
            
            if(this.codigo){
                this.obtenerEvaluacion();
            }else{
                this.flagEvento=true;
            }
        });
    }
    ngOnInit(){
        //console.log('HOlaaa')
        //console.log(this.itemEvaluacion);   
    }

    obtenerEvaluacion(){
        this.serviceEvaluacion.obtenerPropuesta(this.codigo).subscribe(
            (response:Response)=>{
                this.itemEvaluacion = response.resultado;
                console.log(this.itemEvaluacion)
            });
    }
    /*

    obtenerEvento(){
        this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                this.flagEvento = false;
            }
        );
    }*/
}   