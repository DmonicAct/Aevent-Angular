import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import {DetalleEventoConfiguracion} from './tabset-parts/detalle-evento/detalle-evento.component';
import { Evento } from 'src/app/models';
@Component({
    selector:'editar-gestion-eventos',
    templateUrl:'editar.template.html',
    styleUrls:['editar.template.scss']
})

export class EditarGestionarEventoComponent implements OnInit{
  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoConfiguracion;
  @ViewChild('tabsFases') tabsFases: TabsetComponent;
  @ViewChild('tabsCallforPapers') tabsCallforPapers: TabsetComponent;

  
    public item: Evento;
    constructor(){
        this.item = new Evento();
    }
    ngOnInit(){
        console.log("something");
    }
    
}