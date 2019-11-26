import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoEvento,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoEventoServices } from '../../../services/tipoEvento.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'tipoevento-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [TipoEventoServices] 
})
export class GestionTipoEventoListaComponent implements OnInit  {

  public isModalShown: Boolean;
  public isNewModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public esNuevo: Boolean;

  public newItem : TipoEvento; //para la nueva categoria
  public items : Array<TipoEvento>;
  public item : TipoEvento;
  public estado: Boolean;

  public descripcionModal : String;
  public paginacion: Paginacion;
  public tipoActivo:String;
  public loading: Boolean = false;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  @ViewChild('autoDeleteShownModal') 
  autoDeleteShownModal: ModalDirective;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: TipoEventoServices,
              private _location:Location
              ) {
    this.newItem = new TipoEvento;    
    this.items = new Array<TipoEvento>();
    this.paginacion = new Paginacion({pagina:0,registros: 10});
    this.enFiltro = false;
    this.numeroTipo = 0;
    this.filtro = "";
    this.seCambioActivo = false;
    this.activos = true;
  }


  ngOnInit():any {
    this.getLista();
  };

  getLista(){
    if (this.activos == true){
      this.getListaActivos();
    } else {
      this.getListaInactivos();
    }
  }

  getTodosActivos(){
    this.service.obtenerTipoEventos().subscribe(
      (response: Response)=>{
        this.items = response.resultado;
        this.itemsFiltrados = this.items;
        if(this.isModalShown){
          this.autoShownModal.hide();
          this.isModalShown=false;
        }
        if (this.enFiltro == true){
          this.buscarTipos();
        }
      }
    );
  }

  getListaActivos(){
    this.service.obtenerTipoEvento(this.paginacion.pagina, this.paginacion.registros).subscribe(
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

  getTodosInactivos(){
    this.service.obtenerTodosInactivos().subscribe(
      (response: Response)=>{
        this.items = response.resultado;
        this.itemsFiltrados = this.items;
        this.paginacion = response.paginacion;
        if(this.isModalShown){
          this.autoShownModal.hide();
          this.isModalShown=false;
        }
        if (this.enFiltro == true){
          this.buscarTipos();
        }
      }
    );
  }

  getListaInactivos(){
    this.service.obtenerListaInactivos(this.paginacion.pagina, this.paginacion.registros).subscribe(
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
    if(this.esNuevo){ //Creando tipo de evento 
      this.newItem.nombre = this.descripcionModal;
      this.newItem.enabled=1;
      this.service.guardarTipoEvento(this.newItem).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado el tipo de evento con exito`, 'Aviso', {closeButton: true});
            if (this.activos == true){
              this.getListaActivos();
            } else{
              this.getListaInactivos();
            }
            this.onHidden()
          }
        }
      );
    }else{ //editando tipo de evento
      this.item.nombre=this.descripcionModal;
      this.service.guardarTipoEvento(this.item).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado tipo de evento con éxito`, 'Aviso', {closeButton: true});
            if (this.activos == true){
              this.getListaActivos();
            } else{
              this.getListaInactivos();
            }
          }
        }
      );
    }
  }
  OnRowClick(i:number, item:TipoEvento){

  }

  
  OnAgregar(){

    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown=true;
  }
  
  OnEditar(index:number){

    this.item = this.itemsFiltrados[index];
    this.estado = this.item.enabled==1;
    this.descripcionModal = this.item.nombre;

    this.esNuevo = false;
    this.isModalShown=true;
  }

  OnEliminar(index: number){

    this.item = this.items[index];

    this.isDeleteModalShown=true;
  }

  OnConfirmar(){
    this.service.eliminarCategoria(this.item).subscribe(
      (response: Response)=>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha eliminado el tipo de evento con éxito`, 'Aviso', {closeButton: true});
          if (this.activos == true){
            this.getListaActivos();
          } else{
            this.getListaInactivos();
          }
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
    if (this.activos == true){
      this.getListaActivos();
    } else{
      this.getListaInactivos();
    }
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    if (this.activos == true){
      this.getListaActivos();
    } else{
      this.getListaInactivos();
    }
  }
  OnCambiarEstado(index:number){
    this.item = this.itemsFiltrados[index];
    this.item.enabled = this.item.enabled==1?0:1;
    this.estado = this.item.enabled==1;
    this.esNuevo = false;
    this.descripcionModal = this.item.nombre;
    this.OnNuevo();

  }

  OnDeshabilitar(item: TipoEvento){
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
  itemsFiltrados: Array<TipoEvento>;

  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
  }
  activos: Boolean;
  seCambioActivo: Boolean;
  cambioTipoActivo() {
    this.activos = !this.activos;
    this.seCambioActivo = true;
    if (this.enFiltro == true){
      if (this.activos == true){
        this.getTodosActivos();
      } else{
        this.getTodosInactivos();
      }
    }
    this.buscarTipos();
  }
  public filtroActivo = ["Activos", "Inactivos"];
  public itemsFiltro = ["Nombre"];
  buscarTipos(){
    this.cambioFiltro();
    if (this.filtro.length > 0){
      if (this.enFiltro == false){
        this.enFiltro = true;
        if (this.activos == true){
          this.getTodosActivos();
        } else{
          this.getTodosInactivos();
        }
      }
      if (this.numeroTipo == 1){
        this.itemsFiltrados = this.items.filter(
          item => item.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
        )
      }
    }else{
      this.enFiltro = false;
      if (this.activos == true){
        this.getListaActivos();
      } else{
        this.getListaInactivos();
      }
      this.itemsFiltrados = this.items;
    }
  }

}