import { Injectable } from '@angular/core';
import 'datatables.net';
import { Config } from 'datatables.net';
import 'datatables.net-buttons';

@Injectable({
  providedIn: 'root'
})
export class DataTableConfiService {

  
  dtoptions: Config = {};
  
  constructor() { }

  dtOptionsConfig(): Config {
    return this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      columnDefs: [
        { 
          targets: "_all", // Applique à toutes les colonnes
          className: "dt-center" // Classe DataTables pour aligner au milieu
        }
      ],
    };
  }
}