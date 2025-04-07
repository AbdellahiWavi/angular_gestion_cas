import { Component } from '@angular/core';
import { ServiceLoginService } from '../../services/user/login/service-login.service';
import { AuthenticationRequest } from '../../services/user/authenticationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-login',
  standalone: false,
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.css'
})
export class PageLoginComponent {

  messageErreur = '';
  authenticationRequest: AuthenticationRequest = {};
  
  constructor (
    private loginService: ServiceLoginService,
    private router: Router
  ) { }

  login() {
    this.loginService.login(this.authenticationRequest).subscribe({
      next: (data) => {
        this.loginService.setConnectedUser(data);
        this.router.navigate(['table_bord']);
      },
      error: () => {
        this.messageErreur = "Login et / ou mot de passe incorrecte";
      }
    });
  }
}
