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
import { ListaEventosOrganizador } from './gestion_eventos/lista.component';
import { EditarGestionarEventoComponent } from './gestion_eventos/editar/editar.component';
import { DetalleEventoConfiguracion } from './gestion_eventos/editar/tabset-parts/detalle-evento/detalle-evento.component';
import { CallForPaperComponent } from './call-for-papers/call-for-paper.component';
import { CallForPaperView } from './call-for-papers/call-for-papers-view/call-for-paper-view.component';
import { FaseEventoComponent } from './gestion_eventos/editar/tabset-parts/fases/fase-evento.component';
import { ListaEventosPresidente } from '../gestionar_eventos/presidente/listaPresidente.component';
import { DetalleEventoVer } from '../gestionar_eventos/presidente/pestañas/detalle-evento/detalleEventoPresidente.component';
import { AgregarEvaluador } from '../gestionar_eventos/presidente/pestañas/comite-evento/agregar-evaluador/agregar-evaluador.component';
import { AgregarEvaluadorPropuesta } from '../gestionar_eventos/presidente/pestañas/asignar-propuestas/asignar-evaluador-propuestas/agregar-evaluador-propuestas.component';
import { ComiteEventoVer } from '../gestionar_eventos/presidente/pestañas/comite-evento/comiteEventoPresidente.component';
import { VerEventoPresidenteComponent } from '../gestionar_eventos/presidente/pestañas/ver.component';
import { AsignarPropuestasVer } from './presidente/pestañas/asignar-propuestas/asignar-propuestas.component';
import { FaseEventoPresidente } from './presidente/pestañas/fases/fase-evento.component';

@NgModule({
  declarations: [
    ListaEventosOrganizador,
    EditarGestionarEventoComponent,
    DetalleEventoConfiguracion,
    CallForPaperComponent,
    FaseEventoComponent,
    CallForPaperView,
    ListaEventosPresidente,
    DetalleEventoVer,
    ComiteEventoVer,
    AsignarPropuestasVer,
    VerEventoPresidenteComponent,
    AgregarEvaluador,
    AgregarEvaluadorPropuesta,
    FaseEventoPresidente,
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
export class GestionOrganizadorModule { }
