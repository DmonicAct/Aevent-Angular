import { OnInit, Component } from "@angular/core";
import { Parametro } from "../../../../../../../models";

@Component({
    selector:'criterio-formulario',
    templateUrl:'criterio-pregunta-formulario.template.html',
    styleUrls:['criterio-pregunta-formulario.template.scss']
})
export class CriterioFormularioComponent implements OnInit{
    public items: Array<Parametro>;
    constructor(){
        this.items=new Array<Parametro>();
    }
    ngOnInit(): void {
       
    }

}