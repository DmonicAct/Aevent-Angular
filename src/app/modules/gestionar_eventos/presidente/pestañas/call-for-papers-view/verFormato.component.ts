import { OnInit, Component, Input } from "@angular/core";
import { Division, Evento } from "../../../../../models";
declare var jQuery: any;
@Component({
    selector:'verFormato',
    templateUrl:'verFormato.template.html',
    styleUrls:['verFormato.template.scss']
})
export class VerFormatoPresidente implements OnInit{

    @Input('items')
    public items: Array<Division>;

    seleccionados: any[];
    ngOnInit(){
        
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
            height: '100%'
        });
    }
}