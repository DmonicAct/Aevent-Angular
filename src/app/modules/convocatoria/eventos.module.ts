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
import {PostularEvento} from './postular/postular.component';
import {EdicionPonenciaComponent} from './postular/edicionPonencia.component';
import {ListaPonenciaComponent} from './listaEventos/listaPonencia.component';
import {CallForPaperResponse} from './call-for-paper-llenado/callForPaper.component'
@NgModule({
  declarations: [
    ListaEventos,
    PostularEvento,
    CallForPaperResponse,
    EdicionPonenciaComponent,
    ListaPonenciaComponent
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
