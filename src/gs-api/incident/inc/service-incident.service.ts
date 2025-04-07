import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '../incident';

@Injectable({
  providedIn: 'root'
})
export class ServiceIncidentService {

  private apiServiceUrl = '';

  constructor(
    private http: HttpClient
  ) { }

  getIncidents(): Observable<Incident[]> {
    return this.http.get<Incident[]>(`${(this.apiServiceUrl)}/incident/all`);
  }

  updateIncident(IncidentStatus: string): Observable<Incident> {
    return this.http.patch<Incident>(`${(this.apiServiceUrl)}/incident/update`, IncidentStatus);
  }

  deleteIncident(IncidentId: number): Observable<void> {
    return this.http.delete<void>(`${(this.apiServiceUrl)}/incident/delete/${IncidentId}`);
  }
}
