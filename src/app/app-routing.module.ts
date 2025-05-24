import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { TableBordComponent } from './pages/table-bord/table-bord.component';
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/incidents.component';
import { PageUpdateIncidentComponent } from './pages/incidents/page-update-incident/page-update-incident.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { MapComponent } from './localisation/map/map.component';
import { AfficherIncidentComponent } from './pages/detaille-incident/afficher-incident.component';
import { PageLogoutComponent } from './pages/page-logout/page-logout.component';
import { IncidentAffecteOrgExtComponent } from './pages/incident-affecte-org-ext/incident-affecte-org-ext.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients.component';
import { PageAllDegreeComponent } from './pages/degrees/page-all-degree.component';
import { PageAllOrgExterneComponent } from './pages/OrgExternes/page-all-org-externe.component';
import { PageRoleComponent } from './pages/roles/page-role.component';
import { PageAllTypesCasComponent } from './pages/typesCas/page-all-types-cas.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs.component';
import { ApplicationGuardService } from './services/guard/application-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'signupAdmin',
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
    canActivate: [ApplicationGuardService],
    children: [
      {
        path: 'tableBord',
        component: TableBordComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllIncident',
        component: PageAllIncidentsComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'updateIncident',
        component: PageUpdateIncidentComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'nonAffecte',
        component: PageNonAffecteComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllUser',
        component: PageAllUtilisateursComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllRoles',
        component: PageRoleComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllClients',
        component: PageAllClientsComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllDegrees',
        component: PageAllDegreeComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllOrgExternes',
        component: PageAllOrgExterneComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'displayAllTypesCas',
        component: PageAllTypesCasComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'incidentLocation',
        component: MapComponent,
        canActivate: [ApplicationGuardService]
      },
      {
        path: 'detailsIncident',
        component: AfficherIncidentComponent,
        canActivate: [ApplicationGuardService]
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
