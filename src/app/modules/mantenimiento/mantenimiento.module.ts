import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {GestionUsuariosRoutes} from './mantenimiento.routes';
import {SpinKitModule} from './../../components/common/spinkit/spinkit.module';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {NgSelectModule} from '@ng-select/ng-select';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
// views
import {GestionUsuarioListaComponent} from './gestionUsuarios/lista.component';
import {EditarUsuarioComponent}from './gestionUsuarios/editar/editar.component';
// modules/components
import {PaginacionModule} from './../../components/common/paginacion/paginacion.module';

@NgModule({
  declarations: [
    GestionUsuarioListaComponent,
    EditarUsuarioComponent
  ],
  imports:[
    CommonModule, 
    RouterModule,
    FormsModule,
    BsDatepickerModule,
    NgSelectModule,
    PaginacionModule,
    PaginationModule.forRoot(),
    SpinKitModule
  ]
})
export class MantenimientoModule { }
