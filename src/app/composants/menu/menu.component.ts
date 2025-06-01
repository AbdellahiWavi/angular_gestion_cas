import { Component, OnInit } from '@angular/core';
import { faClipboardList, faGenderless, faList, faSquareArrowUpRight, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from './menu';
import { ServiceLoginService } from '../../services/user/login/service-login.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  userRole: string | null = null;
  currentUrl = '';
  currentNavigation?: Promise<boolean>;

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Incidents',
      icon: faList,
      userRole: ['ADMIN', 'USER', 'RESPONSABLE'],
      sousMenu: [
        {
          id: '12',
          titre: 'Tableau des incidents',
          icon: '',
          url: '/displayAllIncident'
        },
        {
          id: '13',
          titre: 'Non Affecté',
          icon: '',
          url: '/nonAffecte'
        }
      ]
    },
    {
      id: '2',
      titre: 'Degrees',
      icon: faTriangleExclamation,
      userRole: ['ADMIN', 'USER', 'RESPONSABLE'],
      sousMenu: [
        {
          id: '21',
          titre: 'Tableau des degrees',
          icon: '',
          url: '/displayAllDegrees'
        }
      ]
    },
    {
      id: '3',
      titre: 'Organisme Externe',
      icon: faSquareArrowUpRight,
      userRole: ['ADMIN'],
      sousMenu: [
        {
          id: '31',
          titre: 'Tableau des organismes externes',
          icon: '',
          url: '/displayAllOrgExternes'
        }
      ]
    },
    {
      id: '4',
      titre: 'Type Cas',
      icon: faClipboardList,
      userRole: ['ADMIN', 'USER', 'RESPONSABLE'],
      sousMenu: [
        {
          id: '41',
          titre: 'Tableau des typesCas',
          icon: '',
          url: '/displayAllTypesCas'
        }
      ]
    },
    {
      id: '5',
      titre: 'Roles',
      icon: faGenderless,
      userRole: ['ADMIN'],
      sousMenu: [
        {
          id: '51',
          titre: 'Tableau des roles',
          icon: '',
          url: '/displayAllRoles'
        }
      ]
    },
    {
      id: '6',
      titre: 'Clients',
      icon: faUser,
      userRole: ['ADMIN'],
      sousMenu: [
        {
          id: '61',
          titre: 'Tableau des clients',
          icon: '',
          url: '/displayAllClients'
        }
      ]
    },
    {
      id: '7',
      titre: 'Utilisateurs et roles',
      icon: faUser,
      userRole: ['ADMIN'],
      sousMenu: [
        {
          id: '71',
          titre: 'Tableau des utilisateurs',
          icon: '',
          url: '/displayAllUser'
        }
      ]
    },
  ];

  constructor (private router: Router, private authService: ServiceLoginService ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }

}