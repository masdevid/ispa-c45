import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelpersService } from '../services/helpers.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsGuard implements CanActivate {
  constructor(private router: Router, private helpers: HelpersService) {
  }
  previousUrl(state: RouterStateSnapshot){
    const splited = state.url.split('/');
    return splited.splice(0, splited.length-1).join('/')
  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const previousUrl = this.previousUrl(state)

      const { m, id } = route.queryParams;
      if (!m) this.router.navigateByUrl(previousUrl);
      let canAccess  = true;
      if (m == 'edit' && !id) {
        canAccess = false;
        this.router.navigateByUrl(previousUrl)
      }

      return canAccess;
    }

  }
