import { Component, OnInit } from '@angular/core';
import { Usuario,Response, Persona, Role } from '../../../../models'
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../../services/usuario.service';
import { RolesServices } from '../../../../services/roles.services';
import { PersonaService } from '../../../../services';


@Component({
  selector: 'editar-usuario',
  templateUrl: 'editar.template.html',
  styleUrls: ['editar.template.scss']
})
export class EditarUsuarioComponent implements OnInit  {

  public item : Persona;
  public itemRol: Role;
  /* Parameters */
  public itemsRoles: Array<Role>;
  public password: string;
  public password_repeat: string;

  private sub: any;
  private itemCodigo: number = null;
  public validar_email:boolean=false;
  public boolean_flags : Array<Boolean>;
  constructor(private _location: Location,  
              private route: ActivatedRoute,
              private toastr: ToastrService, 
              private router: Router,
              private service: UsuarioService,
              private servicePersona: PersonaService,
              private roleService: RolesServices) {
    this.item = new Persona();
    this.item.modoInicioSesion=0;
    this.itemRol = new Role();
    this.itemsRoles = new Array<Role>();
    this.boolean_flags= new Array<Boolean>();
  }
 
  ngOnInit():any {
    this.sub = this.route.params.subscribe(params => {
      this.itemCodigo = +params['id'];
      console.log(this.itemCodigo);
      if (this.itemCodigo==null){
        this.item.modoInicioSesion=0;
      }
    });
    this.ObtenerRoles();
  }
  ObtenerRoles(){
    this.roleService.obtenerRoles().subscribe(
      (response: Response)=>{
        this.itemsRoles = response.resultado;
        this.itemsRoles.forEach(e=>{
          let enabled = false;
          this.boolean_flags.push(enabled);
        });
        console.log('Roles:',this.itemsRoles);
        if(this.itemCodigo){
          this.ObtenerUsuario()
        }
      }
    );
  }
  ObtenerUsuario(){
    this.service.obtenerUsuario(this.itemCodigo).subscribe(
      (response: Response)=>{
        this.item = response.resultado;
        this.item.roles.forEach((e)=>{
          let index = e.idRol-1;
          this.boolean_flags[e.idRol-1]=true;
        });
      }
    );
  }
  OnRegresar(){
    this._location.back();
  }
  OnGuardar(){
    //debugger
    if(!this.itemCodigo){


      //USERNAME
      if(!this.item.username || this.item.username == ""){
        this.toastr.warning('Debe colocar un Usuario', 'Aviso', {closeButton: true});
        return;
      }

      if(this.item.username.length<6||this.item.username.length>20){
        this.toastr.warning('Usuario debe ser de 6 a 20 caracteres alfanuméricos', 'Error', {closeButton: true});
        return;
      }

     
      //VALIDACION CONTRASEÑA
      if(!this.password || this.password == "" ){
        this.toastr.warning('Debe asignar una contraseña', 'Aviso', {closeButton: true});
        return;
      }
      if( (this.password != "" || this.password_repeat!="") && this.password != this.password_repeat){
        this.toastr.warning('Contraseñas no coinciden', 'Aviso', {closeButton: true});
        return;
      }

      if(this.password.length<6||this.password.length>25 ){
        this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});
        return;
      }

      if(!this.checkPassword(this.password ) ){     
        //console.log(this.checkPassword(contrasenha));
        this.toastr.warning('Contraseña debe ser de 6 a 25 caracteres alfanuméricos, con por lo menos \n - una mayúscula \n - una minúscula y \n - un número ', 'Error', {closeButton: true});      
        return;
      }


