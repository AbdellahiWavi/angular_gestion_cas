import { Component } from '@angular/core';
import { TypeCasService } from '../../../../gs-api/typedecas/typeCas/type-cas.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'delete-type-cas',
  standalone: false,
  templateUrl: './delete-type-cas.component.html',
  styleUrl: './delete-type-cas.component.css'
})
export class DeleteTypeCasComponent {
  title = "Supprimer type de cas";
  errorMessage = '';
  id?: number;
  target = 'deleteTypeCas';
  labelledby = 'deleteTypeCasLabel';
  
  constructor (
    private typeCasService: TypeCasService,
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

    this.typeCasService.deleteTypeCas(this.id).subscribe({
      next: () => {
        this.messageService.setMessage("le type de cas avec l'id '" + this.id + "' a bien été supprimer");
        this.router.navigate(['/displayAllTypesCas']);
      },
      error: () => {
        this.errorMessage = "Aucun type de cas dans la BDD avec l'id '" + this.id + "'";
      }
    });
  } 
}
