import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { AuthGuard } from '@hds/core';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NxWelcomeComponent,
    canActivate: [AuthGuard]
  },
];
