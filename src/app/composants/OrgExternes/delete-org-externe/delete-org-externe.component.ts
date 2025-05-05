import { Component } from '@angular/core';
import { OrgExterneService } from '../../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'delete-org-externe',
  standalone: false,
  templateUrl: './delete-org-externe.component.html',
  styleUrl: './delete-org-externe.component.css'
})
export class DeleteOrgExterneComponent {
  title = "Supprimer organisme externe";
  errorMessage = '';
  id?: number;
  target = 'deleteOrgExterne';
  labelledby = 'deleteOrgExterneLabel';

  constructor (
    private orgExterneService: OrgExterneService,
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
      button.setAttribute('data-bs-target', "#" + this.target);
      div?.appendChild(button);
      button.click();
    }
  }

  delete(): void {
    document.getElementById('close')?.click();

    this.orgExterneService.deleteOrgExterne(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("l'organisme externe avec l'id '" + this.id + "' a bien été supprimer");
        this.router.navigate(['/displayAllOrgExternes']);
      },
      error: () => {
        this.errorMessage = "Aucun organisme externe dans la BDD avec l'id: '" + this.id + "'";
      }
    });
  } 
}
