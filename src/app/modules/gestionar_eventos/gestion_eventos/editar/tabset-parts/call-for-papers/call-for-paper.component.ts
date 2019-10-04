import { OnInit, Component, ViewChild } from "@angular/core";
import { Parametro, TipoPregunta, FormularioCFP, Division, Pregunta } from "../../../../../../models";
import { ModalDirective } from "ngx-bootstrap";
import { ToastRef, ToastrService } from "ngx-toastr";
declare var jQuery:any;

@Component({
    selector:'call-for-paper',
    templateUrl:'call-for-paper.template.html',
    styleUrls:['call-for-paper.template.scss']
})
export class CallForPaperComponent implements OnInit{
    public itemsParametro: Array<Parametro>;
    public itemParametro: Parametro;
    public descripcion: string;
    public itemFormulario: FormularioCFP;
    public itemsDivision: Array<Division>;
    public itemDivision: Division;
    public isModalShown: Boolean;
    public itemsTipoPreguntas: Array<TipoPregunta>;
    public itemsPreguntas:Array<Pregunta>;
    public itemPregunta: Pregunta;
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    constructor(
        private toaster: ToastrService
    ){
        
        this.itemsParametro = new Array<Parametro>();
        this.itemParametro = new Parametro;
        this.itemsDivision = Array<Division>();
        this.itemDivision = new Division();
        this.itemsPreguntas = new Array<Pregunta>();
        this.itemPregunta = new Pregunta();
        this.itemsTipoPreguntas = new Array<TipoPregunta>();
        //
        let item: TipoPregunta;
        item = TipoPregunta.PREGUNTA_ABIERTA;
        this.itemsTipoPreguntas.push(item);
        item = TipoPregunta.PREGUNTA_FORMULARIO;
        this.itemsTipoPreguntas.push(item);
        item = TipoPregunta.PREGUNTA_MULTIPLE;
        this.itemsTipoPreguntas.push(item);
        console.log(this.itemsTipoPreguntas);
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
          height: '100%'
        });
      }
    ngOnInit(): void {
        
    }
    OnSeleccionCriterio(){
        console.log(this.itemParametro);
    }
    OnAgregarDivision(){
        if(this.descripcion! || this.descripcion==""){
            return;
        }
        this.itemDivision = new Division()
        this.itemDivision.descripcion = this.descripcion;
        this.itemsDivision.push(this.itemDivision);
        this.descripcion = null;
    }
    OnRowClick(){}
    OnVerPreliminar(){}
    OnEditar(){
        this.isModalShown=true;
    }
    OnEliminar(index:number){
        this.itemsDivision.splice(index,1)[0];
    }
    hideModal(): void {
        this.autoShownModal.hide();
    }
    
    onHidden(): void {
        this.isModalShown = false;
    }
    onNuevo(){
        this.isModalShown=false;
        this.autoShownModal.hide();
    }
}