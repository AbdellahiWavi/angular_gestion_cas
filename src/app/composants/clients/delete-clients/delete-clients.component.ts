import { Component } from '@angular/core';
import { ServiceClientService } from '../../../../gs-api/client/cls/service-client.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';
import { Client } from '../../../../gs-api/client/client';

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
  statusOk: boolean = true;
  client: Client = {};
  
  constructor (
    private clientService: ServiceClientService,
    private router: Router,
    private messageService: MessageService
  ) { }

  delete() {
    // Verifier que l'id est définie
    if (!this.id) {
      this.errorMessage = "Aucun ID n'a été donnée, Veuillez fournir un ID";
      return;
    }
    this.clientService.deleteClient(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("le client '" + this.client.username + "' a bien été supprimer");
        this.router.navigate(['/displayAllClients']);         
      },
      error: () => {
        this.errorMessage = "Aucun client dans la BDD avec l'id: '" + this.id + "'";
      }
    });
  } 

}