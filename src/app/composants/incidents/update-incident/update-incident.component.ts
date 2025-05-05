import { Component, OnInit } from '@angular/core';
import { Status } from '../status';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { MessageService } from '../../../services/messages-service/message.service';

@Component({
  selector: 'app-update-incident',
  standalone: false,
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css'
})
export class UpdateIncidentComponent implements OnInit {
  title = 'Mettre à jour incident';
  id!: number;
  newStatus!: string;
  incident: Incident = {};
  
  statusOptions = Object.entries(Status).map(([value, label]) => ({value, label}));

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private incidentService: ServiceIncidentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.newStatus = String(params.get('status'));    
      if ( this.id === 0 || this.newStatus === '' ) {
        this.router.navigate(['/displayAllIncident']);
      }  
    })
  }

  updateStatus() {
    if (typeof this.id === 'number') {
      this.incidentService.getIncident(this.id).subscribe({
        next: (res: Incident) => {
          res.status = this.newStatus;
          this.incidentService.updateIncident(res).subscribe({
            next: () => {
              this.messageService.setMessage("le status de l'incident qui poster le client ' " + res.client?.username + " ' à bien été '" + res.status + "'")
              this.router.navigate(['/displayAllIncident']);
            },
            error: error => {
              alert(error.message);
            }
          })
      }});
    }
  }



}
