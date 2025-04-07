import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-supprimer-incident',
  standalone: false,
  templateUrl: './supprimer-incident.component.html',
  styleUrl: './supprimer-incident.component.css'
})
export class SupprimerIncidentComponent implements OnInit {
  title = 'Supprimer incident';

  @Output()
  clickEvent = new EventEmitter();
  
  ngOnInit(): void {
    
  }

  delete() {
    this.clickEvent.emit();
  }
}
