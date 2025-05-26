import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  errorMsg: string[] = [];

  eye = faEye;
  pen = faPen;
  trash = faTrash;

  id!: number;
  gestionnaires: Gestionnaire[] = [];
  gestionnaire: Gestionnaire = {};
  roles: Role[] = [];
  tempRoles: Role[] = [];


  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private gestionnaireService: GsServiceService,
    private roleService: WithRoleService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        if (message) this.successMsg = message;
        setTimeout(() => {
          this.successMsg = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getUsers();
    this.getRoles();
  }

  getUsers(): void {
    this.gestionnaireService.getUsers().subscribe({
      next: (response: Gestionnaire[]) => {
        this.gestionnaires = this.disableIncident(response);

        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });
        } else {
          this.dtTrigger.next(null);
        }
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors du chargement des utilisateurs."];
      }
    });
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors du chargement des rôles."];
      }
    });
  }

  addUser(): void {
    this.errorMsg = [];

    const { email, password, username, roles } = this.gestionnaire;

    if (!email?.trim()) this.errorMsg.push("L'email ne peut pas être vide !");
    if (!this.isValidEmail(email || '')) this.errorMsg.push("Veuillez saisir un e-mail valide.");
    if (!username?.trim()) this.errorMsg.push("Le nom d'utilisateur ne peut pas être vide !");
    if (!password?.trim()) this.errorMsg.push("Le mot de passe ne peut pas être vide !");
    if (!roles || !roles.length || !this.hasValidRoles()) this.errorMsg.push("Veuillez choisir au moins un rôle.");

    if (this.errorMsg.length > 0) return;

    this.gestionnaireService.addUser(this.gestionnaire).subscribe({
      next: () => {
        this.messageService.setMessage(`L'utilisateur '${username}' a été créé avec succès.`);
        this.getUsers();
        document.getElementById('add-close')?.click();
        this.resetForm();
      },
      error: () => {
        this.errorMsg.push("Erreur lors de la création de l'utilisateur.");
        this.resetForm();
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  updateRoleUser(): void {
    this.gestionnaire.roles = this.tempRoles.map(role => ({ ...role }));
    document.getElementById('update-close')?.click();

    if (!this.gestionnaire.roles) return;

    const messages = this.gestionnaire.roles.map(
      role => `Le rôle '${role.role}' et le profil '${role.profile}' ont été modifiés.`
    );

    this.successMsg = messages;

    this.gestionnaireService.updateUser(this.gestionnaire).subscribe({
      next: () => {
        //this.messageService.addMessage(messages);
        this.getUsers();
        this.resetForm();
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors de la mise à jour de l'utilisateur."];
      }
    });
  }

  hideUser(): void {
    document.getElementById('close')?.click();

    this.gestionnaireService.disableUser(this.id).subscribe({
      next: () => {
        this.successMsg = "L'utilisateur a bien été supprimé.";
        this.getUsers();
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors de la suppression de l'utilisateur."];
      }
    });
  }

  canHide(idOrUser: number | Gestionnaire, target: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `#${target}`);
    document.querySelector('.row')?.appendChild(button);
    button.click();
    button.remove();

    if (typeof idOrUser === 'number') {
      this.id = idOrUser;
    } else {
      this.gestionnaire = { ...idOrUser }; // copie défensive
      this.tempRoles = idOrUser.roles ? idOrUser.roles.map(role => ({ ...role })) : [];
    }
  }

  disableIncident(users: Gestionnaire[]): Gestionnaire[] {
    return users.filter(gestionnaire => gestionnaire.active);
  }

  resetForm(): void {
    this.gestionnaire = {
      username: '',
      email: '',
      password: '',
      roles: [{}]
    };
    this.errorMsg = [];
  }

  hasValidRoles(): boolean {
    return Array.isArray(this.gestionnaire.roles) &&
      this.gestionnaire.roles.some(role => role && Object.keys(role).length > 0);
  }

  compareRoles(currentRole: Role, role: Role): boolean {
    return currentRole?.id === role?.id;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

