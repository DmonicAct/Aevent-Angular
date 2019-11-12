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
  }

  ngOnInit():any {
    this.getLista();
  };

  getTodos(){
    this.service.obtenerTipoCriterios().subscribe(
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
  OnNuevo(){
    if(this.esNuevo){ //Creando tipoCriterio
      this.newItem.descripcion = this.descripcionModal;
      this.newItem.enabled=1;
      this.service.guardarTipoCriterio(this.newItem).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado el tipo de criterio con exito`, 'Aviso', {closeButton: true});
            this.getLista()
            this.onHidden()
          }
        }
      );
    }else{ //editando tipoCriterio
      this.item.descripcion=this.descripcionModal;
      this.item.enabled = this.estado?1:0;
      this.service.guardarTipoCriterio(this.item).subscribe(
        (response: Response)=>{
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado el tipo de criterio con éxito`, 'Aviso', {closeButton: true});
            this.getLista()
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

    this.item = this.items[index];
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
    this.getLista();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getLista();
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

  public itemsFiltro = ["Nombre"];
  buscarTipos(){
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