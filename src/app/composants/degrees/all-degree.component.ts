import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  styleUrls: ['./all-degree.component.css']
})
export class AllDegreeComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'Tableau des degrees';
  degrees: Degree[] = [];
  degree: Degree = { type_degree: '' };
  idToDeactivate!: number;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  successMessage: string | string[] | null = '';
  errorMessage = '';

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(
    private degreeService: DegreeService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtOptions = this.dataTableConfig.dtOptionsConfig();
    this.dtOptions.columns = [
      { data: 'id', title: 'ID' },
      { data: 'type_degree', title: 'Type de degree' },
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

    this.getDegrees();
  }

  getDegrees(): void {
    // Fetch data from service
    this.degreeService.getDegrees().subscribe({
      next: (data) => {
        this.degrees = this.deactvateDegrees(data);
        // Update DataTable after data is fetched
        this.updateTable();
      },
      error: (err) => {
        console.error('Error fetching degrees:', err);
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
            this.canHide(Number(id), 'hideDegree');
          }
        });
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.degrees); // Add new data
      dtInstance.draw(); // Redraw table
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
        this.getDegrees();
        document.getElementById('add-close')?.click();
      },
      error: error => {
        this.errorMessage = error.error.message;
      }
    });
  }

  canHide(id: number, modalId: string): void {
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

    this.degreeService.disableDegree(this.idToDeactivate).subscribe({
      next: () => {
        this.successMessage = 'Le degree a bien été désactivé';
        this.getDegrees();
      },
      error: error => alert(error.message)
    });
  }

  deactvateDegrees(degrees: Degree[]): Degree[] {
    return degrees.filter(degree => degree.active);
  }

  resetForm(): void {
    this.degree = { type_degree: '' };
    this.errorMessage = '';
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
