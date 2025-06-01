import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { TableBordComponent } from './pages/table-bord/table-bord.component';
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/incidents.component';
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
import { PageSignUpAdminComponent } from './pages/page-sign-up-admin/page-sign-up-admin.component';

const routes: Routes = [
  {
    path: 'login',
    component: PageLoginComponent
  },
  {
    path: 'signUpAdmin',
    component: PageSignUpAdminComponent
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
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'displayAllIncident',
        component: PageAllIncidentsComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'nonAffecte',
        component: PageNonAffecteComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'displayAllUser',
        component: PageAllUtilisateursComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'displayAllRoles',
        component: PageRoleComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'displayAllClients',
        component: PageAllClientsComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'displayAllDegrees',
        component: PageAllDegreeComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'displayAllOrgExternes',
        component: PageAllOrgExterneComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'displayAllTypesCas',
        component: PageAllTypesCasComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'incidentLocation',
        component: MapComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
      },
      {
        path: 'detailsIncident',
        component: AfficherIncidentComponent,
        canActivate: [ApplicationGuardService],
        data: { roles: ['ADMIN', 'USER', 'RESPONSABLE'] }
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
