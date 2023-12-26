import { createAction, props } from '@ngrx/store';
import { AuthenStoreEntity } from './authen-store.models';

export const AuthActionType = {
  init: '[AuthenStore Page] Init',
  
  LogoutSuccess: '[AuthenStore Page] logout-success',
  LoginSuccess: '[AuthenStore Page] login-success',
  Login: '[AuthenStore Page] Login-success',
  ActionSuccess: '[AuthenStore/API] Load AuthenStore Success',
  ActionFailure: '[AuthenStore/API] Load AuthenStore Failure',
};

export const AuthenStoreActions = {
  initAuthenStore: createAction(AuthActionType.init),
  Login: createAction(AuthActionType.Login),
  LoginSuccess: createAction(AuthActionType.LoginSuccess,
    props<{ isLogin: boolean }>()
    ),
  logOutSuccess: createAction(AuthActionType.LogoutSuccess),
  loadAuthenStoreSuccess: createAction(
    AuthActionType.ActionSuccess,
    props<{ authenStore: AuthenStoreEntity[] }>()
  ),
  loadAuthenStoreFailure: createAction(
    AuthActionType.ActionFailure,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
  ),
  loginFailure: createAction(
    AuthActionType.ActionFailure,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props<{ error: any }>()
  )
}

