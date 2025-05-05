import { Component } from '@angular/core';
import { ServiceLoginService } from '../../services/user/login/service-login.service';
import { AuthenticationRequest } from '../../services/user/authenticationRequest';
import { Router } from '@angular/router';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'app-page-login',
  standalone: false,
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginComponent {

  errorMsg = '';
  authenticationRequest: AuthenticationRequest = {};
  
  constructor (
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
    this.loginService.login(this.authenticationRequest).subscribe({
      next: (data) => {
        this.loginService.setConnectedUser(data);
        this.router.navigate(['tableBord']);
      },
      error: (error) => {
        this.errorMsg = "Login et / ou mot de passe incorrecte";
        if (error.error.error === 'Erreur interne') {
          this.errorMsg = error.error.message;
        }
      }
    });
  }
}
