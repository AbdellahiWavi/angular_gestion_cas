import { Component } from '@angular/core';
import { faChevronUp, faHouse, faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-page-dashboard',
  standalone: false,
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent {
  faHouse = faHouse;
  faChevronUp = faChevronUp;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;
}
