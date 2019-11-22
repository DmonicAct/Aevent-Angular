import { OnInit, Component, ViewChild, Input } from "@angular/core";
import { Response, Parametro, TipoSeccion, FormularioCFP, Division, Pregunta, Seccion, Evento, Fase } from "../../../../../../../models";
import { ModalDirective } from "ngx-bootstrap";
import { Location } from '@angular/common';
import { FaseService } from '../../../../../../../services/fase.service';
import { ToastRef, ToastrService } from "ngx-toastr";
import { FormularioService } from "../../../../../../../services/formulario.service";
import { Observable } from "rxjs";

declare var jQuery: any;

@Component({
    selector: 'call-for-paper-evento-init',
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
    public disabledSeccionDescripcion: Boolean = false;
    public indexSeccion: number;
    //Preguntas
    public itemsPreguntas: Array<Pregunta>;
    public itemPregunta: Pregunta;
    public descripcionPregunta: string;
    public cantCaracteres: number;
    public disabledPreguntaDescripcion: Boolean = false;
    public indexPregunta: number;
    //Edicion
    public editarPregunta: Boolean = false;
    public editarSeccion: Boolean = false;
    public editarDivision: Boolean = false;

    @ViewChild('autoShownModal')
    autoShownModal: ModalDirective;

    selectedRowSeccion: number;
    selectedRowPregunta: number;

    private listaPreguntasEliminadas: Array<number>;
    private listaDivisionesEliminadas: Array<number>;
    private listaSeccionEliminadas: Array<number>;

    constructor(
        private serviceFase: FaseService,
        private serviceFormulario: FormularioService,
        private toastr: ToastrService,
        private _location: Location
    ) {
        this.listaPreguntasEliminadas = new Array<number>();
        this.listaDivisionesEliminadas = new Array<number>();
        this.listaSeccionEliminadas = new Array<number>();

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
        console.log(this.item.idEvento, this.item.idFase);
        this.itemTipoSeccion = TipoSeccion.PREGUNTA_ABIERTA;
        this.itemSeccion = new Seccion();
        this.itemSeccion.descripcion = this.descripcionSeccion;
        this.itemSeccion.tipoSeccion = this.itemTipoSeccion;
        this.itemSeccion.preguntaList = this.itemsPreguntas = new Array<Pregunta>();
        this.itemSeccion.indice = this.itemsSeccion.length + 1;
        let index = this.itemsSeccion.length;
        this.itemsSeccion.push(this.itemSeccion);
        this.indexSeccion = this.itemsSeccion.length - 1;
        this.itemsPreguntas = this.itemsSeccion[index].preguntaList;
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
        if (this.descripcionDivision.length > 255) {
            this.toastr.warning(`Descripcion mayor a 255 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.itemFormulario.divisionList)
            this.itemFormulario.divisionList = new Array<Division>();
        this.itemDivision = new Division();
        this.itemDivision.indice = this.itemFormulario.divisionList.length + 1;
        this.itemDivision.descripcion = this.descripcionDivision;
        /**
         * 
         * 
         */
        this.itemDivision.seccionList = new Array<Seccion>();
        this.itemDivision.seccionList.push(new Seccion());
        this.itemDivision.seccionList[0].preguntaList = new Array<Pregunta>();
        this.itemDivision.seccionList[0].tipoSeccion = TipoSeccion.PREGUNTA_ABIERTA;
        /**
         * 
         * 
         */
        this.itemFormulario.divisionList.push(this.itemDivision);
        this.descripcionDivision = null;


        /**
         * 
         * 
         */
    }
    OnEditar(index: number) {
        console.log(index);
        console.log('formulario: ', this.itemFormulario);
        this.itemsSeccion = this.itemFormulario.divisionList[index].seccionList;
        console.log('itemSeccion: ', this.itemsSeccion);
        /**
         * 
         * Solo una seccion por division
         */
        this.itemSeccion = this.itemsSeccion[0];
        this.itemsPreguntas = this.itemSeccion.preguntaList;

        /**
         * 
         * Solo una seccion por division fin
         */
        console.log("Seccion: ", this.itemsSeccion);
        //this.itemsPreguntas = new Array<Pregunta>();
        this.isModalShown = true;
        this.indexDivision = index;
    }
    OnEliminar(index: number) {
        let idDivision = this.itemFormulario.divisionList[index].idDivision;
        if (idDivision != null) {
            this.listaDivisionesEliminadas.push(idDivision);
            /**
             * Solo una seccion por division
             */
            let seccionList = this.itemFormulario.divisionList[index].seccionList;
            if (seccionList != null && seccionList.length > 0) {
                let idSeccion = seccionList[0].idSeccion;
                if (idSeccion != null) {
                    this.listaSeccionEliminadas.push(idSeccion);
                }
                let listaPreguntas = seccionList[0].preguntaList;
                if (listaPreguntas != null && listaPreguntas.length > 0) {
                    for (let item of listaPreguntas) {
                        let idPregunta = item.idPregunta;
                        if (idPregunta != null) {
                            this.listaPreguntasEliminadas.push(idPregunta);
                        }
                    }
                }
            }
        }
        this.itemFormulario.divisionList.splice(index, 1)[0];
    }
    //Secciones
    OnAgregarSeccion() {
        this.itemSeccion = new Seccion();
        this.itemSeccion.descripcion = this.descripcionSeccion;
        this.itemSeccion.tipoSeccion = this.itemTipoSeccion;
        this.itemSeccion.preguntaList = this.itemsPreguntas = new Array<Pregunta>();
        this.itemSeccion.indice = this.itemsSeccion.length + 1;
        let index = this.itemsSeccion.length;
        this.itemsSeccion.push(this.itemSeccion);
        this.indexSeccion = this.itemsSeccion.length - 1;
        this.itemsPreguntas = this.itemsSeccion[index].preguntaList;
        this.descripcionSeccion = null;
        //Validacion de secciones
        if (!this.itemSeccion.descripcion) {
            this.toastr.warning(`Descripción vacía`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.itemSeccion.tipoSeccion) {
            this.toastr.warning(`Tipo de sección vacía`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.itemSeccion.descripcion.length > 255) {
            this.toastr.warning(`Descripcion mayor a 255 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.itemSeccion.tipoSeccion.length > 255) {
            this.toastr.warning(`Tipo de sección mayor a 255 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
    }

    OnEliminarSeccion(index: number) {
        this.itemsSeccion.splice(index, 1)[0];
        this.itemsPreguntas = new Array<Pregunta>();
    }
    OnEditarSeccion(index: number) {
        this.indexSeccion = index;
        this.itemsPreguntas = this.itemsSeccion[index].preguntaList;
    }
    //Preguntas
    OnAgregarPregunta() {
        if (!this.itemSeccion)
            return;
        //validar datos
        if (!this.descripcionPregunta) {
            this.toastr.warning(`Tipo de sección vacía`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.descripcionPregunta.length > 50) {
            this.toastr.warning(`Descripcion mayor a 50 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.cantCaracteres < 0) {
            this.toastr.warning(`No se puede ingresar una cantidad negativa`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.cantCaracteres > 500) {
            this.toastr.warning(`No se puede ingresar más de 500 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        if (!this.cantCaracteres) {
            this.toastr.warning(`Se necesita ingresar una cantidad máxima de caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        this.itemPregunta = new Pregunta();
        this.itemPregunta.descripcion = this.descripcionPregunta;
        this.itemPregunta.maxCaracteres = this.cantCaracteres;
        this.itemPregunta.tipoPregunta = this.itemTipoSeccion.toString();
        this.itemPregunta.indice = this.itemsPreguntas.length + 1;


        if (this.itemSeccion) {
            switch (this.itemSeccion.tipoSeccion) {
                case "PREGUNTA ABIERTA": {
                    /*  if (this.itemsPreguntas.length == 0)
                          this.itemsPreguntas.push(this.itemPregunta); */
                    this.itemPregunta.tipoPregunta = "PREGUNTA_ABIERTA";
                    this.itemsPreguntas.push(this.itemPregunta);
                    break;
                    /* else
                    this.toastr.warning(``, 'Aviso', {closeButton: true}); */

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
            this.cantCaracteres = null;
            this.descripcionSeccion = null;
        }
    }

    onGuardar() {
        if (!this.itemFormulario.titulo) {
            this.toastr.warning(`Se necesita ingresar un título`, 'Aviso', { closeButton: true });
            return;
        }
        if (this.itemFormulario.titulo.length > 100) {
            this.toastr.warning(`Se necesita ingresar un título a formulario menor a 100 caracteres`, 'Aviso', { closeButton: true });
            return;
        }
        this.item.formulario = this.itemFormulario;
        this.itemFormulario.idFase = this.item.idFase;
        console.log(this.item.idEvento, this.item.idFase);
        console.log(this.item);
       
        if (
            (this.listaPreguntasEliminadas && this.listaPreguntasEliminadas.length > 0) ||
            (this.listaSeccionEliminadas && this.listaSeccionEliminadas.length > 0)     ||
            (this.listaDivisionesEliminadas && this.listaDivisionesEliminadas.length > 0)
            ){
                this.serviceFormulario.elimiar(this.listaPreguntasEliminadas,this.listaSeccionEliminadas,this.listaDivisionesEliminadas).subscribe(
                    (response:Response)=>{
                        if(response.estado=="OK"){
                            this.GuardarFormulario();
                        }
                    }
                );
            }else{
                this.GuardarFormulario();
            }
    }
    GuardarFormulario(){
        this.serviceFase.guardarFase(this.item).subscribe(
            (response: Response) => {
                if (response.estado == 'OK') {
                    this.itemFormulario = response.resultado.formulario;
                    this.toastr.success(`Se ha guardado formulario con exito`, 'Aviso', { closeButton: true });
                    this.loading=false;
                }
            },
            (error=>{
                    if(this.loading){
                        this.loading=false;
                }
            })
        );
    }
    onCancelar() {
        if (this.listaPreguntasEliminadas && this.listaPreguntasEliminadas.length > 0)
            this.listaPreguntasEliminadas = new Array<number>();
        //this._location.back();
        this.hideModal();
    }

    OnEditarPregunta() {
        this.editarPregunta = true;
    }
    OnGuardarPregunta() {
        this.editarPregunta = false;
        for(let index=0;index<this.itemsPreguntas.length;index++){
            if(this.itemsPreguntas[index].maxCaracteres<1){
                this.itemsPreguntas[index].maxCaracteres=1;
            }
            if(this.itemsPreguntas[index].maxCaracteres>500){
                this.itemsPreguntas[index].maxCaracteres=500;
            }
        }
        
    }
    OnEliminarPregunta(index: number) {
       
        let idPregunta = this.itemsPreguntas[index].idPregunta;
        if (idPregunta != null) {
            this.listaPreguntasEliminadas.push(idPregunta);
            this.itemsPreguntas.splice(index, 1)[0];
        }
        else
            this.itemsPreguntas.splice(index, 1)[0];
    }

    //---------------->
    OnRowClickPreguntas(index: number, item: Pregunta) {
        this.selectedRowPregunta = index;
    }
    OnRowClickSecciones(index: number, item: Pregunta) {
        this.selectedRowSeccion = index
    }
    OnRowClick(index: number, item: Pregunta) {

    }
}