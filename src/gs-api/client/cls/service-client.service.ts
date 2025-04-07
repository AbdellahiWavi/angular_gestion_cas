import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../client'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceClientService {

  private readonly apiServiceUrl = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServiceUrl}/client/all`);
  }

  deleteClient(ClientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/client/delete/${ClientId}`);
  }

}
