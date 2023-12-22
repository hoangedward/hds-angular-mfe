import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';

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
