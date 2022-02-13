import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivateChild( childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate( childRoute, state );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return <Promise<boolean>>this.authService.isAuthenticated().then(isAuth => {
      if (isAuth) {
        return true;
      } else {
        this.router.navigate(['/'], {
          queryParams: {
            auth: false
          }
        })
        return
      }
    })
  }

}
