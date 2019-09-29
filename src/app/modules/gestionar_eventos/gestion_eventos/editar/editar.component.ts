import { Component, OnInit } from '@angular/core'
import { debug } from 'util';

@Component({
  selector: 'editar-gestion-eventos',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})

export class EditarGestionarEventoComponent implements OnInit {
  ngOnInit() {
    console.log("something");
  }
  datos: boolean = true;
  call: boolean = false;
  fases: boolean = false;

  //aqui tendriamos que hacer una consulta de las categorias
  categoriasMaestro = [
    {id: 1, nombre: 'Gobierno Electrónico'},
    {id: 2, nombre: 'Marketing Digital'},
    {id: 3, nombre: 'Bussiness Inteligence'},
    {id: 4, nombre: 'Inteligencia Artificial'},
    {id: 5, nombre: 'Lean IT'},
    {id: 6, nombre: 'Gráficos de Computadoras'},
  ];

  evento = {
    id: 22,
  }

  presidente = {
    id: 0,
    nombre: '',
    apellido: '',
  }
  categorias = [];


  modalCategorias: boolean = false;
  mostrarCategorias(event){
    this.modalCategorias = true;
    if (this.categorias.length == 0){
      this.categorias.push(this.categoriasMaestro[0]);
      this.categorias.push(this.categoriasMaestro[1]);
      this.categorias.push(this.categoriasMaestro[2]);
    }
  }

  buscarPresidente(event){
    this.presidente.id = 1;
    this.presidente.nombre = "Luis";
    this.presidente.apellido = "Flores";
  }

  verDatos(event) {
    this.datos = true;
    this.call = false;
    this.fases = false;
  }

  verPapers(event) {
    this.datos = false;
    this.call = true;
    this.fases = false;
  }

  verFases(event) {
    this.datos = false;
    this.call = false;
    this.fases = true;
  }

}