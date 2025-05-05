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
      titre: 'Utilisateurs et roles',
      icon: faUser,
      sousMenu: [
        {
          id: '21',
          titre: 'Tableau des utilisateurs',
          icon: '',
          url: '/displayAllUser'
        }
      ]
    },
    {
      id: '3',
      titre: 'Roles',
      icon: faGenderless,
      sousMenu: [
        {
          id: '31',
          titre: 'Tableau des roles',
          icon: '',
          url: '/displayAllRoles'
        },
        {
          id: '32',
          titre: 'Ajouter de role',
          icon: '',
          url: '/addRole'
        }
      ]
    },
    {
      id: '4',
      titre: 'Clients',
      icon: faUser,
      sousMenu: [
        {
          id: '41',
          titre: 'Tableau des clients',
          icon: '',
          url: '/displayAllClients'
        },
        {
          id: '42',
          titre: 'Supprimer client',
          icon: '',
          url: '/deleteClient'
        }
      ]
    },
    {
      id: '5',
      titre: 'Degrees',
      icon: faTriangleExclamation,
      sousMenu: [
        {
          id: '51',
          titre: 'Tableau des degrees',
          icon: '',
          url: '/displayAllDegrees'
        },
        {
          id: '52',
          titre: 'Ajouter degree',
          icon: '',
          url: '/addDegree'
        }
      ]
    },
    {
      id: '6',
      titre: 'Organisme Externe',
      icon: faSquareArrowUpRight,
      sousMenu: [
        {
          id: '61',
          titre: 'Tableau des organismes externes',
          icon: '',
          url: '/displayAllOrgExternes'
        },
        {
          id: '62',
          titre: 'Supprimer organisme externe',
          icon: '',
          url: '/deleteOrgExterne'
        },
        {
          id: '63',
          titre: 'Ajouter organisme externe',
          icon: '',
          url: '/addOrgExterne'
        }
      ]
    },
    {
      id: '7',
      titre: 'Type Cas',
      icon: faClipboardList,
      sousMenu: [
        {
          id: '71',
          titre: 'Tableau des typesCas',
          icon: '',
          url: '/displayAllTypesCas'
        },
        {
          id: '72',
          titre: 'Supprimer typeCas',
          icon: '',
          url: '/deleteTypeCas'
        },
        {
          id: '73',
          titre: 'Ajouter typeCas',
          icon: '',
          url: '/addTypeCas'
        }
      ]
    }
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