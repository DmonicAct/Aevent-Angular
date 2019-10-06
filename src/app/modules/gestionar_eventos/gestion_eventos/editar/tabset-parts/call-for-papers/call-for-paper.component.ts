import { OnInit, Component, ViewChild } from "@angular/core";
import { Parametro, TipoPregunta, FormularioCFP, Division, Pregunta, Seccion } from "../../../../../../models";
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
    public itemsSecciones: Array<Seccion>;
    public itemsTipoPreguntas: Array<TipoPregunta>;
    public itemTipoPregunta: TipoPregunta;
    public itemsPreguntas:Array<Pregunta>;
    public itemPregunta: Pregunta;
    public limite:number;
    public descripcionPregunta:string;
    public descripcionSeccion:string;
    public counterSeccion: number;
    
    public counterPreguntaAbierta: number = 0;
    public counterPreguntaMultiple:number = 0;
    public counterPreguntaFormulario:number = 0;

    //Seccions
    public itemsSeccion: Array<Seccion>;
    public itemSeccion: Seccion;

    @ViewChild('autoShownModal') 
    autoShownModal: ModalDirective;
    constructor(
        private toastr: ToastrService
    ){
        this.itemsParametro = new Array<Parametro>();
        this.itemParametro = new Parametro;
        this.itemsDivision = Array<Division>();
        this.itemDivision = new Division();
        this.itemsPreguntas = new Array<Pregunta>();
        this.itemPregunta = new Pregunta();
        this.itemsTipoPreguntas = new Array<TipoPregunta>();
        
        this.itemsSeccion = new Array<Seccion>();
        this.itemSeccion = new Seccion();
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
        if(this.descripcion==null || this.descripcion.trim()==""){
            this.toastr.warning(`Descripcion vacia`, 'Aviso', {closeButton: true});
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
        console.log(this.isModalShown)
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
    OnAgrgarSeccion(){
        console.log(this.itemTipoPregunta);
    }
    OnAgregarSeccion(){
        this.itemSeccion = new Seccion();
        this.itemSeccion.descripcion = this.descripcionSeccion;
        this.itemSeccion.tipoSeccion = this.itemTipoPregunta;
        this.itemsSeccion.push(this.itemSeccion);
        this.descripcionSeccion = null;
    }
    OnAgregarPregunta(){
        console.log(this.itemTipoPregunta);
        this.itemPregunta = new Pregunta();
        this.itemPregunta.descripcion = this.descripcionPregunta;
        this.itemPregunta.tipoPregunta = this.itemTipoPregunta;
        switch(this.itemTipoPregunta){
            case "PREGUNTA ABIERTA":{
                this.itemsPreguntas.push(this.itemPregunta);
                break;
            }
            case "PREGUNTA MULTIPLE":{
                this.itemsPreguntas.push(this.itemPregunta);
                this.counterPreguntaMultiple++;
                break;
            }
            case "PREGUNTA FORMULARIO":{
                this.itemsPreguntas.push(this.itemPregunta);
                this.counterPreguntaFormulario++;
                break;
            }
        }
        this.descripcionPregunta=null;
        this.descripcionSeccion=null;
    }
    OnEliminarSeccion(item){

    }
}