import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../models/';
import { AuthService } from '../../auth/service/auth.service';
@Component({
  selector: 'login',
  templateUrl: 'login.template.html'
})
export class LoginComponent {
  titulo: string = 'Por favor Sign In!';
  usuario: Usuario;

  constructor(private authService: AuthService, 
              private toastr: ToastrService,
              private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
     // swal('Login', `Hola ${this.authService.usuario.username} ya estás autenticado!`, 'info');
      this.router.navigate(['inicio']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null ||
      this.usuario.username == "" || this.usuario.password =="") {
      //swal('Error Login', 'Username o password vacías!', 'error');
      this.toastr.warning('Username o password vacías!', 'Error', {closeButton: true});
      return;
    }

    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;
      this.router.navigate(['inicio']);
      //swal('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      this.toastr.success(`Hola ${usuario.username}, has iniciado sesión con éxito!`, 'Error', {closeButton: true});
    }, err => {
      if (err.status == 400) {
        //swal('Error Login', 'Usuario o clave incorrectas!', 'error');
        this.toastr.warning('Usuario o clave incorrectas!', 'Error', {closeButton: true});
      }
    }
    );
  }

 }
