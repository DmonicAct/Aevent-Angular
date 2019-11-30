import { Component, OnInit } from '@angular/core';
import { Persona, Paginacion, Estado, Response, Usuario } from '../../../models';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { PersonaService } from '../../../services/persona.service';
import { Location } from '@angular/common';
@Component({
  selector: 'usuarios-lista',
  templateUrl: 'lista.template.html',
  styleUrls: ['lista.template.scss'],
  providers: [UsuarioService]
})
export class GestionUsuarioListaComponent implements OnInit {

  public items: Array<Persona>;
  public paginacion: Paginacion;
  public loading: boolean = false;
  public tipoUsuarios: String;
  constructor(private toastr: ToastrService,
    private router: Router,
    private service: UsuarioService,
    private servicePersonas: PersonaService,
    private _location: Location
  ) {
    this.items = new Array<Persona>();
    this.paginacion = new Paginacion({ pagina: 0, registros: 10 });
    this.tipoUsuarios = "Activos";
    this.activos = true;
    this.filtro = "";
    this.enFiltro = false;
    this.seCambioActivo = false;
  }

  ngOnInit(): any {
    this.cargarLista();
  }
  activos: boolean;
  cambioTipoUsuario() {
    this.activos = !this.activos;
    this.seCambioActivo = true;
    this.buscarUsuario();
  }

  public filtroActivo = ["Activos", "Inactivos"];

  cargarLista(){
    if (this.activos){
      this.getListaActivos();
    } else {
      this.getListaInactivos();
    }
  }

  getAllUsuariosActivos(){
    this.service.obtenerTodosUsuariosActivos().subscribe(
      (response: Response) => {
        this.items = response.resultado;        
        this.usuariosFiltrados = this.items;
        this.buscarUsuario();
      }
    );
  }

  compFechas(a:Persona, b:Persona){
    let fechaA:Date = new Date(a.fechaCreacion);
    //console.log(fechaA.getTime())
    let fechaB:Date = new Date(b.fechaCreacion);
    //console.log(fechaB.getTime())
    return fechaB.getTime()-fechaA.getTime();
  }
  getListaActivos() {
    this.service.obtenerUsuariosActivos(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
        this.items.sort((a,b)=>this.compFechas(a,b));
        this.paginacion = response.paginacion;
        this.usuariosFiltrados = this.items;
        console.log(this.usuariosFiltrados); 
        this.buscarUsuario();
      }
    );
  }
  getAllUsuariosInactivos(){
    this.service.obtenerTodosUsuariosInactivos().subscribe(
      (response: Response) => {
        this.items = response.resultado;        
        this.usuariosFiltrados = this.items;
        this.buscarUsuario();
      }
    );
  }

  getListaInactivos() {
    this.service.obtenerUsuariosInactivos(this.paginacion.pagina, this.paginacion.registros).subscribe(
      (response: Response) => {
        this.items = response.resultado;
        this.paginacion = response.paginacion;
        this.usuariosFiltrados = this.items;
        this.buscarUsuario();
      }
    );
  }
  OnNuevo() {
    this.router.navigate([`mantenimiento/configuracion-usuarios/nuevo`]);
  }
  OnRowClick(i: number, item: Persona) {

  }
  OnEditar(item: Persona) {
    this.router.navigate([`mantenimiento/configuracion-usuarios/editar/${item.idUsuario}`]);
  }
  OnPageChanged(event): void {
    this.paginacion.pagina = event.page;
    if (this.activos){
      this.getListaActivos();
    } else {
      this.getListaInactivos();
    }
  }

  enFiltro: boolean;
  OnPageOptionChanged(event): void {
    this.paginacion.registros = event.rows;
    this.paginacion.pagina = 1;
    if (this.activos){
      this.getListaActivos();
    } else {
      this.getListaInactivos();
    }
  }

  OnDeshabilitar(item: Persona) {
    this.service.eliminarUsuario(item.idUsuario).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.toastr.success(`Se ha deshabilitado con exito`, 'Aviso', { closeButton: true });
          if (this.activos){
            this.getListaActivos();
          } else {
            this.getListaInactivos();
          }
        }
      }
    );
  }

  OnHabilitar(item: Persona){
    this.service.habilitarUsuario(item.idUsuario).subscribe(
      (response: Response) => {
        if (response.estado == "OK") {
          this.toastr.success(`Se ha habilitado con exito`, 'Aviso', { closeButton: true });
          if (this.activos){
            this.getListaActivos();
          } else {
            this.getListaInactivos();
          }
        }
      }
    );
  }

  filtro: String;
  tipo: String;
  numeroTipo: number;
  usuariosFiltrados: Array<Usuario>;
  seCambioActivo: boolean;

  cambioFiltro() {
    if (this.tipo == "Nombre") {
      this.numeroTipo = 1;
    }
    if (this.tipo == "Usuario") {
      this.numeroTipo = 2;
    }
    if (this.tipo == "Email") {
      this.numeroTipo = 3;
    }
    //this.buscarUsuario();
  }

  public itemsFiltro = ["Nombre", "Usuario", "Email"];

  buscarUsuario() {
    this.cambioFiltro();
    if (this.filtro.length > 0) {
      if (this.enFiltro == false){
        if (this.activos){
          this.getAllUsuariosActivos();
        } else {
          this.getAllUsuariosInactivos();
        }
      }
      this.enFiltro = true;
      if (this.numeroTipo == 1) {
        this.servicePersonas.obtenerFiltroNombre(this.filtro,this.activos, this.paginacion.pagina, this.paginacion.registros).subscribe(
          (response: Response) => {
            this.usuariosFiltrados = response.resultado;
            this.paginacion = response.paginacion;
            console.log("activo: ",this.activos);
            console.log("filtro nombre: ",this.filtro);
            console.log("usuariosfiltrados: ",this.usuariosFiltrados);
          }
        )
      }
      if (this.numeroTipo == 2) { 
        this.servicePersonas.obtenerFiltroUsername(this.filtro,this.activos, this.paginacion.pagina, this.paginacion.registros).subscribe(
          (response: Response) => {
            this.usuariosFiltrados = response.resultado;
            this.paginacion = response.paginacion;
            console.log("activo: ",this.activos);
            console.log("filtro username: ",this.filtro);
            console.log("usuariosfiltrados: ",this.usuariosFiltrados);
          }
        )
      }
      if (this.numeroTipo == 3) {
        this.servicePersonas.obtenerFiltroEmail(this.filtro,this.activos, this.paginacion.pagina, this.paginacion.registros).subscribe(
          (response: Response) => {
            this.usuariosFiltrados = response.resultado;
            this.paginacion = response.paginacion;
            console.log("activo: ",this.activos);
            console.log("filtro email: ",this.filtro);
            console.log("usuariosfiltrados: ",this.usuariosFiltrados);
          }
        )
      }
    } else {
      
      if (this.seCambioActivo == true){
        if (this.activos){
          this.getListaActivos();
        } else {
          this.getListaInactivos();
        }
        this.seCambioActivo = false;
      } 
      this.enFiltro = false;
      this.usuariosFiltrados = this.items;      
    }
  }

}