import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { Evento, Response, Persona, FormularioCFP, Division } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { DetalleEventoVer } from './detalle-evento/detalleEventoPresidente.component';

import { ComiteEventoVer } from './comite-evento/comiteEventoPresidente.component';

import { VerFormatoPresidente} from './call-for-papers-view/verFormato.component';


@Component({
    selector:'ver-eventos',
    templateUrl:'ver.template.html',
    styleUrls:['ver.template.scss']
})

export class VerEventoPresidenteComponent implements OnInit{

  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoVer;
  @ViewChild('tabsComite') tabsComite: ComiteEventoVer;
  /*

  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoVer; 
  @ViewChild('tabsFases') tabsFases: VerFormatoPresidente;/*

  @ViewChild('tabsCallforPapers') tabsCallforPapers: TabsetComponent; */

    private sub: any;
    public item: Evento;
    public itemCodigo: number = null;
    public flagEvento:Boolean;
    public formulario: FormularioCFP;
    public divisiones: Array<Division>
    constructor(private route: ActivatedRoute,
        private service: EventoService){

        //debugger


        this.item = new Evento();
        this.item.idEvento = null;
        this.formulario = new FormularioCFP();
        this.sub = this.route.params.subscribe(params => {

            //debugger


            this.itemCodigo = +params['id'];
            if(this.itemCodigo){
                this.obtenerEvento();
            }else{
                this.flagEvento=true;
            }
            //console.log("in ngoninit");
        });
    }
    ngOnInit(){
        
    }

    OnRowClick(i, item){
        
    }
    obtenerEvento(){
        this.service.obtenerEvento(this.itemCodigo).subscribe(
            (response: Response)=>{
                this.item=response.resultado;
                this.flagEvento = false;
                this.divisiones = this.item.formulario.divisionList;
            }
        );
    }
    displayItem(flag: Boolean){
        this.flagEvento = flag;
    }
}