      //nombre
      if(!this.item.nombre || this.item.nombre == "" ){
        this.toastr.warning('Debe colocar su nombre', 'Aviso', {closeButton: true});
        return;
      }
      if(this.item.nombre.length<1||this.item.nombre.length>20 ){
        this.toastr.warning('Nombres deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});
        return;
      }
      //sexo
      if(!this.item.sexo||this.item.sexo=="" ){
        this.toastr.warning('Debe ingresar su sexo', 'Error', {closeButton: true});
        return;
      }

      //apellidos
      if(!this.item.appaterno || this.item.appaterno == "" ){
        this.toastr.warning('Debe colocar su apellido', 'Aviso', {closeButton: true});
        return;
      }

      if(this.item.appaterno.length<1||this.item.appaterno.length>40 ){
        this.toastr.warning('Apellidos deben ser de 1 a 40 caracteres', 'Error', {closeButton: true});
        
        return;
      }

      if(this.item.apmaterno!=undefined){
        if(this.item.apmaterno==""){
          this.item.apmaterno=null;          
        }
        else if(this.item.apmaterno.length<1||this.item.apmaterno.length>20 ){
          this.toastr.warning('Apellidos deben ser de 1 a 20 caracteres', 'Error', {closeButton: true});          
          return;
        }
        
      }

      //EMAIL
      if(!this.item.email || this.item.email == "" ){
        this.toastr.warning('Debe colocar su email', 'Aviso', {closeButton: true});
        return;
      }      
      if(!this.emailIsValid(this.item.email)||this.item.email.length>30 ){
        this.toastr.warning('Ingresar un correo válido', 'Error', {closeButton: true});
        return;
      }


      if(!this.item.fechaNacimiento){
        this.toastr.warning('Debe colocar su Fecha de Nacimiento', 'Aviso', {closeButton: true});
        return;
      }

    
      //VALIDACION FECHA DE NACIMIENTO
      let tiempoActual: number = new Date().getTime();
      let tiempoFechaNac: number = this.item.fechaNacimiento.getTime();
      let constAnho: number = 3.154*10000000000*13;    
     

      if(tiempoActual-tiempoFechaNac<constAnho ){
        this.toastr.warning('Debes ser mayor a 13 años para poder registrarte al sistema', 'Error', {closeButton: true});      
        return;
      }    

    
      
    }

    this.item.enabled=true;
    this.item.password = this.password;
    let roles = new Array<Role>();
    if(this.itemCodigo){
      this.boolean_flags.forEach((e1,i1)=>{
        let isOnArray = false;
        this.item.roles.forEach((e2,i2)=>{
          if(e2.idRol-1==i1 && e1){
            isOnArray=true;
            e2.enabled=e1;
            roles.push(e2);
            isOnArray = true;
          }
        });
        if(!isOnArray && e1){
          let rol = this.itemsRoles[i1];
          rol.enabled=e1;
          roles.push(rol);
        }
      });
    }else{
      this.boolean_flags.forEach((e,i)=>{
        if(e==true){
          let role = this.itemsRoles[i];
          roles.push(role);
        }
      });
    }
    this.item.roles = roles;
    if(!this.item.roles || this.item.roles==undefined ||this.item.roles.length==0){
      this.toastr.warning('Escoga un rol para el nuevo usuario', 'Error', {closeButton: true});
      return;
    }
    this.item.enabled = true;

    this.service.validarUsuario(this.item.username).subscribe(
      (response: Response) => {        
        
        if(response.resultado==true){
          this.toastr.warning('El nombre de usuario ya está en uso, escoga uno diferente', 'Error', {closeButton: true});
        }else{
          this.service.validarEmail(this.item.email).subscribe(
            (response: Response) => {        
              console.log(response);
              if(response.resultado==true){
                this.toastr.warning('El correo ya está en uso, escoga uno diferente', 'Error', {closeButton: true});                   
              }else{                
                let fechaActual:Date = new Date();
                this.item.fechaCreacion = fechaActual;
                this.item.modoInicioSesion=0;
                if (this.item.sexo == "Seleccionar Sexo") this.item.sexo = "";
                this.service.guardarUsuarioSistema(this.item).subscribe(
                  (response:Response)=>{
                    this.toastr.success('Se guardo el usuario correctamente', 'Aviso', {closeButton: true});
                    //this._location.back();
                });     
              }
          });           
        }      
    });    


    
  }
  DetectChange(){

  }
  OnValidarEmail(){
    this.service.validarEmail(this.item.email).subscribe(
      (response: Response)=>{
        this.validar_email = response.resultado;
        if(this.validar_email){
          this.toastr.success(`Correo valido`, 'Aviso', {closeButton: true});
        }else{
          this.toastr.warning(`Correo invalido`, 'Aviso', {closeButton: true});
        }
      });
  }

  public emailIsValid (email:string):boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  public checkPassword(str) :boolean
  {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

}