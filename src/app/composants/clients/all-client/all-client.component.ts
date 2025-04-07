import { Component } from '@angular/core';
import { Client } from '../../../../gs-api/client/client';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { ServiceClientService } from '../../../../gs-api/client/cls/service-client.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';

@Component({
  selector: 'all-clients',
  standalone: false,
  templateUrl: './all-client.component.html',
  styleUrl: './all-client.component.css'
})
export class AllClientComponent {
  
  title = 'Tableau des clients';
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  successMessage = '';
  errorMessage = '';

  clients: Client[] = [];
  
  constructor (
    private clientService: ServiceClientService,
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
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: Client[]) => {
        this.clients = response;
        this.dtTrigger.next(0);
      },
      error: error => {
        alert(error.message);
      }
    })
  }
}