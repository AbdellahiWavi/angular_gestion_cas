import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronUp, faHouse, faMagnifyingGlass, faRightFromBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationResponse } from '../../services/user/authenticationResponse';

@Component({
  selector: 'page-dashboard',
  standalone: false,
  templateUrl: './page-dashboard.component.html',
  styleUrl: './page-dashboard.component.css'
})
export class PageDashboardComponent implements OnInit {

  currentUrl = '';
  role = '';

  faHouse = faHouse;
  faChevronUp = faChevronUp;
  faRightFromBracket = faRightFromBracket;
  faUserPlus = faUserPlus;
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.getRole()
  }

  getRole() {
    let authenticationResponse: AuthenticationResponse;
    const userAuth = localStorage.getItem('userAuth');

    authenticationResponse = JSON.parse(
      userAuth as string
    );
    const userRole = authenticationResponse.userInfo.role[0].authority;
    const startIndex = userRole.indexOf("_");
    if (startIndex !== -1) {
      this.role = userRole.substring(startIndex + 1);
    }

  }


}
