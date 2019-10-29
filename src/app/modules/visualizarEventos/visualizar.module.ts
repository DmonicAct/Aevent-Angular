import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinKitModule } from '../../components/common/spinkit/spinkit.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import {SweetAlert2Module} from '@toverux/ngx-sweetalert2';
// views
// modules/components
import { PaginacionModule } from '../../components/common/paginacion/paginacion.module';
import { ListaEventosPresidente } from './presidente/listaPresidente.component';
import { DetalleEventoVer } from './presidente/pestañas/detalle-evento/detalleEventoPresidente.component';
import { ComiteEventoVer } from './presidente/pestañas/comite-evento/comiteEventoPresidente.component';
import { VerEventoPresidenteComponent } from './presidente/pestañas/ver.component';
import {VerFormatoPresidente} from './presidente/pestañas/call-for-papers-view/verFormato.component'

@NgModule({
  declarations: [
    ListaEventosPresidente,
    DetalleEventoVer,
    ComiteEventoVer,
    VerEventoPresidenteComponent,
    VerFormatoPresidente,
  ],
  imports: [
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
    ModalModule,
    SweetAlert2Module
  ]
})
export class ModelosPresidenteModule { }
