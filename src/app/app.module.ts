
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";
// App modules/components
import {SpinKitModule} from "./components/common/spinkit/spinkit.module";
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import {SampleModule} from "./modules/sample/sample.module";
import {AppComponentsModule} from "./views/appcomponents/appcomponents.module";
import {BootstrapModule} from "./modules/bootstrap/bootstrap.module";
import {MantenimientoModule} from "./modules/mantenimiento/mantenimiento.module";
import { PaginacionModule } from './components/common/paginacion/paginacion.module';

import {TokenInterceptor} from './auth/interceptors/token.interceptor';
import {AuthInterceptor} from './auth/interceptors/auth.interceptor';
import { AuthGuard } from './auth/guards/auth.guard';
import { RoleGuard } from './auth/guards/role.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //AEvent Moddules
    MantenimientoModule,

    PaginacionModule,

    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule, // required for Toastr
    // 3rd party modules
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    SpinKitModule,
    // Routes
    RouterModule.forRoot(ROUTES),
    // App modules
    AppviewsModule,
    DashboardsModule,
    LayoutsModule,
    SampleModule,
    AppComponentsModule,
    BootstrapModule,
    HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, Title,
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
