import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models';
import { Persona } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { AuthService as SocialAuthService, GoogleLoginProvider} from "angular-6-social-login";

@Component({
  selector: 'app-login-create',
  templateUrl: './loginCreate.component.html',
  styleUrls: ['./loginCreate.component.scss']
})
export class LoginCreateComponent /*implements OnInit*/ {

  titulo: string = 'Por favor Sign In!';
  //usuario: Usuario;
  usuario: Persona;

  constructor(private authService: AeventAuthService, 
              private toastr: ToastrService,
              private router: Router,
              private socialAuthService: SocialAuthService) {
    this.usuario = new Persona();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['inicio']);
    }
  }

  create(): void {
    if(this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password ==""||
      this.usuario.email == null || this.usuario.appaterno == null ||
      this.usuario.email == "" || this.usuario.appaterno ==""||
      this.usuario.sexo == null || this.usuario.direccion == null ||
      this.usuario.sexo == "" || this.usuario.direccion ==""){      
    
      this.toastr.warning('Ingrese los campos requeridos!', 'Error', {closeButton: true});
      
      return;
    }
    

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['inicio']);
      this.toastr.success(`Hola ${usuario.username}, has iniciado sesión con éxito!`, 'Aviso', {closeButton: true});
    }, err => {
      if (err.status == 400) {
        this.toastr.warning('Usuario o clave incorrectas!', 'Error', {closeButton: true});
      }
    }
    );
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }

}
