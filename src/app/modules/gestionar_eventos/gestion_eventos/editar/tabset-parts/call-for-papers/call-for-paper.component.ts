import { OnInit, Component } from "@angular/core";
import { Parametro, Criterio } from "../../../../../../models";


@Component({
    selector:'call-for-paper',
    templateUrl:'call-for-paper.template.html',
    styleUrls:['call-for-paper.template.scss']
})
export class CallForPaperComponent implements OnInit{
    public itemsParametro: Array<Parametro>;
    public itemParametro: Parametro;
    constructor(){
        
        this.itemsParametro = new Array<Parametro>();
        this.itemParametro = new Parametro;
    }
    ngOnInit(): void {
        let parametro1 : Parametro;
        let parametro2 : Parametro;
        let parametro3 : Parametro;
        parametro1 = new Parametro();
        parametro2 = new Parametro();
        parametro3 = new Parametro();
        parametro1.id=1;
        parametro1.codigo=Criterio.PREGUNTA_ABIERTA;
        parametro1.decripcion="Pregunta Abierta";
        parametro2.id=2;
        parametro2.codigo=Criterio.PREGUNTA_FORMULARIO;
        parametro2.decripcion="Pregunta de formulario";
        parametro3.id=3;
        parametro3.codigo=Criterio.PREGUNTA_MULTIPLE;
        parametro3.decripcion="Pregunta de de opción multiple";

        this.itemsParametro.push(parametro1);
        this.itemsParametro.push(parametro2);
        this.itemsParametro.push(parametro3);
    }
    OnSeleccionCriterio(){
        console.log(this.itemParametro);
    }
    OnEditar(){}
    OnEliminar(){}
}