import { Component, OnInit } from '@angular/core';
import { Persona,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { Location } from '@angular/common';
@Component({
  selector: 'usuarios-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [UsuarioService] 
})
export class GestionTipoEventoListaComponent implements OnInit  {

  public items : Array<Persona>;
  public paginacion: Paginacion;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: UsuarioService,
              private _location:Location
              ) {
    this.items = new Array<Persona>();
    this.paginacion = new Paginacion({pagina:0,registros: 10});
  }

  ngOnInit():any {
    this.getLista();
  }

  getLista(){
    this.service.obtenerUsuarios(this.paginacion.pagina, this.paginacion.registros).subscribe(
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
  OnRowClick(i:number, item:Persona){

  }
  OnEditar(item:Persona){
    this.router.navigate([`mantenimiento/configuracion-usuarios/editar/${item.idUsuario}`]);
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

  OnDeshabilitar(item: Persona){
    this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) =>{
        if(response.estado=="OK"){
          this.toastr.success(`Se ha deshabilitado con exito`, 'Aviso', {closeButton: true});
          this.getLista()
        }
      }
    );
  }

}