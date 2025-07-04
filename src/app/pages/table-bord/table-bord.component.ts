import { Component, OnInit } from '@angular/core';
import { faExclamation, faInfo, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ServiceClientService } from '../../../gs-api/client/cls/service-client.service';
import { ServiceIncidentService } from '../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../gs-api/incident/incident';
import { Client } from '../../../gs-api/client/client';
import { MessageService } from '../../services/messages-service/message.service';
import { Observable } from 'rxjs';
import { ChartConfiguration } from 'chart.js';
import { Role } from '../../../gs-api/roles/role';
import { getCurrentUser } from '../../services/fonctionUtils/get-current-user';
import { GsServiceService } from '../../../gs-api/gestionnaire/ges/gs-service.service';

@Component({
  selector: 'app-table-bord',
  standalone: false,
  templateUrl: './table-bord.component.html',
  styleUrl: './table-bord.component.css'
})
export class TableBordComponent implements OnInit {

  title = 'Tableau de bord';
  singalerIncidentOrClientToDay!: string | string[];

  faUserPlus = faUserPlus;
  faExclamation = faExclamation;
  faInfo = faInfo;

  nbClient = 0;
  nbIncident = 0;
  nbIncidentToDay = 0;
  nbIncidentNonAffecte = 0;
  nbClientToDay = 0;
  sub: any;
  newData: Incident[] = [];
  incident: Incident[] = [];
  client: Client[] = [];
  filteredIncidents: Incident[] = []
  filteredClients: Client[] = []
  lineChartData?: ChartConfiguration<'line'>['data'];
  roles: Role[] = [];

  constructor(
    private clientService: ServiceClientService,
    private incidentService: ServiceIncidentService,
    private messageService: MessageService,
    private gestionnaireService: GsServiceService
  ) { }

  ngOnInit(): void {
    this.getGestionnaire();
    this.incidentService.getIncidents().subscribe({
      next: incidents => {
        this.incident = incidents.filter(i => i.active);

        this.handleData<Client>(
          this.clientService.getClients(),
          'client',
          (count) => this.nbClient = count,
          (count) => this.nbClientToDay = count
        );

        this.handleData<Incident>(
          this.incidentService.getIncidents(),
          'incident',
          (count) => this.nbIncident = count,
          (count) => this.nbIncidentToDay = count,
          (incident) => {
            if (incident.typeCas?.type === 'Non Affecte') {
              this.nbIncidentNonAffecte += 1;
            }
          }
        );
      }, error: err => alert(err.message)
    });

    this.sub = this.messageService.currentMessageDashboard
      .subscribe(message => {
        this.singalerIncidentOrClientToDay = message;
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

  private handleData<T extends { dateCreation?: Date }>(
    observable$: Observable<T[]>,
    type: 'client' | 'incident',
    setTotalCount: (count: number) => void,
    setTodayCount: (count: number) => void,
    extraLogic?: (item: T) => void
  ): void {
    observable$.subscribe({
      next: data => {
        let newData = this.disableIncidentOrClient(data) as T[];
        if (type === 'incident') {
          //this.incident = data as Incident[];
          this.filteredIncidents = newData as Incident[];
          this.updateChart();
        } else {
          this.client = data as unknown as Client[];
          this.filteredClients = newData as unknown as Client[];
        }
        this.newData = newData as Incident[];

        const today = new Date().toISOString().split('T')[0];
        let todayCount = 0;

        setTotalCount(newData.length);

        newData.forEach(item => {
          if (extraLogic) extraLogic(item);
          const date = new Date(item.dateCreation!).toISOString().split('T')[0];
          if (date === today) {
            todayCount++;
          }
        });

        setTodayCount(todayCount);

        if (todayCount > 0) {
          this.messageService.addMessage(
            `Il y a ${todayCount} nouveau${todayCount > 1 ? 'x' : ''} ${type}${todayCount > 1 ? 's' : ''}`
          );
        }
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  disableIncidentOrClient(incidentOrClient: Incident[] | Client[]): (Incident | Client)[] {
    const isAdmin = this.roles.some(role => role.role?.toUpperCase() === "ADMIN");
    const userProfiles = this.roles.map(role => role.profile);

    if (incidentOrClient.length === 0) return [];

    // Cas des incidents
    if ('typeCas' in incidentOrClient[0]) {
      const incidents = incidentOrClient as Incident[];
      return incidents.filter(i =>
        i.active && (isAdmin || userProfiles.includes(i.typeCas?.destination?.name ?? ''))
      );
    }

    // Cas des clients
    if ('username' in incidentOrClient[0]) {
      const clients = incidentOrClient as Client[];

      if (isAdmin) {
        return clients.filter(c => c.active);
      }

      // Tu dois avoir déjà stocké les incidents avant d'appeler cette méthode
      const allIncidents: Incident[] = this.incident ?? [];

      const relevantClientIds = new Set(
        allIncidents
          .filter(i =>
            i.active && userProfiles.includes(i.typeCas?.destination?.name ?? '')
          )
          .map(i => i.client?.id)
      );

      return clients.filter(c => c.active && relevantClientIds.has(c.id));
    }

    return [];
  }

  updateChart() {
    this.lineChartData = {
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      datasets: [
        {
          data: this.getIncidentCountByDay(),
          label: 'Incidents signalés',
          fill: true,
          tension: 0.3,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          pointBackgroundColor: '#007bff',
          pointBorderColor: '#fff',
        }
      ]
    }
  }

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#666'
        }
      },
      y: {
        ticks: {
          color: '#666'
        }
      }
    }
  };

  lineChartLabels = this.lineChartData?.labels;

  getIncidentCountByDay(): number[] {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    // Initialiser le compteur pour chaque jour
    const counts: Record<string, number> = {
      Lun: 0,
      Mar: 0,
      Mer: 0,
      Jeu: 0,
      Ven: 0,
      Sam: 0,
      Dim: 0,
    };

    for (const incident of this.filteredIncidents) {
      const date = new Date(incident.dateCreation!);
      const dayIndex = date.getDay(); // 0=Dim, 1=Lun, ..., 6=Sam

      // Convertir index JS → label français
      const dayMap = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      const day = dayMap[dayIndex];

      if (counts[day] !== undefined) {
        counts[day]++;
      }
    }

    // Retourner les valeurs dans l’ordre des labels
    return days.map((d) => counts[d]);
  }


}
