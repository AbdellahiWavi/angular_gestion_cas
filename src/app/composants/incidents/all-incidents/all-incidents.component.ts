import { Component, OnInit } from '@angular/core';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-all-incidents',
  standalone: false,
  templateUrl: './all-incidents.component.html',
  styleUrl: './all-incidents.component.css'
})
export class AllIncidentsComponent implements OnInit {
  subTitle = 'Tableau des incidents';
  dtoptions: Config = {};

  
  ngOnInit(): void {
      this.dtoptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthChange: false
      }
  }
}
