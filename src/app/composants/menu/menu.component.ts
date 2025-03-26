import { Component } from '@angular/core';
import { faList, faUser } from '@fortawesome/free-solid-svg-icons';
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
          url: ''
        },
        {
          id: '14',
          titre: 'Mettre à jour incident',
          icon: '',
          url: ''
        },
        {
          id: '15',
          titre: 'Supprimer incident',
          icon: '',
          url: ''
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
          url: ''
        },
        {
          id: '22',
          titre: 'Mettre à jour utilisateur',
          icon: '',
          url: ''
        },
        {
          id: '22',
          titre: 'Supprimer utilisateur',
          icon: '',
          url: ''
        }
      ]
    }
  ];

  constructor (private router: Router) { }

  navigate(url: string | undefined): void {
    this.router.navigate([url]);
  }
}
