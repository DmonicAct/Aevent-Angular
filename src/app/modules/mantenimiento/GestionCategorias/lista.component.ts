import { Component, OnInit, ViewChild} from '@angular/core';
import { Persona,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from "ngx-bootstrap";
import { CategoriaService } from '../../../services/categoria.service';
import { Location } from '@angular/common';
import { Categoria } from 'src/app/models/categoria';
@Component({
  selector: 'categorias-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [CategoriaService] 
})
export class GestionCategoriaListaComponent implements OnInit  {

  public isModalShown: Boolean;
  public isNewModalShown: Boolean;
  public esNuevo: Boolean;

  public newItem : Categoria; //para la nueva categoria
  public items : Array<Categoria>;
  public item : Categoria;


  public descripcionModal : String;
  public paginacion: Paginacion;
  @ViewChild('autoShownModal') 
  autoShownModal: ModalDirective;
  @ViewChild('autoNewShownModal')
  autoNewShownModal: ModalDirective;
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
  }

  getLista(){
    this.service.obtenerCategoriasPaginadas(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response)=>{
        console.log(response);

        this.items = response.resultado;
        this.paginacion = response.paginacion;
      }
    );
  }

  OnAgregar(){
    console.log(this.isNewModalShown)

    this.descripcionModal = "";

    this.esNuevo = true;
    this.isNewModalShown=true;
  }
  
  OnNuevo(){
    if(this.esNuevo){ //Creando nueva categoria 
      this.newItem.descripcion = this.descripcionModal;

      this.service.guardarCategoria(this.newItem).subscribe(
        (response: Response)=>{
          console.log(response);
          this.getLista();
        }
      );
    }else{ //editando categoria
      this.item.descripcion=this.descripcionModal;

      this.service.guardarCategoria(this.item).subscribe(
        (response: Response)=>{
          console.log(response);
        }
      );
    }
  }

  OnRowClick(i:number, item:Categoria){

  }
  /*
  OnEditar(item:Persona){
    this.router.navigate([`mantenimiento/configuracion-usuarios/editar/${item.idUsuario}`]);
  }
  */
  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    this.getLista();
  }

  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    this.getLista();
  }

  OnEditar(index:number){
    console.log(this.isModalShown)

    this.item = this.items[index];
    this.descripcionModal = this.item.descripcion;
    console.log(this.descripcionModal)

    this.esNuevo = false;
    this.isModalShown=true;
  }

  onHidden(): void {
    this.isModalShown = false;
    this.isNewModalShown = false;
  }

  hideModal(): void {
    if(this.isNewModalShown){
      this.autoNewShownModal.hide();
    }else{
      this.autoShownModal.hide();
    }
  }
/*
  OnDeshabilitar(item: Persona){
    this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) =>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha deshabilitado con exito`, 'Aviso', {closeButton: true});
          this.getLista()
        }
      }
    );
  }*/

}