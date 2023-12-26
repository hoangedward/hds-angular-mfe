import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import { AuthenStoreActions } from './authen-store.actions';


@Injectable()
export class AuthenStoreEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenStoreActions.initAuthenStore),
      switchMap(() =>
        of(AuthenStoreActions.loadAuthenStoreSuccess({ authenStore: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(AuthenStoreActions.loadAuthenStoreFailure({ error }));
      })
    )
  );
  
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenStoreActions.Login),
      switchMap(() =>
        of(AuthenStoreActions.LoginSuccess({ isLogin: true }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(AuthenStoreActions.loadAuthenStoreFailure({ error }));
      })
    )
  );
}
