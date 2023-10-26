import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ShitesComponent} from './shites/shites.component';
import {KlientComponent} from './klient/klient.component';
import {ProdukteComponent} from './produkte/produkte.component';
import {PorosiComponent} from './porosi/porosi.component';
import {RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {AuthInterceptor} from "./interceptor";
import {MatSelectModule} from "@angular/material/select";
import {UniquePipe} from "./unique.pipe";
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    ShitesComponent,
    KlientComponent,
    ProdukteComponent,
    PorosiComponent,
    LoginComponent,
    UniquePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    UniquePipe,
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
