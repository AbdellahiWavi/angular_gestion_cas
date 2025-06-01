import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiceLoginService } from '../user/login/service-login.service';
import { MessageService } from '../messages-service/message.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardService implements CanActivate {

  constructor(
    private loginService: ServiceLoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.loginService.firstLogin().pipe(
      switchMap(exists => {
        if (!exists) {
          // Si c’est le premier login, on redirige
          this.router.navigate(['/signUpAdmin']);
          return of(false);
        }

        // Sinon, on continue les vérifications classiques
        if (!this.loginService.isLoggedUserAndAccessTokenValide()) {
          this.router.navigate(['/login']);
          return of(false);
        }

        const allowedRoles = route.data['roles'] as string[];
        if (allowedRoles && allowedRoles.length > 0) {
          const hasPermission = this.loginService.hasRole(allowedRoles);
          if (!hasPermission) {
            this.messageService.setMessage("Vous n'avez pas les permissions requises.");
            this.router.navigate(['/login']);
            return of(false);
          }
        }

        return of(true); // Tout est OK, on laisse passer
      }),
      catchError(error => {
        console.error('Erreur guard:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}