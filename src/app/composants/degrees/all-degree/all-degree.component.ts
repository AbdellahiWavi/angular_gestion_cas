import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { Degree } from '../../../../gs-api/degree/degree';
import { DegreeService } from '../../../../gs-api/degree/deg/degree.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';

@Component({
  selector: 'all-degree',
  standalone: false,
  templateUrl: './all-degree.component.html',
  styleUrl: './all-degree.component.css'
})
export class AllDegreeComponent {
  title = 'Tableau des degrees';
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  successMessage: string | string[] | null = '';
  errorMessage = '';

  degrees: Degree[] = [];
  
  constructor (
    private degreeService: DegreeService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) {}
  
  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getClients();
  }

  getClients(): void {
    this.degreeService.getDegrees().subscribe({
      next: (degrees: Degree[]) => {
        this.degrees = degrees;
        this.dtTrigger.next(null);
      },
      error: error => {
        alert(error.message);
      }
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
