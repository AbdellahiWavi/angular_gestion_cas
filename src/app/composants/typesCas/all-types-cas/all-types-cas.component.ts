import { Component } from '@angular/core';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { TypeCas } from '../../../../gs-api/typedecas/typeCas';
import { TypeCasService } from '../../../../gs-api/typedecas/typeCas/type-cas.service';
import { MessageService } from '../../../services/messages-service/message.service';
import { DataTableConfiService } from '../../../services/dataTableConfig/data-table-confi.service';

@Component({
  selector: 'all-types-cas',
  standalone: false,
  templateUrl: './all-types-cas.component.html',
  styleUrl: './all-types-cas.component.css'
})
export class AllTypesCasComponent {
  title = 'Tableau des Type Cas';
  dtoptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  successMessage: string | string[] | null = '';
  errorMessage = '';

  typesCas: TypeCas[] = [];
  
  constructor (
    private typeCasService: TypeCasService,
    private messageService: MessageService,
    private dataTableConfig: DataTableConfiService
  ) {
  }
  
  ngOnInit(): void {
    this.messageService.currentMessage.subscribe({
      next: message => {
        this.successMessage = message;
      }
    });
    this.dtoptions = this.dataTableConfig.dtOptionsConfig();
    this.getTypesCas();
  }

  getTypesCas(): void {
    this.typeCasService.getTypesCas().subscribe({
      next: (typesCas: TypeCas[]) => {
        this.typesCas = typesCas;
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
