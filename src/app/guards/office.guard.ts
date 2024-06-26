import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

/**
 * Guard Class for office acces
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class OfficeGuard implements CanActivate {

  data!: string;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.authService.validateLogin().toPromise().then(res => {
          return true;
        }).catch(err => {
          window.location.replace('/');
          return false;
        });
  }
}
