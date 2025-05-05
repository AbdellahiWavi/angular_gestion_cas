import { Component } from '@angular/core';
import { Role } from '../../../../gs-api/roles/role';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'all-role',
  standalone: false,
  templateUrl: './all-role.component.html',
  styleUrl: './all-role.component.css'
})
export class AllRoleComponent {

  title = 'Tableau des roles';
  successMessage: string | string[] | null = '';
  errorMessage = '';
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  id!: number;
  target = 'hideIncident';
  labelledby = 'hideIncidentLabel';

  roles: Role[] = [];
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private roleService: WithRoleService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.getRoles();
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
  }

  getRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (response: Role[]) => {
        this.roles = response;
        this.dtTrigger.next(null);
      },
      error: error => {
        alert(error.message);
      }
    })
  }
  updateRole(role?: Role) {
      this.router.navigate(['/updateRoleProfile'], {state: { userData: role }});
    }
  
    canHide(id: number): void {
        const div = document.querySelector('.row');
        const button = document.createElement('button');
        button.type = 'button';
        button.style.display = 'none';
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#' + this.target);
        div?.appendChild(button);
        button.click();
        this.id = id;
    }
  
    
    hideIncident(): void {
      document.getElementById('close')?.click();
  
      this.roleService.deleteRole(this.id).subscribe({
        next: () => {
          this.successMessage = "le role a bien été supprimé";
          this.getRoles();
        }, error: error => {
          alert(error.message);
        }
      });
    }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}