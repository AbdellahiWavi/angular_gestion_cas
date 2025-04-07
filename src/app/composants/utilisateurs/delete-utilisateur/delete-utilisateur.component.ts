import { Component } from '@angular/core';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'delete-utilisateur',
  standalone: false,
  templateUrl: './delete-utilisateur.component.html',
  styleUrl: './delete-utilisateur.component.css'
})
export class DeleteUtilisateurComponent {
  
  title = 'Supprimer utilisateur';
  id?: number;
  errorMessage = '';

  constructor (
    private userService: GsServiceService,
    private router: Router,
    private messageService: MessageService
  ) {}


  delete(): void {
    if (!this.id) {
      this.errorMessage = "Aucun ID n'a été donnée, Veuillez fournir un ID";
      return;
    }
    this.userService.deleteUser(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("l'utilisateur avec l'id " + this.id + " est bien été supprimer");
        this.router.navigate(['/displayAllUser']);
      },
      error: () => {
        this.errorMessage = "Aucun utilisateur dans la BDD avec l'ID '" + this.id + "' fournit";
      }
    })
  }

}
