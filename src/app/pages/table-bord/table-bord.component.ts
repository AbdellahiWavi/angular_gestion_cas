import { Component, OnInit } from '@angular/core';
import { faExclamation, faInfo, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ServiceClientService } from '../../../gs-api/client/cls/service-client.service';
import { ServiceIncidentService } from '../../../gs-api/incident/inc/service-incident.service';
import { Incident } from '../../../gs-api/incident/incident';
import { Client } from '../../../gs-api/client/client';
import { MessageService } from '../../services/messages-service/message.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table-bord',
  standalone: false,
  templateUrl: './table-bord.component.html',
  styleUrl: './table-bord.component.css'
})
export class TableBordComponent implements OnInit{

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

  constructor (
    private clientService: ServiceClientService,
    private incidentService: ServiceIncidentService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
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
  
    this.sub = this.messageService.currentMessageDashboard
      .subscribe(message => {
        this.singalerIncidentOrClientToDay = message;
      });
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
        const today = new Date().toISOString().split('T')[0];
        let todayCount = 0;
  
        setTotalCount(data.length);
  
        data.forEach(item => {
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
  

}
