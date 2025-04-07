import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-non-affecte',
  standalone: false,
  templateUrl: './non-affecte.component.html',
  styleUrl: './non-affecte.component.css'
})
export class NonAffecteComponent implements OnInit {
  title = 'Non Affecté';
  dtoptions: Config = {};

  ngOnInit(): void {
      this.dtoptions = {
        pagingType: 'full_numbers',
        pageLength: 4,
        lengthChange: false
      }
  }
}
