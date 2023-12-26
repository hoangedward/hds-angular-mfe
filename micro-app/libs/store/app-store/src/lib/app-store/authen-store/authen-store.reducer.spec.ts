import { Action } from '@ngrx/store';

import * as AuthenStoreActions from './authen-store.actions';
import { AuthenStoreEntity } from './authen-store.models';
import {
  AuthenStoreState,
  initialAuthenStoreState,
  authenStoreReducer,
} from './authen-store.reducer';

describe('AuthenStore Reducer', () => {
  const createAuthenStoreEntity = (
    id: string,
    name = ''
  ): AuthenStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid AuthenStore actions', () => {
    it('loadAuthenStoreSuccess should return the list of known AuthenStore', () => {
      const authenStore = [
        createAuthenStoreEntity('PRODUCT-AAA'),
        createAuthenStoreEntity('PRODUCT-zzz'),
      ];
      const action = AuthenStoreActions.loadAuthenStoreSuccess({ authenStore });

      const result: AuthenStoreState = authenStoreReducer(
        initialAuthenStoreState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = authenStoreReducer(initialAuthenStoreState, action);

      expect(result).toBe(initialAuthenStoreState);
    });
  });
});
