import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { AuthService } from '../services/auth.service';
import { Route } from '@angular/compiler/src/core';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class TeamAuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.appUser$.pipe(map(user => user.roles.admin || user.roles.member))
  }
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.appUser$.pipe(map(user => user.roles.admin || user.roles.member))
  }
}
