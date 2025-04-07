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
  
  errorMsg = '';

  gestionnaire: Gestionnaire = {
    roles: [
      {}
    ]
  };
  
  roles: Role[] = [];
  
  constructor (
    private userService: GsServiceService,
    private role: WithRoleService,
    private router: Router,
    private messageService: MessageService
  ) { }
  
  ngOnInit(): void {
    this.getRoles();
  }
  
  
  
  getRoles(): void {
    this.role.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: error => {
        alert(error);
      }
    });
  }
  
  addUser(): void {
    this.userService.addUser(this.gestionnaire).subscribe({
      next: () => {
        this.messageService.setMessage("L'utilisateur '" + this.gestionnaire.username + "' a bien été créer")
        this.router.navigate(['/displayAllUser']);
      },
      error: () => {
        this.errorMsg = "Il y a une erreur de création de l'utilisateur";
      }
    })
  }

}
