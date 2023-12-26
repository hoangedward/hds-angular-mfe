import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as AuthenStoreSelectors from './authen-store.selectors';
import { AuthenStoreActions } from './authen-store.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthenStoreFacade {
  private readonly store = inject(Store);
  private readonly router = inject(Router);


  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(AuthenStoreSelectors.selectAuthenStoreLoaded)
  );
  isLogin$ = this.store.pipe(
    select(AuthenStoreSelectors.selectAuthenStoreIsLogin)
  );
  allAuthenStore$ = this.store.pipe(
    select(AuthenStoreSelectors.selectAllAuthenStore)
  );
  selectedAuthenStore$ = this.store.pipe(
    select(AuthenStoreSelectors.selectEntity)
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AuthenStoreActions.initAuthenStore());
  }

  login() {
    this.store.dispatch(AuthenStoreActions.Login());
  }

  navigate(url: string[]) {
    this.router.navigate(url);
  }
}
