import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../role';

@Injectable({
  providedIn: 'root'
})
export class WithRoleService {

  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.gestionCasApi}/role/all`);
  }

  addRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.gestionCasApi}/role/add`, role);
  }
  
  updateRole(role: Role): Observable<Role> {
    return this.http.put<Role>(`${this.gestionCasApi}/role/update`, role);
  }

  deleteRole(roleId?: number): Observable<void> {
    return this.http.delete<void>(`${this.gestionCasApi}/role/delete/${roleId}`);
  }
  
}
