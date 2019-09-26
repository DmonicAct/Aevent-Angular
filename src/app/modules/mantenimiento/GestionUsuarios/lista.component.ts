import { Component, OnInit } from '@angular/core';
import { Persona,Paginacion, Estado, Response } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: 'usuarios-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss']
})
export class GestionUsuarioListaComponent implements OnInit  {

  public items : Array<Persona>;
  public paginacion: Paginacion;
  constructor(private toastr: ToastrService, 
              private router: Router,
              private service: UsuarioService) {
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
      }
    );
  }
  OnNuevo(){
    this.router.navigate([`mantenimiento/configuracion-usuarios/nuevo`]);
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



}