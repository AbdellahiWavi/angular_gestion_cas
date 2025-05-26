import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Status } from '../status';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { IncidentUpdateStatus } from '../../../../gs-api/incident/incidentUpdateStatus';

@Component({
  selector: 'app-all-incidents',
  standalone: false,
  templateUrl: './all-incidents.component.html',
  styleUrl: './all-incidents.component.css'
})
export class AllIncidentsComponent implements OnInit, OnDestroy {
  title = 'Tableau des incidents';
  eye = faEye;
  pen = faPen;
  trash = faTrash;

  id: number | null = null;
  successMsg: string | string[] | null = '';
  incidents: Incident[] = [];
  loading = true;

  newStatus: string | null = null;
  incident: Incident = {};
  incidentUpdateStatus: IncidentUpdateStatus = {};

  statusOptions = Object.entries(Status).map(([value, label]) => ({ value, label }));
  dtTrigger: Subject<any> = new Subject();
  dtoptions: Config = {};

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private incidentService: ServiceIncidentService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig([[0, 'desc']]);

    this.messageService.currentMessage.subscribe(message => {
      if (message) {
        this.successMsg = message;
        // Efface le message automatiquement après 4s
        setTimeout(() => {
          this.successMsg = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.getIncidents();
  }


  getIncidents(): void {
    this.loading = true;
    this.incidentService.getIncidents().subscribe({
      next: (incidents: Incident[]) => {
        const filtered = this.disableIncident(incidents);
        this.reloadDataTable(filtered);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  reloadDataTable(newData: Incident[]) {
    this.incidents= newData;
    if (this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next(null);
      });
    } else {
      this.dtTrigger.next(null);
    }
  }


  canHide(idOrStatus: number | Incident, target: string): void {
    if (typeof idOrStatus === 'number') {
      this.id = idOrStatus;
    } else if (idOrStatus && typeof idOrStatus === 'object') {
      this.newStatus = idOrStatus.status ?? null;

      if (idOrStatus.id != null) {
        this.incidentUpdateStatus.id = idOrStatus.id;
      } else {
        console.warn('Incident sans ID:', idOrStatus);
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
          const status = this.newStatus ?? '[statut inconnu]';
          this.messageService.setMessage(`Le statut de l'incident posté par le client '${username}' a bien été '${status}'`);
          this.getIncidents();
        },
        error: error => alert(error.message)
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

  disableIncident(incidents: Incident[]): Incident[] {
    return incidents.filter(incident => incident.active);;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
