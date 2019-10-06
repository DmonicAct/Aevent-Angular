import { Component, OnInit } from '@angular/core';
import { Persona,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  public items : Array<Categoria>;
  public paginacion: Paginacion;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: CategoriaService,
              private _location:Location
              ) {
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
  OnNuevo(){
    this.router.navigate([`mantenimiento/configuracion-usuarios/nuevo`]);
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