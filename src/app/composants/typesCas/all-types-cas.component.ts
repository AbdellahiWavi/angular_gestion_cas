import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  title = 'Tableau des Type Cas';
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
    private dataTableConfig: DataTableConfiService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getTypesCas();
    this.getOrgExterenes();
  }

  getTypesCas(): void {
    this.typeCasService.getTypesCas().subscribe({
      next: (typesCas: TypeCas[]) => {
        this.typesCas = typesCas;

        // Si la DataTable a déjà été initialisée
        if (this.dtElement.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
            dtInstance.destroy(); // détruire l'ancienne instance
            this.dtTrigger.next(null); // réinitialiser le trigger
          })
        } else {
          this.dtTrigger.next(null); // Première initialisation
        }
      },
      error: error => {
        alert(error.message);
      }
    })
  }

  getOrgExterenes(): void {
    this.orgExterneService.getOrgExternes().subscribe({
      next: orgExternes => {
        this.orgExternes = orgExternes;
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  addTypeCas(): void {
    if (!this.typeCas.type?.trim()) {
      this.errorMessage = 'Le champ type est requis.';
      return;
    }
    if (!this.typeCas.destination.name?.trim()) {
      this.errorMessage = 'La choisir de l\'organisme est requis';
      return;
    }
    this.typeCasService.addTypeCas(this.typeCas).subscribe({
      next: () => {
        this.messageService.setMessage("Le type de cas '" + this.typeCas.type + "' a bien été ajouter");
        this.getTypesCas();
        document.getElementById('add-close')?.click();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
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

  hideCas(): void {
    document.getElementById('close')?.click();

    this.typeCasService.updateIsActive(this.id).subscribe({
      next: () => {
        this.typesCas = this.disableTypeCas();
        this.successMessage = "le degree est bien été désactiver";
        this.getTypesCas();
      }, error: error => {
        alert(error.message);
      }
    });
  }

  disableTypeCas(): TypeCas[] {
    return this.typesCas.filter(cas => cas.active);
  }

  resetForm() {
    this.typeCas = {
      type: '',
      destination: {}
    }
  }
 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
