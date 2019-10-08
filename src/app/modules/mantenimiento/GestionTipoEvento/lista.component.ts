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
              private service: TipoEventoServices,
              private _location:Location
              ) {
    this.newItem = new TipoEvento;    
    this.items = new Array<TipoEvento>();
    this.paginacion = new Paginacion({pagina:0,registros: 10});
  }

  ngOnInit():any {
    this.getLista();
  };

  getLista(){
    this.service.obtenerTipoEvento(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response)=>{
        console.log(response);
        this.items = response.resultado;
        this.paginacion = response.paginacion;
      }
    );
  }
  OnNuevo(){
    if(this.esNuevo){ //Creando tipo de evento 
      this.newItem.nombre = this.descripcionModal;

      this.service.guardarTipoEvento(this.newItem).subscribe(
        (response: Response)=>{
          console.log(response);
          if(response.estado=="OK"){
            this.toastr.success(`Se ha creado el tipo de evento con exito`, 'Aviso', {closeButton: true});
            this.getLista()
            this.onHidden()
          }
        }
      );
    }else{ //editando tipo de evento
      this.item.nombre=this.descripcionModal;

      this.service.guardarTipoEvento(this.item).subscribe(
        (response: Response)=>{
          console.log(response);
          if(response.estado=="OK"){
            this.toastr.success(`Se ha editado tipo de evento con éxito`, 'Aviso', {closeButton: true});
            this.getLista()
          }
        }
      );
    }
  }
  OnRowClick(i:number, item:TipoEvento){

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
    this.descripcionModal = this.item.nombre;
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
          this.toastr.success(`Se ha eliminado el tipo de evento con éxito`, 'Aviso', {closeButton: true});
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

}