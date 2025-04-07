import { Component } from '@angular/core';
import { Role } from '../../../../gs-api/roles/role';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { WithRoleService } from '../../../../gs-api/roles/role-service/with-role.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';

@Component({
  selector: 'all-role',
  standalone: false,
  templateUrl: './all-role.component.html',
  styleUrl: './all-role.component.css'
})
export class AllRoleComponent {
  
  title = 'Tableau des roles';
  successMessage = '';
  errorMessage = '';

  roles: Role[] = [];
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor (
    private roleService: WithRoleService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
  }
  
  ngOnInit(): void {
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

}