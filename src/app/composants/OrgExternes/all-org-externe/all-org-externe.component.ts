import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { OrgExterneService } from '../../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { OrgExterne } from '../../../../gs-api/OrganismeExternes/OrgExterne';

@Component({
  selector: 'all-org-externe',
  standalone: false,
  templateUrl: './all-org-externe.component.html',
  styleUrl: './all-org-externe.component.css'
})
export class AllOrgExterneComponent {
  title = 'Tableau des Organismes Externes';
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  successMessage: string | string[] | null = '';
  errorMessage = '';

  orgExternes: OrgExterne[] = [];
  
  constructor (
    private OrgExterneService: OrgExterneService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) {}
  
  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getOrgExternes();
  }

  getOrgExternes(): void {
    this.OrgExterneService.getOrgExternes().subscribe({
      next: (orgExternes: OrgExterne[]) => {
        this.orgExternes = orgExternes;
        this.dtTrigger.next(null);
      },
      error: error => {
        alert(error.message);
      }
    })
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
