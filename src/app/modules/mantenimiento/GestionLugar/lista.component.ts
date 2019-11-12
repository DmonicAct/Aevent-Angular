import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion, Estado, Response, Lugar } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LugarService } from '../../../services/lugar.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'lugar-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [LugarService] 
})
export class GestionLugarListaComponent implements OnInit  {

  public isModalShown: Boolean;
  public isNewModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public esNuevo: Boolean;

  public newItem : Lugar; 
  public items : Array<Lugar>;
  public item : Lugar;
  public estado: Boolean;

  public descripcionModal : String;
  public paginacion: Paginacion;
  public loading: Boolean = false;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  @ViewChild('autoDeleteShownModal') 
  autoDeleteShownModal: ModalDirective;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: LugarService,
              private _location:Location
              ) {
    this.newItem = new Lugar;    
    this.items = new Array<Lugar>();
    this.paginacion = new Paginacion({pagina:0,registros: 10});
    this.enFiltro = false;
    this.numeroTipo = 0;
    this.filtro = "";
  }

  ngOnInit():any {
    this.buscarLugares();
  };

  getTodos(){
    this.service.obtenerLugares().subscribe(
      (response: Response)=>{
        this.items = response.resultado;
        this.itemsFiltrados = this.items;
        if(this.isModalShown){
          this.autoShownModal.hide();
          this.isModalShown=false;
        }
      }
    );
  }

  getLista(){
    this.service.obtenerLugarPaginado(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response)=>{
        this.items = response.resultado;
        this.itemsFiltrados = this.items;
        this.paginacion = response.paginacion;
        if(this.isModalShown){
          this.autoShownModal.hide();
          this.isModalShown=false;
        }
      }
    );
  }
  OnNuevo(){
    if(this.esNuevo){ //Creando lugar
      this.newItem.descripcion = this.descripcionModal;
      this.newItem.enabled=1;
      this.service.guardarLugar(this.newItem).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado el lugar con exito`, 'Aviso', {closeButton: true});
            this.getLista()
            this.onHidden()
          }
        }
      );
    }else{ //editando lugar
      this.item.descripcion=this.descripcionModal;
      this.item.enabled = this.estado?1:0;
      this.service.guardarLugar(this.item).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado el lugar con éxito`, 'Aviso', {closeButton: true});
            this.getLista()
          }
        }
      );
    }
  }
  OnRowClick(i:number, item:Lugar){

  }

  OnAgregar(){

    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown=true;
  }
  
  OnEditar(index:number){

    this.item = this.items[index];
    this.estado = this.item.enabled==1;
    this.descripcionModal = this.item.descripcion;

    this.esNuevo = false;
    this.isModalShown=true;
  }

  OnEliminar(index: number){

    this.item = this.items[index];

    this.isDeleteModalShown=true;
  }

  OnConfirmar(){
    this.service.eliminarLugar(this.item).subscribe(
      (response: Response)=>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha eliminado el lugar con éxito`, 'Aviso', {closeButton: true});
          this.getLista()
          this.onHidden()
        }
      }
    );
  }

  onHidden(): void {
    this.isModalShown = false;
    this.isNewModalShown = false;
    this.isDeleteModalShown = false;
  }

  hideModal(): void {
    if(this.isNewModalShown){
      this.autoNewShownModal.hide();
    }else if(this.isModalShown){
      this.autoShownModal.hide();
    }else{
      this.autoDeleteShownModal.hide();
    }
  }


  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getLista();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getLista();
  }

  OnDeshabilitar(item: Lugar){
    /* this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) =>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha deshabilitado con exito`, 'Aviso', {closeButton: true});
          this.getLista()
        }
      }
    ); */
  }

  enFiltro: Boolean;
  numeroTipo: number;
  filtro: String;
  tipo: String;
  itemsFiltrados: Array<Lugar>;

  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
  }

  public itemsFiltro = ["Nombre"];
  buscarLugares(){
    this.cambioFiltro();
    if (this.filtro.length > 0){
      if (this.enFiltro == false){
        this.enFiltro = true;
        this.getTodos();
      }
      if (this.numeroTipo == 1){
        this.itemsFiltrados = this.items.filter(
          item => item.descripcion.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
        )
      }
    }else{
      this.enFiltro = false;
      this.getLista();
      this.itemsFiltrados = this.items;
    }
  }

}