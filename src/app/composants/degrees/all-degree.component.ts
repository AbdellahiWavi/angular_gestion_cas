import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { DegreeService } from '../../../gs-api/degree/deg/degree.service';
import { Degree } from '../../../gs-api/degree/degree';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'all-degree',
  standalone: false,
  templateUrl: './all-degree.component.html',
  styleUrls: ['./all-degree.component.css'] // Corrigé : styleUrls au lieu de styleUrl
})
export class AllDegreeComponent implements OnInit, OnDestroy {
  title = 'Tableau des degrees';
  degrees: Degree[] = [];
  degree: Degree = { type_degree: '' };
  idToDeactivate!: number;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  successMessage: string | string[] | null = '';
  errorMessage = '';

  trashIcon = faTrash;

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private degreeService: DegreeService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) { }

  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => this.successMessage = message
    });

    this.dtOptions = this.dataTableConfig.dtOptionsConfig();
    this.loadDegrees();
  }

  loadDegrees(): void {
    this.degreeService.getDegrees().subscribe({
      next: (degrees: Degree[]) => {
        this.degrees = degrees;
        this.degrees = this.deactvateDegrees();

        if (this.dtElement?.dtInstance) {
          this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next(null);
          });
        } else {
          this.dtTrigger.next(null);
        }
      },
      error: error => alert(error.message)
    });
  }

  addDegree(): void {
    if (!this.degree.type_degree?.trim()) {
      this.errorMessage = 'Le champ type_degree est requis.';
      return;
    }

    this.degreeService.addDegree(this.degree).subscribe({
      next: () => {
        this.messageService.setMessage(`Le degree '${this.degree.type_degree}' a bien été ajouté`);
        this.resetForm();
        this.loadDegrees();
        document.getElementById('add-close')?.click();
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  prepareDeactivate(id: number, modalId: string): void {
    this.idToDeactivate = id;

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `#${modalId}`);
    document.body.appendChild(button);
    button.click();
    button.remove();
  }

  deactivateDegree(): void {
    document.getElementById('close')?.click();

    this.degreeService.updateIsActive(this.idToDeactivate).subscribe({
      next: () => {
        this.successMessage = 'Le degree a bien été désactivé';
        this.loadDegrees();
      },
      error: error => alert(error.message)
    });
  }

  deactvateDegrees(): Degree[] {
    return this.degrees.filter(degree => degree.active);
  }

  resetForm(): void {
    this.degree = { type_degree: '' };
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
