import { Component } from '@angular/core';
import { ServiceLoginService } from '../../services/user/login/service-login.service';
import { AuthenticationRequest } from '../../services/user/authenticationRequest';
import { Router } from '@angular/router';
import { MessageService } from '../../services/messages-service/message.service';
import { getCurrentUser } from '../../services/fonctionUtils/get-current-user';

@Component({
  selector: 'app-page-login',
  standalone: false,
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginComponent {

  errorMsg = '';
  authenticationRequest: AuthenticationRequest = {};

  constructor(
    private loginService: ServiceLoginService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        if (typeof message === 'string') {
          this.errorMsg = message;
        }
      }
    });
  }

  login() {
    if (this.authenticationRequest.login?.trim() && this.authenticationRequest.password?.trim()) {
      if (this.isValidEmail(this.authenticationRequest.login)) {
        this.loginService.login(this.authenticationRequest).subscribe({
          next: (data) => {
            this.loginService.setConnectedUser(data);
            this.router.navigate(['tableBord']);
          },
          error: () => {
            this.errorMsg = "E-mail ou mot de passe incorrecte";
          }
        });
      } else {
        this.errorMsg = "Veuillez saisir un e-mail valide";
      }
    } else {
      if (!this.authenticationRequest.login && this.authenticationRequest.password) {
        this.errorMsg = "L'e-mail ne peut pas etre vide!";
      }
      else if (this.authenticationRequest.login && !this.authenticationRequest.password) {
        this.errorMsg = "Le mot de passe ne peut pas etre vide!";
      } else {
        this.errorMsg = "Veuillez saisir un e-mail et un mot de passe valide";
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
