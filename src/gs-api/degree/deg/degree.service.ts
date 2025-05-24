import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Degree } from '../degree';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DegreeService {
  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getDegrees(): Observable<Degree[]> {
    return this.http.get<Degree[]>(`${this.gestionCasApi}/degree/all`);
  }

  addDegree(user: Degree): Observable<void> {
    return this.http.post<void>(`${this.gestionCasApi}/degree/add`, user);
  }

  updateDegree(degree: Degree): Observable<Degree> {
    return this.http.put<Degree>(`${this.gestionCasApi}/degree/update`, degree);
  }

  deleteDegree(degreeId?: number): Observable<void> {
    return this.http.delete<void>(`${this.gestionCasApi}/degree/delete/${degreeId}`);
  }

  updateIsActive(degreeId: number): Observable<Degree> {
    return this.http.get<Degree>(`${this.gestionCasApi}/degree/isActive/${degreeId}`);
  }
  
}
