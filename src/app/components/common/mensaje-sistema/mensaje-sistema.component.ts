import { Component, OnInit } from '@angular/core';

declare var jQuery:any;

@Component({
  selector: 'mensaje-sistema',
  templateUrl: 'mensaje-sistema.template.html',
  styleUrls: [ 'mensaje-sistema.component.scss' ]
})
export class MensajeSistemaComponent implements OnInit {

  mensaje:string;

  constructor() {
    this.mensaje = `Estimados usuarios: el sistema AEvent se encuentra en fase de desarrollo, si encuentra
    dificultades o problemas que desee reportar, por favor escrbirlas al correo de cualquiera de 
    nuestros colaboradores`;
  }

  ngOnInit() {
    jQuery(".marquee .system-message").text(this.mensaje);
  }
}
