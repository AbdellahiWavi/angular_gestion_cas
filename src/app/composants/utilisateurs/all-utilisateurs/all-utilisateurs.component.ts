import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';
import { Gestionnaire } from '../../../../gs-api/gestionnaire/gestionnaire';
import { GsServiceService } from '../../../../gs-api/gestionnaire/ges/gs-service.service';
import { Subject } from 'rxjs';
import { MessageService } from '../../../services/messages-service/message.service';
import { Router } from '@angular/router';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';

@Component({
  selector: 'all-utilisateurs',
  standalone: false,
  templateUrl: './all-utilisateurs.component.html',
  styleUrl: './all-utilisateurs.component.css'
})
export class AllUtilisateursComponent implements OnInit {
  
  title = 'Tableau des utilisateurs';
  successMsg = '';
  
  gestionnaires: Gestionnaire[] = [];

  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor (
    private gestionService: GsServiceService,
    private router: Router,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) { 
    this.messageService.currentMessage.subscribe(message => {
      if (message) {
        this.successMsg = message;
      }
    });
  }
  
  ngOnInit(): void {
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getUsers();
  }
  
  getUsers(): void {
    this.gestionService.getUsers().subscribe({
      next: (response: Gestionnaire[]) => {
        this.gestionnaires = response;
        this.dtTrigger.next(0);
        
      },
      error: error => {
        alert(error.message);
      }
    })
  }
  
  updateRole(gestionnaire?: Gestionnaire) {
    this.router.navigate(['/updateRole'], {state: { userData: gestionnaire }});
  }
  
}
