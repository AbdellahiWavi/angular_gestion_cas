import { Component } from '@angular/core';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'delete-role',
  standalone: false,
  templateUrl: './delete-role.component.html',
  styleUrl: './delete-role.component.css'
})
export class DeleteRoleComponent {

  title = "Supprimer role";
  errorMessage = '';
  id?: number;
  
  constructor (
    private roleService: WithRoleService,
    private router: Router,
    private messageService: MessageService
  ) { }

  delete() {
    if (this.id === undefined) {
      this.errorMessage = "Aucun ID n'a été donnée, Veuillez fournir un ID";
      return;
    }
    this.roleService.deleteRole(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("le role avec l'id '" + this.id + "' a bien été supprimer");
        this.router.navigate(['/displayAllRoles']);
      },
      error: () => {
        this.errorMessage = "Aucun role dans la BDD avec l'id: '" + this.id + "'";
      }
    });
  } 

}
