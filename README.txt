######################### Micro frontend Angular managed by Nx Workspace ######################

# Install nvm (Node version manager)
## Install node
nvm install node
## Use node
nvm use <version>



# Create nx workspace
npx create-nx-workspace@latest
## Install nx
npm install -g nx
## Serve nx
nx server <app_name>
## Fix issue cannot use nx command in VSCode
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser (Powershell as administrator)



# Generate application
## Generate host
nx g @nx/angular:host shell --remotes=shop
## Generate remote
nx g @nx/angular:remote about --host=shell
### Relationship among host and remote is store in module-federation.config.ts of each application

### The Nx generator has issue that can block us if module-federation.config.ts config wrongly
### for example, if we remove 'remotes' attribute, it throws an unrelated error that couldn't be use for investigate, so I put working files below:
#### For host
import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['app-one'],
};
#### For remote
import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'app-one',
  exposes: {
    './Routes': 'app-one/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;



# Routing:
## Remote app about exposes its routes in module-federation.config.ts
const config: ModuleFederationConfig = {
  name: 'about',
  exposes: {
    './Routes': 'apps/about/src/app/remote-entry/entry.routes.ts',
  },
};
## the tsconfig.base.json in root directory defind the path to about/shop routes.ts
"paths": {
      "about/Routes": ["apps/about/src/app/remote-entry/entry.routes.ts"],
      "shop/Routes": ["apps/shop/src/app/remote-entry/entry.routes.ts"]
}
## The Shell app then load it in app.routes.ts
export const appRoutes: Route[] = [
  {
    path: 'about',
    loadChildren: () => import('about/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];



# Create library shared-ui
nx g @nx/angular:library libs/shared-ui
## The library definition placed in tsconfig.base.json:
"@mfa/share-ui": ["libs/core/src/index.ts"],



# Serve the shell
nx serve shell (serve the shell with all of its remotes)
# To specific remotes --devRemotes="shop,about")
nx g @nx/workspace:run-commands deploy --project=shell --command="rm -rf production && mkdir production && cp -r dist/apps/shell/* production && cp -r dist/apps/{shop,cart,about} production && http-server -p 3000 -a localhost production"



# Create ngrx store
npx nx generate @nx/angular:ngrx-root-store --project=shell --skip-import (--skip-import for standalone)
## From Angular 14, the Angular's founder team recommand using standalone instead of module, Example:

## In app.config.ts register counter as Reducer as below:
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { counterReducer } from './+state/counter.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(), provideStore(), provideRouter(appRoutes),
    importProvidersFrom(StoreModule.forRoot({ counter: counterReducer }))
  ],
};

## +state/counter.actions.ts
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

## +state/counter.states.ts
import { createFeatureSelector } from "@ngrx/store";

export interface CounterState {
    count: number;
}

export const initialState: CounterState = {
    count: 0,
};

export const selectCounterState = createFeatureSelector<CounterState>('counter');

## +state/counter.reducers.ts
import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';
import { initialState } from './counter.states';
## +state/counter.selectors.ts
import { createSelector } from '@ngrx/store';
import { selectCounterState } from './counter.states';

export const selectCount = createSelector(
  selectCounterState,
  (state) => state.count
);

## Using selector to select the Reducer 'counter'
constructor(private store: Store) {}

    count$: Observable<number> | undefined;

    increment() {
        this.store.dispatch(CounterActions.increment());
    }

    decrement() {
        this.store.dispatch(CounterActions.decrement());
    }

    reset() {
        this.store.dispatch(CounterActions.reset());
    }

    ngOnInit(): void {
        this.count$ = this.store.select(selectCount);
    }

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.increment, (state) => ({ count: state.count + 1 })),
  on(CounterActions.decrement, (state) => ({ count: state.count - 1 })),
  on(CounterActions.reset, () => initialState)
);



# Setup taiwind
nx g @nx/angular:setup-tailwind shell
## Tailwind's generation will create styles. (css/less/..) with below (affected for .css):
@tailwind base
@tailwind utilities
@tailwind components
## For .less, replace with below:
@import "~tailwindcss/base.css";
@import "~tailwindcss/components.css";
@import "~tailwindcss/utilities.css";
## Use this command to extract tailwindcss file to raw styles (Optional)
## npx tailwindcss -i ./src/styles.less -o ./dist/styles.css (Optional --watch attribute for continuous convert)



# Intergrate Keycloak
## Start keycloak dev-server:
Download keycloack 20.0.5
bin >>> cmd >>> kc.bat start-dev

## Prepare keycloak configuration:
Login administrator, create realm angular-realm, create client angular-client
Create Role, Create Group >> Assign role, Create User >>> Assign Group
### Now user login will have roles assigned to the Group

## Install keycloak-angular and keycloak-js
npm install keycloack-angular keycloack-js@20.0.5

## Init keycloak intergration when bootstrap in app.module.ts
Follow instruction in keycloack-angular npm

## Create and apply Guard
Create library and auth-guard.ts as keycloak-angular instruction
### Apply guard in routing:
{
	path: 'articles',
	loadChildren: () => import('articles/Routes').then((m) => m.remoteRoutes),
	canActivate: [AuthGuard],
	data: { roles: ['reader'] }
}



##### Common Error #####
# Nx serve freezing >>> Check module-federation.config.ts