import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Config } from 'datatables.net';
import { Subscription, Subject } from 'rxjs';
import { ServiceIncidentService } from '../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../gs-api/incident/incident';
import { OrgExterne } from '../../../gs-api/OrganismeExternes/OrgExterne';
import { OrgExterneService } from '../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'app-incident-affecte-org-ext',
  standalone: false,
  templateUrl: './incident-affecte-org-ext.component.html',
  styleUrl: './incident-affecte-org-ext.component.css'
})
export class IncidentAffecteOrgExtComponent {
  orgExt: OrgExterne = {};

  expandedRow: number | null = null;
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  successMsg: string = '';
  id_destination!: number;
  id!: number;
  target = 'hideIncident';
  labelledby = 'hideIncidentLabel';

  dtoptions: Config = {};
  incidents: Incident[] = [];
  orgExts: OrgExterne[] = [];
  subscription: Subscription | undefined;

  title = 'Les incidents Affecter à ' + this.orgExt.name;

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private orgExtService: OrgExterneService,
    private incidentService: ServiceIncidentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(param => {
      this.id_destination = Number(param.get('id'));
    })

    this.messageService.currentMessage.subscribe(
      message => {
        if (message && typeof message === 'string') {
          this.successMsg = message;
        }
      }
    );
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getIncidents();
    this.subscription = this.orgExtService.findOrgExt(this.id_destination).subscribe({
      next: (orgExt: OrgExterne) => {
        this.orgExt = orgExt;
      }, error: err => {
        alert(err.message);
      }
    })
  }

  getIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (incident: Incident[]) => {
        this.incidents = incident;
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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
