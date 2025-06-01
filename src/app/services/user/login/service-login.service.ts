import { Injectable, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../authenticationRequest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthenticationResponse } from '../authenticationResponse';
import { MessageService } from '../../messages-service/message.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService implements OnInit {

  private readonly gestionCasApi = environment.gestionCasApi;

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.clearMessages();
  }

  login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      `${(this.gestionCasApi)}/auth/authenticate`, authenticationRequest,
      { withCredentials: true }
    );
  }

  firstLogin(): Observable<boolean> {
    return this.http.get<boolean>(`${(this.gestionCasApi)}/users/exists`);
  }

  setConnectedUser(authenticationResponse: AuthenticationResponse): void {
    localStorage.setItem("userAuth", JSON.stringify(authenticationResponse));
  }

  isLoggedUserAndAccessTokenValide(): boolean {
    const userAuth = localStorage.getItem('userAuth');

    if (!userAuth) {
      this.router.navigate(['/login']);
      return false;
    }

    let authenticationResponse: AuthenticationResponse;

    try {
      authenticationResponse = JSON.parse(userAuth);
    } catch (e) {
      console.error("Erreur de parsing JSON de l'objet userAuth", e);
      localStorage.removeItem('userAuth');
      this.router.navigate(['/login']);
      return false;
    }

    const token = authenticationResponse.accessToken;

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.isTokenExpired(token)) {
      return true;
    }

    this.messageService.setMessage("Le temps de connexion est expiré :(");
    localStorage.removeItem('userAuth');
    this.router.navigate(['/login']);
    return false;
  }



  isTokenExpired(token: string): boolean {
    if (!token) return true;

    const payload = token.split('.')[1];
    if (!payload) return true;

    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);

    return exp < now;
  }

  getUserRole(): string | null {
    let authenticationResponse: AuthenticationResponse;
    let role = '';
    const userAuth = localStorage.getItem('userAuth');
    if (!userAuth) return null;

    authenticationResponse = JSON.parse(
      userAuth as string
    );
    const userRole = authenticationResponse.userInfo.role[0].authority;
    const startIndex = userRole.indexOf("_");
    if (startIndex !== -1) {
      role = userRole.substring(startIndex + 1);
    }

    return role;
  }

  hasRole(allowedRoles: string[]): boolean {
    const role = this.getUserRole();
    return allowedRoles.includes(role ?? '');
  }

  logout(): void {
    this.messageService.setMessage("vous avez déconnecter :(!");
    localStorage.removeItem('userAuth');
  }

}
