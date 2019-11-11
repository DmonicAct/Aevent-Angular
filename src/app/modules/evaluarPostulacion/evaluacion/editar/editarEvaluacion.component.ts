import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { DetallePropuestaComponent } from './tabset-parts/detalle-propuesta/detalle-propuesta.component';
import { Evento, Response, Persona, FormularioCFP, Fase } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { FasePropuestaComponent } from './tabset-parts/fase-propuesta/fase-propuesta.component';

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
    public itemCodigo: number = null;
    public flagEvento:Boolean;
    constructor(private route: ActivatedRoute,
        private service: EventoService){

        this.item.idEvento = null;
        this.sub = this.route.params.subscribe(params => {
            this.itemCodigo = +params['id'];
            if(this.itemCodigo){
                this.obtenerEvento();
            }else{
                this.flagEvento=true;
            }
        });
    }
    ngOnInit(){
        
    }
    
    obtenerEvento(){
        this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                this.flagEvento = false;
            }
        );
    }
    
}