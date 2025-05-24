import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { GsServiceService } from '../../../gs-api/gestionnaire/ges/gs-service.service';
import { Gestionnaire } from '../../../gs-api/gestionnaire/gestionnaire';
import { Role } from '../../../gs-api/roles/role';
import { WithRoleService } from '../../../gs-api/roles/role-service/with-role.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'all-utilisateurs',
  standalone: false,
  templateUrl: './all-utilisateurs.component.html',
  styleUrls: ['./all-utilisateurs.component.css']
})
export class AllUtilisateursComponent implements OnInit, OnDestroy {

  title = 'Tableau des utilisateurs';
  successMsg: string | string[] | null = '';
  errorMsg: Array<string> = [];
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  id!: number;
  gestionnaires: Gestionnaire[] = [];
  gestionnaire: Gestionnaire = {};
  roles: Role[] = [];
  role: Role = {};

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private gestionnaireService: GsServiceService,
    private roleService: WithRoleService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(
      message => {
        if (message) {
          this.successMsg = message;
        }
      }
    );
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getUsers();
    this.getRoles();
  }

  getUsers(): void {
    this.gestionnaireService.getUsers().subscribe({
      next: (response: Gestionnaire[]) => {
        this.gestionnaires = response;

        // Si la DataTable a déjà été initialisée
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
            dtInstance.destroy(); // détruire l'ancienne instance
            this.dtTrigger.next(null); // réinitialiser le trigger
          });
        } else {
          this.dtTrigger.next(null); // Première initialisation
        }
      },
      error: error => {
        alert(error.message);
      }
    })
  }
  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: error => {
        alert(error);
      }
    });
  }

  addUser(): void {
    this.errorMsg = [];
    if (this.gestionnaire.email && this.gestionnaire.password && this.gestionnaire.username && this.gestionnaire.roles) {
      if (this.isValidEmail(this.gestionnaire.email!)) {
        this.gestionnaireService.addUser(this.gestionnaire).subscribe({
          next: () => {
            this.getUsers();
            this.messageService.setMessage("L'utilisateur '" + this.gestionnaire.username + "' est créer avec réussir");
            document.getElementById('add-close')?.click();
          },
          error: () => {
            this.errorMsg.push("Il y a une erreur de création de l'utilisateur");
            this.resetForm();
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

  updateRoleUser() {
    document.getElementById('update-close')?.click();
    this.successMsg = this.gestionnaire.roles!.map(role =>
      `Le role '${role.role}' et profile '${role.profile}' sont modifiés`
    );

    this.gestionnaireService.updateUser(this.gestionnaire).subscribe({
      next: () => {
        this.gestionnaire.roles!.forEach((role, index) => {
          this.messageService.addMessage([this.successMsg][index] + " aux role '" + role.role + "' et profile '" + role.profile + "'");
        });
        this.getUsers();
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  deleteUser(): void {
    document.getElementById('close')?.click();

    this.gestionnaireService.deleteUser(this.id).subscribe({
      next: () => {
        this.successMsg = "l'utilisateur a bien été supprimé";
        this.getUsers();
      }, error: error => {
        alert(error.message);
      }
    });
  }

  canHide(idGestionnaireOrUpdate: number | Gestionnaire, target: string): void {
    const div = document.querySelector('.row');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#' + target);
    div?.appendChild(button);
    button.click();
    button.remove();
    if (typeof idGestionnaireOrUpdate == 'number') {
      this.id = idGestionnaireOrUpdate;
    } else {
      this.gestionnaire = idGestionnaireOrUpdate;
    }
  }

  resetForm() {
    this.gestionnaire = {
      username: '',
      email: '',
      password: '',
      roles: [
        {}
      ]
    };
    this.errorMsg = [];
  }

  hasValidRoles(): boolean {
    return Array.isArray(this.gestionnaire.roles) &&
      this.gestionnaire.roles.some(role => role && Object.keys(role).length > 0);
  }

  isArray<T>(value: any): value is T[] {
    return Array.isArray(value);
  }

  compareRoles(currentRole: Role, role: Role): boolean {
    // Si l'un de ce role est nulle ou indefinie pas besoin d'aller loin
    if (!currentRole || !role) return false;

    return currentRole?.id === role?.id;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
