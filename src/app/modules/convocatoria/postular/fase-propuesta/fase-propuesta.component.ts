import { OnInit, Component, Input } from "@angular/core";
import { Division, RespuestaFormulario, TipoSeccion, Fase } from "../../../../models";
import { RespuestaPostulacion } from "../../../../models/respuesta_postulacion";
declare var jQuery: any;
@Component({
    selector:'fase-propuesta',
    templateUrl:'fase-propuesta.template.html',
    styleUrls:['fase-propuesta.template.scss']
})
export class FasePropuestaComponent implements OnInit{
    @Input('idFase')
    public idFase: number;

    @Input('idEvento')
    public idEvento:number;

    @Input('idFormulario')
    public idFormulario:number;

    @Input('items')
    public items: Array<Division>;

    @Input('fase')
    public fase:Fase;

    public now_date: String = new Date().toISOString();
    public itemsRepuesta : RespuestaFormulario[][]=[];

    private respuestaFase : RespuestaPostulacion;
    public 
    seleccionados: any[];
    ngOnInit(){
        
        this.items.forEach((e,i)=>{
            let conjuntoRpta = new Array<RespuestaFormulario>();
            e.seccionList[0].preguntaList.forEach((p,i)=>{
                let respuesta = new RespuestaFormulario();
                respuesta.idEvento = this.idEvento;
                respuesta.idFase= this.idFase;
                respuesta.idFormulario=this.idFormulario;
                respuesta.idDivision=e.idDivision;
                respuesta.idSeccion=e.seccionList[0].idSeccion;
                respuesta.idPregunta=p.idPregunta;
                respuesta.tipoPregunta = TipoSeccion.PREGUNTA_ABIERTA;
                respuesta.respuesta = '';
                conjuntoRpta.push(respuesta);
            });
            this.itemsRepuesta.push(conjuntoRpta);
        });
        this.respuestaFase = new RespuestaPostulacion();
        console.log(this.itemsRepuesta);
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
            height: '100%'
        });
    }
    OnEnviar(){
        this.respuestaFase.listaFormulario = new Array<RespuestaFormulario>();
        this.itemsRepuesta.forEach((e,i)=>{
            this.respuestaFase.listaFormulario = this.respuestaFase.listaFormulario.concat(e);
        });
        
        console.log(this.respuestaFase);
    }
    OnGuardarFase(){
        
    }
} 


