import { Component, OnInit } from '@angular/core';
import { Gestionnaire } from '../../../gs-api/gestionnaire/gestionnaire';
import { SignUpAdminServiceService } from '../../../gs-api/adminService/sign-up-admin-service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/messages-service/message.service';
import { ServiceLoginService } from '../../services/user/login/service-login.service';
import { AuthenticationRequest } from '../../services/user/authenticationRequest';

@Component({
  selector: 'app-page-sign-up-admin',
  standalone: false,
  templateUrl: './page-sign-up-admin.component.html',
  styleUrl: './page-sign-up-admin.component.css'
})
export class PageSignUpAdminComponent {
  errorMsg: Array<string> = [];

  gestionnaire: Gestionnaire = {};
  authenticationRequest: AuthenticationRequest = {};

  constructor(
    private adminService: SignUpAdminServiceService,
    private loginService: ServiceLoginService,
    private router: Router,
    private messageService: MessageService
  ) { }

  signUpAdmin(): void {
    this.errorMsg = [];
    if (this.gestionnaire.email && this.gestionnaire.password && this.gestionnaire.username) {
      if (this.isValidEmail(this.gestionnaire.email!)) {
        this.authenticationRequest = {login: this.gestionnaire.email, password: this.gestionnaire.password}
        this.adminService.signUpAdmin(this.gestionnaire).subscribe({
          next: () => {
            this.loginService.login(this.authenticationRequest).subscribe({
              next: (data) => {
                this.loginService.setConnectedUser(data);
                this.messageService.addMessage(`Bienvenu à LISAMA gestionnaire '${this.gestionnaire.username}'`);
                this.router.navigate(['tableBord']);
              }
            });
          },
          error: () => {
            this.errorMsg.push("Il y a une erreur de création de l'utilisateur");
          }
        });
      } else {
        this.errorMsg.push("Veuillez saisir un e-mail valide");
      }
    } else {
      if (!this.gestionnaire.email) {
        this.errorMsg.push("L'email ne peut pas etre vide!");
      }
      if (!this.gestionnaire.password) {
        this.errorMsg.push("Le mot de passe ne peut pas etre vide!");
      }
      if (!this.gestionnaire.username) {
        this.errorMsg.push("Le nom de l'utilisateur ne peut pas etre vide!");
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
