import { AdminAuthGuard } from '@micro-app/app-store';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: 'product',
    loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'home',
    // loadChildren: () => import('product/Routes').then((m) => m.remoteRoutes),
    component: NxWelcomeComponent,
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () =>
        loadRemoteModule('login', './Module').then(
            (m) => m.RemoteEntryModule
         ),
    // loadChildren: () => import('login/Routes').then((m) => m.remoteRoutes),
  },
  {
    path: 'cart',
    loadChildren: () => import('cart/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('shop/Routes').then((m) => m.remoteRoutes),
    canActivate: [AdminAuthGuard],
    canLoad: [AdminAuthGuard]
  },
];
