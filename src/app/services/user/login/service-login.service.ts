import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../authenticationRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {

  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(authenticationRequest: AuthenticationRequest): Observable<void> {
    return this.http.post<void>(`${(this.gestionCasApi)}/auth/authenticate`, authenticationRequest, 
      {withCredentials: true}
    );
  }

  setConnectedUser(data: any): void {
    localStorage.setItem("connectedUser", JSON.stringify(data));
  }

  isLoggedUserAndAccessTokenValide(): boolean {
    if (localStorage.getItem("connectedUser")) {
      // TODO il faut verifier que le access Token est valide
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

}
