import { Component, OnInit } from '@angular/core';
import { Persona,Paginacion, Estado, Response, Usuario } from '../../../models';
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
export class GestionUsuarioListaComponent implements OnInit  {

  public items : Array<Persona>;
  public paginacion: Paginacion;
  public loading: Boolean = false;
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
        this.items = response.resultado;
        this.paginacion = response.paginacion;
        this.usuariosFiltrados = this.items;
        console.log(this.items);
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

  filtro: String;
  tipo: String;
  numeroTipo: number;
  usuariosFiltrados: Array<Usuario>;

  cambioFiltro(){
      if (this.tipo == "Nombre"){
          this.numeroTipo = 1;
      }
      if (this.tipo == "Usuario"){
          this.numeroTipo = 2;
      }
  }

  public itemsFiltro = ["Nombre","Usuario"];

  buscarUsuario() {
      this.cambioFiltro();
      if (this.filtro.length > 0) {
          if (this.numeroTipo == 1){
              this.usuariosFiltrados = this.items.filter(
                  item => item.nombre.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1 ||
                  item.appaterno.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1 ||
                  item.apmaterno.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
              )
          }
          if (this.numeroTipo == 2){
              this.usuariosFiltrados = this.items.filter(
                  item => item.username.toLowerCase().indexOf(this.filtro.toLowerCase()) > -1
              )
          }
          
      } else {
          this.usuariosFiltrados = this.items;
      }
  }

}