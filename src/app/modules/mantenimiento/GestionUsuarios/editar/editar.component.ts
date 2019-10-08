import { Component, OnInit } from '@angular/core';
import { Usuario,Response, Persona, Roles } from '../../../../models'
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
  public itemRol: Roles;
  /* Parameters */
  public itemsRoles: Array<Roles>;
  
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
    this.itemRol = new Roles();
    this.itemsRoles = new Array<Roles>();
    this.boolean_flags= new Array<Boolean>();
  }

  ngOnInit():any {
    this.sub = this.route.params.subscribe(params => {
      this.itemCodigo = +params['id'];
    });
    console.log(this.itemCodigo);
    this.roleService.obtenerRoles().subscribe(
      (response: Response)=>{
        this.itemsRoles = response.resultado;
        this.itemsRoles.forEach(e=>{
          let enable: Boolean= false;
          this.boolean_flags.push(enable);
        });
      }
    );
    if(this.itemCodigo){
      this.service.obtenerUsuario(this.itemCodigo).subscribe(
        (response: Response)=>{
          console.log(response);
          this.item = response.resultado;
          console.log(this.item.nombre);
          console.log(this.item.appaterno);
          console.log(this.item.apmaterno);
          console.log("item :");
          console.log(this.item);
        }
      );
    }

  }
  OnRegresar(){
    this._location.back();
  }
  OnGuardar(){
    console.log(this.item);
    
    if(this.password != this.password_repeat){

    }
    //this._location.back();
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