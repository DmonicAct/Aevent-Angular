import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GestionOrganizadorRoutes} from './gestion.routes';
import {SpinKitModule} from '../../components/common/spinkit/spinkit.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
// views
// modules/components
import {PaginacionModule} from '../../components/common/paginacion/paginacion.module';
import {ListaEventosOrganizador} from './gestion_eventos/lista.component';
import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';

@NgModule({
  declarations: [
    ListaEventosOrganizador,
    EditarGestionarEventoComponent
  ],
  imports:[
    CommonModule, 
    RouterModule,
    FormsModule,
    PaginacionModule,
    PaginationModule.forRoot(),
    SpinKitModule
  ]
})
export class GestionOrganizadorModule { }
