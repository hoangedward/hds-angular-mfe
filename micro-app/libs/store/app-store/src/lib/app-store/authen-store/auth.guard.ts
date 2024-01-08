/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable, inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanLoad, Router, RouterStateSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import {first, map} from "rxjs/operators";
import { AuthenStoreFacade } from './authen-store.facade';

@Injectable({
    providedIn: 'root'
})
class AuthGuard {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private authenStoreFacade: AuthenStoreFacade,
                private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
    return this.canLoad()
    }

    canLoad(): Observable<boolean> {
        return this.authenStoreFacade.isLogin$.pipe(map(authenticated => {
            console.log('authenticated', authenticated);
            if (authenticated) {
                return true;
            } else {
                this.router.navigate(['sign-in'])
                return false;
            }
        }));
    }
}

export const AdminAuthGuard: CanActivateFn = (router: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> => inject(AuthGuard).canActivate(router, state)