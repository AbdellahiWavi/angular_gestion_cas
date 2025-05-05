import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Gestionnaire } from '../../../../gs-api/gestionnaire/gestionnaire';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';
import { Subject } from 'rxjs';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'all-utilisateurs',
  standalone: false,
  templateUrl: './all-utilisateurs.component.html',
  styleUrl: './all-utilisateurs.component.css'
})
export class AllUtilisateursComponent implements OnInit {
  
  title = 'Tableau des utilisateurs';
  successMsg: string | string[] | null = '';
    eye = faEye;
    pen = faPen;
    trash = faTrash;
    id!: number;
    target = 'hideIncident';
    labelledby = 'hideIncidentLabel';
  gestionnaires: Gestionnaire[] = [];

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor (
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService,
    private gestionnaireService: GsServiceService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.messageService.currentMessage.subscribe(
      message => {
        if(message) {
          this.successMsg = message;
        }
      }
    );
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getUsers();
  }
  
  getUsers(): void {
    this.gestionnaireService.getUsers().subscribe({
      next: (response: Gestionnaire[]) => {
        this.gestionnaires = response;
        this.dtTrigger.next(null);
        
      },
      error: error => {
        alert(error.message);
      }
    })
  }
  
  updateRole(gestionnaire?: Gestionnaire) {
    this.router.navigate(['/updateRole'], {state: { userData: gestionnaire }});
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

  
  deleteUser(): void {
    document.getElementById('close')?.click();

    this.gestionnaireService.deleteUser(this.id).subscribe({
      next: () => {
        this.successMsg = "l'utilisateur a bien été supprimé";
        this.getUsers();
      }, error: error => {
        alert(error.message);
      }
    });
  }
  

  isArray<T>(value: any): value is T[] {
    return Array.isArray(value);
  }
  
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
