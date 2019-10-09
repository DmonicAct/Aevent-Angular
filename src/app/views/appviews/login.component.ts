import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/';
import { AuthService as AeventAuthService } from '../../auth/service/auth.service';
import { AuthService as SocialAuthService, GoogleLoginProvider} from "angular-6-social-login";
import { UsuarioService } from '../../services/usuario.service';
@Component({
  selector: 'login',
  templateUrl: 'login.template.html',
  styleUrls:['login.template.scss']
})
export class LoginComponent {
  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(private authService: AeventAuthService, 
              private toastr: ToastrService,
              private router: Router,
              private socialAuthService: SocialAuthService,
              private service: UsuarioService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['inicio']);
    }
  }

  login(): void {
    if (this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password =="") {
      this.toastr.warning('Username o password vacías!', 'Error', {closeButton: true});
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      let persona = this.authService.persona;
      this.router.navigate(['inicio']);
      this.toastr.success(`Hola ${persona.nombre}, has iniciado sesión con éxito!`, 'Aviso', {closeButton: true});
    }, err => {
      if (err.status == 400) {
        this.toastr.warning('Usuario o clave incorrectas!', 'Error', {closeButton: true});
      }
    }
    );
  }
  
  loginSocial(): void {    

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
        this.validarCreacionGoogle(this.obtenerDatosToken(userData.idToken));
        // Now sign-in with userData
        // ...
            
      }
    );
  }
  validarCreacionGoogle(idToken: any): any{
    let usrName : String;
    this.usuario.username = idToken.email;
    usrName = (String) (this.usuario.username);
    usrName = usrName.substr(0,usrName.indexOf("@"));
    console.log("THIS SHOULD WORK1: ",usrName);
    
    this.usuario.username = usrName.toString();
    this.usuario.password =  idToken.sub;
    console.log("THIS SHOULD WORK2: ",this.usuario.username);
    this.service.autenticarUsuarioGoogle(this.usuario).subscribe((response: Response)=>{
      console.log(response);
    }
    );
    
    

    //this.loginSocial();

    console.log("THIS SHOULD WORK3: ",idToken);


  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

 }
