import {Component, OnInit,ViewChild} from '@angular/core'
import { TabsetComponent } from 'ngx-bootstrap';
import { Evento, Response, Persona, FormularioCFP, Division, Paginacion } from '../../../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { EventoService } from '../../../../services';
import { DetalleEventoVer } from './detalle-evento/detalleEventoPresidente.component';

import { ComiteEventoVer } from './comite-evento/comiteEventoPresidente.component';

import { VerFormatoPresidente} from './call-for-papers-view/verFormato.component';
import { AsignarPropuestasVer } from './asignar-propuestas/asignar-propuestas.component';
import { Propuesta } from 'src/app/models/propuesta';


@Component({
    selector:'ver-eventos',
    templateUrl:'ver.template.html',
    styleUrls:['ver.template.scss']
})

export class VerEventoPresidenteComponent implements OnInit{

  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoVer;
  @ViewChild('tabsComite') tabsComite: ComiteEventoVer;
  @ViewChild('tabsPropuestas') tabsPropuestas: AsignarPropuestasVer;
  /*

  @ViewChild('tabsDetalle') tabsDetalle: DetalleEventoVer; 
  @ViewChild('tabsFases') tabsFases: VerFormatoPresidente;/*

  @ViewChild('tabsCallforPapers') tabsCallforPapers: TabsetComponent; */

    private sub: any;
    public item: Evento;
    public itemCodigo: number = null;
    public flagEvento:Boolean;
    public propuestas:Propuesta;
    public formulario: FormularioCFP;
    public paginacion: Paginacion;
    public divisiones: Array<Division>
    //public serviceEvento: EventoService;
    constructor(private route: ActivatedRoute,
        private service: EventoService){

        //debugger
        this.paginacion = new Paginacion({ pagina: 1, registros: 10 });

        


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
                //Ahora hay un formulario por cada fase!
                //this.divisiones = this.item.formulario.divisionList;
            }
        );
        console.log("ITEM",this.item);
        console.log("ITEM CODIGO",this.itemCodigo)
        console.log("id eventooo",this.item.idEvento);
        this.service.obtenerPropuestas(this.itemCodigo, this.paginacion.pagina, this.paginacion.registros).subscribe(
            (response: Response) => {
              this.propuestas = response.resultado;
              console.log(response);
              console.log("EvaluadoresDisponibles");
            }
          );

          console.log("PROPUESTAAAS",this.propuestas);
          
    }
    displayItem(flag: Boolean){
        this.flagEvento = flag;
    }
}