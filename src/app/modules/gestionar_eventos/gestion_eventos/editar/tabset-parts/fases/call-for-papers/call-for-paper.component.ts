import { OnInit, Component, ViewChild, Input } from "@angular/core";
import { Response, Parametro, TipoSeccion, FormularioCFP, Division, Pregunta, Seccion, Evento, Fase } from "../../../../../../../models";
import { ModalDirective } from "ngx-bootstrap";
import { Location } from '@angular/common';
import { FaseService } from '../../../../../../../services/fase.service';
import { ToastRef, ToastrService } from "ngx-toastr";
import { UtilFormulario } from "src/app/util/util_formulario";
declare var jQuery: any;

@Component({
    selector: 'call-for-paper',
    templateUrl: 'call-for-paper.template.html',
    styleUrls: ['call-for-paper.template.scss']
})
export class CallForPaperComponent implements OnInit {
    private utilForm: UtilFormulario;
        
    public itemsParametro: Array<Parametro>;
    public itemParametro: Parametro;



    public isModalShown: Boolean;
    public limite: number;


    public counterPreguntaAbierta: number = 0;
    public counterPreguntaMultiple: number = 0;
    public counterPreguntaFormulario: number = 0;
    public counterSeccion: number;
    public loading: Boolean = false;

    //@Input('item-cfp')
    //public formulario:FormularioCFP;

    @Input('item-fase')
    public item: Fase;

    @Input('item-cfp')
    public itemFormulario: FormularioCFP;
    //Tipos Preguntas
    public itemsTipoSeccion: Array<TipoSeccion>;
    public itemTipoSeccion: TipoSeccion;
    //Division
    public itemsDivision: Array<Division>;
    public itemDivision: Division;
    public descripcionDivision: string;
    public indexDivision: number;
    //Secciones
    public itemsSeccion: Array<Seccion>;
    public itemSeccion: Seccion;
    public descripcionSeccion: string;
    public disabledSeccionDescripcion: Boolean=false;
    public indexSeccion: number;
    //Preguntas
    public itemsPreguntas: Array<Pregunta>;
    public itemPregunta: Pregunta;  
    public descripcionPregunta: string;
    public disabledPreguntaDescripcion: Boolean=false;
    public indexPregunta: number;
    //Edicion
    public editarPregunta: Boolean = false;
    public editarSeccion: Boolean = false;
    public editarDivision: Boolean = false;
    @ViewChild('autoShownModal')
    autoShownModal: ModalDirective;

