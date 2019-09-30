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
    isModalShownPresidente = false;
    isModalShownCategorias = false;
    ngOnInit(): void {

    }
    datos: boolean = true;
    call: boolean = false;
    fases: boolean = false;
    modalPresidenteCorrecto: boolean = false;


    categoriasMaestro = [
        {id: 1, nombre: 'Gobierno Electrónico', check: false},
        {id: 2, nombre: 'Marketing Digital', check: false},
        {id: 3, nombre: 'Bussiness Inteligence', check: false},
        {id: 4, nombre: 'Inteligencia Artificial', check: false},
        {id: 5, nombre: 'Lean IT', check: false},
        {id: 6, nombre: 'Gráficos de Computadoras', check: false},
    ];

    maestroPresidentes = [
        {id: 1, nombre: 'Luis Flores', check: false},
        {id: 2, nombre: 'César Aguilera', check: false},
    ];

    evento = {
        id: 22,
    }
    presidente = {
        id: 0,
        nombre: 'Agregar Presidente',
        check: false,
    }
    categorias = [
        {id: 0, nombre: 'Agregar Categorías'},
    ];
    
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
    OnAgregarCategorias() { 
        this.isModalShownCategorias = true;
    }
    hideModalCategorias(): void {
        this.autoShownModal.hide();
    }

    onHiddenCategorias(): void {
        this.isModalShownCategorias = false;
    }
    onAceptarCategorias() {
        let aux = [];
        this.categoriasMaestro.forEach(function (value){
            if (value.check == true){
                aux.push(value);
            }
        });
        this.categorias = aux;
        this.isModalShownCategorias = false;
    }


    OnAgregarPresidente() {
        this.isModalShownPresidente = true;
    }
    hideModalPresidente(): void {
        this.autoShownModal.hide();
    }

    onHiddenPresidente(): void {
        this.isModalShownPresidente = false;
    }
    onAceptarPresidente() {
        let aux = {
            id: 0,
            nombre: 'Agregar Presidente',
            check: false,
        };
        let count = 0;
        this.isModalShownPresidente = false;
        this.maestroPresidentes.forEach(function (value){
            if (value.check == true){
                count += 1;
                aux = value;
            }
        });
        if (count > 1){
            console.log("Esta mal");
            this.modalPresidenteCorrecto = true;
            this.presidente = {
                id: 0,
                nombre: 'Agregar Presidente',
                check: false,
            }
        } else if (count == 1){
            console.log("Esta bien");
            this.presidente = aux;
            this.isModalShownCategorias = false;
            this.modalPresidenteCorrecto = false;
        }
    }
}