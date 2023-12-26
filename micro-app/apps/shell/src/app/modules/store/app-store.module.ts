import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metaReducers, extModules } from './app-store.reducer';
import { AuthStoreModule } from '@micro-app/app-store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthStoreModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    // Instrumentation must be imported after importing StoreModule
    extModules,
  ],
})
export class AppStoreModule {}
