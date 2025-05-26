import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../incident';
import { environment } from '../../../environments/environment';
import { IncidentUpdateStatus } from '../incidentUpdateStatus';

@Injectable({
  providedIn: 'root'
})
export class ServiceIncidentService {

  private readonly apiServiceUrl = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${(this.apiServiceUrl)}/incident/all`);
  }

  getIncident(incidentId: number): Observable<Incident> {
    return this.http.get<Incident>(`${(this.apiServiceUrl)}/incident/find/${incidentId}`);
  }

  updateStatus(incident: IncidentUpdateStatus): Observable<void> {
    return this.http.put<void>(`${(this.apiServiceUrl)}/incident/status`, incident);
  }

  deleteIncident(IncidentId: number): Observable<void> {
    return this.http.delete<void>(`${(this.apiServiceUrl)}/incident/delete/${IncidentId}`);
  }

  // TODO modifier cet endpoint pour retourner un void au lieu de incident et aussi pour toutes les approches
  updateIsActive(incidentId: number): Observable<void> {
    return this.http.put<void>(`${(this.apiServiceUrl)}/incident/isActive/${incidentId}`, {});
  }
}
