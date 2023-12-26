import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import { AuthenStoreEffects } from './authen-store.effects';
import { AuthenStoreFacade } from './authen-store.facade';
import { AuthenStoreEntity } from './authen-store.models';
import {
  AUTHEN_STORE_FEATURE_KEY,
  authenStoreReducer,
} from './authen-store.reducer';
import { AuthenStoreState } from './authen-store.state';
import { AuthenStoreActions } from './authen-store.actions';

interface TestSchema {
  authenStore: AuthenStoreState;
}

describe('AuthenStoreFacade', () => {
  let facade: AuthenStoreFacade;
  let store: Store<TestSchema>;
  const createAuthenStoreEntity = (
    id: string,
    name = ''
  ): AuthenStoreEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AUTHEN_STORE_FEATURE_KEY, authenStoreReducer),
          EffectsModule.forFeature([AuthenStoreEffects]),
        ],
        providers: [AuthenStoreFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(AuthenStoreFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAuthenStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAuthenStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAuthenStoreSuccess` to manually update list
     */
    it('allAuthenStore$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAuthenStore$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AuthenStoreActions.loadAuthenStoreSuccess({
          authenStore: [
            createAuthenStoreEntity('AAA'),
            createAuthenStoreEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allAuthenStore$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
