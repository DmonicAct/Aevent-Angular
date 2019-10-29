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
import {ListaEventos } from './listaEventos/listaEventos.component';
/* import { ListaEventosOrganizador } from './gestion_eventos/lista.component';
import { EditarGestionarEventoComponent } from './gestion_eventos/editar/editar.component';
import { DetalleEventoConfiguracion } from './gestion_eventos/editar/tabset-parts/detalle-evento/detalle-evento.component';
import { CallForPaperComponent } from './gestion_eventos/editar/tabset-parts/call-for-papers/call-for-paper.component';
import { CallForPaperView } from './gestion_eventos/editar/tabset-parts/call-for-papers/call-for-papers-view/call-for-paper-view.component';
import { FaseEventoComponent } from './gestion_eventos/editar/tabset-parts/fases/fase-evento.component'; */

@NgModule({
  declarations: [
    ListaEventos,
    /* 
    EditarGestionarEventoComponent,
    DetalleEventoConfiguracion,
    CallForPaperComponent,
    FaseEventoComponent,
    CallForPaperView */
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
export class ConvocatoriaModules { }
