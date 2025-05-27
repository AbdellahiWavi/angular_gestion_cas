import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { data } from 'jquery';

@Component({
  selector: 'all-utilisateurs',
  standalone: false,
  templateUrl: './all-utilisateurs.component.html',
  styleUrls: ['./all-utilisateurs.component.css']
})
export class AllUtilisateursComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Tableau des utilisateurs';
  successMsg: string | string[] | null = '';
  errorMsg: string[] = [];

  id: number | null = null;
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
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.dtoptions.columns = [
      { data: 'id', title: 'ID' },
      { data: 'username', title: 'Nom complet' },
      { data: 'email', title: 'E-mail' },
      {
        data: 'roles',
        title: 'Roles et Profils',
        render: (data: any, type: any, row: any) => {
          if (Array.isArray(data)) {
            return data.map((r: any) => `${r.role}-${r.profile}`).join(', ');
          }
          return '';
        }
      },
      {
        data: null,
        title: 'Actions',
        orderable: false,
        render: (data: any, type: any, row: any) => `
                <div class="row">
                  <div class="col-6">
                    <a class="action-update" data-id="${row.id}">
                      <i class="fas fa-pen" style="color: rgb(86, 239, 96);"></i>
                    </a>
                  </div>
                  <div class="col-6">
                    <a class="action-delete" data-id="${row.id}">
                      <i class="fas fa-trash" style="color: rgb(255, 72, 48);"></i>
                    </a>
                  </div>
                </div>`
      }
    ];
    this.messageService.currentMessage.subscribe({
      next: message => {
        if (message) this.successMsg = message;
        setTimeout(() => {
          this.successMsg = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.getUsers();
    this.getRoles();
  }

  getUsers(): void {
    this.gestionnaireService.getUsers().subscribe({
      next: (response: Gestionnaire[]) => {
        this.gestionnaires = this.disableIncident(response);
        this.updateTable();
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors du chargement des utilisateurs."];
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.gestionnaires); // Add new data
      dtInstance.draw(); // Redraw table
    });
  }

  ngAfterViewInit(): void {
    // Trigger initial DataTable rendering
    this.dtTrigger.next(null);

    // Bind action events using Angular Renderer2
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      const tableElement = document.querySelector('#dataTable');
      if (tableElement) {
        // Handle update action
        this.renderer.listen(tableElement, 'click', (event: { target: HTMLElement; }) => {
          const target = event.target as HTMLElement;
          if (target.closest('.action-delete')) {
            const id = target.closest('.action-delete')?.getAttribute('data-id');
            this.canHide(Number(id), 'hideIncident');
          }
          if (target.closest('.action-update')) {
            const id = target.closest('.action-update')?.getAttribute('data-id');
            this.canHide(Number(id), 'updateRoleModal');
          }
        });
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
        this.resetForm();
        this.getUsers();
        document.getElementById('add-close')?.click();
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
        this.resetForm();
        this.getUsers();
      },
      error: error => {
        this.errorMsg = [error.error?.message || "Erreur lors de la mise à jour de l'utilisateur."];
      }
    });
  }

  hideUser(): void {
    document.getElementById('close')?.click();

    this.gestionnaireService.disableUser(this.id!).subscribe({
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
    return users.filter(g => g.active);
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

