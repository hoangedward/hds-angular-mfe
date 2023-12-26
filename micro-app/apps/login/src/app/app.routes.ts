import { Route } from '@angular/router';
// import { RemoteEntryComponent } from './remote-entry/entry.component';

export const appRoutes: Route[] = [
  {
    path: '',
    // loadChildren: () =>
    //   import('./remote-entry/entry.routes').then((m) => m.remoteRoutes),
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
  },
];
