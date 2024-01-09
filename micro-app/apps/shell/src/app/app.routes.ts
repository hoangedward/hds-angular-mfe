import { Routes } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from '@micro-app/auth';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  {
    path: 'user-management',
    loadChildren: () =>
      loadRemoteModule('user-management', './Module').then(
        (m) => m.RemoteEntryModule
      )
  },
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'home',
    // loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    component: HomePageComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: ['Admin', 'default-roles-sag'] }
  },
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    data: { roles: ['Admin'] }
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m.remoteRoutes),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
];
