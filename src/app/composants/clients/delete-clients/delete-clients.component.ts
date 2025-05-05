import { Component } from '@angular/core';
import { ServiceClientService } from '../../../../gs-api/client/cls/service-client.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'delete-clients',
  standalone: false,
  templateUrl: './delete-clients.component.html',
  styleUrl: './delete-clients.component.css'
})
export class DeleteClientsComponent {

  title = "Supprimer client";
  errorMessage = '';
  id?: number;
  target = 'deleteClient';
  labelledby = 'deleteClientLabel';
  
  constructor (
    private clientService: ServiceClientService,
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

    this.clientService.deleteClient(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("le client avec l'id '" + this.id + "' a bien été supprimer");
        this.router.navigate(['/displayAllClients']);         
      },
      error: () => {
        this.errorMessage = "Aucun client dans la BDD avec l'id '" + this.id + "'";
      }
    });
    
  } 

}