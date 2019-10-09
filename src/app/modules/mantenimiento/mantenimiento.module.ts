import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GestionUsuariosRoutes} from './mantenimiento.routes';
import { UiSwitchModule } from 'ngx-ui-switch';
import {SpinKitModule} from './../../components/common/spinkit/spinkit.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
// views
import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';

import {GestionCategoriaListaComponent} from './GestionCategorias/lista.component';
import {EditarCategoriaComponent}from './GestionCategorias/editar/editar.component';

import {GestionTipoEventoListaComponent} from './GestionTipoEvento/lista.component';
import {EditarTipoEventoComponent}from './GestionTipoEvento/editar/editar.component';

import {GestionLugarListaComponent} from './GestionLugar/lista.component';

// modules/components
import {PaginacionModule} from './../../components/common/paginacion/paginacion.module';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    GestionUsuarioListaComponent,
    EditarUsuarioComponent,
    GestionCategoriaListaComponent,
    EditarCategoriaComponent,
    GestionTipoEventoListaComponent,
    EditarTipoEventoComponent,
    GestionLugarListaComponent,
  ],
  imports:[
    CommonModule, 
    RouterModule,
    FormsModule,
    BsDatepickerModule,
    NgSelectModule,
    PaginacionModule,
    PaginationModule.forRoot(),
    SpinKitModule,
    ModalModule,
    UiSwitchModule
  ]
})
export class MantenimientoModule { }
