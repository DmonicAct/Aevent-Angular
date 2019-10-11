import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import swal from 'sweetalert2';
import { Role } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as Role;
    if (this.authService.hasRole(role)) {
      return true;
    }
    swal('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este modulo`, 'warning');
    this.router.navigate(['/starterview']);
    return false;
  }
}
