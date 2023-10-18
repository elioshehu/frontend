import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {ShitesComponent} from "./shites/shites.component";
import {ProdukteComponent} from "./produkte/produkte.component";
import {PorosiComponent} from "./porosi/porosi.component";
import {KlientComponent} from "./klient/klient.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'shites', component: ShitesComponent},
  {path: 'produkte', component: ProdukteComponent},
  {path: 'porosi', component: PorosiComponent},
  {path: 'klient', component: KlientComponent},
  {path: 'login', component: LoginComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
