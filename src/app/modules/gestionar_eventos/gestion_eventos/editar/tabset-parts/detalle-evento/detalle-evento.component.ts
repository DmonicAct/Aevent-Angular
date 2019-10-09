    import { OnInit, Component, ViewChild } from "@angular/core";
import { Evento } from '../../../../../../models'
import { ModalDirective } from 'ngx-bootstrap/modal';
import {CategoriasServices} from '../../../../../../services';
import { Categoria, Response } from "src/app/models";
@Component({
    selector: 'detalle-evento',
    templateUrl: 'detalle-evento.template.html',
    styleUrls: ['detalle-evento.template.scss']
})

export class DetalleEventoConfiguracion implements OnInit {

    loading: Boolean;
    item: Evento;
    public itemsCategorias: Array<Categoria>;
    constructor( private service: CategoriasServices) {
        this.item = new Evento();
        this.itemsCategorias = new Array<Categoria>();
    }
    @ViewChild('autoShownModal') autoShownModal: ModalDirective;
    isModalShownPresidente = false;
    isModalShownCategorias = false;
    ngOnInit(): void {
        this.obtenerListaCategorias();
    }
    datos: boolean = true;
    call: boolean = false;
    fases: boolean = false;
    modalPresidenteCorrecto: boolean = false;

    obtenerListaCategorias(){
        this.service.obtenerCategorias().subscribe(
            (response: Response)=>{
                this.itemsCategorias=response.resultado;
                console.log(this.itemsCategorias);
            }
        );
    }
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

    maestroUsuarios = [
        {id: 1, nombre: 'Luis Flores', check: false},
        {id: 2, nombre: 'César Aguilera', check: false},
        {id: 3, nombre: 'Alejandro García', check: false},
        
    ];

    maestroUsuariosFilter = this.maestroUsuarios;
    nombreUsuario = "";

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

    buscarUsuario(){
        debugger
        if (this.nombreUsuario.length > 0){
            this.maestroUsuariosFilter = this.maestroUsuarios.filter(
                item => item.nombre.toLowerCase().indexOf(this.nombreUsuario.toLowerCase()) > -1
             )
        } else {
            this.maestroUsuariosFilter = this.maestroUsuarios;
        }
        
    }
    onAceptarPresidente() {
        let aux = {
            id: 0,
            nombre: 'Agregar Presidente',
            check: false,
        };
        let count = 0;
        this.isModalShownPresidente = false;
        this.maestroUsuariosFilter.forEach(function (value){
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
        this.maestroUsuariosFilter = this.maestroUsuarios;
    }
    nuevaCategoria = {
        id: 0,
        nombre: "",
        check: false,
    };
    nuevaCategoriaNombre = "";

    agregarCategoria(){
        if (this.nuevaCategoriaNombre.length > 0 ){
            this.nuevaCategoria.id = this.categoriasMaestro.length+1
            this.nuevaCategoria.nombre = this.nuevaCategoriaNombre;
            this.nuevaCategoria.check = false;
            this.categoriasMaestro.push(this.nuevaCategoria);
            this.nuevaCategoria = {
                id: 0,
                nombre: "",
                check: false,
            };
            this.nuevaCategoriaNombre = "";
        }
        
    }

}