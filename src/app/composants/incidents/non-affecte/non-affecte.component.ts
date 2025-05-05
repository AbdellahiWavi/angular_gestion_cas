import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-non-affecte',
  standalone: false,
  templateUrl: './non-affecte.component.html',
  styleUrl: './non-affecte.component.css'
})
export class NonAffecteComponent implements OnInit {

  title = 'Non Affecté';
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  successMsg: string = '';
  id!: number;
  target = 'deleteIncident';
  labelledby = 'deleteIncidentLabel';

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
        if (message && typeof message === 'string') {
          this.successMsg = message;
        }
      }
    );
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incident: Incident[]) => {
        this.incidents = incident;
        this.incidents = this.incidentNonAffecte();
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
        this.successMsg = "l'incident est bien été désactiver / supprimé";
        this.getIncidents();
      }, error: error => {
        alert(error.message);
      }
    });
  }

  incidentNonAffecte(): Incident[] {
    return this.incidents.filter(incident => incident.typeCas?.destination?.name?.toUpperCase() === 'AUCUNE CORRESPONDACE');
  }

  incidentNonAnnule(): Incident[] {
    return this.incidents.filter(incident => incident.active);
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
