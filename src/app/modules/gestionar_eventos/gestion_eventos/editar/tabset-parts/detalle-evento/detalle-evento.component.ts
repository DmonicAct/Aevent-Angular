import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
    selector: 'detalle-evento',
    templateUrl: 'detalle-evento.template.html',
    styleUrls: ['detalle-evento.template.scss']
})

export class DetalleEventoConfiguracion implements OnInit {

    loading: Boolean;
    item: Evento;
    constructor() {
        this.item = new Evento();
    }
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShown = false;
    ngOnInit(): void {

    }
    datos: boolean = true;
    call: boolean = false;
    fases: boolean = false;

    verDatos(event) {
        this.datos = true;
        this.call = false;
        this.fases = false;
    }

    verPapers(event) {
        this.datos = false;
        this.call = true;
        this.fases = false;
    }

    verFases(event) {
        this.datos = false;
        this.call = false;
        this.fases = true;
    }
    DetectChange(){}
    OnAgregarCategorias() { }
    OnAgregarPresidente() {
        this.isModalShown = true;
    }
    hideModal(): void {
        this.autoShownModal.hide();
    }

    onHidden(): void {
        this.isModalShown = false;
    }
    onNuevo() {
        this.isModalShown = false;
    }
}