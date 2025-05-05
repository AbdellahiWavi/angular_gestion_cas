import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  faRightFromBracket = faRightFromBracket;
  currentUrl = '';
  id_destination: number | null = null;

  constructor (private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      this.id_destination = Number(param.get('id'));
    });
    this.currentUrl = this.router.url;
  }
}
