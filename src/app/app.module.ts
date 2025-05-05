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
import { UpdateIncidentComponent } from './composants/incidents/update-incident/update-incident.component';
import { PageUpdateIncidentComponent } from './pages/incidents/page-update-incident/page-update-incident.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs/page-all-utilisateurs.component';
import { PageUpdateUtilisateurComponent } from './pages/utilisateurs/page-update-utilisateur/page-update-utilisateur.component';
import { AllUtilisateursComponent } from './composants/utilisateurs/all-utilisateurs/all-utilisateurs.component';
import { UpdateUtilisateurComponent } from './composants/utilisateurs/update-utilisateur/update-utilisateur.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageRoleComponent } from './pages/roles/page-role/page-role.component';
import { AllRoleComponent } from './composants/role/all-role/all-role.component';
import { AddRoleComponent } from './composants/role/add-role/add-role.component';
import { UpdateRoleComponent } from './composants/role/update-role/update-role.component';
import { PageAddRoleComponent } from './pages/roles/page-add-role/page-add-role.component';
import { PageUpdateRoleComponent } from './pages/roles/page-update-role/page-update-role.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients/page-all-clients.component';
import { PageDeleteClientComponent } from './pages/clients/page-delete-client/page-delete-client.component';
import { DeleteClientsComponent } from './composants/clients/delete-clients/delete-clients.component';
import { AllClientComponent } from './composants/clients/all-client/all-client.component';
import { PageAllDegreeComponent } from './pages/degrees/page-all-degree/page-all-degree.component';
import { PageAddDegreeComponent } from './pages/degrees/page-add-degree/page-add-degree.component';
import { AllDegreeComponent } from './composants/degrees/all-degree/all-degree.component';
import { AddDegreeComponent } from './composants/degrees/add-degree/add-degree.component';
import { PageAllOrgExterneComponent } from './pages/OrgExternes/page-all-org-externe/page-all-org-externe.component';
import { PageDeleteOrgExterneComponent } from './pages/OrgExternes/page-delete-org-externe/page-delete-org-externe.component';
import { DeleteOrgExterneComponent } from './composants/OrgExternes/delete-org-externe/delete-org-externe.component';
import { AllOrgExterneComponent } from './composants/OrgExternes/all-org-externe/all-org-externe.component';
import { AllTypesCasComponent } from './composants/typesCas/all-types-cas/all-types-cas.component';
import { DeleteTypeCasComponent } from './composants/typesCas/delete-type-cas/delete-type-cas.component';
import { PageAllTypesCasComponent } from './pages/typesCas/page-all-types-cas/page-all-types-cas.component';
import { PageDeleteTypesCasComponent } from './pages/typesCas/page-delete-types-cas/page-delete-types-cas.component';
import { PageAddOrgExterneComponent } from './pages/OrgExternes/page-add-org-externe/page-add-org-externe.component';
import { AddOrgExterneComponent } from './composants/OrgExternes/add-org-externe/add-org-externe.component';
import { AddTypeCasComponent } from './composants/typesCas/add-type-cas/add-type-cas.component';
import { PageAddTypeCasComponent } from './pages/typesCas/page-add-type-cas/page-add-type-cas.component';
import { MapComponent } from './localisation/map/map.component';
import { MarkerService } from './localisation/marker.service';
import { HttpInterceptorService } from './services/interceptor/http-incterceptor.service';
import { AfficherIncidentComponent } from './pages/detaille-incident/afficher-incident.component';
import { LoaderComponent } from './composants/loader/loader.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { IncidentAffecteOrgExtComponent } from './pages/incident-affecte-org-ext/incident-affecte-org-ext.component';

@NgModule({
  declarations: [
    AppComponent,
    PageLoginComponent,
    PageInscriptionComponent,
    PageDashboardComponent,
    MenuComponent,
    TableBordComponent,
    PageAllIncidentsComponent,
    AllUtilisateursComponent,
    HeaderComponent,
    AllIncidentsComponent,
    NonAffecteComponent,
    UpdateIncidentComponent,
    PageUpdateIncidentComponent,
    PageNonAffecteComponent,
    PageAllUtilisateursComponent,
    PageUpdateUtilisateurComponent,
    AllUtilisateursComponent,
    UpdateUtilisateurComponent,
    PageRoleComponent,
    AllRoleComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    PageAddRoleComponent,
    PageUpdateRoleComponent,
    PageAllClientsComponent,
    PageDeleteClientComponent,
    DeleteClientsComponent,
    AllClientComponent,
    PageAllDegreeComponent,
    PageAddDegreeComponent,
    AllDegreeComponent,
    AddDegreeComponent,
    PageAllOrgExterneComponent,
    PageDeleteOrgExterneComponent,
    DeleteOrgExterneComponent,
    AllOrgExterneComponent,
    AllTypesCasComponent,
    DeleteTypeCasComponent,
    PageAllTypesCasComponent,
    PageDeleteTypesCasComponent,
    PageAddOrgExterneComponent,
    AddOrgExterneComponent,
    AddTypeCasComponent,
    PageAddTypeCasComponent,
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
