import { OnInit, Component, Input } from "@angular/core";
import { FormularioCFP } from "src/app/models";

@Component({
    selector:'call-for-paper-respuesta',
    templateUrl:'callForPaper.template.html',
    styleUrls:['callForPaper.template.scss']
})

export class CallForPaperResponse implements OnInit{
    @Input('formularioCFP')
    public formulario: FormularioCFP;
    
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }

}