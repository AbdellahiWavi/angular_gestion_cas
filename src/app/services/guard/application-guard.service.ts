import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ServiceLoginService } from '../user/login/service-login.service';
import { MessageService } from '../messages-service/message.service';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardService implements CanActivate {

  constructor(
    private loginService: ServiceLoginService,
    private messageService: MessageService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  // Étape 1 : vérifier si l'utilisateur est connecté
  if (!this.loginService.isLoggedUserAndAccessTokenValide()) {
    // S'il n'est pas connecté, on vérifie s'il faut créer un admin
    return this.loginService.hasAnyActiveUser().pipe(
      switchMap(exists => {
        if (!exists) {
          this.router.navigate(['/signUpAdmin'], { replaceUrl: true });
        } else {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        return of(false);
      }),
      catchError(error => {
        console.error("Erreur dans hasAnyActiveUser :", error);
        this.router.navigate(['/login'], { replaceUrl: true });
        return of(false);
      })
    );
  }

  // Étape 2 : si connecté, vérifier si l'utilisateur est actif (à toi de le gérer côté service)
  if (!this.loginService.isCurrentUserActive()) {
    this.messageService.setMessage("Votre compte est désactivé.");
    this.router.navigate(['/login'], { replaceUrl: true });
    return of(false);
  }

  // Étape 3 : Vérifier les rôles
  const allowedRoles = route.data['roles'] as string[];
  if (allowedRoles && allowedRoles.length > 0) {
    const hasPermission = this.loginService.hasRole(allowedRoles);
    if (!hasPermission) {
      this.messageService.setMessage("Vous n'avez pas les permissions requises.");
      this.router.navigate(['/login'], { replaceUrl: true });
      return of(false);
    }
  }

  return of(true);
}

}