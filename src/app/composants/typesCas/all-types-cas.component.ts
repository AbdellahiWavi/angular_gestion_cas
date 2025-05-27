import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { OrgExterne } from '../../../gs-api/OrganismeExternes/OrgExterne';
import { OrgExterneService } from '../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';
import { TypeCas } from '../../../gs-api/typedecas/typeCas';
import { TypeCasService } from '../../../gs-api/typedecas/typeCas/type-cas.service';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'all-types-cas',
  standalone: false,
  templateUrl: './all-types-cas.component.html',
  styleUrl: './all-types-cas.component.css'
})
export class AllTypesCasComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Tableau des Types de Cas';
  id!: number;
  trash = faTrash;

  successMessage: string | string[] | null = '';
  errorMessage = '';

  typesCas: TypeCas[] = [];
  orgExternes: OrgExterne[] = [];

  typeCas: TypeCas = {
    destination: {}
  };

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private typeCasService: TypeCasService,
    private messageService: MessageService,
    private orgExterneService: OrgExterneService,
    private dataTableConfig: DataTableConfiService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.dtoptions.columns = [
      { data: 'id_cas', title: 'ID' },
      { data: 'type', title: 'Type de cas' },
      { data: 'destination.name', title: 'Organisme externe' },
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
    ];
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 4000);
      }

    });

    this.getTypesCas();
    this.getOrgExternes();
  }

  getTypesCas(): void {
    this.typeCasService.getTypesCas().subscribe({
      next: (typesCas: TypeCas[]) => {
        this.typesCas = this.disableTypeCas(typesCas);
        // Update DataTable after data is fetched
        this.updateTable();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des types de cas.';
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.typesCas); // Add new data
      dtInstance.draw(); // Redraw table
    });
  }

  getOrgExternes(): void {
    this.orgExterneService.getOrgExternes().subscribe({
      next: orgExternes => {
        this.orgExternes = orgExternes;
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des organismes externes.';
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
            this.canHide(Number(id), 'hideTypeCas');
          }
        });
      }
    });
  }

  addTypeCas(): void {
    if (!this.typeCas.type?.trim()) {
      this.errorMessage = 'Le champ "Type" est requis.';
      return;
    }

    if (!this.typeCas.destination.name?.trim()) {
      this.errorMessage = 'Veuillez choisir un organisme.';
      return;
    }

    this.typeCasService.addTypeCas(this.typeCas).subscribe({
      next: () => {
        this.messageService.setMessage(`Le type de cas '${this.typeCas.type}' a bien été ajouté.`);
        this.resetForm();
        this.getTypesCas();
        document.getElementById('add-close')?.click();
      },
      error: error => {
        this.errorMessage = "Erreur lors de l'ajout du type de cas.";
      }
    });
  }

  canHide(id: number, target: string): void {
    this.id = id;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `#${target}`);
    document.querySelector('.row')?.appendChild(button);
    button.click();
    button.remove();
  }

  hideCas(): void {
    document.getElementById('close')?.click();

    this.typeCasService.disableTypeCas(this.id).subscribe({
      next: () => {
        this.successMessage = "Le type de cas a bien été désactivé.";
        this.getTypesCas();
      },
      error: () => {
        this.errorMessage = "Erreur lors de la désactivation.";
      }
    });
  }

  disableTypeCas(typesCas: TypeCas[]): TypeCas[] {
    return typesCas.filter(cas => cas.active);
  }

  resetForm(): void {
    this.typeCas = {
      type: '',
      destination: {}
    };
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}

