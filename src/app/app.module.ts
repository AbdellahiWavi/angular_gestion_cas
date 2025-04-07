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
import { SupprimerIncidentComponent } from './composants/incidents/supprimer-incident/supprimer-incident.component';
import { PageUpdateIncidentComponent } from './pages/incidents/page-update-incident/page-update-incident.component';
import { PageSupprimerIncidentComponent } from './pages/incidents/page-supprimer-incident/page-supprimer-incident.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs/page-all-utilisateurs.component';
import { PageUpdateUtilisateurComponent } from './pages/utilisateurs/page-update-utilisateur/page-update-utilisateur.component';
import { PageDeleteUtilisateurComponent } from './pages/utilisateurs/page-delete-utilisateur/page-delete-utilisateur.component';
import { AllUtilisateursComponent } from './composants/utilisateurs/all-utilisateurs/all-utilisateurs.component';
import { UpdateUtilisateurComponent } from './composants/utilisateurs/update-utilisateur/update-utilisateur.component';
import { DeleteUtilisateurComponent } from './composants/utilisateurs/delete-utilisateur/delete-utilisateur.component'
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PageRoleComponent } from './pages/roles/page-role/page-role.component';
import { AllRoleComponent } from './composants/role/all-role/all-role.component';
import { AddRoleComponent } from './composants/role/add-role/add-role.component';
import { DeleteRoleComponent } from './composants/role/delete-role/delete-role.component';
import { PageAddRoleComponent } from './pages/roles/page-add-role/page-add-role.component';
import { PageDeleteRoleComponent } from './pages/roles/page-delete-role/page-delete-role.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients/page-all-clients.component';
import { PageDeleteClientComponent } from './pages/clients/page-delete-client/page-delete-client.component';
import { DeleteClientsComponent } from './composants/clients/delete-clients/delete-clients.component';
import { AllClientComponent } from './composants/clients/all-client/all-client.component';



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
    SupprimerIncidentComponent,
    PageUpdateIncidentComponent,
    PageSupprimerIncidentComponent,
    PageNonAffecteComponent,
    PageAllUtilisateursComponent,
    PageUpdateUtilisateurComponent,
    PageDeleteUtilisateurComponent,
    AllUtilisateursComponent,
    UpdateUtilisateurComponent,
    DeleteUtilisateurComponent,
    PageRoleComponent,
    AllRoleComponent,
    AddRoleComponent,
    DeleteRoleComponent,
    PageAddRoleComponent,
    PageDeleteRoleComponent,
    PageAllClientsComponent,
    PageDeleteClientComponent,
    DeleteClientsComponent,
    AllClientComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    DataTablesModule,
    FormsModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
