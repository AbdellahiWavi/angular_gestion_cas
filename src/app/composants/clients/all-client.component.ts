import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ServiceClientService } from '../../../gs-api/client/cls/service-client.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';
import { Client } from '../../../gs-api/client/client';

@Component({
  selector: 'all-clients',
  standalone: false,
  templateUrl: './all-client.component.html',
  styleUrl: './all-client.component.css'
})
export class AllClientComponent {

  title = 'Tableau des clients';
  eye = faEye;
  pen = faPen;
  trash = faTrash;
  id!: number;
  target = 'hideClient';
  labelledby = 'hideClientLabel';
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  successMessage: string | string[] | null = '';
  errorMessage = '';

  clients: Client[] = [];

  constructor(
    private clientService: ServiceClientService,
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
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: Client[]) => {
        this.clients = response;
        this.dtTrigger.next(null);
      },
      error: error => {
        alert(error.message);
      }
    })
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

    this.clientService.deleteClient(this.id).subscribe({
      next: () => {
        this.successMessage = "le client a bien été supprimé";
        this.getClients();
      }, error: error => {
        alert(error.message);
      }
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}