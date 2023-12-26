import { EntityState } from "@ngrx/entity";
import { AuthenStoreEntity } from "./authen-store.models";

export interface AuthenStoreState extends EntityState<AuthenStoreEntity> {
  selectedId?: string | number; // which AuthenStore record has been selected
  loaded: boolean; // has the AuthenStore list been loaded
  error?: string | null; // last known error (if any)
  isLogin: boolean;
}