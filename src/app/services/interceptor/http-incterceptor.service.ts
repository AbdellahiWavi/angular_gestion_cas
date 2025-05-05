import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationResponse } from '../user/authenticationResponse';
import { Router } from '@angular/router';
import { LoaderService } from '../../composants/loader/service/loader.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
    this.loaderService.show();
    let authenticationResponse: AuthenticationResponse = {};
    const token = localStorage.getItem('accessToken');
    
    req = req.clone({
      headers: new HttpHeaders({
        'X-App-Type': 'WEB',
      })
    });

    if (token && !this.isTokenExpired(token)) {
      authenticationResponse = JSON.parse(
        token as string
      );

      const authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + authenticationResponse.accessToken,
          'X-App-Type': 'WEB'
        })
      });
      return this.handleRequest(authReq, next);
    } else {
      if (token) {
        localStorage.removeItem('accessToken');
      }
      this.router.navigate(['/login']);
      return this.handleRequest(req, next);
    }
  }


  isTokenExpired(token: string): boolean {
    if (!token) return true;
  
    const payload = token.split('.')[1];
    if (!payload) return true;

    const decoded = JSON.parse(atob(payload));
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    
    return exp < now;
  }

  handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      tap({
        next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loaderService.hide();
        }
      }, error: (err: any) => {
        this.loaderService.hide();
        // if (err.status === 401) {
        //   // Token expiré ou invalide
        //   localStorage.removeItem('auth');
        //   this.router.navigate(['/login']);
        // }
      }})
    );
  }
  
}
