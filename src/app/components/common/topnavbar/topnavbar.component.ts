import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AppSettings } from '../../../app.settings';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Persona, Usuario } from 'src/app/models';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  nombre:string;
  usuario: Usuario;
  persona: Persona;

  constructor(private router: Router, private auth: AuthService) {
    this.nombre = AppSettings.APP_NAME;
    this.usuario = auth.usuario;
    this.persona = auth.persona;
  }


  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  OnLogout(){
    this.auth.logout();
    this.router.navigate(["/login"]);
    //routerLink="/login"
  }
}
