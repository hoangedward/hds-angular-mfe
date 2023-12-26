import { AuthenStoreEntity } from './authen-store.models';
import {
  authenStoreAdapter,
  AuthenStorePartialState,
  initialAuthenStoreState,
} from './authen-store.reducer';
import * as AuthenStoreSelectors from './authen-store.selectors';

describe('AuthenStore Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAuthenStoreId = (it: AuthenStoreEntity) => it.id;
  const createAuthenStoreEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AuthenStoreEntity);

  let state: AuthenStorePartialState;

  beforeEach(() => {
    state = {
      authenStore: authenStoreAdapter.setAll(
        [
          createAuthenStoreEntity('PRODUCT-AAA'),
          createAuthenStoreEntity('PRODUCT-BBB'),
          createAuthenStoreEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAuthenStoreState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('AuthenStore Selectors', () => {
    it('selectAllAuthenStore() should return the list of AuthenStore', () => {
      const results = AuthenStoreSelectors.selectAllAuthenStore(state);
      const selId = getAuthenStoreId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AuthenStoreSelectors.selectEntity(
        state
      ) as AuthenStoreEntity;
      const selId = getAuthenStoreId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAuthenStoreLoaded() should return the current "loaded" status', () => {
      const result = AuthenStoreSelectors.selectAuthenStoreLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAuthenStoreError() should return the current "error" state', () => {
      const result = AuthenStoreSelectors.selectAuthenStoreError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
