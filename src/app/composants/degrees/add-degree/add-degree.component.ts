import { Component } from '@angular/core';
import { Degree } from '../../../../gs-api/degree/degree';
import { DegreeService } from '../../../../gs-api/degree/deg/degree.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-degree',
  standalone: false,
  templateUrl: './add-degree.component.html',
  styleUrl: './add-degree.component.css'
})
export class AddDegreeComponent {
  title = "Ajouter un degree";
  errorMsg = '';
  degrees: Degree = {};

  constructor (
    private degreeService: DegreeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  addDegree(): void {
    // TODO il faut changer cette méthode pour voir comment pouvez vous enregistrer l'attribut type de degree 
    // this.degrees = {
    //   ...this.degrees, // Conserve tout
    //   type_degree: this.degrees.type_degree?.toUpperCase()
    // };
    this.degreeService.addDegree(this.degrees).subscribe({
      next: () => {
        this.messageService.setMessage("Le degree '" + this.degrees.type_degree + "' a bien été ajouter");
        this.router.navigate(['/displayAllDegrees']);
      },
      error: (error) => {
        this.errorMsg = error.error.message;
      }
    })
  }
}
