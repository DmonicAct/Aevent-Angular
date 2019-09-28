import {Component, OnInit} from '@angular/core'

@Component({
    selector:'editar-gestion-eventos',
    templateUrl:'editar.template.html',
    styleUrls:['editar.template.scss']
})

export class EditarGestionarEventoComponent implements OnInit{
    ngOnInit(){
        console.log("something");
    }
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