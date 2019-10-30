import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import {DetalleEventoConfiguracion} from './tabset-parts/detalle-evento/detalle-evento.component';
import { Evento, Response, Persona, FormularioCFP } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { UtilFormulario } from 'src/app/util/util_formulario';

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
    public item: Evento = new Evento();
    public itemCodigo: number = null;
    public flagEvento:Boolean;
    private utilForm: UtilFormulario;
    constructor(private route: ActivatedRoute,
        private service: EventoService){
        this.utilForm = new UtilFormulario();
        //this.item = new Evento();
        this.item.formulario = new FormularioCFP();
        this.item.formulario.divisionList = this.utilForm.inicializarFormulario();

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
                if(!this.item.formulario){
                    this.item.formulario = new FormularioCFP();
                    this.item.formulario.divisionList = this.utilForm.inicializarFormulario();
                }
                    
            }
        );
    }
    displayItem(flag: Boolean){
        if(!this.item.formulario){
            this.item.formulario = new FormularioCFP();
        }
        this.flagEvento = flag;
    }
}