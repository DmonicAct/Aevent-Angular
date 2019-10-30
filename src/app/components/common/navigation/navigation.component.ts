import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import 'jquery-slimscroll';

declare var jQuery:any;

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  constructor(private router: Router,
    private authService: AeventAuthService,) {}
  rolOrga: Boolean;
  rolAdmin: Boolean;
  rolPres: Boolean;
  rolPonente: Boolean;
  rolEval: Boolean;
  ngOnInit(){
    this.rolOrga = false;
    this.rolAdmin = false;
    this.rolPres = false;
    this.rolPonente = false; //se queda en falso hasta que tengamos los servicios de eventos listos.
    this.authService.usuario.roles.forEach(element => {
      var aux = '' + element;
      if (aux == 'ROLE_ADMIN') {
        this.rolAdmin = true;
        this.rolPonente = false;
      }
      if (aux == 'ROLE_ORGANIZER') this.rolOrga = true;
      if (aux == 'ROLE_PRESIDENT') this.rolPres = true;
      if (aux == 'ROLE_EVALUATOR') this.rolEval = true;
    });
  }

  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();
    if (jQuery("body").hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      })
    }
  }

  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }


}
