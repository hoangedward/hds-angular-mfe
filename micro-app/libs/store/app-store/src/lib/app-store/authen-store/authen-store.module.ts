import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import * as fromAuthenStore from './authen-store.reducer';
import { AuthenStoreEffects } from './authen-store.effects';
import { AuthenStoreFacade } from './authen-store.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAuthenStore.AUTHEN_STORE_FEATURE_KEY,
      fromAuthenStore.authenStoreReducer
    ),
    EffectsModule.forFeature([AuthenStoreEffects]),
  ],
  providers: [AuthenStoreFacade,],
})
export class AuthStoreModule { }
