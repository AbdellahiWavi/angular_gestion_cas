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
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/incidents.component';
import { HeaderComponent } from './composants/header/header.component';
import { DataTablesModule} from 'angular-datatables';
import { AllIncidentsComponent } from './composants/incidents/all-incidents/all-incidents.component';
import { NonAffecteComponent } from './composants/incidents/non-affecte/non-affecte.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MapComponent } from './localisation/map/map.component';
import { MarkerService } from './localisation/marker.service';
import { HttpInterceptorService } from './services/interceptor/http-incterceptor.service';
import { AfficherIncidentComponent } from './pages/detaille-incident/afficher-incident.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { IncidentAffecteOrgExtComponent } from './pages/incident-affecte-org-ext/incident-affecte-org-ext.component';
import { AllDegreeComponent } from './composants/degrees/all-degree.component';
import { AllClientComponent } from './composants/clients/all-client.component';
import { AllOrgExterneComponent } from './composants/OrgExternes/all-org-externe.component';
import { AllRoleComponent } from './composants/role/all-role.component';
import { AllTypesCasComponent } from './composants/typesCas/all-types-cas.component';
import { AllUtilisateursComponent } from './composants/utilisateurs/all-utilisateurs.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients.component';
import { PageAllDegreeComponent } from './pages/degrees/page-all-degree.component';
import { PageAllOrgExterneComponent } from './pages/OrgExternes/page-all-org-externe.component';
import { PageRoleComponent } from './pages/roles/page-role.component';
import { PageAllTypesCasComponent } from './pages/typesCas/page-all-types-cas.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageInscriptionComponent,
    PageDashboardComponent,
    MenuComponent,
    TableBordComponent,
    PageAllIncidentsComponent,
    HeaderComponent,
    AllIncidentsComponent,
    NonAffecteComponent,
    PageNonAffecteComponent,
    PageAllUtilisateursComponent,
    AllUtilisateursComponent,
    PageRoleComponent,
    AllRoleComponent,
    AllClientComponent,
    PageAllClientsComponent,
    AllClientComponent,
    PageAllDegreeComponent,
    AllDegreeComponent,
    AllOrgExterneComponent,
    AllTypesCasComponent,
    PageAllTypesCasComponent,
    PageAllOrgExterneComponent,
    MapComponent,
    AfficherIncidentComponent,
    LoaderComponent,
    PageLogoutComponent,
    IncidentAffecteOrgExtComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    MarkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
