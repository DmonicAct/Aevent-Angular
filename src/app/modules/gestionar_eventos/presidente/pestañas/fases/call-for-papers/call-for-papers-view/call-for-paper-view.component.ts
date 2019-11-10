import { OnInit, Component, Input } from "@angular/core";
import { Division } from "../../../../../../../models";
declare var jQuery: any;
@Component({
    selector:'call-for-paper-view-presidente',
    templateUrl:'call-for-paper-view.template.html',
    styleUrls:['call-for-paper-view.template.scss']
})
export class CallForPaperViewPresidente implements OnInit{
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