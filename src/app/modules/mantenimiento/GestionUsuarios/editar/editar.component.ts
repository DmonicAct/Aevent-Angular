import { Component, OnInit } from '@angular/core';
import { Usuario,Response, Persona } from '../../../../models'
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario.service';

@Component({
  selector: 'editar-usuario',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})
export class EditarUsuarioComponent implements OnInit  {

  public item : Persona;
  private sub: any;
  private itemCodigo: number;
  constructor(private _location: Location,  private route: ActivatedRoute,private toastr: ToastrService, private router: Router,
    private service: UsuarioService) {
    this.item = new Persona();
  }

  ngOnInit():any {
    this.sub = this.route.params.subscribe(params => {
      this.itemCodigo = +params['id'];
    });
    console.log(this.itemCodigo);
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
}