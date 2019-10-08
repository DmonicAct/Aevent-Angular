import { Component, OnInit } from '@angular/core';
import { TipoEvento,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TipoEventoServices } from '../../../services/tipoEvento.service';
import { Location } from '@angular/common';

@Component({
  selector: 'tipoevento-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [TipoEventoServices] 
})
export class GestionTipoEventoListaComponent implements OnInit  {

  public items : Array<TipoEvento>;
  public paginacion: Paginacion;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: TipoEventoServices,
              private _location:Location
              ) {
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
  }
  OnRowClick(i:number, item:TipoEvento){

  }
  OnEditar(item:TipoEvento){
  
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