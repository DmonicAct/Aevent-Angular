import { Component } from '@angular/core';

@Component({
  selector: 'crearEvento',
  templateUrl: 'crearEvento.html',
  styleUrls:['crearEvento.scss']
})
export class CrearEventoComponent {
  datos: boolean = true;
  call: boolean = false;
  fases: boolean = false;

  verDatos(event){
    this.datos = true;
    this.call = false;
    this.fases = false;
  }

  verPapers(event){
    this.datos = false;
    this.call = true;
    this.fases = false;
  }

  verFases(event){
    this.datos = false;
    this.call = false;
    this.fases = true;
  }

}
