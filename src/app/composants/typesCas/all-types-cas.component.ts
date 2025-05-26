import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
export class AllTypesCasComponent implements OnInit, OnDestroy {
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
    this.getTypesCas();
    this.getOrgExternes();
  }

  getTypesCas(): void {
    this.typeCasService.getTypesCas().subscribe({
      next: (typesCas: TypeCas[]) => {
        this.typesCas = typesCas;

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
        this.errorMessage = 'Erreur lors du chargement des types de cas.';
      }
    });
  }

  getOrgExternes(): void {
    this.orgExterneService.getOrgExternes().subscribe({
      next: orgExternes => {
        this.orgExternes = orgExternes;
      },
      error: error => {
        this.errorMessage = 'Erreur lors du chargement des organismes externes.';
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
        this.getTypesCas();
        document.getElementById('add-close')?.click();
        this.resetForm();
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

  disableTypeCas(): TypeCas[] {
    return this.typesCas.filter(cas => cas.active);
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

