import { Component, OnInit } from '@angular/core';
import { faExclamation, faInfo, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { GsServiceService } from '../../../gs-api/gestionnaire/ges/gs-service.service';
import { Gestionnaire } from '../../../gs-api/gestionnaire/gestionnaire';

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
