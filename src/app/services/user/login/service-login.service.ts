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
export class ServiceLoginService implements OnInit{

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
      {withCredentials: true}
    );
  }

  setConnectedUser(authenticationResponse: any): void {
    localStorage.setItem("accessToken", JSON.stringify(authenticationResponse));
  }

  isLoggedUserAndAccessTokenValide(): boolean {
    const token = localStorage.getItem('accessToken');

    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.messageService.setMessage("Dommage! le temps de connection est expirée :(.");
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

  logout(): void {
    this.messageService.setMessage("vous avez déconnecter :(!");
    localStorage.removeItem('accessToken');
  }

}
