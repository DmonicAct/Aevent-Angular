import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AppSettings } from '../../../app.settings';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/service/auth.service';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  nombre:string;

  constructor(private router: Router, private auth: AuthService) {
    this.nombre = AppSettings.APP_NAME;
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
