import { Component, OnInit } from '@angular/core';
import { Usuario,Response, Persona, Role } from '../../../../models'
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario.service';
import { RolesServices } from '../../../../services/roles.services';
import { PersonaService } from '../../../../services';

@Component({
  selector: 'editar-usuario',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})
export class EditarUsuarioComponent implements OnInit  {

  public item : Persona;
  public itemRol: Role;
  /* Parameters */
  public itemsRoles: Array<Role>;
  public password: string;
  public password_repeat: string;

  private sub: any;
  private itemCodigo: number = null;
  public validar_email:boolean=false;
  public boolean_flags : Array<Boolean>;
  constructor(private _location: Location,  
              private route: ActivatedRoute,
              private toastr: ToastrService, 
              private router: Router,
              private service: UsuarioService,
              private servicePersona: PersonaService,
              private roleService: RolesServices) {
    this.item = new Persona();
    this.item.modoInicioSesion=0;
    this.itemRol = new Role();
    this.itemsRoles = new Array<Role>();
    this.boolean_flags= new Array<Boolean>();
  }
 
  ngOnInit():any {
    this.sub = this.route.params.subscribe(params => {
      this.itemCodigo = +params['id'];
      console.log(this.itemCodigo);
      if (this.itemCodigo==null){
        this.item.modoInicioSesion=0;
      }
    });
    this.ObtenerRoles();
  }
  ObtenerRoles(){
    this.roleService.obtenerRoles().subscribe(
      (response: Response)=>{
        this.itemsRoles = response.resultado;
        this.itemsRoles.forEach(e=>{
          let enabled = false;
          this.boolean_flags.push(enabled);
        });
        if(this.itemCodigo){
          this.ObtenerUsuario()
        }
      }
    );
  }
  ObtenerUsuario(){
    this.service.obtenerUsuario(this.itemCodigo).subscribe(
      (response: Response)=>{
        this.item = response.resultado;
        this.item.roles.forEach((e,i)=>{
          let index = e.idRol-1;
          this.boolean_flags[index]=true;
        });
      }
    );
  }
  OnRegresar(){
    this._location.back();
  }
  OnGuardar(){
    //debugger
    if(!this.itemCodigo){
      if(!this.item.nombre || this.item.nombre == "" ){
        this.toastr.warning('Debe colocar su nombre', 'Aviso', {closeButton: true});
        return;
      }
      if(!this.item.appaterno || this.item.appaterno == "" ){
        this.toastr.warning('Debe colocar su apellido', 'Aviso', {closeButton: true});
        return;
      }
      if(!this.item.email || this.item.email == "" ){
        this.toastr.warning('Debe colocar su email', 'Aviso', {closeButton: true});
        return;
      }
      if(!this.item.fechaNacimiento){
        this.toastr.warning('Debe colocar su Fecha de Nacimiento', 'Aviso', {closeButton: true});
        return;
      }
      if(!this.item.username || this.item.username == ""){
        this.toastr.warning('Debe colocar un Usuario', 'Aviso', {closeButton: true});
        return;
      }
      if(!this.password || this.password == "" ){
        this.toastr.warning('Debe asignar una contraseña', 'Aviso', {closeButton: true});
        return;
      }
      if( (this.password != "" || this.password_repeat!="") && this.password != this.password_repeat){
        this.toastr.warning('Contraseñas no coinciden', 'Aviso', {closeButton: true});
        return;
      }
      
    }
    this.item.password = this.password;
    let roles = new Array<Role>();
    if(this.itemCodigo){
      this.boolean_flags.forEach((e1,i1)=>{
        let isOnArray = false;
        this.item.roles.forEach((e2,i2)=>{
          if(e2.idRol-1==i1 && e1){
            isOnArray=true;
            e2.enabled=e1;
            roles.push(e2);
            isOnArray = true;
          }
        });
        if(!isOnArray && e1){
          let rol = this.itemsRoles[i1];
          rol.enabled=e1;
          roles.push(rol);
        }
      });
    }else{
      this.boolean_flags.forEach((e,i)=>{
        if(e==true){
          let role = this.itemsRoles[i];
          roles.push(role);
        }
      });
    }
    this.item.roles = roles;
    this.service.guardarUsuarioSistema(this.item).subscribe(
      (response:Response)=>{
        this.toastr.success('Se guardo el usuario correctamente', 'Aviso', {closeButton: true});
        //this._location.back();
      });
  }
  DetectChange(){

  }
  OnValidarEmail(){
    this.service.validarEmail(this.item.email).subscribe(
      (response: Response)=>{
        this.validar_email = response.resultado;
        if(this.validar_email){
          this.toastr.success(`Correo valido`, 'Aviso', {closeButton: true});
        }else{
          this.toastr.warning(`Correo invalido`, 'Aviso', {closeButton: true});
        }
      });
  }
}