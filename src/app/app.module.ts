import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './composants/menu/menu.component';
import { TableBordComponent } from './pages/table-bord/table-bord.component';
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/page-all-incidents.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { HeaderComponent } from './composants/header/header.component';
import { DataTablesModule} from 'angular-datatables';
import { AllIncidentsComponent } from './composants/all-incidents/all-incidents.component';
import { NonAffecteComponent } from './composants/non-affecte/non-affecte.component';
import { UpdateIncidentComponent } from './composants/update-incident/update-incident.component';
import { SupprimerIncidentComponent } from './composants/supprimer-incident/supprimer-incident.component'

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageInscriptionComponent,
    PageDashboardComponent,
    MenuComponent,
    TableBordComponent,
    PageAllIncidentsComponent,
    UtilisateursComponent,
    HeaderComponent,
    AllIncidentsComponent,
    NonAffecteComponent,
    UpdateIncidentComponent,
    SupprimerIncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
