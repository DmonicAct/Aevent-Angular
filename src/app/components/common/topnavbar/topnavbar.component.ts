import { Component, OnInit } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { AppSettings } from '../../../app.settings';
import { Router } from '@angular/router';
import { Estado, Response } from '../../../models';
import { Persona, Usuario } from 'src/app/models';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent  implements OnInit{

  public usr: Usuario;
  constructor(private router: Router, private auth: AeventAuthService,    
    private usrService: UsuarioService) {
    this.nombre = AppSettings.APP_NAME;
    this.usuario = auth.usuario;
    this.persona = auth.persona;
  }
  ngOnInit() {
    this.usrService.obtenerUsuarioUs(this.auth.usuario.username).subscribe(
      (response:Response)=>{
          this.usr = response.resultado;
          console.log(this.usr)
        
      }
    );
  }


  nombre:string;
  usuario: Usuario;
  persona: Persona;


mostrarNotif(){
  this.usr.evaluacionSinLeer=false;
  this.usrService.guardarUsuarioSistema(<Persona>this.usr).subscribe(
    (response:Response)=>{
      console.log(response)
      this.router.navigate(["/gestionEvaluacionEvento/eventos-postulante"])
    }
  );
 
}

mostrarNotif2(){
  
}
  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  OnLogout(){
    this.auth.logout();
    this.router.navigate(['/login']);
    //routerLink="/login"
  }
}
