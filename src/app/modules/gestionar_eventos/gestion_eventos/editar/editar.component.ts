import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import {DetalleEventoConfiguracion} from './tabset-parts/detalle-evento/detalle-evento.component';
import { Evento, Response, Persona, FormularioCFP, Fase } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { FaseEventoComponent } from '../../fases/fase-evento.component';
import * as moment from 'moment';


@Component({
    selector:'editar-gestion-eventos',
    templateUrl:'editar.template.html',
    styleUrls:['editar.template.scss']
})

export class EditarGestionarEventoComponent implements OnInit{
  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoConfiguracion;
  @ViewChild(FaseEventoComponent) tabsFases: FaseEventoComponent;

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
                this.item.fases.forEach((e,i)=>{
                    if(e.fechaFin)
                        e.fechaFin = moment(e.fechaFin).toDate();
                    if(e.fechaInicial)
                        e.fechaInicial = moment(e.fechaInicial).toDate();
                });
                this.flagEvento = false;
               
            }
        );
    }
    
    displayItem(flag: Boolean){
        /**
         * Evento para habilitar tab de fases
         */
         if(!this.item.fases){
            this.item.fases = new Array<Fase>();
        }
      
        this.flagEvento = flag; 
    }
}