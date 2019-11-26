import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion, Estado, Response, TipoCriterio } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoCriterioService } from '../../../services/tipoCriterio.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'tipoCriterio-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [TipoCriterioService] 
})
export class GestionTipoCriterioListaComponent implements OnInit  {

  public isModalShown: Boolean;
  public isNewModalShown: Boolean;
  public isDeleteModalShown: Boolean;
  public esNuevo: Boolean;

  public newItem : TipoCriterio; 
  public items : Array<TipoCriterio>;
  public item : TipoCriterio;
  public estado: Boolean;
  public loading: Boolean = false;
  public descripcionModal : String;
  public tipoActivo:String;
  public paginacion: Paginacion;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;

  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: TipoCriterioService,
              private _location:Location
              ) {
    this.newItem = new TipoCriterio;    
    this.items = new Array<TipoCriterio>();
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
    this.service.obtenerTipoCriterios().subscribe(
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
    this.service.obtenerTipoCriterio(this.paginacion.pagina, this.paginacion.registros).subscribe(
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
    if(this.esNuevo){ //Creando tipoCriterio
      this.newItem.descripcion = this.descripcionModal;
      this.newItem.enabled=1;
      this.service.guardarTipoCriterio(this.newItem).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado el tipo de criterio con exito`, 'Aviso', {closeButton: true});
            if (this.activos == true){
              this.getListaActivos();
            } else{
              this.getListaInactivos();
            }
            this.onHidden()
          }
        }
      );
    }else{ //editando tipoCriterio
      this.item.descripcion=this.descripcionModal;
      this.service.guardarTipoCriterio(this.item).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado el tipo de criterio con éxito`, 'Aviso', {closeButton: true});
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
    this.descripcionModal = this.item.descripcion;
    this.OnNuevo();

  }
  enFiltro: Boolean;
  numeroTipo: number;
  filtro: String;
  tipo: String;
  itemsFiltrados: Array<TipoCriterio>;

  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
  }
  activos: Boolean;
  seCambioActivo: Boolean;
  cambioTipoActivo() {
    debugger
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

  public itemsFiltro = ["Nombre"];
  public filtroActivo = ["Activos", "Inactivos"];
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
          item => item.descripcion.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
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
  OnRowClick(i:number,item:any) {
  }
}