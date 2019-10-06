import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models';
import { Persona } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { AuthService as SocialAuthService, GoogleLoginProvider} from "angular-6-social-login";
import { UsuarioService  as UsuarioService }from '../../../services/usuario.service';

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
              private service: UsuarioService,
              private socialAuthService: SocialAuthService) {
    this.usuario = new Persona();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['inicio']);
    }
  }

  create(): void {
    let usrName:string = this.usuario.username;
    let contrasenha:string = this.usuario.password;
    let fechaNacimiento:Date = this.usuario.fechaNacimiento;
    let nombre:String = this.usuario.nombre;
    let apPaterno: String = this.usuario.appaterno;
    let apMaterno: String = this.usuario.apmaterno;
    let correo: string = this.usuario.email;
    let sex: String = this.usuario.sexo;
    let usrDireccion: String = this.usuario.direccion;
    let dni: String = this.usuario.dni;
    if(this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password ==""||
      this.usuario.email == null || this.usuario.appaterno == null ||
      this.usuario.email == "" || this.usuario.appaterno ==""||
      this.usuario.fechaNacimiento == null){      
    
      this.toastr.warning('Ingrese los campos requeridos!', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION USERNAME
    if(usrName.length<4||usrName.length>15 ||usrName){
      this.toastr.warning('Usuario debe ser de 4 a 15 caracteres alfanuméricos', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION CONTRASEÑA
    if(contrasenha.length<6||contrasenha.length>25 ){
      this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION NOMBRE
    if(nombre.length<1||nombre.length>20 ){
      this.toastr.warning('Nombres deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION APELLIDOS
    if(apPaterno.length<1||apPaterno.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    if(apMaterno.length<1||apMaterno.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION SEXO
    //VALIDACION FECHA DE NACIMIENTO
    if(usrName.length<1||usrName.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION DIRECCION
    if(usrDireccion.length<1||usrDireccion.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      console.log(this.usuario);
      return;
    }
    //VALIDACION DNI
    
    this.service.guardarUsuario(this.usuario).subscribe(
      (response: Response)=>{
        console.log(response);
   
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
