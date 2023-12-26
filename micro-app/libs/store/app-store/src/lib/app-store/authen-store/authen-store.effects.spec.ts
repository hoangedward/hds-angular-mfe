import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { AuthenStoreEffects } from './authen-store.effects';
import { AuthenStoreActions } from './authen-store.actions';

describe('AuthenStoreEffects', () => {
  let actions: Observable<Action>;
  let effects: AuthenStoreEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AuthenStoreEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AuthenStoreEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AuthenStoreActions.initAuthenStore() });

      const expected = hot('-a-|', {
        a: AuthenStoreActions.loadAuthenStoreSuccess({ authenStore: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
