import { Component, OnInit } from '@angular/core';
import { ServiceLoginService } from '../../services/user/login/service-login.service';
import { Router } from '@angular/router';
import { MessageService } from '../../services/messages-service/message.service';

@Component({
  selector: 'app-page-logout',
  standalone: false,
  templateUrl: './page-logout.component.html'
})
export class PageLogoutComponent implements OnInit{

  constructor (
    private authService: ServiceLoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
