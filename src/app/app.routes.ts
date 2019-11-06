import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";
import {LoginCreateComponent} from "./views/appviews/login-create/loginCreate.component";
import {ResetComponent} from "./views/appviews/reset.component";
import {OutlookViewComponent} from './views/appviews/outlook.component';
import {BootstrapRoutes} from "./modules/bootstrap/bootstrap.routes";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";

import { GestionUsuariosRoutes } from './modules/mantenimiento/mantenimiento.routes';
import { GestionOrganizadorRoutes } from './modules/gestionar_eventos/gestion.routes';
//add
import { GestionCategoriasRoutes } from './modules/mantenimiento/mantenimiento.routes';
import { GestionTipoEventoRoutes } from './modules/mantenimiento/mantenimiento.routes';
import { GestionLugarRoutes } from './modules/mantenimiento/mantenimiento.routes'

import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';

import { EventosPonentesRoutes, EventosEdicionPonentes } from "./modules/convocatoria/eventos.routes";
import { GestionEvaluacionRoutes } from "./modules/evaluarPostulacion/evaluacion.routes";

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  // App views
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'inicio', component: StarterViewComponent }
    ]
  },
  {
    path: 'mantenimiento', component: BasicLayoutComponent,
    children: [
      {
        path: 'configuracion-usuarios', component: BlankLayoutComponent,
        children: GestionUsuariosRoutes,
        canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } 
      },
      {
        path: 'categorias', component: BlankLayoutComponent,
        children: GestionCategoriasRoutes,
        canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } 
      },
      {
        path: 'tipoEvento', component: BlankLayoutComponent,
        children: GestionTipoEventoRoutes,
        canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } 
      },
      {
        path: 'lugares', component: BlankLayoutComponent,
        children: GestionLugarRoutes,
        canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } 
      }
    ],
  },
  {
    path: 'Eventos', component: BasicLayoutComponent,
    children: [
      {
        path: 'MisEventos', component: BlankLayoutComponent,
        children: GestionOrganizadorRoutes,
/*         canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ORGANIZER' }  */
      }
    ],
  },
  {
    path: 'gestionEvaluacionEvento', component: BasicLayoutComponent,
    children: [
      {
        path: 'eventos-postulante', component: BlankLayoutComponent,
        children: GestionEvaluacionRoutes,
/*         canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ORGANIZER' }  */
      },
      {
        path: 'preferencias-evaluacion', component: BlankLayoutComponent,
        children: GestionEvaluacionRoutes,
/*         canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ORGANIZER' }  */
      }
    ],
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'login/reset', component: ResetComponent },
      { path: 'login/create', component: LoginCreateComponent}
    ]
  },
  {
    path: 'convocatoria', component: BasicLayoutComponent,
    children: [
      {
        path: 'lista-eventos', component: BlankLayoutComponent,
        children: EventosPonentesRoutes,
      },
      {
        path: 'lista-ponencia', component: BlankLayoutComponent,
        children: EventosEdicionPonentes,
      }
    ],
  },
  

  // Handle all other routes
  {path: '**',  redirectTo: 'inicio'}
];