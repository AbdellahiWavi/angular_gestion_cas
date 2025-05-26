import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ServiceClientService } from '../../../gs-api/client/cls/service-client.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';
import { Client } from '../../../gs-api/client/client';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';

@Component({
  selector: 'all-clients',
  standalone: false,
  templateUrl: './all-client.component.html',
  styleUrl: './all-client.component.css'
})
export class AllClientComponent implements OnInit, OnDestroy {

  title = 'Tableau des clients';
  eye = faEye;
  pen = faPen;
  trash = faTrash;

  id!: number;
  target = 'hideClient';
  labelledby = 'hideClientLabel';

  successMessage: string | string[] | null = '';
  errorMessage = '';
  clients: Client[] = [];

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private clientService: ServiceClientService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        if (message) this.successMessage = message;
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe({
      next: (response: Client[]) => {
        this.clients = this.deactvateClient(response);

        this.refreshDataTable();
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }

  refreshDataTable(): void {
    if (this.dtElement?.dtInstance) {
      this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
        dtInstance.destroy();      // Détruire l'ancienne instance
        this.dtTrigger.next(null); // Déclencher la réinitialisation
      });
    } else {
      this.dtTrigger.next(null); // Première initialisation
    }
  }

  canHide(id: number): void {
    this.id = id;

    // Meilleure gestion de l'ouverture du modal (utilise Bootstrap JS ou autre méthode Angular si possible)
    const modalTrigger = document.createElement('button');
    modalTrigger.type = 'button';
    modalTrigger.style.display = 'none';
    modalTrigger.setAttribute('data-bs-toggle', 'modal');
    modalTrigger.setAttribute('data-bs-target', `#${this.target}`);
    document.body.appendChild(modalTrigger);
    modalTrigger.click();
    modalTrigger.remove();
  }

  hideIncident(): void {
    document.getElementById('close')?.click();

    this.clientService.disableClient(this.id).subscribe({
      next: () => {
        this.successMessage = "Le client a bien été désactivé.";
        this.loadClients();
      },
      error: error => {
        this.errorMessage = error.message;
      }
    });
  }

  deactvateClient(clients: Client[]): Client[] {
    return clients.filter(c => c.active);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}