import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronUp, faHouse, faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { GsServiceService } from '../../../gs-api/gestionnaire/ges/gs-service.service';

@Component({
  selector: 'page-dashboard',
  standalone: false,
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent implements OnInit {

  currentUrl = '';
  profile = '';

  faHouse = faHouse;
  faChevronUp = faChevronUp;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(
    private router: Router,
    private gestionnaireService: GsServiceService
  ) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.getRole()
  }

  getRole() {
    const userAuth = JSON.parse(
      localStorage.getItem('userAuth') as string
    );

    const userId = userAuth.userInfo.id;
    this.gestionnaireService.getUser(userId).subscribe({
      next: (gestionnaire) => {
        this.profile = `- ${gestionnaire.roles![0].profile!}`;
      }
    });
  }

}
