import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {StarterViewComponent} from "./views/appviews/starterview.component";
import {LoginComponent} from "./views/appviews/login.component";
import {ResetComponent} from "./views/appviews/reset.component";
import {OutlookViewComponent} from './views/appviews/outlook.component';
import {BootstrapRoutes} from "./modules/bootstrap/bootstrap.routes";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";


import {GestionUsuariosRoutes} from './modules/mantenimiento/mantenimiento.routes';
import { GestionOrganizadorRoutes } from './modules/gestionar_eventos/gestion.routes';

import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';

export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  // App views
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'inicio', component: StarterViewComponent },
      { path: 'outlook', component: OutlookViewComponent }
    ]
  },
  {
    path: 'mantenimiento', component: BasicLayoutComponent,
    children: [
      {
        path: 'configuracion-usuarios', component: BlankLayoutComponent,
        children: GestionUsuariosRoutes,
        canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' } 
      }
    ],
  },
  {
    path: 'gestionOrganizadorEvento', component: BasicLayoutComponent,
    children: [
      {
        path: 'eventos-organizador', component: BlankLayoutComponent,
        children: GestionOrganizadorRoutes
      }
    ],
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'login/reset', component: ResetComponent }
    ]
  },
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: 'dashboards', component: TopNavigationLayoutComponent,
    children: [
      {path: 'dashboard41', component: Dashboard41Component}
    ]
  },
  
  {
    path: 'bootstrap', component: BasicLayoutComponent,
    children: BootstrapRoutes
  },
  

  // Handle all other routes
  {path: '**',  redirectTo: 'inicio'}
];