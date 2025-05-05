import { Component } from '@angular/core';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'update-role',
  standalone: false,
  templateUrl: './update-role.component.html',
  styleUrl: './update-role.component.css'
})
export class UpdateRoleComponent {

  title = "Supprimer role";
  errorMessage = '';
  id?: number;
  target = 'deleteRole';
  labelledby = 'deleteRoleLabel';
  
  constructor (
    private roleService: WithRoleService,
    private router: Router,
    private messageService: MessageService
  ) {}

  canDelete(): void {
    if (!this.id) {
      this.errorMessage = "Aucun ID n'a été donnée, Veuillez fournir un ID";
      return;
    } else {
      const div = document.querySelector('.row');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#' + this.target);
      div?.appendChild(button);
      button.click();
    }
  }


  delete(): void {
    document.getElementById('close')?.click();

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
