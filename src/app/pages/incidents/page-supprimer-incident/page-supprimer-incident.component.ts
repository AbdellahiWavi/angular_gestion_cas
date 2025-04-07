import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-supprimer-incident',
  standalone: false,
  templateUrl: './page-supprimer-incident.component.html',
  styleUrl: './page-supprimer-incident.component.css'
})
export class PageSupprimerIncidentComponent {

constructor (
  private router: Router
) { }

// TODO 
delete() {
  this.router.navigate(['delete']);
}

}
