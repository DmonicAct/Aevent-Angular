import { Component, OnInit } from '@angular/core';
import { Usuario,Response, Persona, Roles } from '../../../../models'
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario.service';
import { RolesServices } from '../../../../services/roles.services';

@Component({
  selector: 'editar-usuario',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})
export class EditarCategoriaComponent implements OnInit  {

  
  public item : Persona;
  public itemRol: Roles;
  /* Parameters */
  public itemsRoles: Array<Roles>;

  private sub: any;
  private itemCodigo: number;
  constructor(private _location: Location,  
              private route: ActivatedRoute,
              private toastr: ToastrService, 
              private router: Router,
              private service: UsuarioService,
              private roleService: RolesServices) {
    this.item = new Persona();
    this.itemRol = new Roles();
    this.itemsRoles = new Array<Roles>();
  }

  ngOnInit():any {
    this.sub = this.route.params.subscribe(params => {
      this.itemCodigo = +params['id'];
    });
    console.log(this.itemCodigo);
    this.roleService.obtenerRoles().subscribe(
      (response: Response)=>{
        this.itemsRoles = response.resultado;
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
    this._location.back();
  }
  DetectChange(){

  }
}