import { Component, OnInit } from '@angular/core';
import { GsServiceService } from '../../../gs-api/gestionnaire/ges/gs-service.service';
import { Gestionnaire } from '../../../gs-api/gestionnaire/gestionnaire';
import { Role } from '../../../gs-api/roles/role';
import { WithRoleService } from '../../../gs-api/roles/role-service/with-role.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'page-inscription',
  standalone: false,
  templateUrl: './page-inscription.component.html',
  styleUrl: './page-inscription.component.css'
})
export class PageInscriptionComponent implements OnInit {
  title = "Nouveau utilisateur";
  errorMsg: Array<string> = [];

  gestionnaire: Gestionnaire = {};
  
  roles: Role[] = [];
  
  constructor (
    private userService: GsServiceService,
    private roleService: WithRoleService,
    private router: Router,
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    this.getRoles();
  }
  
  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: error => {
        alert(`erreur du recuperation de gestionnaire: ${error}`);
      }
    });
  }
  
  addUser(): void {
    this.errorMsg = [];
    if (this.gestionnaire.email && this.gestionnaire.password && this.gestionnaire.username && this.gestionnaire.roles) {
      if (this.isValidEmail(this.gestionnaire.email!)) {
        this.userService.addUser(this.gestionnaire).subscribe({
          next: () => {
            this.messageService.setMessage("L'utilisateur '" + this.gestionnaire.username + "' est créer avec réussir")
            this.router.navigate(['/displayAllUser']);
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
      if (!this.gestionnaire.roles) {
        this.errorMsg.push("Veuillez choisir un role!");
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

}
