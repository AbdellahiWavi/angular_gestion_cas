import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { TableBordComponent } from './pages/table-bord/table-bord.component';
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/incidents.component';
import { PageUpdateIncidentComponent } from './pages/incidents/page-update-incident/page-update-incident.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs/page-all-utilisateurs.component';
import { PageUpdateUtilisateurComponent } from './pages/utilisateurs/page-update-utilisateur/page-update-utilisateur.component';
import { ApplicationGuardService } from './services/guard/application-guard.service';
import { PageRoleComponent } from './pages/roles/page-role/page-role.component';
import { PageAddRoleComponent } from './pages/roles/page-add-role/page-add-role.component';
import { PageUpdateRoleComponent } from './pages/roles/page-update-role/page-update-role.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients/page-all-clients.component';
import { PageDeleteClientComponent } from './pages/clients/page-delete-client/page-delete-client.component';
import { PageAllDegreeComponent } from './pages/degrees/page-all-degree/page-all-degree.component';
import { PageAddDegreeComponent } from './pages/degrees/page-add-degree/page-add-degree.component';
import { PageAllOrgExterneComponent } from './pages/OrgExternes/page-all-org-externe/page-all-org-externe.component';
import { PageDeleteOrgExterneComponent } from './pages/OrgExternes/page-delete-org-externe/page-delete-org-externe.component';
import { PageAllTypesCasComponent } from './pages/typesCas/page-all-types-cas/page-all-types-cas.component';
import { PageDeleteTypesCasComponent } from './pages/typesCas/page-delete-types-cas/page-delete-types-cas.component';
import { PageAddTypeCasComponent } from './pages/typesCas/page-add-type-cas/page-add-type-cas.component';
import { PageAddOrgExterneComponent } from './pages/OrgExternes/page-add-org-externe/page-add-org-externe.component';
import { MapComponent } from './localisation/map/map.component';
import { AfficherIncidentComponent } from './pages/detaille-incident/afficher-incident.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { IncidentAffecteOrgExtComponent } from './pages/incident-affecte-org-ext/incident-affecte-org-ext.component';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'inscrire',
    component: PageInscriptionComponent
  },
  {
    path: '',
    redirectTo: 'tableBord',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PageDashboardComponent,
    canActivate:[ApplicationGuardService],
    children: [
      {
        path: 'tableBord',
        component: TableBordComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllIncident',
        component: PageAllIncidentsComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'updateIncident',
        component: PageUpdateIncidentComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'nonAffecte',
        component: PageNonAffecteComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllUser',
        component: PageAllUtilisateursComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'updateRole',
        component: PageUpdateUtilisateurComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllRoles',
        component: PageRoleComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'addRole',
        component: PageAddRoleComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'updateRoleProfile',
        component: PageUpdateRoleComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllClients',
        component: PageAllClientsComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'deleteClient',
        component: PageDeleteClientComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllDegrees',
        component: PageAllDegreeComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'addDegree',
        component: PageAddDegreeComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllOrgExternes',
        component: PageAllOrgExterneComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'deleteOrgExterne',
        component: PageDeleteOrgExterneComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'addOrgExterne',
        component: PageAddOrgExterneComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'displayAllTypesCas',
        component: PageAllTypesCasComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'deleteTypeCas',
        component: PageDeleteTypesCasComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'addTypeCas',
        component: PageAddTypeCasComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'incidentLocation',
        component: MapComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'detailsIncident',
        component: AfficherIncidentComponent,
        canActivate:[ApplicationGuardService]
      },
      {
        path: 'logout',
        component: PageLogoutComponent
      }
    ]
  },
  {
    path: 'orgExterne',
    component: IncidentAffecteOrgExtComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
