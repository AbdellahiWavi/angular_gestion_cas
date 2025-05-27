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

  dtOptionsConfig(order?: [number, 'asc' | 'desc'][]): Config {
    return {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthChange: false,
      serverSide: false,         // false : les données sont chargées côté client (depuis l'API)
      destroy: true,             // Permet de détruire proprement l'instance avant de réinitialiser
      retrieve: true,            // Récupère l’instance existante si déjà initialisée
      deferRender: true,         // Optimise le rendu pour de grandes tables
      order: order ?? [],    // Trie par la première colonne, décroissant
      columnDefs: [
        {
          targets: '_all',
          className: 'dt-center'
        },

      ],
      columns: [],
    };
  }

}