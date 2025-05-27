import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  id: number | null = null;

  successMessage: string | string[] | null = '';
  errorMessage = '';
  clients: Client[] = [];

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;

  constructor(
    private clientService: ServiceClientService,
    private renderer: Renderer2,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.dtoptions.columns = [
      { data: 'id', title: 'ID' },
      { data: 'username', title: 'Nom complet' },
      { data: 'tel', title: 'Numéro telephone' },
      {
        data: null,
        title: 'Actions',
        orderable: false,
        render: (data: any, type: any, row: any) => `
              <div class="row">
                <div class="col-4"></div>
                <div class="col-4">
                  <a class="action-delete" data-id="${row.id}">
                    <i class="fas fa-trash" style="color: rgb(255, 72, 48);"></i>
                  </a>
                </div>
                <div class="col-4"></div>
              </div>`
      }
    ]

    this.messageService.currentMessage.subscribe(message => {
      if (message) {
        this.successMessage = message;
        // Efface le message automatiquement après 4s
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.getClients();
  }

  getClients(): void {
    // Fetch data from service
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = this.deactvateClient(data);
        // Update DataTable after data is fetched
        this.updateTable();
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
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
            this.canHide(Number(id), 'disableClientModal');
          }
        });
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.clients); // Add new data
      dtInstance.draw(); // Redraw table
    });
  }

  canHide(id: number, target: string): void {
    this.id = id;

    // Meilleure gestion de l'ouverture du modal (utilise Bootstrap JS ou autre méthode Angular si possible)
    const modalTrigger = document.createElement('button');
    modalTrigger.type = 'button';
    modalTrigger.style.display = 'none';
    modalTrigger.setAttribute('data-bs-toggle', 'modal');
    modalTrigger.setAttribute('data-bs-target', `#${target}`);
    document.body.appendChild(modalTrigger);
    modalTrigger.click();
    modalTrigger.remove();
  }

  hideIncident(): void {
    document.getElementById('close')?.click();

    this.clientService.disableClient(this.id!).subscribe({
      next: () => {
        this.successMessage = "Le client a bien été désactivé.";
        this.getClients();
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