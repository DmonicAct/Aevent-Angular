import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion, Estado, Response, Categoria } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'categorias-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [CategoriaService] 
})
export class GestionCategoriaListaComponent implements OnInit  {

  public isModalShown: Boolean;
  public isNewModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public esNuevo: Boolean;

  public newItem : Categoria; 
  public items : Array<Categoria>;
  public item : Categoria;
  public estado: Boolean;
  public loading: Boolean = false;
  public descripcionModal : String;
  public paginacion: Paginacion;
  public tipoActivo: String;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
  @ViewChild('autoDeleteShownModal') 
  autoDeleteShownModal: ModalDirective;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: CategoriaService,
              private _location:Location
              ) {
    this.newItem = new Categoria;    
    this.tipoActivo="Activos";
    this.items = new Array<Categoria>();
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
    this.service.obtenerCategorias().subscribe(
      (response: Response)=>{
        this.items = response.resultado;
        this.itemsFiltrados = this.items;
        if (this.enFiltro == true){
          this.buscarCategoria();
        }
      }
    );
  }

  getListaActivos(){
    this.service.obtenerCategoriasPaginadas(this.paginacion.pagina, this.paginacion.registros).subscribe(
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
        if (this.enFiltro == true){
          this.buscarCategoria();
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
    if(this.esNuevo){ //Creando lugar
      this.newItem.descripcion = this.descripcionModal;
      this.newItem.enabled=1;
      this.service.guardarCategoria(this.newItem).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado la categoría con éxito`, 'Aviso', {closeButton: true});
            this.getLista()
            this.onHidden()
          }
        }
      );
    }else{ //editando lugar
      this.item.descripcion=this.descripcionModal;
      this.service.guardarCategoria(this.item).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado la categoría con éxito`, 'Aviso', {closeButton: true});
            this.getLista()
          }
        }
      );
    }
  }
  OnRowClick(i:number, item:Categoria){

  }

  OnAgregar(){

    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown=true;
  }
  
  OnEditar(index:number){

    this.item = this.itemsFiltrados[index];
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
    this.service.eliminarCategoria(this.item).subscribe(
      (response: Response)=>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha eliminado la categoría con éxito`, 'Aviso', {closeButton: true});
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


  OnCambiarEstado(index:number){
    this.item = this.itemsFiltrados[index];
    this.item.enabled = this.item.enabled==1?0:1;
    this.estado = this.item.enabled==1;
    this.esNuevo = false;
    this.descripcionModal = this.item.descripcion;
    this.OnNuevo();
  }

  OnDeshabilitar(item: Categoria){
    /* this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) =>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha deshabilitado con éxito`, 'Aviso', {closeButton: true});
          this.getLista()
        }
      }
    ); */
  }

  enFiltro: Boolean;
  numeroTipo: number;
  filtro: String;
  tipo: String;
  itemsFiltrados: Array<Categoria>;

  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
  }
  activos: boolean;
  seCambioActivo: Boolean;
  cambioTipoActivo() {
    this.activos = !this.activos;
    this.seCambioActivo = true;
    this.buscarCategoria();
  }
  public filtroActivo = ["Activos", "Inactivos"];

  public itemsFiltro = ["Nombre"];
  buscarCategoria(){
    this.cambioFiltro();
    if (this.filtro.length > 0){
      if (this.enFiltro == false){
        if (this.activos == true){
          this.getTodosActivos();
        } else{
          this.getTodosInactivos();
        }
      }
      this.enFiltro = true;
      if (this.numeroTipo == 1){
        this.service.obtenerFiltradoNombre(this.filtro.toString(),this.activos, this.paginacion.pagina, this.paginacion.registros).subscribe(
          (response: Response) => {
            this.itemsFiltrados = response.resultado;
            this.paginacion = response.paginacion;
            console.log("activo: ",this.activos);
            console.log("filtro nombre: ",this.filtro);
            console.log("usuariosfiltrados: ",this.itemsFiltrados);
          }
        )
      }
    }else{
      if (this.seCambioActivo == true){
        if (this.activos){
          this.getListaActivos();
        } else {
          this.getListaInactivos();
        }
        this.seCambioActivo = false;
      } 
      this.enFiltro = false; 
      this.itemsFiltrados = this.items;
    }
  }

}