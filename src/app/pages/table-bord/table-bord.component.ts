import { Component } from '@angular/core';
import { faExclamation, faInfo, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table-bord',
  standalone: false,
  templateUrl: './table-bord.component.html',
  styleUrl: './table-bord.component.css'
})
export class TableBordComponent {
  faUserPlus = faUserPlus;
  faExclamation = faExclamation;
  faInfo = faInfo;

}
