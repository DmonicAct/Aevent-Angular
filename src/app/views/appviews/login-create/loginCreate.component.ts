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
  public loading:Boolean=false;
  public error:string=null;
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
      return;
    }

  
    //VALIDACION USERNAME
    if(usrName.length<6||usrName.length>15){
      this.toastr.warning('Usuario debe ser de 6 a 20 caracteres alfanuméricos', 'Error', {closeButton: true});
      return;
    }
    //VALIDACION CONTRASEÑA
    if(contrasenha.length<6||contrasenha.length>25 ){
      this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});
      return;
    }
    //EMAIL
    if(!this.emailIsValid(this.usuario.email)){
      this.toastr.warning('Ingresar un correo válido', 'Error', {closeButton: true});
      return;
    }



    if(!this.checkPassword(contrasenha) ){
      
      //console.log(this.checkPassword(contrasenha));
      this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});
      
      return;
    }
    //VALIDACION NOMBRE
    if(nombre.length<1||nombre.length>20 ){
      this.toastr.warning('Nombres deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      return;
    }
    //VALIDACION APELLIDOS
    if(apPaterno.length<1||apPaterno.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      
      return;
    }
    if(apMaterno.length<1||apMaterno.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      
      return;
    }
    //VALIDACION SEXO
    //VALIDACION FECHA DE NACIMIENTO
    if(usrName.length<1||usrName.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      
      return;
    }
    //VALIDACION DIRECCION
    if(usrDireccion.length<1||usrDireccion.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      return;
    }
    //VALIDACION DNI
    

   console.log(this.usuario);


    this.service.guardarUsuarioOut(this.usuario).subscribe(
      (response: Response)=>{
        
      }
    );
    
  }
 
  public emailIsValid (email:string):boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  public checkPassword(str) :boolean
  {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

  
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        //console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
            
      }
    );
  }
  DetectChange(){}

}
