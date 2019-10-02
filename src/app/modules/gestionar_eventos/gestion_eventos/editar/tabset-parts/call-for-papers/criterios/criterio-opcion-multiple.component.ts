import { OnInit, Component } from "@angular/core";
import { Parametro } from "../../../../../../../models";

@Component({
    selector:'criterio-multiple',
    templateUrl:'criterio-opcion-multiple.template.html',
    styleUrls:['criterio-opcion-multiple.template.scss']
})
export class CriterioOpcionMultiple implements OnInit{
    public items: Array<Parametro>;
    constructor(){
        this.items=new Array<Parametro>();
    }
    ngOnInit(): void {
       
    }

}