    selectedRowSeccion: number;
    selectedRowPregunta: number;
    constructor(
        private serviceFase: FaseService,
        private toastr: ToastrService,
        private _location: Location
    ) {
        this.utilForm = new UtilFormulario();

        this.itemsParametro = new Array<Parametro>();
        this.itemParametro = new Parametro;
        this.itemsDivision = Array<Division>();
        this.itemDivision = new Division();
        this.itemsPreguntas = new Array<Pregunta>();
        this.itemPregunta = new Pregunta();
        this.itemsTipoSeccion = new Array<TipoSeccion>();
        
            
        this.itemFormulario = new FormularioCFP();    

        this.itemsSeccion = new Array<Seccion>();
        this.itemSeccion = new Seccion();
        //
        let item: TipoSeccion;
        item = TipoSeccion.PREGUNTA_ABIERTA;
        this.itemsTipoSeccion.push(item);
        item = TipoSeccion.PREGUNTA_FORMULARIO;
        this.itemsTipoSeccion.push(item);
        item = TipoSeccion.PREGUNTA_MULTIPLE;
        this.itemsTipoSeccion.push(item);
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
            height: '100%'
        });
    }
    ngOnInit(): void {

    }
    OnSeleccionCriterio() {

    }


    OnVerPreliminar() {

     }

    //Modal
    hideModal(): void {
       this.autoShownModal.hide();
    }

    onHidden(): void {
        this.isModalShown = false;
        //this.autoShownModal.hide();
    }
    onNuevo() {

    }
    /**
     * 
     * backup del arreglo de secciones
     * para regresar a los valores anteriores
     * let backup_secciones = JSON.string(this.itemsDivision.secciones);
     * 
     */
    OnAgregarDivision() {
        if (this.descripcionDivision == null || this.descripcionDivision.trim() == "") {
            this.toastr.warning(`Descripcion vacia`, 'Aviso', { closeButton: true });
            return;
        }
        if(!this.itemFormulario.divisionList)
            this.itemFormulario.divisionList = new Array<Division>();
        this.itemDivision = new Division();
        this.itemDivision.indice= this.itemFormulario.divisionList.length+1;
        this.itemDivision.descripcion = this.descripcionDivision;
        this.itemDivision.seccionList = new Array<Seccion>();
        this.itemFormulario.divisionList.push(this.itemDivision);
        this.descripcionDivision = null;
    }
    OnEditar(index: number) {
        this.itemsSeccion = this.itemFormulario.divisionList[index].seccionList;
        this.itemsPreguntas = new Array<Pregunta>();
        this.isModalShown = true;
        this.indexDivision = index;
    }
    OnEliminar(index: number) {
        this.itemFormulario.divisionList.splice(index, 1)[0];
    }
    //Secciones
    OnAgregarSeccion() {
        this.itemSeccion = new Seccion();
        this.itemSeccion.descripcion = this.descripcionSeccion;
        this.itemSeccion.tipoSeccion = this.itemTipoSeccion;
        this.itemSeccion.preguntaList = this.itemsPreguntas = new Array<Pregunta>();
        this.itemSeccion.indice = this.itemsSeccion.length+1;
        let index = this.itemsSeccion.length;
        this.itemsSeccion.push(this.itemSeccion);
        this.indexSeccion= this.itemsSeccion.length-1;
        this.itemsPreguntas = this.itemsSeccion[index].preguntaList;
        this.descripcionSeccion = null;
    }

    OnEliminarSeccion(index: number) {
        this.itemsSeccion.splice(index, 1)[0];
        this.itemsPreguntas = new Array<Pregunta>();
    }
    OnEditarSeccion(index: number) {
        this.indexSeccion=index;
        this.itemsPreguntas = this.itemsSeccion[index].preguntaList;
    }
    //Preguntas
    OnAgregarPregunta() {
        if(!this.itemSeccion)
        return;
        this.itemPregunta = new Pregunta();
        this.itemPregunta.descripcion = this.descripcionPregunta;
        this.itemPregunta.tipoSeccion = this.itemTipoSeccion;
        this.itemPregunta.indice=this.itemsPreguntas.length+1;
        if (this.itemSeccion) {
            switch (this.itemSeccion.tipoSeccion) {
                case "PREGUNTA ABIERTA": {
                   if (this.itemsPreguntas.length == 0)
                        this.itemsPreguntas.push(this.itemPregunta);
                    /* else
                    this.toastr.warning(``, 'Aviso', {closeButton: true}); */
                    break;
                }
                case "PREGUNTA MULTIPLE": {
                    this.itemsPreguntas.push(this.itemPregunta);
                    this.counterPreguntaMultiple++;
                    break;
                }
                case "PREGUNTA FORMULARIO": {
                    this.itemsPreguntas.push(this.itemPregunta);
                    this.counterPreguntaFormulario++;
                    break;
                }
            }
            this.descripcionPregunta = null;
            this.descripcionSeccion = null;
        }
    }

    onGuardar() {
        this.itemFormulario.divisionList.forEach(e=>{
            e.idDivision=null;
            e.seccionList.forEach(k=>{
                k.idSeccion=null;
                k.preguntaList.forEach(m=>{
                    m.idPregunta=null;
                })
            })
        })
        this.item.formulario = this.itemFormulario;
        console.log(this.item);
        
        this.serviceFase.guardarFase(this.item).subscribe(
            (response:Response)=>{
                if(response.estado=='OK'){
                    this.toastr.success(`Se ha guardado con exito`, 'Aviso', { closeButton: true });
                }
            }
        );
     }
     onCancelar(){
        this._location.back();
     }
    OnEditarPregunta() {
        this.editarPregunta = true;
    }
    OnGuardarPregunta() {
        this.editarPregunta = false;
    }
    OnEliminarPregunta(index: number) {
        this.itemsPreguntas.splice(index, 1)[0];
    }

    //---------------->
    OnRowClickPreguntas(index: number, item: Pregunta) {
        this.selectedRowPregunta = index;
    }
    OnRowClickSecciones(index: number, item: Pregunta) {
        this.selectedRowSeccion = index
    }
    OnRowClick(index:number, item:Pregunta){

    }
}