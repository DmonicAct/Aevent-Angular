import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models';
import { Persona } from '../../../models';
import { AuthService as AeventAuthService } from '../../../auth/service/auth.service';
import { AuthService as SocialAuthService, GoogleLoginProvider} from "angular-6-social-login";
import { UsuarioService  as UsuarioService }from '../../../services/usuario.service';
import { Estado, Response } from '../../../models';
import { timeInterval } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
    let valido: boolean = true;
    if(this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password ==""||
      this.usuario.email == null || this.usuario.appaterno == null ||
      this.usuario.email == "" || this.usuario.appaterno ==""||
      this.usuario.fechaNacimiento == null){      
    
      this.toastr.warning('Ingrese los campos requeridos!', 'Error', {closeButton: true});
      return;
    }

  
    //VALIDACION USERNAME
    if(usrName.length<6||usrName.length>20){
      this.toastr.warning('Usuario debe ser de 6 a 20 caracteres alfanuméricos', 'Error', {closeButton: true});
      return;
    }


    console.log(this.usuario.username)
    this.service.validarUsuario(this.usuario.username).subscribe(
      (response: Response) => {        
        console.log(response);
        if(response.resultado==true){
        this.toastr.warning('El nombre de usuario ya está en uso, escoga uno diferente', 'Error', {closeButton: true});
        valido=false;        
      }
      });
      console.log(valido);
    if(!valido){
    return;
    }

    //VALIDACION CONTRASEÑA
    if(contrasenha.length<6||contrasenha.length>25 ){
      this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});
      return;
    }
    //EMAIL
    if(!this.emailIsValid(this.usuario.email)||this.usuario.email.length>30 ){
      this.toastr.warning('Ingresar un correo válido', 'Error', {closeButton: true});
      return;
    }

    this.service.validarEmail(this.usuario.email).subscribe(
      (response: Response) => {        
        console.log(response);
        if(response.resultado==true){
          this.toastr.warning('El correo ya está en uso, escoga uno diferente', 'Error', {closeButton: true});
        valido=false;        
      }
      });

      if(!valido)
    return;


    if(!this.checkPassword(contrasenha ) ){
      
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
    if(this.usuario.sexo != 'MASCULINO' && this.usuario.sexo != 'FEMENINO'){
      this.toastr.warning('Ingrese su sexo', 'Error', {closeButton: true});
      
      return;

    }



    //VALIDACION FECHA DE NACIMIENTO

    

    let tiempoActual: number = new Date().getTime();
    let tiempoFechaNac: number = this.usuario.fechaNacimiento.getTime();
    console.log(tiempoActual-tiempoFechaNac);

    let constAnho: number = 3.154*10000000000*13;    
    console.log(tiempoActual-tiempoFechaNac);
    console.log(tiempoActual-tiempoFechaNac>constAnho)

    if(tiempoActual-tiempoFechaNac<constAnho ){
      this.toastr.warning('Debes ser mayor a 13 años para poder registrarte al sistema', 'Error', {closeButton: true});
      
      return;
    }    


   
   


    //VALIDACION DIRECCION
    if(usrDireccion.length<1||usrDireccion.length>20 ){
      this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
      return;
    }
    //VALIDACION DNI
    if(this.usuario.dni.length!=8){
      this.toastr.warning('Ingrese un DNI válido', 'Error', {closeButton: true});
      return;
    }

   console.log(this.usuario);


    this.service.guardarUsuarioOut(this.usuario).subscribe(
      (response: Response)=>{
        
      },err =>{
        if(err.status == 500){
          this.toastr.warning('Hubo un problema con el sistema consulte a su administrador.', 'Error', {closeButton: true});

        }else{
          this.login();
        }
      }
    );
    
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
  public emailIsValid (email:string):boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  public checkPassword(str) :boolean
  {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }
  public checkDNI(str) :boolean
  {
    var re = /(?=.*\d)/;
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
  DetectChange(){
   
  }

}
