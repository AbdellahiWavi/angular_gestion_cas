import { ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective } from 'angular-datatables';
import type * as dt from 'datatables.net';
import { OrgExterne } from '../../../gs-api/OrganismeExternes/OrgExterne';
import { DataTableConfiService } from '../../services/dataTableConfig/data-table-confi.service';
import { MessageService } from '../../services/messages-service/message.service';
import { OrgExterneService } from '../../../gs-api/OrganismeExternes/OrgExternes/org-externe.service';

@Component({
  selector: 'all-org-externe',
  standalone: false,
  templateUrl: './all-org-externe.component.html',
  styleUrls: ['./all-org-externe.component.css']
})
export class AllOrgExterneComponent implements OnInit, OnDestroy {
  title = 'Tableau des Organismes Externes';
  id!: number;
  trash = faTrash;
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  successMessage: string | string[] | null = '';
  errorMessage = '';

  orgExternes: OrgExterne[] = [];
  file!: File | null;
  orgExterne: OrgExterne = {};
  imgUrl: string | ArrayBuffer = 'assets/images/author_logo.jpg';
  imgOrgLocation: string = '';

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  constructor(
    private OrgExterneService: OrgExterneService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.dtoptions = { ...this.dataTableConfig.dtOptionsConfig() };
    this.dtoptions.columns = [
      {
        data: 'image',
        title: 'photo de profile',
        render: (data: any, type: any, row: any) => `
          <img src="${row.image}" alt="" width="45" height="45" class="rounded-circle">
        ` 
      },
      { data: 'name', title: 'Type de l\'organisme' },
      { data: 'idDestination', title: 'ID'},
      {
        data: null,
        title: 'Actions',
        orderable: false,
        render: (data: any, type: any, row: any) => `
                <div class="row">
                  <div class="col-4"></div>
                  <div class="col-4">
                    <a class="action-delete" data-id="${row.idDestination}">
                      <i class="fas fa-trash" style="color: rgb(255, 72, 48);"></i>
                    </a>
                  </div>
                  <div class="col-4"></div>
                </div>`
      }
    ]
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
        setTimeout(() => {
          this.successMessage = null;
          this.cdr.detectChanges();
        }, 4000);
      }
    });

    this.getOrgExternes();
  }

  getOrgExternes(): void {
    this.OrgExterneService.getOrgExternes().subscribe({
      next: (orgExternes: OrgExterne[]) => {
        this.orgExternes = this.disableOrganisme(orgExternes);
        // Update DataTable after data is fetched
        this.updateTable();
      },
      error: error => {
        alert(error.message);
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
            this.canHide(Number(id), 'hideOrganisme');
          }
        });
      }
    });
  }

  // Update DataTable with fetched data
  updateTable(): void {
    this.dtElement.dtInstance.then((dtInstance: dt.Api) => {
      dtInstance.clear(); // Clear existing rows
      dtInstance.rows.add(this.orgExternes); // Add new data
      dtInstance.draw(); // Redraw table
    });
  }

  addOrgExterne(): void {
    if (!this.orgExterne.name?.trim()) {
      this.errorMessage = 'Le nom de l\'organisme est requis.';
      return;
    }

    this.orgExterne = {
      ...this.orgExterne,
      name: this.orgExterne.name?.toUpperCase(),
      image: this.imgOrgLocation,
    };

    this.OrgExterneService.addOrgExterne(this.orgExterne).subscribe({
      next: () => {
        this.messageService.setMessage("L'organisme externe '" + this.orgExterne.name + "' a bien été ajouté.");
        this.resetForm();
        this.getOrgExternes();
        document.getElementById('add-close')?.click();
      },
      error: () => {
        this.errorMessage = "Une erreur s'est produite lors de la création de l'organisme.";
      }
    });
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);

      if (this.file) {
        if (!this.file.type.startsWith('image/')) {
          this.errorMessage = 'Seuls les fichiers image sont autorisés.';
          return;
        }

        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = () => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };

        const formData = new FormData();
        formData.append('file', this.file);

        this.OrgExterneService.uploadImg(formData).subscribe({
          next: (url: string) => {
            this.imgOrgLocation = url;
          },
          error: error => {
            console.error('Erreur lors de l\'upload', error);
            this.errorMessage = error.error?.message || 'Erreur inconnue lors de l\'upload de l\'image.';
          }
        });
      }
    }
  }

  canHide(id: number, target: string): void {
    this.id = id;
    const div = document.querySelector('.row');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', `#${target}`);
    div?.appendChild(button);
    button.click();
    button.remove();
  }

  hideOrg(): void {
    document.getElementById('close')?.click();

    this.OrgExterneService.disableOrganisme(this.id).subscribe({
      next: () => {
        this.successMessage = "L'organisme a été désactivé.";
        this.getOrgExternes();
      },
      error: error => {
        alert(error.message);
      }
    });
  }

  disableOrganisme(orgExternes: OrgExterne[]): OrgExterne[] {
    return orgExternes.filter(org => org.active);
  }

  resetForm(): void {
    this.orgExterne = { name: '' };
    this.errorMessage = '';
    this.imgUrl = 'assets/images/author_logo.jpg';
    this.imgOrgLocation = '';
    this.file = null;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
