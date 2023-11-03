import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommonModule} from '@angular/common';
import {ShitesComponent} from "./shites/shites.component";
import {ProdukteComponent} from "./produkte/produkte.component";
import {PorosiComponent} from "./porosi/porosi.component";
import {KlientComponent} from "./klient/klient.component";
import {LoginComponent} from "./login/login.component";
import {PorosiListComponent} from "./porosi-list/porosi-list.component";
import {ShitesListComponent} from "./shites-list/shites-list.component";
import {ProdukteListComponent} from "./produkte-list/produkte-list.component";
import {KlientListComponent} from "./klient-list/klient-list.component";

const routes: Routes = [
  {path: 'shites', component: ShitesComponent},
  {path: 'shites/:id', component: ShitesComponent},
  {path: 'shitesList', component: ShitesListComponent},
  {path: 'produkte', component: ProdukteComponent},
  {path: 'produkte/:id', component: ProdukteComponent},
  {path: 'produkteList', component: ProdukteListComponent},
  {path: 'porosi', component: PorosiComponent},
  {path: 'porosi/:id', component: PorosiComponent},
  {path: 'porosiList', component: PorosiListComponent},
  {path: 'klient', component: KlientComponent},
  {path: 'klient/:id', component: KlientComponent},
  {path: 'klientList', component: KlientListComponent},
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
