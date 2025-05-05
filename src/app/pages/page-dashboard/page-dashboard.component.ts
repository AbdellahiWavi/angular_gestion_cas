import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronUp, faHouse, faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'page-dashboard',
  standalone: false,
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent implements OnInit{

  currentUrl = '';

  faHouse = faHouse;
  faChevronUp = faChevronUp;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor (private router: Router) {  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
  }
}
