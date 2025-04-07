import { Component, OnInit } from '@angular/core';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { Role } from '../../../../gs-api/roles/role';
import { Router } from '@angular/router';
import { Gestionnaire } from '../../../../gs-api/gestionnaire/gestionnaire';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';

@Component({
  selector: 'app-update-utilisateur',
  standalone: false,
  templateUrl: './update-utilisateur.component.html',
  styleUrl: './update-utilisateur.component.css'
})
export class UpdateUtilisateurComponent implements OnInit {
  title = 'Mettre à jour utilisateur';
  roles: Role[] = [];
  gestionnaire: Gestionnaire = {
    roles: [
      {}
    ]
  }

  constructor (
    private userRole: WithRoleService,
    private userService: GsServiceService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation?.extras?.state as { userData: any };
      this.gestionnaire = state.userData;
    }
  }
  
  ngOnInit(): void {
    this.getRoles();
  }
  
  getRoles(): void {
    this.userRole.getRoles().subscribe({
      next: roles => {
        this.roles = roles;
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
  updateRoleUser() {
    this.userService.updateUser(this.gestionnaire).subscribe({
      next: (ges) => {
        this.router.navigate(['/displayAllUser']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  compareRoles(role1: Role, role2: Role): boolean {
    // Si l'un de ce role est nulle ou indefinie pas besoin d'aller loin
    if (!role1 || !role2) return false;
    
    return role1?.id === role2?.id;
  }

}