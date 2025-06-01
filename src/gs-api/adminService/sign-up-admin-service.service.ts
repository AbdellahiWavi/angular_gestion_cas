import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Gestionnaire } from '../gestionnaire/gestionnaire';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpAdminServiceService {
  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient
  ) { }

  signUpAdmin(admin: Gestionnaire): Observable<void> {
    return this.http.post<void>(`${this.gestionCasApi}/gestionnaire/add`, admin);
  }

}
