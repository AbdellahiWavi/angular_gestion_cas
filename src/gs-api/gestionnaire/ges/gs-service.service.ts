import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Gestionnaire } from '../gestionnaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GsServiceService {

  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<Gestionnaire[]> {
    return this.http.get<Gestionnaire[]>(`${this.gestionCasApi}/gestionnaire/all`);
  }

  addUser(user: Gestionnaire): Observable<void> {
    return this.http.post<void>(`${this.gestionCasApi}/gestionnaire/add`, user);
  }
  
  // TODO implementer une methode pour modifier le role de l'utilisateur
  updateUser(gestionnaire: Gestionnaire): Observable<Gestionnaire> {
    return this.http.put<Gestionnaire>(`${this.gestionCasApi}/gestionnaire/update`, gestionnaire);
  }

  deleteUser(userId?: number): Observable<void> {
    return this.http.delete<void>(`${this.gestionCasApi}/gestionnaire/delete/${userId}`);
  }
  
}

