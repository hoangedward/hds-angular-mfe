import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { AuthenStoreEntity } from './authen-store.models';
import { AuthenStoreState } from './authen-store.state';
import { AuthenStoreActions } from './authen-store.actions';

export const AUTHEN_STORE_FEATURE_KEY = 'authenStore';

export interface AuthenStorePartialState {
  readonly [AUTHEN_STORE_FEATURE_KEY]: AuthenStoreState;
}

export const authenStoreAdapter: EntityAdapter<AuthenStoreEntity> =
  createEntityAdapter<AuthenStoreEntity>();

export const initialAuthenStoreState: AuthenStoreState =
  authenStoreAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    isLogin: false
  });

const reducer = createReducer(
  initialAuthenStoreState,
  on(AuthenStoreActions.initAuthenStore, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AuthenStoreActions.loadAuthenStoreSuccess, (state, { authenStore }) =>
    authenStoreAdapter.setAll(authenStore, { ...state, loaded: true })
  ),
  on(AuthenStoreActions.LoginSuccess, (state, { isLogin }) => ({
    ...state,
    isLogin
  })
  ),
  on(AuthenStoreActions.loadAuthenStoreFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function authenStoreReducer(
  state: AuthenStoreState | undefined,
  action: Action
) {
  return reducer(state, action);
}
