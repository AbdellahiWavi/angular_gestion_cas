import { Component } from '@angular/core';
import { faGenderless, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Menu } from './menu';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  
  faList = faList;
  faUser = faUser;
  faGenderless = faGenderless;
  currentUrl? = '';

  public menuProperties: Array<Menu> = [
    {
      id: '1',
      titre: 'Incidents',
      icon: faList,
      url: '',
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
        },
        {
          id: '14',
          titre: 'Mettre à jour incident',
          icon: '',
          url: '/updateIncident'
        },
        {
          id: '15',
          titre: 'Supprimer incident',
          icon: '',
          url: '/deleteIncident'
        }
      ]
    },
    {
      id: '2',
      titre: 'Utilisateurs',
      icon: faUser,
      url: '',
      sousMenu: [
        {
          id: '21',
          titre: 'Tableau des utilisateurs',
          icon: '',
          url: '/displayAllUser'
        },
        {
          id: '22',
          titre: 'Supprimer utilisateur',
          icon: '',
          url: '/deleteUser'
        }
      ]
    },
    {
      id: '3',
      titre: 'Roles',
      icon: faGenderless,
      url: '',
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
        },
        {
          id: '33',
          titre: 'Supprimer de role',
          icon: '',
          url: '/deleteRole'
        }
      ]
    },
    {
      id: '4',
      titre: 'Clients',
      icon: faUser,
      url: '',
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
    }
  ];

  constructor (private router: Router) { }

  navigate(url: string | undefined): void {
    this.router.navigate([url]);
    this.currentUrl = url;
  }  

}
