import { Component, OnInit } from '@angular/core';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { Role } from '../../../../gs-api/roles/role';
import { Router } from '@angular/router';
import { Gestionnaire } from '../../../../gs-api/gestionnaire/gestionnaire';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'app-update-utilisateur',
  standalone: false,
  templateUrl: './update-utilisateur.component.html',
  styleUrl: './update-utilisateur.component.css'
})
export class UpdateUtilisateurComponent implements OnInit {
  title = 'Mettre à jour role et profile';
  successMsg: string[] = [];
  roles: Role[] = [];
  gestionnaire: Gestionnaire = {
    roles: [
      {}
    ]
  }

  constructor (
    private userRole: WithRoleService,
    private userService: GsServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}
  
  ngOnInit(): void {
    const state = history.state || this.router.getCurrentNavigation()?.extras?.state;
    
    if (!state?.userData) {
      this.router.navigate(['/displayAllUser']);
      return;
    }
    
    this.gestionnaire = state.userData;
    this.successMsg = this.gestionnaire.roles.map(role => 
      `Le role '${role.role}' et profile '${role.profile}' sont modifiés`
    );
    this.getRoles();
  }
  
  getRoles(): void {
    this.userRole.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
      },
      error: error => {
        alert(error.message);
      }
    });
  }
  
  updateRoleUser() {
    this.userService.updateUser(this.gestionnaire).subscribe({
      next: () => {
        this.gestionnaire.roles.forEach((role,index) => {
          this.messageService.addMessage([...this.successMsg][index] + " aux role '" + role.role +"' et profile '" + role.profile + "'");
        });
        this.router.navigate(['/displayAllUser']);
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  compareRoles(currentRole: Role, role: Role): boolean {
    // Si l'un de ce role est nulle ou indefinie pas besoin d'aller loin
    if (!currentRole || !role) return false;
    
    return currentRole?.id === role?.id;
  }

}