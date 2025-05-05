import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../incident';
import { environment } from '../../../environments/environment';

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

  updateIncident(incident: Incident): Observable<Incident> {
    return this.http.put<Incident>(`${(this.apiServiceUrl)}/incident/update`, incident);
  }

  deleteIncident(IncidentId: number): Observable<void> {
    return this.http.delete<void>(`${(this.apiServiceUrl)}/incident/delete/${IncidentId}`);
  }

  updateIsActive(incidentId: number): Observable<Incident> {
    return this.http.get<Incident>(`${(this.apiServiceUrl)}/incident/isActive/${incidentId}`);
  }
}
