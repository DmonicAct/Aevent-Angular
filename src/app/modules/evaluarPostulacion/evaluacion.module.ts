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

import {ListaEvaluacionComponent} from './evaluacion/listaEvaluacion.component';
import {EditarEvaluacionComponent} from './evaluacion/editar/editarEvaluacion.component';
import {ListaPreferenciasComponent} from './preferencias-evaluacion/listaPreferenciasEvaluacion.component';
import {DetallePropuestaComponent} from './evaluacion/editar/tabset-parts/detalle-propuesta/detalle-propuesta.component';
import {FasePropuestaComponent} from './evaluacion/editar/tabset-parts/fase-propuesta/fase-propuesta.component';
import { ComentarioComponent } from './evaluacion/editar/tabset-parts/comentario-propuesta/comentario.component';
import { ListaEvaluacionFinalComponent } from './evaluacionFinal/listaEvaluacionFinal.component';
import { DetalleEvaluacionFinal } from './evaluacionFinal/detalles/detalle.component';
import { DetalleCFPComponent } from './evaluacionFinal/detalles/detalle-propuesta/detallecfp.component';

@NgModule({
  declarations: [
    ListaEvaluacionComponent,
    ListaEvaluacionFinalComponent,
    EditarEvaluacionComponent,
    ListaPreferenciasComponent,
    DetallePropuestaComponent,
    FasePropuestaComponent,
    ComentarioComponent,
    DetalleEvaluacionFinal,
    DetalleCFPComponent,
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
export class EvaluacionPostulanteModule { }
