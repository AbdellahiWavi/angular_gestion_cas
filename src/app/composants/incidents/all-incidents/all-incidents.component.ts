import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { Incident } from '../../../../gs-api/incident/incident';
import { Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../../gs-api/incident/inc/service-incident.service';
import { Status } from '../status';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { IncidentUpdateStatus } from '../../../../gs-api/incident/incidentUpdateStatus';
import { Router } from '@angular/router';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';
import { getCurrentUser } from '../../../services/fonctionUtils/get-current-user';
import { Gestionnaire } from '../../../../gs-api/gestionnaire/gestionnaire';
import { Role } from '../../../../gs-api/roles/role';

@Component({
  selector: 'app-all-incidents',
  standalone: false,
  templateUrl: './all-incidents.component.html',
  styleUrl: './all-incidents.component.css'
})
export class AllIncidentsComponent implements OnInit, OnDestroy, AfterViewInit {
  
  title = 'Tableau des incidents';
  id: number | null = null;
  successMsg: string | string[] | null = '';
  incidents: Incident[] = [];
  loading = true;

  newStatus: string | null = null;
  incident: Incident = {};
  incidentUpdateStatus: IncidentUpdateStatus = {};
  roles: Role[] = [];

  statusOptions = Object.entries(Status).map(([value, label]) => ({ value, label }));
  dtTrigger: Subject<any> = new Subject();
  dtoptions: Config = {};

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private incidentService: ServiceIncidentService,
    private gestionnaireService: GsServiceService,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig([[0, 'desc']]);
    this.dtoptions.columns = [
        { data: 'id', title: 'ID' },
        { data: 'client.id', title: 'ID Client' },
        {
          data: 'status',
          title: 'Statut',
          render: (data: any) =>
            `<div style="background-color: rgb(203, 247, 203); border-radius: 5px;">${data}</div>`
        },
        { data: 'dateCreation', title: 'Date' },
        { data: 'dernierChEta', title: 'Date changement de status' },
        {
          data: null,
          title: 'Actions',
          orderable: false,
          render: (data: any, type: any, row: any) => `
            <div class="row">
              <div class="col-4">
                <a class="action-update" data-id="${row.id}">
                  <i class="fa-solid fa-pen" style="color: rgb(86, 239, 96);"></i>
                </a>
              </div>
              <div class="col-4">
                <a class="action-view" data-id="${row.id}">
                  <i class="fas fa-eye" style="color: rgb(44, 44, 245);"></i>
                </a>
              </div>
              <div class="col-4">
                <a class="action-delete" data-id="${row.id}">
                  <i class="fas fa-trash" style="color: rgb(255, 72, 48);"></i>
                </a>
              </div>
            </div>`
        }
    ]

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
    this.getGestionnaire();
  }

  getIncidents(): void {
    // Fetch data from service
    this.incidentService.getIncidents().subscribe({
      next: (data) => {
        this.incidents = this.disableIncident(data);
        // Update DataTable after data is fetched
        this.updateTable();
      },
      error: (err) => {
        console.error('Error fetching incidents:', err);
      }
    });
  }

  getGestionnaire(): void {
    const user = getCurrentUser();
    const id = user.id;
    this.gestionnaireService.getUser(id).subscribe({
      next: (gestionnaire) => {
        this.roles = gestionnaire.roles!;
      }
    })
  }

  ngAfterViewInit(): void {
    // Trigger initial DataTable rendering
    this.dtTrigger.next(null);

    // Bind action events using Angular Renderer2
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      const tableElement = document.querySelector('#dataTable');
      if (tableElement) {
        // Handle update action
        this.renderer.listen(tableElement, 'click', (event: { target: HTMLElement; }) => {
          const target = event.target as HTMLElement;
          if (target.closest('.action-update')) {
            const id = target.closest('.action-update')?.getAttribute('data-id');
            const incident = this.incidents.find((inc) => inc.id === Number(id));
            this.canHide(incident!, 'updateStatusModal');
          }
          if (target.closest('.action-view')) {
            const id = target.closest('.action-view')?.getAttribute('data-id');
            this.router.navigate(['/detailsIncident'], { queryParams: { id } });
          }
          if (target.closest('.action-delete')) {
            const id = target.closest('.action-delete')?.getAttribute('data-id');
            this.canHide(Number(id), 'disableUserModal');
          }
        });
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.incidents); // Add new data
      dtInstance.draw(); // Redraw table
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
    const isAdmin = this.roles.some(role => role.role?.toUpperCase() === "ADMIN")
    if (isAdmin) {
      return incidents.filter(i => i.active);
    }

    return incidents.filter(i => 
      i.active && this.roles.some(role => role.profile === i.typeCas?.destination?.name)
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
