import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-incidents',
  standalone: false,
  templateUrl: './all-incidents.component.html',
  styleUrl: './all-incidents.component.css'
})
export class AllIncidentsComponent implements OnInit {

  title = 'Tableau des incidents';
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  id!: number;
  successMsg: string | string[] | null = '';
  target = 'hideIncident';
  labelledby = 'hideIncidentLabel';

  dtoptions: Config = {};
  incidents: Incident[] = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private incidentService: ServiceIncidentService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(
      message => {
        if (message)  {
          this.successMsg = message;
        }
      }
    );
    this.dtoptions = {
      ...this.dataTableConfig.dtOptionsConfig()
    };
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incident: Incident[]) => {
        this.incidents = incident;
        this.incidents = this.incidentNonAnnule();
        this.dtTrigger.next(null);
      },
      error: error => {
        alert(error.message);
      }
    })
  }

  canHide(id: number): void {
      const div = document.querySelector('.row');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#' + this.target);
      div?.appendChild(button);
      button.click();
      this.id = id;
  }

  
  hideIncident(): void {
    document.getElementById('close')?.click();

    this.incidentService.updateIsActive(this.id).subscribe({
      next: () => {
        this.incidents = this.incidentNonAnnule();
        this.successMsg = "l'incident est bien été désactiver";
        this.getIncidents();
      }, error: error => {
        alert(error.message);
      }
    });
  }
  
  incidentNonAnnule(): Incident[] {
    return this.incidents.filter(incident => incident.active);
  }
  
  isArray<T>(value: any): value is T[] {
    return Array.isArray(value);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  
}
