import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import {DetalleEventoConfiguracion} from './tabset-parts/detalle-evento/detalle-evento.component';
import { Evento, Response } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';

@Component({
    selector:'editar-gestion-eventos',
    templateUrl:'editar.template.html',
    styleUrls:['editar.template.scss']
})

export class EditarGestionarEventoComponent implements OnInit{
  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoConfiguracion;
  @ViewChild('tabsFases') tabsFases: TabsetComponent;
  @ViewChild('tabsCallforPapers') tabsCallforPapers: TabsetComponent;

    private sub: any;
    public item: Evento;
    public itemCodigo: number = null;
    constructor(private route: ActivatedRoute,
        private service: EventoService){
        this.item = new Evento();
        this.item.idEvento = null;
    }
    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {
            this.itemCodigo = +params['id'];
            if(this.itemCodigo){
                this.obtenerEvento();
            }
        });
    }
    obtenerEvento(){
        this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                console.log(this.item);
            }
        );
    }
}