import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models'
import { Location } from '@angular/common';
@Component({
  selector: 'editar-usuario',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})
export class EditarUsuarioComponent implements OnInit  {

  public item : Usuario;
  constructor(private _location: Location) {
    this.item = new Usuario();
  }

  ngOnInit():any {

  }
  OnRegresar(){
    this._location.back();
  }
  OnGuardar(){
    this._location.back();
  }
}