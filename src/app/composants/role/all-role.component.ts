import { Component, OnInit, ViewChild } from '@angular/core';
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
export class AllRoleComponent implements OnInit {

  title = 'Tableau des roles';
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
    private dataTableConfig: DataTableConfiService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getRoles();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => {
        this.roles = response;
        console.log(this.roles);

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
        console.error("Erreur lors du chargement des rôles :", error);
      }
    });
  }

  addRole(): void {
    this.role = {
      ...this.role, // Conserve tout
      role: this.role.role?.toUpperCase(),
      profile: this.role.profile?.toUpperCase()
    };
    this.roleService.addRole(this.role).subscribe({
      next: () => {
        this.getRoles();
        this.messageService.setMessage("Le rôle '" + this.role.role + " et le profil " + this.role.profile + "' sont ajoutés");
        document.getElementById('add-close')?.click();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        this.resetForm();
      }
    })
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

    this.roleService.deleteRole(this.id).subscribe({
      next: () => {
        this.successMessage = "Le rôle a bien été supprimé";
        this.getRoles();
      }, error: () => {
        this.errorMessage = "Un erreur est survenu lors de la suppression"
      }
    });
  }

  resetForm() {
    this.role = {
      role: '',
      profile: ''
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}