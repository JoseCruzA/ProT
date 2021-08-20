import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TrafficService } from '../services/traffic.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class LandingGuard implements CanActivate {

  constructor(private trafficService: TrafficService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let username = String(route.paramMap.get('username'));
    let campaign = String(route.paramMap.get('campaign'));
    let url = window.location.protocol + '//' + window.location.hostname + '/' + window.location.pathname.split('/')[1] + '/';

    if (campaign != 'null') {
      this.trafficService.putTrafficCampaign(url, campaign, username).subscribe();
    } else {
      this.trafficService.putTraffic(url, username).subscribe();
    }

    localStorage.setItem('username', username);

    this.router.navigate([`/${window.location.pathname.split('/')[1]}`]);
    return true;
  }

}
