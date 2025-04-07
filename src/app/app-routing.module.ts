import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { PageInscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { TableBordComponent } from './pages/table-bord/table-bord.component';
import { PageAllIncidentsComponent } from './pages/incidents/page-all-incidents/incidents.component';
import { PageUpdateIncidentComponent } from './pages/incidents/page-update-incident/page-update-incident.component';
import { PageSupprimerIncidentComponent } from './pages/incidents/page-supprimer-incident/page-supprimer-incident.component';
import { PageNonAffecteComponent } from './pages/incidents/page-non-affecte/page-non-affecte.component';
import { PageAllUtilisateursComponent } from './pages/utilisateurs/page-all-utilisateurs/page-all-utilisateurs.component';
import { PageUpdateUtilisateurComponent } from './pages/utilisateurs/page-update-utilisateur/page-update-utilisateur.component';
import { PageDeleteUtilisateurComponent } from './pages/utilisateurs/page-delete-utilisateur/page-delete-utilisateur.component';
import { ApplicationGuardService } from './services/guard/application-guard.service';
import { PageRoleComponent } from './pages/roles/page-role/page-role.component';
import { PageAddRoleComponent } from './pages/roles/page-add-role/page-add-role.component';
import { PageDeleteRoleComponent } from './pages/roles/page-delete-role/page-delete-role.component';
import { PageAllClientsComponent } from './pages/clients/page-all-clients/page-all-clients.component';
import { PageDeleteClientComponent } from './pages/clients/page-delete-client/page-delete-client.component';

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
    component: PageDashboardComponent,
    canActivate:[ApplicationGuardService],
    children: [
      {
        path: 'table_bord',
        component: TableBordComponent
      },
      {
        path: 'displayAllIncident',
        component: PageAllIncidentsComponent
      },
      {
        path: 'updateIncident',
        component: PageUpdateIncidentComponent
      },
      {
        path: 'deleteIncident',
        component: PageSupprimerIncidentComponent
      },
      {
        path: 'nonAffecte',
        component: PageNonAffecteComponent
      },
      {
        path: 'displayAllUser',
        component: PageAllUtilisateursComponent,
      },
      {
        path: 'updateRole',
        component: PageUpdateUtilisateurComponent
      },
      {
        path: 'deleteUser',
        component: PageDeleteUtilisateurComponent
      },
      {
        path: 'displayAllRoles',
        component: PageRoleComponent
      },
      {
        path: 'addRole',
        component: PageAddRoleComponent
      },
      {
        path: 'deleteRole',
        component: PageDeleteRoleComponent
      },
      {
        path: 'displayAllClients',
        component: PageAllClientsComponent
      },
      {
        path: 'deleteClient',
        component: PageDeleteClientComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
