import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from "@angular/router";
import { NgModule, LOCALE_ID } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

import { ROUTES } from "./app.routes";
import { AppComponent } from './app.component';

// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";
import { AppviewsModule } from "./views/appviews/appviews.module";
// App modules/components
import { SpinKitModule } from "./components/common/spinkit/spinkit.module";
import { LayoutsModule } from "./components/common/layouts/layouts.module";
import { SampleModule } from "./modules/sample/sample.module";
import { AppComponentsModule } from "./views/appcomponents/appcomponents.module";
import { BootstrapModule } from "./modules/bootstrap/bootstrap.module";
import { MantenimientoModule } from "./modules/mantenimiento/mantenimiento.module";
import { GestionOrganizadorModule } from './modules/gestionar_eventos/gestion.module';
import { PaginacionModule } from './components/common/paginacion/paginacion.module';
import { UiSwitchModule } from 'ngx-ui-switch';

import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular-6-social-login";
import { LoginCreateComponent } from './views/appviews/login-create/loginCreate.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("832951798674-t388unprfrv6djsofmkl3c832idsrr6h.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginCreateComponent
  ],
  imports: [
    //AEvent Moddules
    MantenimientoModule,
    GestionOrganizadorModule,
    PaginacionModule,

    BrowserModule,
    UiSwitchModule,
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
    HttpClientModule,
    //Social Login
    SocialLoginModule,

  ],
  providers: [{ provide: LocationStrategy,useClass: HashLocationStrategy }, Title,
  { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs},
 /*  { provide: LOCALE_ID, useValue: 'es' }, */
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
