import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  AUTHEN_STORE_FEATURE_KEY,
  authenStoreAdapter,
} from './authen-store.reducer';
import { AuthenStoreState } from './authen-store.state';

// Lookup the 'AuthenStore' feature state managed by NgRx
export const selectAuthenStoreState = createFeatureSelector<AuthenStoreState>(
  AUTHEN_STORE_FEATURE_KEY
);

const { selectAll, selectEntities } = authenStoreAdapter.getSelectors();

export const selectAuthenStoreLoaded = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => state.loaded
);
export const selectAuthenStoreIsLogin = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => state.isLogin
);

export const selectAuthenStoreError = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => state.error
);

export const selectAllAuthenStore = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => selectAll(state)
);

export const selectAuthenStoreEntities = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAuthenStoreState,
  (state: AuthenStoreState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAuthenStoreEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
