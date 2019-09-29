import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {SpinKitModule} from '../../components/common/spinkit/spinkit.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
// views
// modules/components
import {PaginacionModule} from '../../components/common/paginacion/paginacion.module';
import {ListaEventosOrganizador} from './gestion_eventos/lista.component';
import {EditarGestionarEventoComponent} from './gestion_eventos/editar/editar.component';
import {DetalleEventoConfiguracion} from './gestion_eventos/editar/tabset-parts/detalle-evento/detalle-evento.component';
@NgModule({
  declarations: [
    ListaEventosOrganizador,
    EditarGestionarEventoComponent,
    DetalleEventoConfiguracion
  ],
  imports:[
    CommonModule, 
    RouterModule,
    FormsModule,
    PaginacionModule,
    PaginationModule.forRoot(),
    SpinKitModule,
    ButtonsModule,
    TabsModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule,
    ModalModule
  ]
})
export class GestionOrganizadorModule { }
