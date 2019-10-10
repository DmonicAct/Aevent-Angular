import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion, Estado, Response, Categoria } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria.service';
import { Location } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'lugar-lista',
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

  public descripcionModal : String;
  public paginacion: Paginacion;
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
    this.items = new Array<Categoria>();
    this.paginacion = new Paginacion({pagina:0,registros: 10});
  }

  ngOnInit():any {
    this.getLista();
  };

  getLista(){
    this.service.obtenerCategoriasPaginadas(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response)=>{
        console.log(response);
        this.items = response.resultado;
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
          console.log(response);
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado la categoría con exito`, 'Aviso', {closeButton: true});
            this.getLista()
            this.onHidden()
          }
        }
      );
    }else{ //editando lugar
      this.item.descripcion=this.descripcionModal;
      this.item.enabled = this.estado?1:0;
      this.service.guardarCategoria(this.item).subscribe(
        (response: Response)=>{
          console.log(response);
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
    console.log(this.isNewModalShown)

    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown=true;
  }
  
  OnEditar(index:number){
    console.log(this.isModalShown)

    this.item = this.items[index];
    this.estado = this.item.enabled==1;
    this.descripcionModal = this.item.descripcion;
    console.log(this.descripcionModal)

    this.esNuevo = false;
    this.isModalShown=true;
  }

  OnEliminar(index: number){
    console.log(this.isDeleteModalShown)

    this.item = this.items[index];

    this.isDeleteModalShown=true;
  }

  OnConfirmar(){
    this.service.eliminarCategoria(this.item).subscribe(
      (response: Response)=>{
        console.log(response);
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

  OnDeshabilitar(item: Categoria){
    /* this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) =>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha deshabilitado con exito`, 'Aviso', {closeButton: true});
          this.getLista()
        }
      }
    ); */
  }

}