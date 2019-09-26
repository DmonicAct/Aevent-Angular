import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {StarterViewComponent} from "./starterview.component";
import {OutlookViewComponent} from "./outlook.component";
import {LoginComponent} from "./login.component";
import {ResetComponent} from "./reset.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';
import {SpinKitModule} from '../../components/common/spinkit/spinkit.module';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    StarterViewComponent,
    OutlookViewComponent,
    LoginComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule,
    SpinKitModule,
    FormsModule,
    ToastrModule
  ],
  exports: [
    StarterViewComponent,
    OutlookViewComponent,
    LoginComponent,
    ResetComponent 
  ],
})

export class AppviewsModule {
}
