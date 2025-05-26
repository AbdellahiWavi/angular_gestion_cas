import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { Role } from '../../../gs-api/roles/role';
import { WithRoleService } from '../../../gs-api/roles/role-service/with-role.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'all-role',
  standalone: false,
  templateUrl: './all-role.component.html',
  styleUrl: './all-role.component.css'
})
export class AllRoleComponent implements OnInit, OnDestroy {

  title = 'Tableau des rôles';
  successMessage: string | string[] | null = '';
  errorMessage = '';
  eye = faEye;
  pen = faPen;
  trash = faTrash;

  id!: number;

  roles: Role[] = [];
  role: Role = {};

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private roleService: WithRoleService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => {
        this.roles = this.disableRole(response);

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
        console.error("Erreur lors du chargement des rôles :", error);
        this.errorMessage = "Échec du chargement des rôles. Veuillez réessayer plus tard.";
      }
    });
  }

  addRole(): void {
    if (!this.role.role?.trim() || !this.role.profile?.trim()) {
      this.errorMessage = "Le rôle et le profil sont requis.";
      return;
    }

    this.role = {
      ...this.role,
      role: this.role.role?.toUpperCase(),
      profile: this.role.profile?.toUpperCase()
    };

    this.roleService.addRole(this.role).subscribe({
      next: () => {
        this.getRoles();
        this.messageService.setMessage(`Le rôle '${this.role.role}' avec le profil '${this.role.profile}' a bien été ajouté.`);
        document.getElementById('add-close')?.click();
        this.resetForm();
      },
      error: (error) => {
        this.errorMessage = error.error?.message || "Une erreur est survenue lors de l'ajout du rôle.";
      }
    });
  }

  canHide(id: number, target: string): void {
    this.id = id;

    const div = document.querySelector('.row');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#' + target);
    div?.appendChild(button);
    button.click();
    button.remove();
  }

  hideRole(): void {
    document.getElementById('close')?.click();

    this.roleService.disableRole(this.id).subscribe({
      next: () => {
        this.successMessage = "Le rôle a bien été supprimé.";
        this.getRoles();
      },
      error: () => {
        this.errorMessage = "Une erreur est survenue lors de la suppression du rôle.";
      }
    });
  }

  disableRole(roles: Role[]): Role[] {
    return roles.filter(r => r.active);
  }
  resetForm(): void {
    this.role = {
      role: '',
      profile: ''
    };
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}