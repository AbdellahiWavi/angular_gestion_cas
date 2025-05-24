import { Component } from '@angular/core';
import { faClipboardList, faGenderless, faList, faSquareArrowUpRight, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavigationEnd, Router } from '@angular/router';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  currentUrl = '';
  currentNavigation?: Promise<boolean>;

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Incidents',
      icon: faList,
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

  constructor (private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
      }
    });
  }

  navigate(url?: string): void {
    this.router.navigate([url]);
  }

}