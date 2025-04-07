import { Component } from '@angular/core';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { Role } from '../../../../gs-api/roles/role';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'add-role',
  standalone: false,
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent {
  title = "Ajouter role";
  errorMsg = '';
  roles: Role = {};

  constructor (
    private roleService: WithRoleService,
    private messageService: MessageService,
    private router: Router
  ) {}

  addRole(): void {
    this.roles = {
      ...this.roles, // Conserve tout
      role: this.roles.role?.toUpperCase(),
      profile: this.roles.profile?.toUpperCase()
    };
    this.roleService.addRole(this.roles).subscribe({
      next: () => {
        this.messageService.setMessage("La role '" + this.roles.role + "' a bien été rajouter");
        this.router.navigate(['/displayAllRoles']);
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    })
  }

}
