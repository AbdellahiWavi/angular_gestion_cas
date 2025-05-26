import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { ServiceLoginService } from '../user/login/service-login.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuardService implements CanActivate {

  constructor(
    private loginService: ServiceLoginService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {

    return this.loginService.isLoggedUserAndAccessTokenValide();
  }
}
