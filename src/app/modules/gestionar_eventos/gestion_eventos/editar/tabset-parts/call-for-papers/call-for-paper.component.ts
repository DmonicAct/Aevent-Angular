import { OnInit, Component, ViewChild } from "@angular/core";
import { Parametro, TipoSeccion, FormularioCFP, Division, Pregunta, Seccion } from "../../../../../../models";
import { ModalDirective } from "ngx-bootstrap";
import { ToastRef, ToastrService } from "ngx-toastr";
declare var jQuery: any;

@Component({
    selector: 'call-for-paper',
    templateUrl: 'call-for-paper.template.html',
    styleUrls: ['call-for-paper.template.scss']
})
export class CallForPaperComponent implements OnInit {
    public itemsParametro: Array<Parametro>;
    public itemParametro: Parametro;



    public isModalShown: Boolean;
    public limite: number;


    public counterPreguntaAbierta: number = 0;
    public counterPreguntaMultiple: number = 0;
    public counterPreguntaFormulario: number = 0;
    public counterSeccion: number;


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
    constructor(
        private toastr: ToastrService
    ) {
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
        console.log(this.itemsTipoSeccion);
    }
    ngAfterViewInit() {
        jQuery('.full-height-scroll').slimscroll({
            height: '100%'
        });
    }
    ngOnInit(): void {

    }
    OnSeleccionCriterio() {
        console.log(this.itemParametro);
    }


    OnVerPreliminar() {
        console.log(this.itemFormulario);
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
        this.isModalShown = false;
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
        if(!this.itemFormulario.divisiones)
            this.itemFormulario.divisiones = new Array<Division>();

        this.itemDivision = new Division()
        this.itemDivision.descripcion = this.descripcionDivision;
        this.itemDivision.secciones = new Array<Seccion>();
        this.itemFormulario.divisiones.push(this.itemDivision);
        this.descripcionDivision = null;
    }
    OnEditar(index: number) {
        this.itemsSeccion = this.itemFormulario.divisiones[index].secciones;
        this.itemsPreguntas = new Array<Pregunta>();
        this.isModalShown = true;
    }
    OnEliminar(index: number) {
        this.itemsDivision.splice(index, 1)[0];
    }
    //Secciones
    OnAgregarSeccion() {
        this.itemSeccion = new Seccion();
        this.itemSeccion.descripcion = this.descripcionSeccion;
        this.itemSeccion.tipoSeccion = this.itemTipoSeccion;
        this.itemSeccion.preguntas = this.itemsPreguntas = new Array<Pregunta>();
        let index = this.itemsSeccion.length;
        this.itemsSeccion.push(this.itemSeccion);
        this.itemsPreguntas = this.itemsSeccion[index].preguntas;
        this.descripcionSeccion = null;
    }

    OnEliminarSeccion(index: number) {
        this.itemsSeccion.splice(index, 1)[0];
        this.itemsPreguntas = new Array<Pregunta>();
    }
    OnEditarSeccion(index: number) {
        this.itemsPreguntas = this.itemsSeccion[index].preguntas;
    }
    //Preguntas
    OnAgregarPregunta() {
        console.log(this.itemTipoSeccion);
        this.itemPregunta = new Pregunta();
        this.itemPregunta.descripcion = this.descripcionPregunta;
        this.itemPregunta.tipoSeccion = this.itemTipoSeccion;
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
    OnRowClick(index: number, item: Pregunta) {

    }
}