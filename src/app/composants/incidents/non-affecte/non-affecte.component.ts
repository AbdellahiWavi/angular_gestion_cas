import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import { IncidentUpdateStatus } from '../../../../gs-api/incident/incidentUpdateStatus';
import { Status } from '../status';
import type * as dt from 'datatables.net';

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

  id: number | null = null;
  successMsg: string | string[] | null = '';
  incidents: Incident[] = [];

  newStatus: string | null = null;
  incident: Incident = { status: '' };
  incidentUpdateStatus: IncidentUpdateStatus = {};

  statusOptions = Object.entries(Status).map(([value, label]) => ({ value, label }));
  dtTrigger: Subject<any> = new Subject();
  dtoptions: Config = {};

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private incidentService: ServiceIncidentService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(message => {
      if (message) {
        this.successMsg = message;
      }
    });

    this.dtoptions = { ...this.dataTableConfig.dtOptionsConfig() };
    this.getIncidents();
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incidents: Incident[]) => {
        const incidentsNonAffecte = this.incidentNonAffecte(incidents);
        this.incidents = this.disableIncident(incidentsNonAffecte);

        if (this.dtElement?.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });
        } else {
          this.dtTrigger.next(null);
        }
      },
      error: error => alert(error.message)
    });
  }

  canHide(idOrStatus: number | Incident, target: string): void {
    if (typeof idOrStatus === 'number') {
      this.id = idOrStatus;
    } else if (idOrStatus && typeof idOrStatus === 'object') {
      this.newStatus = idOrStatus.status ?? null;

      if (idOrStatus.id != null) {
        this.incidentUpdateStatus.id = idOrStatus.id;
      } else {
        console.warn('Incident without ID:', idOrStatus);
        return;
      }

      this.incident = idOrStatus; // Pour mise à jour de message utilisateur plus tard
    }

    this.triggerModal(target);
  }

  private triggerModal(target: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `#${target}`);
    document.querySelector('.row')?.appendChild(button);
    button.click();
    button.remove();
  }

  updateStatus(): void {
    document.getElementById('update-close')?.click();

    const selectedStatus = this.statusOptions.find(s => s.label === this.newStatus);
    if (selectedStatus) {
      this.incidentUpdateStatus = {
        ...this.incidentUpdateStatus,
        status: selectedStatus.value
      };

      this.incidentService.updateStatus(this.incidentUpdateStatus).subscribe({
        next: () => {
          const username = this.incident?.client?.username ?? '[client inconnu]';
          const status = this.incident?.status ?? '[statut inconnu]';
          this.messageService.setMessage(`Le statut de l'incident posté par le client '${username}' a bien été '${status}'`);
          this.getIncidents();
        },
        error: error => alert(error.message),
        complete: () => console.log("Incident après modification:", this.incident),
      });
    }
  }

  hideIncident(): void {
    document.getElementById('close')?.click();

    if (this.id != null) {
      this.incidentService.updateIsActive(this.id).subscribe({
        next: () => {
          this.successMsg = "L'incident a bien été désactivé.";
          this.getIncidents();
        },
        error: error => alert(error.message)
      });
    }
  }

  resetForm(): void {
    this.incident = { status: '' };
  }

  disableIncident(incidents: Incident[]): Incident[] {
    return incidents.filter(incident => incident.active);
  }

  incidentNonAffecte(incidents: Incident[]): Incident[] {
    return this.incidents.filter(incident => incident.typeCas?.destination?.name?.toUpperCase() === 'AUCUNE CORRESPONDACE');
  }

  isArray<T>(value: any): value is T[] {
    return Array.isArray(value);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
